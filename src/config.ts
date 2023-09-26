import z from "zod";
import dotenv from "dotenv";
dotenv.config();

const conf = z
  .object({
    SESSION_SECRET: z.string(),
    BASE_URL: z.string(),
    OIDC_ISSUER_URL: z.string(),
    OIDC_CLIENT_ID: z.string(),
    OIDC_CLIENT_SECRET: z.string(),
    TELEGRAM_BOT_TOKEN: z.string(),
    TELEGRAM_CHAT_ID: z.preprocess((val) => Number(val), z.number()),
  })
  .parse(process.env);

export const config = conf;
