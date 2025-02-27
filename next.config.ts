/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // This ensures types are properly resolved
  // webpack: (config, { isServer }) => {
  //   config.resolve.fallback = {
  //     ...config.resolve.fallback,
  //     fs: false,
  //   };

  //   return config;
  // },
};

module.exports = nextConfig;