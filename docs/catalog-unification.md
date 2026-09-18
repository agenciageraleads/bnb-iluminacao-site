# Catálogo comercial — implantação controlada

## Estado e fontes

O CRM é a fonte comercial definitiva. A ativação é explícita: `CATALOG_SOURCE=crm` e `CRM_CATALOG_URL=https://crm.bebiluminacao.com/api/public/v1/commercial-catalog`. Até a revisão da publicação completa, manter a fonte local curada. Nunca ativar com publicação vazia ou parcial.

O feed v1 preserva os slugs canônicos e aliases `siteSlugs`. A API `/api/catalog/v1` publica somente a projeção comercial. No modo CRM, a leitura anônima de `/api/products` é desabilitada para não expor nomes/imagens antigos; o CMS autenticado continua acessível. Erro, timeout, feed inválido ou vazio geram indisponibilidade explícita, nunca retorno aos produtos legados.

## Migração e publicação

1. Antes do deploy, snapshot completo do banco e mídia; registrar SHA do código e ambiente anterior.
2. Executar migração `20260918_120000_catalog_lifecycle` em homologação com `PAYLOAD_NO_PUSH=true`. Ela guarda JSON dos registros em `products_catalog_20260918_backup`, adiciona lifecycle e não exclui produtos ou imagens. Depois aplicar em produção somente com gate de publicação aprovado.
3. Validar listas, detalhe direto, relacionados, sitemap, REST por ID e relações de catálogo. Orna fora dos dez modelos fica oculta; Sport/Agro/Garden são apresentados só como nomes e status na página de produtos.
4. Revisar seed CRM: completude, fotos, modelos, aliases e nomes. Comparar feed com matriz aprovada. Ativar fonte CRM atomicamente; monitorar disponibilidade/erros e nenhuma regressão de visibilidade.
5. Readback público: dois Éos com canonicais próprios, URL antiga como comparativo, ocultos 404, API sem produtos ocultos e sem campos internos.

O fallback local adiciona os dois Éos com imagens distintas do guia oficial (`Guia Comercial B&B/index.html`, seções Éos). Não cria nem apaga registros CMS. Após ativação do CRM, esses dados locais deixam de ser usados. Estoque/preço não são inferidos nos dados estruturados; sem oferta real não se promete rich result de preço.

## Rollback

Reverter a fonte para o CMS **somente após conferir a lista local contra a publicação vigente**, para não reativar itens ocultados mais recentemente no CRM. Caso contrário manter indisponibilidade controlada. Reverter código e migração juntos; `down` remove somente coluna/enum/índice novos e preserva o backup. Não restaurar registros comerciais ou mídia sem comparar alterações posteriores.

Reativação de modelos Orna exige nova aprovação do catálogo e revisão da allowlist central, além do estado ativo. Propostas/ERP não são alterados por esta implantação.

## Validação

`node node_modules/tsx/dist/cli.mjs scripts/test-commercial-catalog.ts`

`npm run typecheck` e `npm run lint`; validar migração e páginas renderizadas em homologação antes de produção. Este pacote não executa deploy nem migração produtiva.
