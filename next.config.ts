import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  turbopack: {
    root: dirname,
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'bebiluminacao.com.br',
      }
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  async redirects() {
    return [
      {
        // Portal do Representante migrou para o CRM (crm.bebiluminacao.com).
        // O antigo portal de treinamento do site foi aposentado.
        source: '/treinamento',
        destination: 'https://crm.bebiluminacao.com/login',
        permanent: false,
      },
      {
        source: '/treinamento/:path*',
        destination: 'https://crm.bebiluminacao.com/login',
        permanent: false,
      },
      {
        source: '/sobre',
        destination: '/quem-somos',
        permanent: true,
      },
      {
        source: '/pintura-eletrostatica',
        destination: '/lp/pintura-eletrostatica',
        permanent: true,
      },
      {
        source: '/corte-laser',
        destination: '/lp/corte-laser',
        permanent: true,
      },
      {
        source: '/braco-para-luminaria',
        destination: '/produtos/braco-para-luminaria-publica',
        permanent: true,
      },
      {
        source: '/braco-para-luminaria-publica',
        destination: '/produtos/braco-para-luminaria-publica',
        permanent: true,
      },
      {
        source: '/bracos-para-luminaria-publica',
        destination: '/produtos/braco-para-luminaria-publica',
        permanent: true,
      },
      {
        source: '/mastro',
        destination: '/lp/mastros-para-bandeira',
        permanent: true,
      },
      {
        source: '/produtos/mastros-para-bandeiras',
        destination: '/lp/mastros-para-bandeira',
        permanent: true,
      },
      {
        source: '/lp/postes-metalicos',
        destination: '/postes-metalicos',
        permanent: true,
      },
      {
        source: '/iluminacao',
        destination: '/postes-para-iluminacao-publica',
        permanent: true,
      },
      {
        source: '/iluminacao-publica',
        destination: '/postes-para-iluminacao-publica',
        permanent: true,
      },
      {
        source: '/postes-de-iluminacao-publica',
        destination: '/postes-para-iluminacao-publica',
        permanent: true,
      },
      {
        source: '/postes-loteamentos',
        destination: '/postes-para-loteamentos',
        permanent: true,
      },
      {
        source: '/postes-para-loteamento',
        destination: '/postes-para-loteamentos',
        permanent: true,
      },
      {
        source: '/poste-para-loteamento',
        destination: '/postes-para-loteamentos',
        permanent: true,
      },
      {
        source: '/iluminacao-para-loteamentos',
        destination: '/postes-para-loteamentos',
        permanent: true,
      },
      {
        source: '/fabricante-postes-teleconicos',
        destination: '/fabricante-de-postes-teleconicos',
        permanent: true,
      },
      {
        source: '/fabricantes-de-postes-teleconicos',
        destination: '/fabricante-de-postes-teleconicos',
        permanent: true,
      },
      {
        source: '/fabricante-de-poste-teleconico',
        destination: '/fabricante-de-postes-teleconicos',
        permanent: true,
      },
      {
        source: '/fabricante-poste-teleconico',
        destination: '/fabricante-de-postes-teleconicos',
        permanent: true,
      },
      {
        source: '/poste-metalico-galvanizado',
        destination: '/produtos/poste-metalico-galvanizado',
        permanent: true,
      },
      {
        source: '/postes-metalicos-galvanizados',
        destination: '/produtos/poste-metalico-galvanizado',
        permanent: true,
      },
      {
        source: '/poste-de-aco-galvanizado',
        destination: '/produtos/poste-metalico-galvanizado',
        permanent: true,
      },
      {
        source: '/poste-galvanizado-para-iluminacao',
        destination: '/produtos/poste-metalico-galvanizado',
        permanent: true,
      },
      {
        source: '/poste-galvanizado-com-base',
        destination: '/produtos/poste-metalico-galvanizado',
        permanent: true,
      },
      {
        source: '/poste-curvo-simples',
        destination: '/produtos/poste-curvo-simples',
        permanent: true,
      },
      {
        source: '/postes-curvos-simples',
        destination: '/produtos/poste-curvo-simples',
        permanent: true,
      },
      {
        source: '/poste-teleconico-curvo-simples',
        destination: '/produtos/poste-curvo-simples',
        permanent: true,
      },
      {
        source: '/poste-curvo-simples-galvanizado',
        destination: '/produtos/poste-curvo-simples',
        permanent: true,
      },
      {
        source: '/poste-curvo-simples-com-base',
        destination: '/produtos/poste-curvo-simples',
        permanent: true,
      },
      {
        source: '/poste-curvo-simples-engastado',
        destination: '/produtos/poste-curvo-simples',
        permanent: true,
      },
      {
        source: '/poste-curvo-duplo',
        destination: '/produtos/poste-curvo-duplo',
        permanent: true,
      },
      {
        source: '/postes-curvos-duplos',
        destination: '/produtos/poste-curvo-duplo',
        permanent: true,
      },
      {
        source: '/poste-teleconico-curvo-duplo',
        destination: '/produtos/poste-curvo-duplo',
        permanent: true,
      },
      {
        source: '/poste-curvo-duplo-galvanizado',
        destination: '/produtos/poste-curvo-duplo',
        permanent: true,
      },
      {
        source: '/poste-curvo-duplo-com-base',
        destination: '/produtos/poste-curvo-duplo',
        permanent: true,
      },
      {
        source: '/poste-curvo-duplo-engastado',
        destination: '/produtos/poste-curvo-duplo',
        permanent: true,
      },
      {
        source: '/fabrica-postes-metalicos',
        destination: '/fabrica-de-postes-metalicos',
        permanent: true,
      },
      {
        source: '/fabricas-de-postes-metalicos',
        destination: '/fabrica-de-postes-metalicos',
        permanent: true,
      },
      {
        source: '/industria-de-postes-metalicos',
        destination: '/fabrica-de-postes-metalicos',
        permanent: true,
      },
      {
        source: '/postes-metalicos-direto-da-fabrica',
        destination: '/fabrica-de-postes-metalicos',
        permanent: true,
      },
      {
        source: '/fornecedor-postes-metalicos',
        destination: '/fornecedor-de-postes-metalicos',
        permanent: true,
      },
      {
        source: '/fornecedores-de-postes-metalicos',
        destination: '/fornecedor-de-postes-metalicos',
        permanent: true,
      },
      {
        source: '/comprar-poste-metalico',
        destination: '/fornecedor-de-postes-metalicos',
        permanent: true,
      },
      {
        source: '/poste-teleconico',
        destination: '/produtos/poste-teleconico',
        permanent: true,
      },
      {
        source: '/postes-teleconicos',
        destination: '/produtos/poste-teleconico',
        permanent: true,
      },
      {
        source: '/para-raio',
        destination: '/postes-metalicos',
        permanent: true,
      },
      {
        source: '/pergolado-de-ferro',
        destination: '/produtos/linha-orna',
        permanent: true,
      },
      // Consolidação de Categorias Legadas
      {
        source: '/produtos/postes',
        destination: '/postes-metalicos',
        permanent: true,
      },
      {
        source: '/produtos/postes-de-iluminacao',
        destination: '/postes-para-iluminacao-publica',
        permanent: true,
      },
      {
        source: '/produtos/postes-de-iluminacao-publica',
        destination: '/postes-para-iluminacao-publica',
        permanent: true,
      },
      {
        source: '/produtos/postes-teleconicos',
        destination: '/produtos/poste-teleconico',
        permanent: true,
      },
      {
        source: '/produtos/poste-teleconico-galvanizado',
        destination: '/produtos/poste-teleconico',
        permanent: true,
      },
      {
        source: '/produtos/poste-galvanizado',
        destination: '/produtos/poste-metalico-galvanizado',
        permanent: true,
      },
      {
        source: '/produtos/postes-metalicos-galvanizados',
        destination: '/produtos/poste-metalico-galvanizado',
        permanent: true,
      },
      {
        source: '/produtos/poste-curvo-simples-galvanizado',
        destination: '/produtos/poste-curvo-simples',
        permanent: true,
      },
      {
        source: '/produtos/poste-curvo-duplo-galvanizado',
        destination: '/produtos/poste-curvo-duplo',
        permanent: true,
      },
      {
        source: '/produtos/postes-decorativos',
        destination: '/produtos/linha-orna',
        permanent: true,
      },
      {
        source: '/produtos/acessorios',
        destination: '/produtos/linha-nexo',
        permanent: true,
      },
      {
        source: '/produtos/braco-para-luminaria',
        destination: '/produtos/braco-para-luminaria-publica',
        permanent: true,
      },
      {
        source: '/produtos/bracos-para-luminaria-publica',
        destination: '/produtos/braco-para-luminaria-publica',
        permanent: true,
      },
      // Categorias removidas
      {
        source: '/produtos/luminarias',
        destination: '/produtos',
        permanent: true,
      },
      {
        source: '/produtos/refletores',
        destination: '/produtos',
        permanent: true,
      },
      {
        source: '/produtos/materiais-eletricos',
        destination: '/produtos',
        permanent: true,
      },

      // Blog (Mapeia posts da raiz para /blog/)

      {
        source: '/category/blog',
        destination: '/blog',
        permanent: true,
      },
      // Posts do Blog que estavam na raiz
      ...[
        'melhor-cor-luz-dormir', 'como-instalar-refletor', 'como-dimensionar-disjuntor',
        'como-instalar-disjuntor', 'ligar-refletor-led-3-fios', 'consertar-refletor-led',
        'como-emendar-fio', 'como-colocar-luz-no-jardim', 'como-esconder-parede',
        'ligar-boia-disjuntor', 'como-identificar-fios', 'como-calcular-necessaria',
        'bitola-fio-torneira', 'disjuntor-ar-condicionado', 'dimensionar-luz-jardim',
        'instalar-fotocelula-refletor', 'melhor-fio-instalacao-residencial', 'como-funciona-solar-jardim',
        'melhor-fio-cerca-eletrica', 'melhor-iluminacao-jardim-inverno', 'qual-disjuntor-chuveiro',
        'ligar-trava-cinco', 'como-acende', 'como-funciona-o-poste-de-luz',
        'como-fazer-caseiro', 'como-apagar-com-laser', 'como-conseguir-gratuito',
        'como-mudar-de-lugar', 'como-fazer-maquete', 'como-instalar-poste',
        'como-instalar-interruptor', 'como-instalar-bocal', 'como-fazer-varal',
        'como-funciona-lampada', 'como-trocar-dicroica', 'como-ligar-fotocelula',
        'como-trocar-spot', 'como-descartar', 'como-ligar-em-paralelo',
        'como-instalar-sensor-presenca', 'como-consertar-queimada', 'como-instalar-led-teto',
        'como-trocar-tubular', 'onde-fica-sensor-poste', 'tendencias-iluminacao-externa-brasil',
        'led-ou-fluorescente', 'tipos-lampadas-led', 'economia-energia-sensores'
      ].map(slug => ({
        source: `/${slug}`,
        destination: `/blog/${slug}`,
        permanent: true,
      })),
      // Downloads / Ebooks
      {
        source: '/ebooks',
        destination: '/downloads',
        permanent: true,
      }
    ]
  }
};

export default withPayload(nextConfig);
