'use client'

import React, { useState } from 'react'
import { useFormFields } from '@payloadcms/ui'
import { Button } from '@payloadcms/ui'

export const GeneratePdfButton: React.FC = () => {
  // Pegar o ID do documento atual via hook do Payload
  const idField = useFormFields(([fields, dispatch]) => fields.id)
  const id = idField?.value as string
  
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!id) {
      alert('Salve o registro antes de gerar o PDF.')
      return
    }

    setLoading(true)
    setStatus('Gerando PDF... Aguarde.')

    try {
      const response = await fetch('/api/catalogs/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ catalogId: id }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('Sucesso! Recarregando a página...')
        // Recarregar para mostrar o novo arquivo no campo 'file'
        window.location.reload()
      } else {
        setStatus(`Erro: ${data.error}`)
      }
    } catch (error) {
      console.error(error)
      setStatus('Erro de conexão com a API.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <h4 style={{ margin: '0 0 10px 0' }}>Gerador de PDF Automático</h4>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
        Clique no botão abaixo para gerar o arquivo PDF baseado nas páginas configuradas acima. 
        O arquivo será anexado automaticamente ao campo "Arquivo PDF".
      </p>
      
      <Button 
        type="button" 
        onClick={handleGenerate} 
        disabled={loading || !id}
        buttonStyle={loading ? 'secondary' : 'primary'}
      >
        {loading ? 'Processando...' : 'GERAR CATÁLOGO PDF'}
      </Button>

      {status && (
        <p style={{ marginTop: '10px', fontWeight: 'bold', color: status.includes('Erro') ? 'red' : 'green' }}>
          {status}
        </p>
      )}
    </div>
  )
}
