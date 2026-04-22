# ROADMAP - B&B Iluminação

## Fase 1: Arquitetura e Planejamento (CONCLUÍDO)

- Levantamento de todas as linhas de produtos (Postes, Braços, Garden, Sport, Agro, Serviços).
- Planejamento do roteamento no Next.js App Router (Mapeamento das paginas em `plan_implementation.md`).
- Estratégia de SEO Local via páginas dinâmicas (`/regioes-atendidas/cidades/[city]`).
- Estratégia de Redirects 301 definida (`next.config.ts`) mapeando as URLs ativas das campanhas pagas para não perder tráfego (Ex: `/iluminacao`).

## Fase 2: Layout Base (EM ANDAMENTO)

- **Home Page**:
  - [x] Atualizar Componente `Header` (nova logo svg SVG, navegação condizente com as categorias).
  - [x] Atualizar `Categories.tsx` na Home para incluir as 6 linhas oficiais de forma estática.
  - [ ] Ajustar Hero Section (Banner)
  - [ ] Implementar as réguas e blocos de *Benefícios*, *Catálogos/Downloads*, *Blog* e *CTA WhatsApp* referenciadas no design inspiracional.
- **Estruturação de Dados**: Criação de arquivo/CMS centralizando os dados de categorias e produtos mapeados para abastecer de forma dinâmica as páginas que serão criadas a seguir.

## Fase 3: Páginas Internas Estáticas / Dinâmicas (A FAZER)

- **Páginas de Catálogo (`/produtos/[category]`)**: Refinar layout para a listagem das variações da categoria (Ex: Listar postes telecônicos, curvos na rota de postes metálicos).
- **Páginas Detalhe do Produto (`/produtos/item/[slug]`)**: Página focada no orçamento via WhatsApp, ficheiro técnico.
- **Páginas Institucionais (`/quem-somos`, `/contato`)**.
- **Redação e Cópia (SEO e Body)**: Alimentar as informações reais da empresa nos blocos recém criados na Fase 2 e 3.

## Fase 4: Conversão, Landing Pages e GEO (A FAZER)

- Construção do Template limpo (sem Header/Footer padrão) em `/lp/[slug]` para servir de motor principal para tráfego pago de construtoras / órgãos púbicos.
- Parametrização dinâmica das páginas `/regioes-atendidas/cidades/[city]` para gerar os H1 e Titles dinamicamente puxando as cidades foco (Goiânia, Salvador, etc).

## Fase 5: Validação e Lançamento (A FAZER)

- Conferência fina dos *Redirects* do next.config.ts.
- Testes de performance, carregamento de imagens.
## Fase 6: Portal do Representante e Integração (A FAZER)

- **Módulo de Treinamento e Downloads**:
  - [x] Implementar área logada/protegida para representantes (Senha Fixa).
  - [ ] Evoluir para Login Individual (E-mail + Senha personalizada).
  - [x] Disponibilizar módulos de treinamento comercial e técnico de produtos.
  - [x] Criar central de downloads (Catálogos, Logos, Fichas Técnicas).
- **Integração com CRM**:
  - [ ] Exibir propostas em aberto e status de negociações.
- **Integração com ERP (Sankhya)**:
  - [ ] Dashboard de vendas efetuadas e recebimentos pendentes/futuros.
