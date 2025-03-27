/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5328/api/:path*'
            : 'https://www.rhubarb.fyi/api/:path*',
      },
    ]
  },
  images: {
    domains: ['www.themealdb.com', 'www.thecocktaildb.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig