import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["@react-pdf/renderer"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      // Auth lives on the product app
      {
        source: "/register",
        destination: "https://app.dodoxhq.com/register",
        permanent: true,
      },
      {
        source: "/login",
        destination: "https://app.dodoxhq.com/login",
        permanent: true,
      },
      // Canonical offer URL rename (preserve equity + bookmarks)
      {
        source: "/audit",
        destination: "/aeo-audit",
        permanent: true,
      },
      {
        source: "/audit/success",
        destination: "/aeo-audit/success",
        permanent: true,
      },
      {
        source: "/audit/opengraph-image",
        destination: "/aeo-audit/opengraph-image",
        permanent: true,
      },
      {
        source: "/audit/twitter-image",
        destination: "/aeo-audit/twitter-image",
        permanent: true,
      },
      // Synonym vanity URLs → one canonical (avoid duplicate-intent doorways)
      {
        source: "/geo-audit",
        destination: "/aeo-audit",
        permanent: true,
      },
      {
        source: "/aiseo-audit",
        destination: "/aeo-audit",
        permanent: true,
      },
      {
        source: "/ai-seo-audit",
        destination: "/aeo-audit",
        permanent: true,
      },
      {
        source: "/llm-seo-audit",
        destination: "/aeo-audit",
        permanent: true,
      },
      {
        source: "/generative-engine-optimization-audit",
        destination: "/aeo-audit",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/blog/:slug.md",
        destination: "/api/blog/:slug/markdown",
      },
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/.well-known/agent-skills/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
      {
        source: "/.well-known/agent-skills/index.json",
        headers: [
          { key: "Content-Type", value: "application/json; charset=utf-8" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
      {
        source: "/.well-known/agent-skills/:skill/SKILL.md",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
      {
        source: "/blog/:slug.md",
        headers: [
          { key: "Content-Type", value: "text/markdown; charset=utf-8" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
      {
        source: "/rss.xml",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
      {
        source: "/llms-full.txt",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
