"use client"

import { useState, useRef } from "react"
import { Send, CheckCircle2, AlertCircle, Paperclip, X } from "lucide-react"
import { sendPinturaQuote } from "@/app/actions/service-quote"

interface Props {
  cidade?: string
}

export function PinturaQuoteForm({ cidade }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [arquivo, setArquivo] = useState<File | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    if (file && file.size > 10 * 1024 * 1024) {
      setErrorMsg('O arquivo deve ter no máximo 10MB.')
      setStatus('error')
      e.target.value = ''
      return
    }
    setArquivo(file)
    if (status === 'error') setStatus('idle')
  }

  async function handleSubmit(formData: FormData) {
    setStatus('loading')
    if (cidade) formData.append('cidade', cidade)
    const result = await sendPinturaQuote(formData)
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
          Recebemos sua solicitação. Nossa equipe comercial entrará em contato em breve para fechar os detalhes do lote.
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
          <label htmlFor="p-empresa" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
            Empresa / Razão Social <span className="text-red-600">*</span>
          </label>
          <input
            id="p-empresa"
            type="text"
            name="empresa"
            required
            autoComplete="organization"
            className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 h-12 text-sm text-industrial-900 placeholder:text-industrial-400 outline-none transition-colors"
            placeholder="Ex: Construtora Horizonte Ltda"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="p-nome" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
            Nome do Responsável <span className="text-red-600">*</span>
          </label>
          <input
            id="p-nome"
            type="text"
            name="nome"
            required
            autoComplete="name"
            className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 h-12 text-sm text-industrial-900 placeholder:text-industrial-400 outline-none transition-colors"
            placeholder="Ex: Carlos Souza"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="p-telefone" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
            WhatsApp / Telefone <span className="text-red-600">*</span>
          </label>
          <input
            id="p-telefone"
            type="tel"
            name="telefone"
            required
            autoComplete="tel"
            className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 h-12 text-sm text-industrial-900 placeholder:text-industrial-400 outline-none transition-colors"
            placeholder="(62) 90000-0000"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="p-volume" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
            Volume Estimado do Lote <span className="text-red-600">*</span>
          </label>
          <select
            id="p-volume"
            name="volume"
            required
            className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 h-12 text-sm text-industrial-900 outline-none transition-colors appearance-none"
          >
            <option value="">Selecione…</option>
            <option value="Até 50 peças">Até 50 peças</option>
            <option value="50–200 peças">50–200 peças</option>
            <option value="200–500 peças">200–500 peças</option>
            <option value="Acima de 500 peças">Acima de 500 peças</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="p-material" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
            Tipo de Material
          </label>
          <select
            id="p-material"
            name="material"
            className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 h-12 text-sm text-industrial-900 outline-none transition-colors appearance-none"
          >
            <option value="">Selecione…</option>
            <option value="Aço carbono">Aço carbono</option>
            <option value="Aço galvanizado">Aço galvanizado</option>
            <option value="Alumínio">Alumínio</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className="sm:col-span-2 space-y-1.5">
          <label htmlFor="p-mensagem" className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
            Observações (opcional)
          </label>
          <textarea
            id="p-mensagem"
            name="mensagem"
            rows={3}
            className="w-full bg-white border border-industrial-300 focus:border-industrial-900 px-4 py-3 text-sm text-industrial-900 placeholder:text-industrial-400 outline-none transition-colors resize-none"
            placeholder="Cor desejada (RAL), acabamento, prazo, etc."
          />
        </div>

        {/* Upload de arquivo */}
        <div className="sm:col-span-2 space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-widest text-industrial-600 block">
            Foto das peças (opcional)
          </label>
          <div
            onClick={() => fileRef.current?.click()}
            className="w-full border border-dashed border-industrial-300 hover:border-industrial-700 bg-white cursor-pointer transition-colors px-4 py-4 flex items-center gap-3"
          >
            <Paperclip className="size-4 text-industrial-400 shrink-0" />
            {arquivo ? (
              <span className="text-sm text-industrial-900 font-medium flex-1 truncate">{arquivo.name}</span>
            ) : (
              <span className="text-sm text-industrial-400">Clique para anexar JPG, PNG ou PDF (máx. 10MB)</span>
            )}
            {arquivo && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setArquivo(null); if (fileRef.current) fileRef.current.value = '' }}
                className="text-industrial-400 hover:text-red-500 shrink-0"
                aria-label="Remover arquivo"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            name="arquivo"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className="hidden"
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
        Atendemos pedidos industriais e comerciais. Para peças avulsas, consulte nossos representantes.
      </p>
    </form>
  )
}
