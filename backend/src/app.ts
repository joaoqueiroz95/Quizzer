import express, { Request, Response, NextFunction } from "express";
import routes from "./routes";
import cors from "cors";
import bodyParser from "body-parser";
import httpStatusCodes from "http-status-codes";

import dotenv from "dotenv";
import { HttpException } from "./helpers/exception";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.use(
  (
    err: Error | HttpException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err.name === "HttpException" && "errorCode" in err) {
      return res.status(err.errorCode).json({ message: err.message });
    }

    if (!(err instanceof Error)) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .json({ message: "Unknown Error" });
    }

    return res
      .status(httpStatusCodes.BAD_REQUEST)
      .json({ message: err.message });
  }
);

export default app;
