import { NextFunction, Request, Response } from "express";

export const useAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
};
