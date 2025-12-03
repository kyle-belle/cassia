import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/cassia",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
