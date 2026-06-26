"use client"

import { useEffect, type CSSProperties, type MouseEventHandler, type ReactNode } from "react"

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

interface WhatsAppLinkProps {
  phoneNumber?: string
  message?: string
  className?: string
  style?: CSSProperties
  children: ReactNode
  onClick?: MouseEventHandler<HTMLAnchorElement>
  eventLabel?: string
  eventSource?: string
  'aria-label'?: string
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

type AttributionParamName = (typeof attributionParamNames)[number]
type AttributionParams = Partial<Record<AttributionParamName, string>>

interface StoredAttribution extends AttributionParams {
  landing_page?: string
  first_referrer?: string
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

function persistFirstTouchAttribution() {
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
    // Attribution should never block a lead click.
  }
}

function getLeadAttributionPayload() {
  const currentAttribution = readAttributionParams(window.location.search)
  const firstTouch = readStoredAttribution()
  const payload: Record<string, string> = {}

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

export function WhatsAppLink({
  phoneNumber = "556235761988",
  message,
  className,
  style,
  children,
  onClick,
  eventLabel,
  eventSource = "inline_whatsapp",
  'aria-label': ariaLabel,
}: WhatsAppLinkProps) {
  useEffect(() => {
    persistFirstTouchAttribution()
  }, [])

  const url = message
    ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${phoneNumber}`

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'whatsapp_click',
        cta_channel: 'whatsapp',
        cta_source: eventSource,
        cta_label: eventLabel ?? ariaLabel ?? 'WhatsApp',
        page_path: window.location.pathname,
        page_location: window.location.href,
        whatsapp_phone: phoneNumber,
        has_prefilled_message: Boolean(message),
        ...getLeadAttributionPayload(),
      })
    }
    onClick?.(event)
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  )
}
