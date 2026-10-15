"use client"

import { useEffect, useState, type CSSProperties, type MouseEventHandler, type ReactNode } from "react"
import { createMarketingAttribution, persistFirstTouchAttribution, pushLeadEvent } from "@/lib/lead-tracking"

// Um único touch por carregamento de página, compartilhado por todos os links,
// criado só quando o visitante demonstra intenção (hover, toque ou foco) — e não
// a cada render de cada link, que gerava ~500 touches/dia sem clique algum.
let sharedAttribution: Promise<string | null> | null = null

function requestAttribution() {
  if (!sharedAttribution) {
    sharedAttribution = createMarketingAttribution('whatsapp').catch(() => null)
  }
  return sharedAttribution
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
  // O href ganha a referência assim que o visitante mostra intenção, antes do
  // clique; o clique segue como navegação <a href> nativa, sem popup nem await
  // (window.open + await quebra o handoff do wa.me para o app em mobile).
  const [attributionId, setAttributionId] = useState<string | null>(null)

  useEffect(() => {
    persistFirstTouchAttribution()
  }, [])

  const handleIntent = () => {
    void requestAttribution().then((id) => setAttributionId(id))
  }

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
      onPointerEnter={handleIntent}
      onTouchStart={handleIntent}
      onFocus={handleIntent}
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  )
}
