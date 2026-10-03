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
  async headers() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
      {
        source: '/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
      {
        source: '/.well-known/assetlinks.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
