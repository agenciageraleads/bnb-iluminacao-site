"use client"

import { useEffect, type CSSProperties, type MouseEventHandler, type ReactNode } from "react"
import { createMarketingAttribution, persistFirstTouchAttribution, pushLeadEvent } from "@/lib/lead-tracking"

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

  const buildUrl = (attributionId?: string | null) => {
    const attributionMessage = attributionId ? `\n\nRef: #${attributionId}` : ''
    const finalMessage = `${message ?? ''}${attributionMessage}`.trim()
    return finalMessage
      ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`
      : `https://wa.me/${phoneNumber}`
  }

  const handleClick: MouseEventHandler<HTMLAnchorElement> = async (event) => {
    pushLeadEvent({
      event: 'whatsapp_click',
      cta_channel: 'whatsapp',
      cta_source: eventSource,
      cta_label: eventLabel ?? ariaLabel ?? 'WhatsApp',
      whatsapp_phone: phoneNumber,
      has_prefilled_message: Boolean(message),
    })
    onClick?.(event)
    if (event.defaultPrevented) return

    event.preventDefault()
    const popup = window.open('', '_blank')
    const fallbackUrl = buildUrl()

    try {
      const attributionId = await createMarketingAttribution('whatsapp')
      const targetUrl = buildUrl(attributionId)
      if (popup) {
        popup.location.assign(targetUrl)
      } else {
        window.location.assign(targetUrl)
      }
    } catch {
      if (popup) {
        popup.location.assign(fallbackUrl)
      } else {
        window.location.assign(fallbackUrl)
      }
    }
  }

  return (
    <a
      href={buildUrl()}
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
