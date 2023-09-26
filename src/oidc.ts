import { Express } from "express";
import { Issuer, Strategy, StrategyVerifyCallback } from "openid-client";
import passport from "passport";
import { config } from "./config";

export const initOidcClient = async (app: Express) => {
  const issuer = await Issuer.discover(config.OIDC_ISSUER_URL);

  const oidcClient = new issuer.Client({
    client_id: config.OIDC_CLIENT_ID,
    client_secret: config.OIDC_CLIENT_SECRET,
    redirect_uris: [`${config.BASE_URL}/auth/callback`],
    response_types: ["code"],
  });

  const verifyCallback: StrategyVerifyCallback<unknown> = (tokenSet, done) => {
    return done(null, tokenSet.claims());
  };

  passport.use("oidc", new Strategy({ client: oidcClient }, verifyCallback));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/login", (req, res, next) => {
    passport.authenticate("oidc")(req, res, next);
  });

  app.get("/auth/callback", (req, res, next) => {
    passport.authenticate("oidc", {
      successRedirect: "/",
      failureRedirect: "/error",
    })(req, res, next);
  });

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    // @ts-ignore
    done(null, user);
  });
};
