/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  outputFileTracing: true,
  optimizeFonts: true,

  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },

}

module.exports = nextConfig
