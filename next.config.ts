import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/analytics',
        permanent: true, // or false if temporary
      },
    ];
  },
};

export default nextConfig;
