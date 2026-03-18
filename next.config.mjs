/** @type {import('next').NextConfig} */
const nextConfig = {

 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'grocery-n-strapi-production.up.railway.app',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'useful-birthday-447da4b4ae.strapiapp.com',
        pathname: '/uploads/**',
      },
    ],
  },


  reactCompiler: true,
};

export default nextConfig;
