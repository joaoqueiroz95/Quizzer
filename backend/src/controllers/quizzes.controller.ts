import { NextFunction, Request, Response } from "express";
import * as quizzesService from "../services/quizzes.service";
import httpStatusCodes from "http-status-codes";
import { IGetAllQuizzesQuery } from "../types/quiz";

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = res.locals;

  let resp;
  try {
    resp = await quizzesService.getMany(
      email,
      req.query as IGetAllQuizzesQuery
    );
  } catch (err) {
    return next(err);
  }
  res.status(httpStatusCodes.OK).json({ data: resp });
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = res.locals;

  let quiz;
  try {
    quiz = await quizzesService.getOne(req.params.id, email);
  } catch (err) {
    return next(err);
  }
  res.status(httpStatusCodes.OK).json({ data: quiz ?? {} });
};

export const getOnePublic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let quiz;
  try {
    quiz = await quizzesService.getOnePublic(req.params.id);
  } catch (err) {
    return next(err);
  }
  res.status(httpStatusCodes.OK).json({ data: quiz ?? {} });
};

export const createOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = res.locals;

  let quiz;
  try {
    quiz = await quizzesService.createOne(req.body, email);
  } catch (err) {
    return next(err);
  }

  res.status(httpStatusCodes.CREATED).json({ data: quiz });
};

export const editOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = res.locals;

  let quiz;
  try {
    quiz = await quizzesService.editOne(req.params.id, req.body, email);
  } catch (err) {
    return next(err);
  }

  res.status(httpStatusCodes.OK).json({ data: quiz });
};

export const publish = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = res.locals;

  let quiz;
  try {
    quiz = await quizzesService.publish(req.body.id, email);
  } catch (err) {
    return next(err);
  }

  res.status(httpStatusCodes.OK).json({ data: quiz });
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = res.locals;

  let quiz;
  try {
    quiz = await quizzesService.deleteOne(req.params.id, email);
  } catch (err) {
    return next(err);
  }

  res.status(httpStatusCodes.OK).json({ data: quiz });
};
