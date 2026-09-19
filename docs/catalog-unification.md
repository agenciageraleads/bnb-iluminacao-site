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

## Ordem obrigatória antes do merge (autodeploy)

O workflow Deploy é acionado automaticamente quando Validate passa na main. O Docker inicia `npm start`; **não há migração automática**, e não se deve habilitar `prodMigrations` sem reconciliar todo o histórico. `PAYLOAD_NO_PUSH=true` deve permanecer ativo.

O deploy agora possui um gate somente leitura antes de atualizar o Swarm: exige coluna lifecycle, tabela de backup e registro da migração. Se qualquer condição faltar, o serviço antigo continua ativo. Esse gate não aplica SQL nem substitui backup externo.

1. Homologação: CI usa PostgreSQL 15 descartável e executa `node node_modules/tsx/dist/cli.mjs scripts/test-catalog-migration.ts`. Sem `TEST_CATALOG_DATABASE_URL`, o mesmo teste usa PGlite em memória. Confere preservação dos nomes/imagens/IDs, dez modelos Orna, estados em desenvolvimento, padrão oculto e rollback. Restaurar também uma cópia recente do banco produtivo isolada e executar o artefato exato abaixo para conferir histórico e esquema reais.
2. Antes de alterar produção, inventariar em leitura o banco efetivo do serviço `site-bb_app`, nome do banco, contagem de `products`, estado de `payload_migrations`, imagem/digest atual e ambiente (sem exibir segredos). Não presumir que o compose antigo corresponde ao Swarm atual.
3. Criar dump `pg_dump --format=custom` com permissão 600, checksum SHA-256 e teste de restauração no banco isolado. Preservar snapshot/manifesto da mídia, configuração e imagem anterior. Congelar publicação CMS durante migração/readback. Não permitir limpeza da imagem de rollback antes da validação.
4. Gerar SQL **sem conexão**, no checkout do SHA aprovado:

   `node node_modules/tsx/dist/cli.mjs scripts/catalog-migration-sql.ts NOME_CONFIRMADO_DO_BANCO CONTAGEM_CONFIRMADA SHA256_DO_DUMP_VERIFICADO`

   O artefato contém somente a migração específica, transação, trava curta, confirmação do banco/contagem, recusa de migração parcial/repetida e registro em `payload_migrations`. Revisar/salvar o SQL e seu checksum. Não executar `payload migrate` às cegas, pois há migrações históricas potencialmente não registradas.
5. Com aprovação do lote, aplicar o SQL revisado pelo cliente PostgreSQL autorizado: `psql --no-psqlrc --set ON_ERROR_STOP=1 --file ARTEFATO_APROVADO.sql`. Usar a conexão de produção já resolvida/segura; não incluir senha em linha de comando nem logs. Qualquer erro reverte a transação. O aplicativo antigo continua compatível porque a coluna é aditiva.
6. Readback: mesmo total de produtos/nomes/imagens, backup com todos os IDs originais, Orna não oficial oculta, Sport/Agro/Garden em desenvolvimento, EOS antigo oculto, registro da migração presente. Rodar `node scripts/check-catalog-schema.cjs` com a conexão autorizada. Só então permitir merge/deploy, ainda com fonte CMS local curada.
7. Após rollout, conferir REST por ID, listagem, relacionados, exportação de catálogo, sitemap, dois Éos/canonicais, hub e página 404 dos ocultos. Ativar `CATALOG_SOURCE=crm` somente em uma segunda mudança após validar a publicação completa aprovada.

**Rollback preferido:** restaurar a imagem anterior mantendo a coluna aditiva e o backup; isso evita apagar auditoria ou alterações posteriores. O rollback antigo volta à política antiga de visibilidade e requer decisão explícita se expuser modelos retirados. `down` apenas em janela controlada, após voltar o código e verificar dependências; não usar para desfazer produção ativa automaticamente.
