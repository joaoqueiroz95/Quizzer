import prisma from "../../prisma/prisma-client";
import { generateRandomString } from "../helpers";
import { HttpException } from "../helpers/exception";
import httpStatusCodes from "http-status-codes";

export const generateRandomUniqueId = async (N: number) => {
  let randomId;
  let isIdUnique = false;
  let numTries = 0;
  while (!isIdUnique) {
    randomId = generateRandomString(N);

    const cnt = await prisma.quiz.count({
      where: {
        urlId: randomId,
      },
    });

    isIdUnique = cnt === 0;
    numTries += 1;

    if (numTries >= 100) {
      throw new HttpException(
        httpStatusCodes.REQUEST_TIMEOUT,
        "Too many tries generating unique quiz URL"
      );
    }
  }

  return randomId;
};
