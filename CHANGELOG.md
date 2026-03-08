# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato baseia-se em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao versionamento semântico interno.

## [Não Lançado]

### Adicionado (08-03-2026)

- **Planejamento de Roteamento/Arquitetura**: Documento de *implementation_plan* revisado.
- **Regras de Redirecionamento 301**: Implementadas no arquivo `next.config.ts` para urls antigas ativas (Ex: `/iluminacao` redirecionando permanentemente para `/produtos`, `/sobre/` para `/quem-somos`). Isso garante manutenção das taxas em campanhas ads e ranqueamento Google.
- **Sitemap Legado**: Lista salva provisoriamente em planilhas/documentos à parte visando cruzamento futuro com as novas páginas.
- **Header**: Abas principais reorganizadas para alinhar com o documento de rotas ("Produtos" no geral ao invés de fixo por material, "Sinalização Viária", "Serviços").
- **Header**: Limpeza e estilização melhorada da *Logo* (SVG) referenciada em amarelo/preto.
- **Home/Categorias (`Categories.tsx`)**: Reescrita visual e estática da matriz de produtos para contemplar os 6 novos focos da empresa: Postes Metálicos, Braços e Suportes, Linha Garden, Serviços, Linha Sport e Linha Agro. Implementação inicial com modelo de cards da UI de conversão Ibilux.
- **Arquivos de Organização**: Foram adicionados este `.CHANGELOG`, `.ROADMAP` e atualização geral do `.README`.

### Removido

- Links antigos do `Header` e componentes base da home (Poste Simples/Mastros de forma desvinculada).

### Modificado

- Layout base de header para ficar totalmente aderente a rotina da nova arquitetura de catálogo.
