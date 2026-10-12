# Chainwrit web

Landing page and live demo for [Chainwrit](https://github.com/chainwrit/core): spending limits for AI agents, enforced by Solana.

Live: https://chainwrit.com

The product dashboard (wallet connect, create and manage mandates) lives in [chainwrit/app](https://github.com/chainwrit/app): https://chainwrit.com/app

- `/` landing page
- `/demo` live mandate state from devnet, plus a scripted agent that buys a report through an x402-style 402 flow, then obeys a hidden instruction to pay an attacker and is rejected on-chain
- `/gpu-prices` the article with the hidden prompt injection
- `/api/merchant/report` the x402-style paid endpoint. It follows the HTTP 402 pattern but is not a spec-compliant x402 facilitator
- `/api/agent/run` the scripted (non-LLM) agent, streamed as NDJSON

The Solana program, the [`@chainwrit/sdk`](https://www.npmjs.com/package/@chainwrit/sdk) client and the MCP server live in [chainwrit/core](https://github.com/chainwrit/core).

## Run locally

```bash
cp .env.example .env.local   # fill in devnet addresses from deployments/devnet.json
yarn install
yarn dev
```

`AGENT_SECRET_KEY` is a base58 devnet-only key for the demo agent. `ACCEPTED_MANDATES` (optional, comma-separated) lists the mandates whose payments the merchant endpoint accepts; it defaults to `MANDATE`. The token is `dUSDC`, a devnet test mint with no value.

Demo limitations: replay protection and the per-visitor cooldown are in memory, so they reset on cold start and are not shared between instances. The mandate's own 24-hour cap bounds what the public demo can spend.

## License

Apache-2.0
