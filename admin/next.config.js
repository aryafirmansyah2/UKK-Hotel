/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/beranda',
        destination: '/login',
        permanent: true,
      },
    ]
  },

}


module.exports = nextConfig
