import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.PORTFOLIO_LOCALE === "es" ? ".next-es" : ".next",
  async redirects() {
    return [{ source: "/", destination: "/capcut", permanent: false }];
  },
};

export default nextConfig;
