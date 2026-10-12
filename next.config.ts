import type { NextConfig } from "next";

const config: NextConfig = {
  // Anchor and web3.js pull in node-only modules; keep them out of the bundle.
  serverExternalPackages: ["@coral-xyz/anchor", "@chainwrit/sdk"],
  // The injection article used to live at /poisoned; keep old links working.
  async redirects() {
    return [{ source: "/poisoned", destination: "/gpu-prices", permanent: true }];
  },
};

export default config;
