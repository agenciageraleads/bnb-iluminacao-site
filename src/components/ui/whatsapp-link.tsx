"use client"

import { useEffect, type CSSProperties, type MouseEventHandler, type ReactNode } from "react"
import { persistFirstTouchAttribution, pushLeadEvent } from "@/lib/lead-tracking"

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

  const url = message
    ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${phoneNumber}`

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    pushLeadEvent({
      event: 'whatsapp_click',
      cta_channel: 'whatsapp',
      cta_source: eventSource,
      cta_label: eventLabel ?? ariaLabel ?? 'WhatsApp',
      whatsapp_phone: phoneNumber,
      has_prefilled_message: Boolean(message),
    })
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
