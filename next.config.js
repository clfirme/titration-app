/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Output as a static website for better compatibility with Capacitor
  output: 'export',
  
  // Configure asset prefix for mobile app
  assetPrefix: '.',
  
  // Disable image optimization since we're building for mobile
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
