# Correção do download do Catálogo B&B v52

## Objetivo

Liberar o PDF somente depois que o cadastro for persistido e uma oportunidade for registrada no CRM.

## Causa confirmada

- O runtime consulta a coluna `catalog_leads.attribution`, ausente no banco de produção.
- O arquivo estático já é o catálogo v52 otimizado, mas o registro do Payload ainda aponta para o PDF antigo.
- A action do formulário persistia o lead apenas no Payload e não criava oportunidade no CRM.

## Entrega

1. Aplicar a migração idempotente da coluna `attribution`.
2. Exigir sucesso do endpoint `sdr-sync` do CRM antes de liberar o download.
3. Usar `site-catalogo:<cnpj>:<catalogId>` como referência idempotente da oportunidade.
4. Atualizar a mídia do Payload com `public/downloads/catalogo-bb-iluminacao.pdf`.
5. Validar em produção: submissão, registro no Payload, oportunidade no CRM e PDF de 20 páginas.

## Rollback

- Reverter o commit da action para retirar a sincronização obrigatória.
- A coluna JSONB é retrocompatível e pode permanecer; o `down` existe para remoção controlada.
- A mídia anterior deve ser preservada em backup antes da substituição no volume do Payload.
