import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/offline-first-blog",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
