# Esqueleto do Site Novo - B&B Iluminação v2.0

Com base nos planejamentos anteriores, aqui está a estrutura completa (esqueleto) que definimos para o novo site:

## 1. Páginas Institucionais (Conversão & Branding)

- **Home Page (`/`)**:
  - Foco em design industrial premium (Preto/Amarelo Ouro).
  - Seções: Hero, Nossos Produtos (Cards), Benefícios, Downloads, Blog Preview.
- **Quem Somos (`/quem-somos`)**: História, infraestrutura e fotos da fábrica.
- **Contato (`/contato`)**: Mapa, formulário e links diretos de WhatsApp.

## 2. Hub de Produtos e Serviços (Catálogo Dinâmico)

- **Página Geral (`/produtos`)**: Mix completo de soluções.
- **Categorias Principais (`/produtos/[category]`)**:
  - `poste-metalico` (Retos, Curvos, Ornamentais, Acessórios)
  - `mastros-para-bandeiras` (Mastros para Bandeiras, Acessórios)
  - `bracos` (Pública, CFTV)
  - `linha-garden` (Lixeiras, Bancos, Gradis, etc)
  - `linha-sport` (Estrutura de Quadras, Gols, Poste para Rede de Volei/Futvolei, Iluminação de Quadras/Estádios)
  - `linha-agro` (Postes para Fazendas/Silos, Iluminação para Fazendas/Silos, Postes com Luminária Solar para Iluminar Cochos)
  - `servicos` (Pintura, Corte a Laser)
- **Item Individual (`/produtos/item/[slug]`)**: Ficha técnica, fotos 3D e botão de orçamento.

## 3. Estratégia de Conteúdo e SEO Local

- **Blog Hub (`/blog`)**: Central de guias técnicos e novidades.
- **Artigos (`/blog/[slug]`)**: Mapeados para responder dúvidas técnicas (ex: "Como instalar poste de luz").
- **Regiões Atendidas (`/regioes-atendidas/cidades/[city]`)**: Páginas otimizadas para cidades como Goiânia, Salvador, Brasília, etc.

## 4. Redirecionamentos e LPs

- **Redirects 301**: Mapeamento exaustivo de 93 URLs antigas para as novas rotas acima.
- **Landing Pages (`/lp/[slug]`)**: Páginas limpas para campanhas de Google Ads.

## 5. Estrutura Técnica (Arquivos)

- `src/app/`: Roteamento Next.js.
- `src/components/sections/`: Blocos da Home e internos.
- `src/lib/data.ts`: Centralização dos dados de produtos e categorias.
- `src/collections/`: Modelos do Payload CMS (Posts, Categorias, Produtos).
