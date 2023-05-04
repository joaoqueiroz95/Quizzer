import * as yup from "yup";
import httpStatusCodes from "http-status-codes";
import { Request, Response, NextFunction } from "express";

export const validateForm = (schema: yup.AnySchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (err: yup.ValidationError | unknown) {
      if (!(err instanceof yup.ValidationError)) {
        throw err;
      }

      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ message: err.errors[0] });
    }
  };
};
