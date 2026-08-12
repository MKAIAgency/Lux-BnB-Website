/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/luxbnb",
  typescript: {
    ignoreBuildErrors: false,
  },
  async headers() {
    return [{
      source: "/luxbnb/luxbnb-hero.mp4",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    }, {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Strict-Transport-Security", value: "max-age=63072000" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }]
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
