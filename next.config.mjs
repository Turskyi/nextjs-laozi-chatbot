/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: 'play.google.com' },
      { hostname: 'tools.applemediaservices.com' },
    ],
  },
};

export default nextConfig;
