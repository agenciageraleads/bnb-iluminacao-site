import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
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
      // Blog (Mapeia posts da raiz para /blog/)
      {
        source: '/category/blog',
        destination: '/blog',
        permanent: true,
      }
    ]
  }
};

export default withPayload(nextConfig);
