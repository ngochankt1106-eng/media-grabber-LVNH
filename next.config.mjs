/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.tiktokcdn.com" },
      { protocol: "https", hostname: "**.muscdn.com" },
      { protocol: "https", hostname: "**.tiktok.com" },
      { protocol: "https", hostname: "**.tikwm.com" },
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "**.twimg.com" },
      { protocol: "https", hostname: "**.pinimg.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // Ensure serverless API routes have longer execution time on Vercel
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;
