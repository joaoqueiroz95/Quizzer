import httpRequest from "../helpers/httpRequest";
import { IQuiz } from "../types/quiz";

interface IGetAllQuizzesQuery {
  limit?: number;
  page?: number;
  search?: string;
}

type IQuizEditCreateBody = Omit<
  IQuiz,
  "isOnline" | "urlId" | "id" | "createdAt"
>;

export const getQuizzes = async (params: IGetAllQuizzesQuery) => {
  return httpRequest.get("quizzes", { params }).then((res) => {
    return res.data.data;
  });
};

export const getQuiz = async (quizId: string) => {
  return httpRequest.get(`quizzes/${quizId}`).then((res) => {
    return res.data.data;
  });
};

export const getPublicQuiz = async (quizUrl: string) => {
  return httpRequest.get(`quizzes/take/${quizUrl}`).then((res) => {
    return res.data.data;
  });
};

export const createQuiz = async (data: IQuizEditCreateBody) => {
  return httpRequest.post("quizzes", data).then((res) => {
    return res.data.data;
  });
};

export const editQuiz = async (quizId: string, data: IQuizEditCreateBody) => {
  return httpRequest.put(`quizzes/${quizId}`, data).then((res) => {
    return res.data.data;
  });
};

export const publishQuiz = async (quizId: string) => {
  return httpRequest.post("quizzes/publish", { id: quizId }).then((res) => {
    return res.data.data;
  });
};

export const deleteQuiz = async (quizId: string) => {
  return httpRequest.delete(`quizzes/${quizId}`).then((res) => {
    return res.data.data;
  });
};
