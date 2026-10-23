import type { NextConfig } from "next";

// Old service URLs (now moved to the separate services site) must not 404 for people or Google.
const servicesUrl = (process.env.NEXT_PUBLIC_SERVICES_URL ?? "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/services", destination: servicesUrl ? `${servicesUrl}/services` : "/", permanent: false },
      { source: "/services/:path*", destination: servicesUrl ? `${servicesUrl}/services/:path*` : "/", permanent: false },
    ];
  },
  images: { formats: ["image/avif", "image/webp"] },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
