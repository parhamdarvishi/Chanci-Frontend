import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ngnimages.s3.eu-west-2.amazonaws.com',
        port: '',
        pathname: '/WebsiteImages/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
