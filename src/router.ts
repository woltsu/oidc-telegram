import { Router } from "express";
import { useAuthentication } from "./middleware";
import { getUniqueJoinLink } from "./telegram";

export const router = Router();

router.get("/error", (req, res) => {
  res.send("Error, please contact administrators");
});

router.get("/", useAuthentication, async (req, res) => {
  try {
    const telegramJoinLink =
      req.session.telegramJoinLink ?? (await getUniqueJoinLink());

    // Store join link in session to avoid spamming multiple join links
    req.session.telegramJoinLink = telegramJoinLink;
    res.redirect(telegramJoinLink);
  } catch (e: unknown) {
    console.error(e);
    res.redirect("/error");
  }
});

router.get("*", (req, res) => {
  res.redirect("/");
});
