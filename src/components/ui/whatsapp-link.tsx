"use client"

import { useEffect, useRef, useState, type CSSProperties, type MouseEventHandler, type ReactNode } from "react"
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
  // A referência de atribuição é buscada aqui, no mount, e não no clique.
  // Em mobile (app nativo do WhatsApp e, principalmente, WebViews in-app de
  // Instagram/Facebook), abrir uma aba vazia com window.open() e só navegá-la
  // depois de um await quebra o handoff do link https://wa.me/... pro app —
  // o SO não trata mais como navegação direta do toque do usuário. Buscando
  // antes, o clique vira uma navegação <a href> comum, sem preventDefault.
  const [attributionId, setAttributionId] = useState<string | null>(null)
  const attributionRequested = useRef(false)

  useEffect(() => {
    persistFirstTouchAttribution()

    if (attributionRequested.current) return
    attributionRequested.current = true

    createMarketingAttribution('whatsapp')
      .then((id) => setAttributionId(id))
      .catch(() => setAttributionId(null))
  }, [])

  const buildUrl = (id?: string | null) => {
    const attributionMessage = id ? `\n\nRef: #${id}` : ''
    const finalMessage = `${message ?? ''}${attributionMessage}`.trim()
    return finalMessage
      ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`
      : `https://wa.me/${phoneNumber}`
  }

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    pushLeadEvent({
      event: 'whatsapp_click',
      cta_channel: 'whatsapp',
      cta_source: eventSource,
      cta_label: eventLabel ?? ariaLabel ?? 'WhatsApp',
      whatsapp_phone: phoneNumber,
      has_prefilled_message: Boolean(message),
      attribution_ready: attributionId !== null,
    })
    onClick?.(event)
    // O href já carrega a referência (ou não, se a busca ainda não voltou) —
    // deixa o navegador seguir com a navegação nativa normalmente.
  }

  return (
    <a
      href={buildUrl(attributionId)}
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
