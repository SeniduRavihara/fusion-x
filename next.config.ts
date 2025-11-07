import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow using external images (Unsplash) with next/image
  images: {
    domains: ["images.unsplash.com"],
    // If you prefer more flexible matching, you can use remotePatterns instead:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'images.unsplash.com',
    //   },
    // ],
  },
};

export default nextConfig;
