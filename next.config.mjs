/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://globosoft.co.uk/ecommerce-api/api/:path*",
      },
    ];
  },
};

export default nextConfig;
