import { Prisma } from "@prisma/client";
import prisma from "../../prisma/prisma-client";
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "../constants";
import { HttpException } from "../helpers/exception";
import httpStatusCodes from "http-status-codes";
import {
  ICreateQuizBody,
  IEditQuizBody,
  IGetAllQuizzesQuery,
} from "../types/quiz";
import { generateRandomUniqueId } from "../helpers/quiz";

export const getMany = async (
  loggedUserEmail: string,
  { limit, page, search }: IGetAllQuizzesQuery
) => {
  const mainQuery: Prisma.QuizFindManyArgs = {
    select: {
      id: true,
      name: true,
      description: true,
      urlId: true,
      isOnline: true,
      createdAt: true,
    },
    where: {
      user: {
        email: loggedUserEmail,
      },
    },
  };

  mainQuery.take = limit
    ? Math.max(0, Math.min(parseInt(limit), MAX_PAGE_SIZE))
    : DEFAULT_PAGE_SIZE;
  if (page) mainQuery.skip = Math.max(0, parseInt(page)) * mainQuery.take;

  if (search)
    //@ts-ignore
    mainQuery.where.name = {
      contains: search,
      mode: "insensitive",
    };

  return {
    quizzes: await prisma.quiz.findMany(mainQuery),
    total: await prisma.quiz.count({ where: mainQuery.where }),
  };
};

export const getOne = async (quizId: string, loggedUserEmail: string) => {
  const numQuizzes = await prisma.quiz.count({
    where: {
      id: quizId,
      user: {
        email: loggedUserEmail,
      },
    },
  });

  if (numQuizzes !== 1) {
    throw new HttpException(
      httpStatusCodes.NOT_FOUND,
      "Quiz does not exist or logged user cannot access it"
    );
  }

  let mainQuery: Prisma.QuizFindFirstArgs = {
    select: {
      id: true,
      name: true,
      description: true,
      urlId: true,
      isOnline: true,
      createdAt: true,
      questions: {
        select: {
          id: true,
          questionText: true,
          type: true,
          options: {
            select: {
              id: true,
              value: true,
              isCorrect: true,
            },
          },
        },
      },
    },
    where: {
      user: {
        email: loggedUserEmail,
      },
      id: quizId,
    },
  };

  return prisma.quiz.findFirst(mainQuery);
};

export const getOnePublic = async (quizUrl: string) => {
  const numQuizzes = await prisma.quiz.count({
    where: {
      urlId: quizUrl,
    },
  });

  if (numQuizzes !== 1) {
    throw new HttpException(httpStatusCodes.NOT_FOUND, "Quiz does not exist");
  }

  let mainQuery: Prisma.QuizFindFirstArgs = {
    select: {
      name: true,
      description: true,
      createdAt: true,
      questions: {
        select: {
          id: true,
          questionText: true,
          type: true,
          options: {
            select: {
              id: true,
              value: true,
              isCorrect: true,
            },
          },
        },
      },
    },
    where: {
      isOnline: true,
      urlId: quizUrl,
    },
  };

  return prisma.quiz.findFirst(mainQuery);
};

export const createOne = async (
  { name, description, questions }: ICreateQuizBody,
  loggedUserEmail: string
) => {
  let query: Prisma.QuizCreateArgs = {
    data: {
      name,
      description,
      questions: {
        create: questions.map((question) => ({
          questionText: question.questionText,
          type: question.type,
          options: {
            createMany: {
              data: question.options.map((option) => ({
                value: option.value,
                isCorrect: option.isCorrect,
              })),
            },
          },
        })),
      },
      user: {
        connect: {
          email: loggedUserEmail,
        },
      },
    },
  };

  return prisma.quiz.create(query);
};

export const editOne = async (
  quizId: string,
  { name, description, questions }: IEditQuizBody,
  loggedUserEmail: string
) => {
  const quiz = await prisma.quiz.findFirst({
    where: {
      id: quizId,
      user: {
        email: loggedUserEmail,
      },
    },
    select: {
      isOnline: true,
    },
  });

  if (!quiz) {
    throw new HttpException(
      httpStatusCodes.NOT_FOUND,
      "Quiz does not exist or logged user cannot access it"
    );
  }

  if (quiz.isOnline) {
    throw new HttpException(
      httpStatusCodes.BAD_REQUEST,
      "Cannot edit a published quiz"
    );
  }

  const editedQuiz = await prisma.$transaction([
    prisma.quiz.delete({
      where: {
        id: quizId,
      },
    }),
    prisma.quiz.create({
      data: {
        id: quizId,
        name,
        description,
        questions: {
          create: questions.map((question) => ({
            ...(question.id && { id: question.id }),
            questionText: question.questionText,
            type: question.type,
            options: {
              createMany: {
                data: question.options.map((option) => ({
                  ...(option.id && { id: option.id }),
                  value: option.value,
                  isCorrect: option.isCorrect,
                })),
              },
            },
          })),
        },
        user: {
          connect: {
            email: loggedUserEmail,
          },
        },
      },
    }),
  ]);

  return editedQuiz[1];
};

export const publish = async (quizId: string, loggedUserEmail: string) => {
  const quiz = await prisma.quiz.findFirst({
    where: {
      id: quizId,
      user: {
        email: loggedUserEmail,
      },
    },
  });

  if (!quiz) {
    throw new HttpException(
      httpStatusCodes.NOT_FOUND,
      "Quiz does not exist or logged user cannot access it"
    );
  }

  if (quiz.isOnline) {
    throw new HttpException(
      httpStatusCodes.BAD_REQUEST,
      "Quiz is already published"
    );
  }

  const randomId = await generateRandomUniqueId(6);

  return await prisma.quiz.update({
    data: {
      isOnline: true,
      urlId: randomId,
    },
    where: {
      id: quizId,
    },
  });
};

export const deleteOne = async (quizId: string, loggedUserEmail: string) => {
  const quiz = await prisma.quiz.findFirst({
    where: {
      id: quizId,
      user: {
        email: loggedUserEmail,
      },
    },
    include: {
      user: true,
    },
  });

  if (!quiz) {
    throw new HttpException(
      httpStatusCodes.NOT_FOUND,
      "Quiz does not exist or logged user cannot access it"
    );
  }

  let query: Prisma.QuizDeleteArgs = {
    where: {
      id: quizId,
    },
  };

  return prisma.quiz.delete(query);
};
