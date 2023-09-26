import express from "express";
import session from "express-session";
import { config } from "./config";
import { initOidcClient } from "./oidc";
import { router } from "./router";
import memorystore from "memorystore";
import retry from "async-retry";

const app = express();
const MemoryStore = memorystore(session);

// Initialize session storage
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // NOTE: Would be safer to use a storage that is not
    // in-memory..
    store: new MemoryStore({
      checkPeriod: 60 * 1000 * 60, // prune expired entries every hour
    }),
    cookie: {
      // 10 minutes in ms
      maxAge: 60 * 1000 * 10,
    },
  })
);

(async () => {
  // Initialize OIDC authentication
  await retry(
    async (bail, attempt) => {
      console.log(
        `Trying to initialize OIDC client... attempt ${attempt}/${10}`
      );
      await initOidcClient(app);
      console.log("OIDC client initialized successfully!");
      return true;
    },
    {
      retries: 10,
      maxTimeout: 10000,
    }
  );

  // Set routes
  app.use(router);

  app.listen(8000, () => {
    console.log("Listening at 8000");
  });
})();

// A bit of a hack to get session typings correctly
declare module "express-session" {
  interface SessionData {
    telegramJoinLink: string | undefined;
  }
}
