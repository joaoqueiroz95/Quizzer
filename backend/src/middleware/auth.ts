import httpStatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.get("authorization");

    if (!token) {
      return res
        .status(httpStatusCodes.UNAUTHORIZED)
        .json({ message: "Token not found" });
    }
    token = token.split(" ")[1];

    const decoded = <{ email: string }>(
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY as string)
    );

    res.locals.email = decoded.email;
    next();
  } catch (error) {
    if (!(error instanceof Error)) {
      throw error;
    }

    return res
      .status(httpStatusCodes.UNAUTHORIZED)
      .json({ message: error.message });
  }
};
