/** @type {import('next').NextConfig} */
const nextConfig = {

 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'grocery-strapi-lhum.onrender.com',
        pathname: '/uploads/**',
      },
    ],
  },


  reactCompiler: true,
};

export default nextConfig;
