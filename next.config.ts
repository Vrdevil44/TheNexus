import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/TheNexus",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
