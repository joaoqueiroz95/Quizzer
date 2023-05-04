import bcrypt from "bcrypt";
import prisma from "../../prisma/prisma-client";
import httpStatusCodes from "http-status-codes";
import { HttpException } from "../helpers/exception";
import { ICreateUserBody } from "../types/user";

export const createOne = async ({ email, password }: ICreateUserBody) => {
  const numValidUsers = await prisma.user.count({
    where: {
      email,
    },
  });

  if (numValidUsers > 0) {
    throw new HttpException(
      httpStatusCodes.CONFLICT,
      "Username is already taken"
    );
  }

  const salt = await bcrypt.genSalt(10);
  const passwordCrypto = await bcrypt.hash(password, salt);

  return prisma.user.create({
    data: {
      email,
      password: passwordCrypto,
    },
    select: {
      id: true,
      email: true,
    },
  });
};
