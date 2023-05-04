export interface IGetAllQuizzesQuery {
  limit?: string;
  page?: string;
  search?: string;
}

export interface ICreateQuizBody {
  name: string;
  description: string;
  questions: Array<{
    questionText: string;
    type: string;
    options: Array<{
      value: string;
      isCorrect: boolean;
    }>;
  }>;
}

export interface IEditQuizBody {
  name: string;
  description: string;
  questions: Array<{
    id?: string;
    questionText: string;
    type: string;
    options: Array<{
      id?: string;
      value: string;
      isCorrect: boolean;
    }>;
  }>;
}
