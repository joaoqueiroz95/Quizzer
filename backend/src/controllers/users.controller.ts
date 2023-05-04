import { NextFunction, Request, Response } from "express";
import * as usersService from "../services/users.service";
import httpStatusCodes from "http-status-codes";

export const createOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let user;
  try {
    user = await usersService.createOne(req.body);
  } catch (err) {
    return next(err);
  }
  res.status(httpStatusCodes.CREATED).json({ data: user });
};
