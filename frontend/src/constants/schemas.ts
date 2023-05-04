import * as yup from "yup";
import { MAX_NUM_QUESTIONS, MAX_QUESTION_OPTIONS } from ".";

export const quizSchema = yup.object().shape({
  title: yup.string().required("Quiz Name is required"),
  questions: yup
    .array()
    .of(
      yup.object().shape({
        questionText: yup
          .string()
          .strict()
          .typeError("Question must be a string")
          .required("Question is required"),
        options: yup
          .array()
          .of(
            yup.object().shape({
              value: yup
                .string()
                .strict()
                .typeError("value must be a string")
                .required("value is required"),
              isCorrect: yup
                .boolean()
                .typeError("isCorrect must either be true or false")
                .required("isCorrect is required"),
            })
          )
          .min(1, "options must have at least 1 element")
          .max(
            MAX_QUESTION_OPTIONS,
            `options can have at most ${MAX_QUESTION_OPTIONS} elements`
          )
          .test({
            message: "There must be at least 1 correct answer",
            test: (options) => {
              return options
                ? options.some((option) => option.isCorrect)
                : false;
            },
          }),
      })
    )
    .min(1, "questions must have at least 1 element")
    .max(
      MAX_NUM_QUESTIONS,
      `questions can have at most ${MAX_NUM_QUESTIONS} elements`
    ),
});
