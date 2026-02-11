/** @type {import('next').NextConfig} */
const nextConfig = {

 images: {
     domains: [
      "grocery-strapi-lhum.onrender.com"

    ],
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
