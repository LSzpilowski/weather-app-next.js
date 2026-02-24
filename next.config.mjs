/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shecodes-assets.ams3.cdn.digitaloceanspaces.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shecodes.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

