# oidc-telegram

Make a Telegram channel joinable using OIDC authentication!

When navigating to the root of the application, the app will first make sure that the user is authenticated as per the OIDC configuration. Then, it will generate an unique Telegram channel invite link (that is usable once and expires in 1 hour), to which it will automatically redirect the user.

## Environment Configuration

The application expects the following environment variables:

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