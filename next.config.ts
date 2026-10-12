import type { NextConfig } from "next";

const APP_ORIGIN = "https://chainwrit-app.vercel.app";

const config: NextConfig = {
  // Anchor and web3.js pull in node-only modules; keep them out of the bundle.
  serverExternalPackages: ["@coral-xyz/anchor", "@chainwrit/sdk"],
  // The injection article used to live at /poisoned; keep old links working.
  async redirects() {
    return [
      { source: "/poisoned", destination: "/gpu-prices", permanent: true },
      { source: "/:path*", has: [{ type: "host", value: "www.chainwrit.com" }], destination: "https://chainwrit.com/:path*", permanent: true },
    ];
  },
  // chainwrit.com/app is the dashboard, a separate Vercel project built with basePath "/app".
  // beforeFiles so the dashboard's own router requests (RSC) for /app are proxied too.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/app", destination: `${APP_ORIGIN}/app` },
        { source: "/app/:path*", destination: `${APP_ORIGIN}/app/:path*` },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default config;
