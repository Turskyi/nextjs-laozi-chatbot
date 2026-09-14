/** @type {import('next').NextConfig} */
console.log('Build Runtime Node Version:', process.version);
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
