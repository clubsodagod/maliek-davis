import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  publicRuntimeConfig: {
    APP_NAME: "Pearl Box",
    API_DEVELOPMENT: "http://localhost:7070/api",
    API_PRODUCTION: "https://pearlbox.co/api",
    PRODUCTION: false,
    DOMAIN_DEVELOPMENT: "http://localhost:3000",
    DOMAIN_PRODUCTION: "https://pearlbox.co",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "cdn.refersion.com",
      },
      {
        protocol: "https",
        hostname: "res-console.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },
};

export default nextConfig;
