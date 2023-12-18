/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  outputFileTracing: true,
  optimizeFonts: true,

  experimental: {
    optimizeCss: true
  },

}

module.exports = nextConfig
