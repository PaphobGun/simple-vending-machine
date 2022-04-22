/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['backend.tops.co.th', 'www.royalthaimint.net', 'www.bot.or.th'],
  },
  experimental: {
    outputStandalone: true,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
