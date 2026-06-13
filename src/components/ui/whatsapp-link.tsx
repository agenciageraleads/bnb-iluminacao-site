"use client"

import { type MouseEventHandler, type ReactNode } from "react"

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

interface WhatsAppLinkProps {
  phoneNumber?: string
  message?: string
  className?: string
  children: ReactNode
  onClick?: MouseEventHandler<HTMLAnchorElement>
  'aria-label'?: string
}

export function WhatsAppLink({
  phoneNumber = "556235761988",
  message,
  className,
  children,
  onClick,
  'aria-label': ariaLabel,
}: WhatsAppLinkProps) {
  const url = message
    ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${phoneNumber}`

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'whatsapp_click' })
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
      aria-label={ariaLabel}
    >
      {children}
    </a>
  )
}
