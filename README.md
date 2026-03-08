# B&B Iluminação (Site 2.0)

Este projeto é a reformulação do site e catálogo digital da **B&B Iluminação**, construído visando máxima conversão, performance e rankeamento SEO.

## Stack Tecnológica

- **Framework:** Next.js 15+ (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS (+ animações e utilities customizadas)
- **Ícones:** Lucide React
- **Estruturação de Dados:** JSON/CMS (a ser definido na Fase 2)
- **Componentes:** shadcn/ui (para botões e forms base)

## Como Rodar Localmente

1. Clone e instale as dependências:

   ```bash
   npm install
   ```

2. Rode o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

3. Abra `http://localhost:3000` no seu navegador.

## Estrutura de Pastas e Padrões

- `/src/app`: Rotas da aplicação (roteamento nativo App Router).
  - `/produtos/[category]`: Listagem de produtos de uma categoria.
  - `/produtos/item/[slug]`: Detalhe fino de um produto.
  - `/regioes-atendidas/cidades/[city]`: Páginas geradas focadas em Local SEO (ex: Goiânia, Salvador).
  - `/lp/[slug]`: Landing pages sem Navbar/Footer base focadas 100% em campanhas ADS.
- `/src/components/layout`: Header e Footer do site.
- `/src/components/sections`: Grandes blocos de página (Hero, Categorias, Benefícios).

> 💡 **Redirects** (next.config.ts): Todas as URLs antigas de campanhas (como `/iluminacao` ou `/sobre/`) estão com redirects 301 configurados no `next.config.ts` para transferir tráfego ininterruptamente para as novas páginas do router. Consulte o arquivo `urls_legadas.md` (ou similar) nas anotações do projeto para mais detalhes.

## Dúvidas?

Consulte os arquivos:

- `ROADMAP.md`: Para saber onde estamos no projeto.
- `CHANGELOG.md`: Para rever o que foi mudado recentemente.
- E procure a equipe de Design/Requisitos se tiver dúvida sobre as linhas de produtos listadas no planejamento.
