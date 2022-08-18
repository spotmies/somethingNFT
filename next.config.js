/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
module.exports = {
  images: {
    loader: "akamai",
    path: "",
  },
  nextConfig,
  trailingSlash: true,
};
// module.exports = nextConfig
