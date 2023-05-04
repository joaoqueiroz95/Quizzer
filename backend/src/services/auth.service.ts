import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/prisma-client";
import { HttpException } from "../helpers/exception";
import httpStatusCodes from "http-status-codes";

dotenv.config();

export const getTokens = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new HttpException(
      httpStatusCodes.UNAUTHORIZED,
      "Invalid username or password"
    );
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new HttpException(
      httpStatusCodes.UNAUTHORIZED,
      "Invalid username or password"
    );
  }

  const accessToken = jwt.sign(
    { email },
    process.env.ACCESS_TOKEN_SECRET_KEY as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION as string }
  );

  const { password: userPass, ...userWithoutPassword } = user;

  return { accessToken, user: userWithoutPassword };
};
