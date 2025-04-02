import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/pdf',
        destination: 'https://wheat-coyote-359937.hostingersite.com/',
      },
    ];
  },

};

export default nextConfig;
