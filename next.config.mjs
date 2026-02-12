/** @type {import('next').NextConfig} */
const nextConfig = {

 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'grocery-n-strapi-production.up.railway.app',
        pathname: '/uploads/**',
      },
    ],
  },


  reactCompiler: true,
};

export default nextConfig;
