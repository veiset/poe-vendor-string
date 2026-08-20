# League fetcher

Cloudflare Worker proxy for the PoE1 and PoE2 Trade league endpoints. It serves
`GET /leagues` and `GET /poe2/leagues` with the CORS policy configured in
`wrangler.toml`.

```bash
cd workers/league-fetcher
npm install
npm run deploy
```

Set `VITE_TRADE_PROXY_URL` to this Worker's deployed URL when it differs from
the frontend default.
