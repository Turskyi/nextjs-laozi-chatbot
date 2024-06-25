/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'play.google.com' }],
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
