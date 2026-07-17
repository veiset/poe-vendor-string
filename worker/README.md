# PoE Trade API Proxy - Cloudflare Worker

This Cloudflare Worker proxies requests to the Path of Exile Trade API, bypassing CORS restrictions for the poe-vendor-string web application.

## Setup

### 1. Install Wrangler CLI

```bash
npm install -g wrangler
```

### 2. Login to Cloudflare

```bash
wrangler login
```

This will open a browser window to authenticate with your Cloudflare account.

### 3. Install Dependencies

```bash
cd worker
npm install
```

### 4. Deploy the Worker

```bash
npm run deploy
```

After deployment, you'll see output like:
```
Published poe-trade-proxy (1.0.0)
  https://poe-trade-proxy.YOUR_SUBDOMAIN.workers.dev
```

### 5. Update the Frontend

Copy your worker URL and update the frontend configuration. Create a `.env` file in the project root:

```bash
# .env
REACT_APP_TRADE_PROXY_URL=https://poe-trade-proxy.YOUR_SUBDOMAIN.workers.dev
```

Or update the fallback URL directly in `src/utils/TradeUrlBuilder.ts`:

```typescript
const WORKER_URL = "https://poe-trade-proxy.YOUR_SUBDOMAIN.workers.dev";
```

## Development

Run the worker locally for testing:

```bash
npm run dev
```

This starts a local server at `http://localhost:8787`.

## API Endpoints

### POST /search

Create a trade search and get the search ID.

**Request:**
```json
{
  "league": "Standard",
  "query": {
    "query": {
      "status": { "option": "available" },
      "filters": {
        "map_filters": {
          "filters": {
            "map_iiq": { "min": 80 }
          }
        }
      }
    },
    "sort": { "price": "asc" }
  }
}
```

**Response:**
```json
{
  "id": "nrJaVqGVC0",
  "total": 150,
  "url": "https://www.pathofexile.com/trade/search/Standard/nrJaVqGVC0"
}
```

### GET /leagues

Get available trade leagues.

**Response:**
```json
{
  "result": [
    { "id": "Standard", "realm": "pc", "text": "Standard" },
    { "id": "Mirage", "realm": "pc", "text": "Mirage" }
  ]
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "service": "poe-trade-proxy"
}
```

## Configuration

Edit `wrangler.toml` to customize:

- `name`: Worker name (affects the subdomain)
- `ALLOWED_ORIGIN`: CORS allowed origin (default: `https://poe.re`)

## Rate Limiting

The worker respects PoE API rate limits. If rate limited, it returns:

```json
{
  "error": "Rate limited by PoE API",
  "retryAfter": 60
}
```
