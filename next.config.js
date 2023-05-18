/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: {
      ssr: true
    }
  },
  swcMinify: true,
  images: {
    domains: ["img.pokemondb.net"]
  }
};

module.exports = nextConfig;
