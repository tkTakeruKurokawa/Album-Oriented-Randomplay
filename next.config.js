/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    turbo: true,
  },
  // App Routerを使用するための設定
  appDir: true,
};

module.exports = nextConfig;