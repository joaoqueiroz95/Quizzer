export interface IOption {
  id?: string;
  value: string;
  isCorrect: boolean;
}

export interface IQuestion {
  questionText: string;
  type: string;
  options: Array<{
    id?: string;
    value: string;
    isCorrect: boolean;
  }>;
}

export interface IQuiz {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  isOnline: boolean;
  urlId: string;
  questions: Array<IQuestion>;
}
