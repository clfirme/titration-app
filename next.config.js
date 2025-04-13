/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Garante que as imagens funcionem corretamente
  images: {
    domains: [],
    unoptimized: false,
  },
  
  // Se você quiser fazer uma exportação estática (necessário para Capacitor)
  // output: 'export',  // Descomente esta linha quando for exportar para Capacitor
  
  // Se você estiver usando i18n
  i18n: {
    locales: ['pt-BR', 'en-US'],
    defaultLocale: 'pt-BR',
  },
  
  // Otimizações de webpack
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
