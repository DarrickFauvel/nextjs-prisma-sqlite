import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'stunning-engine-w4979444jv6hx95-3000.app.github.dev'],
    },
  },
};

export default nextConfig;

