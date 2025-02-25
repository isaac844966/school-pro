import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    // NEXT_PUBLIC_API_URL: "https://schoolbase-api.netlify.app/api/v1",
    // "https://schooolbase-api-production.up.railway.app/api/v1",
    NEXT_PUBLIC_API_URL: "http://localhost:8000/api/v1",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "***",
      },
    ],
  },
};

export default nextConfig;
