import type { NextConfig } from "next";
// import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/sobre',
        destination: '/quem-somos',
        permanent: true, // 301 redirect
      },
      {
        source: '/produtos/postes-de-iluminacao',
        destination: '/produtos/poste-metalico',
        permanent: true,
      },
      {
        source: '/iluminacao',
        destination: '/produtos', // Jogando quem vem do link genérico da campanha para o catálogo
        permanent: true,
      }
    ]
  }
};

export default nextConfig; // withPayload(nextConfig);
