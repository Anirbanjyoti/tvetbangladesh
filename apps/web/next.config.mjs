/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@tvet/types", "@tvet/logger"],
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
