# Economy fetcher

Scheduled Cloudflare Worker that gets every PoE1 league from the Trade API and
writes poe.ninja Expedition, beast, tattoo, runegraft, and scarab data to the
`poe-economy` R2 bucket. Each object key includes its league, preventing one
league refresh from replacing another.

The hourly schedule and R2 binding are configured in `wrangler.toml`.

```bash
cd workers/economy-fetcher
npm install
npm run deploy
```
