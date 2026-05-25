"use client"

import { useState } from "react"
import { Send, CheckCircle2, AlertCircle } from "lucide-react"
import { sendLaserQuote } from "@/app/actions/service-quote"

interface Props {
  cidade?: string
}

export function LaserQuoteForm({ cidade }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(formData: FormData) {
    setStatus('loading')
    if (cidade) formData.append('cidade', cidade)
    const result = await sendLaserQuote(formData)
    if (result.success) {
      setStatus('success')
    } else {
      setStatus('error')
      setErrorMsg(result.error || 'Ocorreu um erro inesperado.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 p-10 text-center space-y-4 animate-in fade-in zoom-in duration-300">
        <CheckCircle2 className="size-14 text-green-600 mx-auto" />
        <h3 className="text-xl font-black text-green-900 uppercase">Cotação Enviada!</h3>
        <p className="text-green-700 text-sm leading-relaxed">
          Recebemos sua solicitação. Nossa equipe técnica analisará e entrará em contato para detalhar o projeto.
        </p>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-4" noValidate>
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 p-4 flex items-center gap-3 text-red-700 text-sm font-medium">
          <AlertCircle className="size-5 shrink-0" />
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2 space-y-1.5">
          <label htmlFor="l-empresa" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
            Empresa / Razão Social <span className="text-red-600">*</span>
          </label>
          <input
            id="l-empresa"
            type="text"
            name="empresa"
            required
            autoComplete="organization"
            className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 h-12 text-sm text-industrial-900 placeholder:text-industrial-400 outline-none transition-colors"
            placeholder="Ex: Metalúrgica Delta S.A."
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="l-nome" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
            Nome do Responsável <span className="text-red-600">*</span>
          </label>
          <input
            id="l-nome"
            type="text"
            name="nome"
            required
            autoComplete="name"
            className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 h-12 text-sm text-industrial-900 placeholder:text-industrial-400 outline-none transition-colors"
            placeholder="Ex: Ana Lima"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="l-telefone" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
            WhatsApp / Telefone <span className="text-red-600">*</span>
          </label>
          <input
            id="l-telefone"
            type="tel"
            name="telefone"
            required
            autoComplete="tel"
            className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 h-12 text-sm text-industrial-900 placeholder:text-industrial-400 outline-none transition-colors"
            placeholder="(62) 90000-0000"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="l-material" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
            Material a Cortar
          </label>
          <select
            id="l-material"
            name="materialLaser"
            className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 h-12 text-sm text-industrial-900 outline-none transition-colors appearance-none"
          >
            <option value="">Selecione…</option>
            <option value="Aço carbono">Aço carbono</option>
            <option value="Aço galvanizado">Aço galvanizado</option>
            <option value="Aço inox">Aço inox</option>
            <option value="Alumínio">Alumínio</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="l-espessura" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
            Espessura Aproximada
          </label>
          <select
            id="l-espessura"
            name="espessura"
            className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 h-12 text-sm text-industrial-900 outline-none transition-colors appearance-none"
          >
            <option value="">Selecione…</option>
            <option value="Até 3mm">Até 3mm</option>
            <option value="3–6mm">3–6mm</option>
            <option value="6–12mm">6–12mm</option>
            <option value="12–19mm">12–19mm</option>
          </select>
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <label htmlFor="l-quantidade" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
            Quantidade de Peças / Lote
          </label>
          <input
            id="l-quantidade"
            type="text"
            name="quantidade"
            className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 h-12 text-sm text-industrial-900 placeholder:text-industrial-400 outline-none transition-colors"
            placeholder="Ex: 200 peças por semana, lote único de 500…"
          />
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <label htmlFor="l-mensagem" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
            Descrição da Peça / DXF (opcional)
          </label>
          <textarea
            id="l-mensagem"
            name="mensagem"
            rows={3}
            className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 py-3 text-sm text-industrial-900 placeholder:text-industrial-400 outline-none transition-colors resize-none"
            placeholder="Descreva a geometria, tolerâncias ou anexe o arquivo DXF via WhatsApp após envio."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex items-center justify-center gap-2 w-full h-14 bg-industrial-950 text-white hover:bg-industrial-800 disabled:bg-industrial-400 font-black uppercase tracking-widest text-sm transition-colors"
      >
        {status === 'loading' ? (
          <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <Send className="size-5" />
        )}
        {status === 'loading' ? 'ENVIANDO...' : 'SOLICITAR COTAÇÃO'}
      </button>

      <p className="text-[11px] text-industrial-400 text-center leading-relaxed">
        Trabalhamos com projetos técnicos e lotes repetitivos. Para envio de DXF, entre em contato via WhatsApp após preencher o formulário.
      </p>
    </form>
  )
}
