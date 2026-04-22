import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/sobre',
        destination: '/quem-somos',
        permanent: true,
      },
      {
        source: '/pintura-eletrostatica',
        destination: '/servicos',
        permanent: true,
      },
      {
        source: '/mastro',
        destination: '/produtos/mastros-para-bandeiras',
        permanent: true,
      },
      {
        source: '/iluminacao',
        destination: '/lp/postes-metalicos',
        permanent: true,
      },
      {
        source: '/para-raio',
        destination: '/produtos/poste-metalico',
        permanent: true,
      },
      {
        source: '/pergolado-de-ferro',
        destination: '/produtos/linha-garden',
        permanent: true,
      },
      {
        source: '/produtos/postes',
        destination: '/produtos/poste-metalico',
        permanent: true,
      },
      {
        source: '/produtos/postes-de-iluminacao',
        destination: '/produtos/poste-metalico',
        permanent: true,
      },
      {
        source: '/produtos/postes-decorativos',
        destination: '/produtos/poste-metalico/decorativo',
        permanent: true,
      },
      {
        source: '/produtos/acessorios',
        destination: '/produtos/poste-metalico/acessorios',
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
      // SEO Local
      {
        source: '/regioes-atendidas/cidades',
        destination: '/regioes-atendidas/cidades', // Garante loop que seria tratado via middleware, ou mantém para match estrito
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
