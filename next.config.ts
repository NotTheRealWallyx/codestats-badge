import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/api/code-stats",
      },
    ],
  },
};

export default nextConfig;
