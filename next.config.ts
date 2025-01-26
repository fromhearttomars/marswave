import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // basePath: '/marswave',
  // assetPrefix: '/marswave/',
  // trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
