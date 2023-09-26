# oidc-telegram

Make a Telegram channel joinable via OIDC authentication!

## Environment Configuration

The application expects the following environmental variables:

- `SESSION_SECRET`, some long random string for securing session token
- `BASE_URL`, the base url where the app is running
- `OIDC_ISSUER_URL`
- `OIDC_CLIENT_ID`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

See `.env.example` for an example.

## Running in Docker

```bash
npm run build:docker
```

## Development

Install dependencies:

```bash
pnpm install
```

Start keycloak:

```bash
docker compose up
```

Start dev mode:

```bash
npm start
```