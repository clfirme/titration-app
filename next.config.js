/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Disable server components for simplicity in this application
  // since we're heavily using client-side state and calculations
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
