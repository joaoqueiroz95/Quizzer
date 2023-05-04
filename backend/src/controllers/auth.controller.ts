import httpStatusCodes from "http-status-codes";
import { NextFunction, Request, Response, Router } from "express";
import { getTokens } from "../services/auth.service";

const router = Router();

// Login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  let tokens;
  try {
    tokens = await getTokens(email, password);
  } catch (err) {
    return next(err);
  }

  res.status(httpStatusCodes.OK).json({ data: tokens });
};

export default router;
