"use client"

import { type ReactNode } from "react"

interface WhatsAppLinkProps {
  phoneNumber?: string
  message?: string
  className?: string
  children: ReactNode
  'aria-label'?: string
}

export function WhatsAppLink({
  phoneNumber = "556235761988",
  message,
  className,
  children,
  'aria-label': ariaLabel,
}: WhatsAppLinkProps) {
  const url = message
    ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${phoneNumber}`

  function handleClick() {
    if (typeof window !== 'undefined') {
      (window as any).dataLayer = (window as any).dataLayer || []
      ;(window as any).dataLayer.push({ event: 'whatsapp_click' })
    }
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
