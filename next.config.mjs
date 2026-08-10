/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/luxbnb",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
