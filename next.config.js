/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['127.0.0.1'], // Eğer sunucunuzun IP adresi yerine bir alan adı varsa, buraya ekleyin
  },
  

}

module.exports = nextConfig
