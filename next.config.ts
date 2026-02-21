/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "image.url",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "www.tbsnews.net",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/auth/:path*",
          destination: `${process.env.NEXT_PUBLIC_AUTH_URL}/:path*`,
        },
      ],
      afterFiles: [
        {
          source: "/api/:path*",
          destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;

