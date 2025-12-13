import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
        {
          hostname: 'images.unsplash.com',
        },
        {
          hostname: 'unsplash.com',
        },
        {
          hostname: "zswgsuhfdnitcmeuqhgw.supabase.co",
        }
      ]
    }
};

export default nextConfig;
