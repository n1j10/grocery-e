/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: [
      "127.0.0.1"

    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },

  reactCompiler: true,
};

export default nextConfig;
