import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/pdf',
        destination: 'https://wheat-coyote-359937.hostingersite.com/',
        eslint: {
          ignoreDuringBuilds: true,
        },
      },
    ];
  },

};

export default nextConfig;
