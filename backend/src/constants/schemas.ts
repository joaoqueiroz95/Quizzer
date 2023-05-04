import * as yup from "yup";
import { MAX_NUM_QUESTIONS, MAX_QUESTION_OPTIONS, QUESTION_TYPES } from ".";

export const createUserSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .typeError("Email must have a valid email format")
    .required("Email is required"),
  password: yup
    .string()
    .strict()
    .typeError("Password must be a string")
    .required("Password is required"),
});

export const createQuizSchema = yup.object().shape({
  name: yup
    .string()
    .strict()
    .typeError("Name must be a string")
    .required("Name is required"),
  description: yup.string().strict().typeError("Description must be a string"),
  questions: yup
    .array()
    .of(
      yup.object().shape({
        questionText: yup
          .string()
          .strict()
          .typeError("questionText must be a string")
          .required("questionText is required"),
        type: yup
          .mixed()
          .oneOf(
            [QUESTION_TYPES.SINGLE_CHOICE, QUESTION_TYPES.MULTIPLE_CHOICES],
            `type can only be: ${[
              QUESTION_TYPES.SINGLE_CHOICE,
              QUESTION_TYPES.MULTIPLE_CHOICES,
            ].join(", ")}`
          )
          .required("type is required"),
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

export const editQuizSchema = yup.object().shape({
  name: yup
    .string()
    .strict()
    .typeError("Name must be a string")
    .required("Name is required"),
  description: yup.string().strict().typeError("Description must be a string"),
  questions: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().strict().typeError("id must be a string"),
        questionText: yup
          .string()
          .strict()
          .typeError("questionText must be a string")
          .required("questionText is required"),
        type: yup
          .mixed()
          .oneOf(
            [QUESTION_TYPES.SINGLE_CHOICE, QUESTION_TYPES.MULTIPLE_CHOICES],
            `type can only be: ${[
              QUESTION_TYPES.SINGLE_CHOICE,
              QUESTION_TYPES.MULTIPLE_CHOICES,
            ].join(", ")}`
          )
          .required("type is required"),
        options: yup
          .array()
          .of(
            yup.object().shape({
              id: yup.string().strict().typeError("id must be a string"),
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
