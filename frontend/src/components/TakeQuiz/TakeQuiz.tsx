import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QUESTION_TYPES } from "../../constants";
import { isArraysEqual } from "../../helpers";
import { getPublicQuiz } from "../../services/quiz.service";
import { IQuestion } from "../../types/quiz";
import {
  ButtonsContainer,
  CenteredDiv,
  InvalidPageTypography,
  QuestionCard,
  QuestionCardContainer,
  QuestionNumTypography,
  QuestionOptions,
  QuestionTypography,
  QuizDescriptionTypography,
  QuizTitle,
  ResultsContainer,
  ResultsTitleTypography,
} from "./styles";

const calculateCorrectAnswers = (
  responses: Array<Array<string>>,
  quizQuestions: Array<IQuestion>
) => {
  let numCorrectAnswers = 0;
  for (let i = 0; i < quizQuestions.length; i++) {
    if (quizQuestions[i].type === QUESTION_TYPES.SINGLE_CHOICE) {
      if (
        quizQuestions[i].options.find((o) =>
          responses[i].includes(o.id as string)
        )?.isCorrect
      ) {
        numCorrectAnswers++;
      }
    } else if (quizQuestions[i].type === QUESTION_TYPES.MULTIPLE_CHOICES) {
      if (
        isArraysEqual(
          quizQuestions[i].options.filter((o) => o.isCorrect).map((o) => o.id),
          responses[i]
        )
      ) {
        numCorrectAnswers++;
      }
    }
  }

  return numCorrectAnswers;
};

export default function TakeQuiz() {
  const navigate = useNavigate();

  const { code } = useParams();

  const [questionNum, setQuestionNum] = useState(1);
  const [isStart, setIsStart] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [responses, setResponses] = useState<Array<Array<string>>>([]);
  const [quizQuestions, setQuizQuestions] = useState<Array<IQuestion>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quizName, setQuizName] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!code) return;
      const quiz = await getPublicQuiz(code);
      setQuizQuestions(quiz.questions);
      setResponses([...Array(quiz.questions.length)].map((e) => []));
      setQuizName(quiz.name);
      setQuizDescription(quiz.description);
      setIsLoading(false);
    };

    fetchData().catch(() => {
      setIsInvalid(true);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setResponses((res) => {
      res[questionNum - 1] = [event.target.value];
      return [...res];
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResponses((res) => {
      if (res[questionNum - 1].includes(event.target.value)) {
        res[questionNum - 1] = res[questionNum - 1].filter(
          (v) => v !== event.target.value
        );
      } else {
        res[questionNum - 1].push(event.target.value);
      }
      return [...res];
    });
  };

  const handleNext = () => {
    setQuestionNum((num) => Math.min(num + 1, quizQuestions.length));
  };

  const handleBack = () => {
    setQuestionNum((num) => Math.max(num - 1, 1));
  };

  const handleFinish = () => {
    setCorrectAnswers(calculateCorrectAnswers(responses, quizQuestions));
    setIsFinished(true);
  };

  const handleClickCreateQuiz = () => {
    navigate("home");
  };

  const handleClickStart = () => {
    setIsStart(true);
  };

  if (isInvalid) {
    return (
      <CenteredDiv>
        <InvalidPageTypography>Something went wrong</InvalidPageTypography>
        <Button variant="contained" onClick={handleClickCreateQuiz}>
          Create Quiz
        </Button>
      </CenteredDiv>
    );
  }

  if (isLoading) {
    return (
      <CenteredDiv>
        <CircularProgress />
      </CenteredDiv>
    );
  }

  if (!isStart) {
    return (
      <QuestionCardContainer>
        <QuestionCard variant="outlined">
          <QuizTitle noWrap variant="h5" align="center">
            {quizName}
          </QuizTitle>
          <QuizDescriptionTypography align="center">
            {quizDescription}
          </QuizDescriptionTypography>
          <Button
            fullWidth
            onClick={handleClickStart}
            size="large"
            variant="contained"
          >
            Start!
          </Button>
        </QuestionCard>
      </QuestionCardContainer>
    );
  }

  if (isFinished) {
    return (
      <QuestionCardContainer>
        <QuizTitle noWrap variant="h5" align="center">
          {quizName}
        </QuizTitle>
        <QuestionCard variant="outlined">
          <ResultsTitleTypography variant="h6" align="center">
            Your Results:
          </ResultsTitleTypography>
          <ResultsContainer variant="outlined">
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              {correctAnswers}/{quizQuestions.length}
            </Typography>
          </ResultsContainer>
          <Button
            fullWidth
            onClick={handleClickCreateQuiz}
            size="large"
            variant="contained"
          >
            Create Quiz
          </Button>
        </QuestionCard>
      </QuestionCardContainer>
    );
  }

  return (
    <QuestionCardContainer>
      <QuizTitle noWrap variant="h5" align="center">
        {quizName}
      </QuizTitle>
      <QuestionCard variant="outlined">
        <QuestionNumTypography>
          {questionNum}/{quizQuestions.length}
        </QuestionNumTypography>
        <QuestionTypography noWrap variant="h6" align="center">
          {quizQuestions[questionNum - 1].questionText}
        </QuestionTypography>
        <Grid container spacing={2}>
          {quizQuestions[questionNum - 1].options.map((option) => (
            <Grid key={option.id} item xs={12} sm={6}>
              <QuestionOptions variant="outlined">
                {quizQuestions[questionNum - 1].type ===
                  QUESTION_TYPES.SINGLE_CHOICE && (
                  <Radio
                    checked={responses[questionNum - 1][0] === option.id}
                    onChange={handleChange}
                    value={option.id}
                  />
                )}
                {quizQuestions[questionNum - 1].type ===
                  QUESTION_TYPES.MULTIPLE_CHOICES && (
                  <Checkbox
                    checked={responses[questionNum - 1].includes(
                      option.id as string
                    )}
                    onChange={handleCheckboxChange}
                    value={option.id}
                  />
                )}
                <Typography noWrap>{option.value}</Typography>
              </QuestionOptions>
            </Grid>
          ))}
        </Grid>
        <ButtonsContainer
          hasMultipleButtons={quizQuestions.length > 1 && questionNum > 1}
        >
          {questionNum > 1 && (
            <Button onClick={handleBack} size="large" variant="contained">
              Back
            </Button>
          )}
          {questionNum < quizQuestions.length && (
            <Button onClick={handleNext} size="large" variant="contained">
              Next
            </Button>
          )}
          {questionNum === quizQuestions.length && (
            <Button onClick={handleFinish} size="large" variant="contained">
              Finish
            </Button>
          )}
        </ButtonsContainer>
      </QuestionCard>
    </QuestionCardContainer>
  );
}
