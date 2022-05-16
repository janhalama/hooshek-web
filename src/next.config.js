/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  distDir: "../.next",
  reactStrictMode: true,
};

module.exports = nextConfig;
