import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/pdf',
        destination: 'https://wheat-coyote-359937.hostingersite.com/',
      },
      {
        source: '/api/:path*',
        destination: 'https://learning-app-api-9udj.onrender.com/api/:path*',
      },
    ];
  },

};

export default nextConfig;
