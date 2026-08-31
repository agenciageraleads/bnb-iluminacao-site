"use client"

import { useEffect, useRef, type AnchorHTMLAttributes, type ReactNode } from "react"

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

const FIRST_TOUCH_STORAGE_KEY = "bnb:first-touch-attribution:v1"

const attributionParamNames = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
] as const

const hiddenAttributionFieldNames = [
  "page_path",
  "page_location",
  "page_referrer",
  "first_landing_page",
  "first_referrer",
  ...attributionParamNames,
  ...attributionParamNames.map((name) => `first_${name}`),
]

type AttributionParamName = (typeof attributionParamNames)[number]
type AttributionParams = Partial<Record<AttributionParamName, string>>

interface StoredAttribution extends AttributionParams {
  landing_page?: string
  first_referrer?: string
}

interface LeadEventPayload extends Record<string, unknown> {
  event: string
  cta_channel?: string
  cta_source?: string
  cta_label?: string
}

interface LeadAttributionFieldsProps {
  formType?: string
  cluster?: string
}

interface TrackedContactLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  channel: "phone" | "email" | "maps" | "download" | "whatsapp" | "cta"
  eventName?: string
  eventSource: string
  eventLabel: string
  children: ReactNode
  extraPayload?: Record<string, unknown>
}

function readAttributionParams(search: string) {
  const params = new URLSearchParams(search)
  const attribution: AttributionParams = {}

  for (const name of attributionParamNames) {
    const value = params.get(name)

    if (value) {
      attribution[name] = value
    }
  }

  return attribution
}

function readStoredAttribution() {
  try {
    const rawValue = window.localStorage.getItem(FIRST_TOUCH_STORAGE_KEY)

    return rawValue ? (JSON.parse(rawValue) as StoredAttribution) : null
  } catch {
    return null
  }
}

export function persistFirstTouchAttribution() {
  if (typeof window === "undefined") return

  const currentAttribution = readAttributionParams(window.location.search)

  if (Object.keys(currentAttribution).length === 0 || readStoredAttribution()) {
    return
  }

  const firstTouch: StoredAttribution = {
    ...currentAttribution,
    landing_page: window.location.href,
    first_referrer: document.referrer || undefined,
  }

  try {
    window.localStorage.setItem(FIRST_TOUCH_STORAGE_KEY, JSON.stringify(firstTouch))
  } catch {
    // Attribution should never block a lead action.
  }
}

export function getLeadAttributionPayload() {
  if (typeof window === "undefined") return {}

  const currentAttribution = readAttributionParams(window.location.search)
  const firstTouch = readStoredAttribution()
  const payload: Record<string, string> = {
    page_path: window.location.pathname,
    page_location: window.location.href,
  }

  for (const name of attributionParamNames) {
    const currentValue = currentAttribution[name]
    const firstValue = firstTouch?.[name]

    if (currentValue) {
      payload[name] = currentValue
    }

    if (firstValue) {
      payload[`first_${name}`] = firstValue
    }
  }

  if (firstTouch?.landing_page) {
    payload.first_landing_page = firstTouch.landing_page
  }

  if (firstTouch?.first_referrer) {
    payload.first_referrer = firstTouch.first_referrer
  }

  if (document.referrer) {
    payload.page_referrer = document.referrer
  }

  return payload
}

export function pushLeadEvent(payload: LeadEventPayload) {
  if (typeof window === "undefined") return

  persistFirstTouchAttribution()
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    ...payload,
    ...getLeadAttributionPayload(),
  })
}

export function LeadAttributionFields({ formType, cluster }: LeadAttributionFieldsProps) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    persistFirstTouchAttribution()
    const attribution = getLeadAttributionPayload()

    for (const input of Array.from(containerRef.current?.querySelectorAll('input[data-attribution-field]') ?? [])) {
      const field = input.getAttribute('name')

      if (field && input instanceof HTMLInputElement) {
        input.value = attribution[field] ?? ''
      }
    }
  }, [])

  return (
    <span ref={containerRef} hidden>
      {formType && <input type="hidden" name="formType" value={formType} />}
      {cluster && <input type="hidden" name="leadCluster" value={cluster} />}
      {hiddenAttributionFieldNames.map((name) => (
        <input key={name} type="hidden" name={name} data-attribution-field defaultValue="" />
      ))}
    </span>
  )
}

export function TrackedContactLink({
  channel,
  eventName,
  eventSource,
  eventLabel,
  extraPayload,
  onClick,
  children,
  ...props
}: TrackedContactLinkProps) {
  useEffect(() => {
    persistFirstTouchAttribution()
  }, [])

  return (
    <a
      {...props}
      onClick={(event) => {
        pushLeadEvent({
          event: eventName ?? `${channel}_click`,
          cta_channel: channel,
          cta_source: eventSource,
          cta_label: eventLabel,
          ...extraPayload,
        })
        onClick?.(event)
      }}
    >
      {children}
    </a>
  )
}
