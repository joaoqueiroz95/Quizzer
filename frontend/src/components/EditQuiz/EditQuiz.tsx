import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MAX_NUM_QUESTIONS,
  MAX_QUESTION_OPTIONS,
  QUESTION_TYPES,
} from "../../constants";
import {
  createQuiz,
  editQuiz,
  getQuiz,
  publishQuiz,
} from "../../services/quiz.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IOption, IQuestion } from "../../types/quiz";
import { quizSchema } from "../../constants/schemas";
import {
  ButtonsContainer,
  CenteredDiv,
  CorrectAnswerContainer,
  CorrectAnswerLabel,
  Empty,
  InputBaseOption,
  InputOptionContainer,
  InvalidPageTypography,
  LineBreak,
  OptionField,
  OptionsTitleContainer,
  QuestionCardHeader,
  QuestionErrorText,
  QuestionNumberContainer,
  QuestionTypeIconContainer,
  QuestionTypeItem,
  RootDiv,
  TextFieldQuestion,
} from "./styles";
import { CircularProgress, FormHelperText, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { NotificationManager } from "react-notifications";
import ShareDialog from "./ShareDialog";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";

interface ISchema {
  title: string;
  questions: Array<IQuestion>;
}

export default function EditQuiz({ isEdit }: { isEdit: boolean }) {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ISchema>({
    resolver: yupResolver(quizSchema),
    defaultValues: {
      title: "",
      questions: [
        {
          questionText: "",
          options: [],
        },
      ],
    },
    mode: "onChange",
  });

  const [questions, setQuestions] = useState<Array<IQuestion>>([
    { questionText: "", type: QUESTION_TYPES.SINGLE_CHOICE, options: [] },
  ]);

  const [isOnline, setIsOnline] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [quizUrl, setQuizUrl] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [openShare, setOpenShare] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const fetchData = async () => {
        if (id) {
          const quiz = await getQuiz(id);
          setQuizName(quiz.name);
          setValue("title", quiz.name, { shouldValidate: true });
          setQuizDescription(quiz.description);
          setQuestions(quiz.questions);
          setValue("questions", quiz.questions, { shouldValidate: true });
          setIsOnline(quiz.isOnline);
          setIsLoaded(true);
          setQuizUrl(quiz.urlId);
        }
      };

      fetchData().catch(() => {
        setIsInvalid(true);
      });
    } else {
      setIsLoaded(true);
    }
  }, []);

  const handleSaveQuiz = async () => {
    const quiz = {
      name: quizName,
      description: quizDescription,
      questions,
    };

    if (isEdit) {
      if (!id) return;
      await editQuiz(id, quiz);
    } else {
      await createQuiz(quiz).then((res) => {
        navigate(`/${res.id}`);
      });
    }
    NotificationManager.success("Quiz Successfully Saved", "Success");
  };

  const handlePublishQuiz = async () => {
    let resQuiz;
    const quiz = {
      name: quizName,
      description: quizDescription,
      questions,
    };

    if (isEdit) {
      if (!id) return;

      await editQuiz(id, quiz);
      resQuiz = await publishQuiz(id);
    } else {
      resQuiz = await createQuiz(quiz);
      resQuiz = await publishQuiz(resQuiz.id);
    }

    NotificationManager.success("Quiz Successfully Published", "Success");

    setQuizUrl(resQuiz.urlId);
    setIsOnline(true);

    navigate(`/${resQuiz.id}`);
    setOpenShare(true);
  };

  const handleSwitchShare = async () => {
    setOpenShare((o) => !o);
  };

  const handleQuizNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuizName(e.target.value);
    setValue("title", e.target.value, { shouldValidate: true });
  };

  const handleQuizDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuizDescription(e.target.value);
  };

  const handleOptionValueChange =
    (questionIdx: number, optionIdx: number) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQuestions((qs) => {
        if (optionIdx < qs[questionIdx].options.length) {
          if (e.target.value === "") {
            qs[questionIdx].options.splice(optionIdx, 1);
            e.target.blur();
          } else {
            qs[questionIdx].options[optionIdx].value = e.target.value;
          }
        } else {
          qs[questionIdx].options.push({
            value: e.target.value,
            isCorrect: false,
          });
        }
        setValue("questions", [...qs], { shouldValidate: true });
        return [...qs];
      });
    };

  const handleOptionCheckedChange =
    (questionIdx: number, optionIdx: number) =>
    (e: unknown, checked: boolean) => {
      setQuestions((qs) => {
        qs[questionIdx].options[optionIdx]["isCorrect"] = checked;
        setValue("questions", [...qs], { shouldValidate: true });
        return [...qs];
      });
    };

  const handleQuestionTypeChange =
    (questionIdx: number) => (e: SelectChangeEvent<string>) => {
      setQuestions((qs) => {
        qs[questionIdx].type = e.target.value;
        setValue("questions", [...qs], { shouldValidate: true });
        return [...qs];
      });
    };

  const handleQuestionChange =
    (questionIdx: number) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQuestions((qs) => {
        qs[questionIdx].questionText = e.target.value;
        setValue("questions", [...qs], { shouldValidate: true });
        return [...qs];
      });
    };

  const handleClickAddQuestion = () => {
    setQuestions((qs) => {
      const newQuestions = [
        ...qs,
        {
          questionText: "",
          type: QUESTION_TYPES.SINGLE_CHOICE,
          options: [],
        },
      ];

      setValue("questions", newQuestions, { shouldValidate: true });
      return newQuestions;
    });
  };

  const handleDeleteQuestion = (questionIdx: number) => () => {
    setQuestions((qs) => {
      qs.splice(questionIdx, 1);

      setValue("questions", qs, { shouldValidate: true });
      return [...qs];
    });
  };

  const handleClickGoHome = () => {
    navigate("home");
  };

  if (isInvalid) {
    return (
      <CenteredDiv>
        <InvalidPageTypography>Something went wrong</InvalidPageTypography>
        <Button variant="contained" onClick={handleClickGoHome}>
          Go To Homepage
        </Button>
      </CenteredDiv>
    );
  }

  if (!isLoaded) {
    return (
      <CenteredDiv>
        <CircularProgress />
      </CenteredDiv>
    );
  }

  return (
    <RootDiv>
      <Stack spacing={2}>
        <Typography variant="h5" component="div">
          Main Info
        </Typography>
        <TextField
          error={Boolean(errors.title)}
          helperText={<>{errors.title && errors.title.message}</>}
          disabled={isOnline}
          label="Quiz Name"
          onChange={handleQuizNameChange}
          value={quizName}
          variant="outlined"
          margin="dense"
          fullWidth
        />
        <TextField
          disabled={isOnline}
          label="Quiz Description"
          onChange={handleQuizDescriptionChange}
          value={quizDescription}
          variant="outlined"
          multiline
          rows={3}
          margin="dense"
          fullWidth
        />
        <div>
          <Typography variant="h5" component="div">
            Questions
          </Typography>
          <FormHelperText error>{errors.questions?.message}</FormHelperText>
        </div>
        {questions.map((question, questionIdx) => (
          <Card key={questionIdx} raised>
            <QuestionCardHeader
              title={
                <>
                  <QuestionNumberContainer>
                    <Typography color="text.secondary" variant="body2">
                      #{questionIdx + 1}
                    </Typography>
                    <IconButton
                      disabled={isOnline}
                      onClick={handleDeleteQuestion(questionIdx)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </QuestionNumberContainer>
                  <TextFieldQuestion
                    error={Boolean(
                      errors.questions && errors.questions[questionIdx]
                        ? errors.questions[questionIdx]?.questionText
                        : false
                    )}
                    helperText={
                      <>
                        {errors.questions &&
                          errors.questions[questionIdx] &&
                          errors.questions[questionIdx]?.questionText?.message}
                      </>
                    }
                    disabled={isOnline}
                    value={question.questionText}
                    onChange={handleQuestionChange(questionIdx)}
                    label="Question"
                    variant="outlined"
                    margin="dense"
                    size="small"
                    fullWidth
                  />
                  <FormControl size="small" fullWidth>
                    <InputLabel>Question Type</InputLabel>
                    <Select
                      disabled={isOnline}
                      value={question.type}
                      label="Question Type"
                      onChange={handleQuestionTypeChange(questionIdx)}
                    >
                      <MenuItem value={QUESTION_TYPES.SINGLE_CHOICE}>
                        <QuestionTypeItem>
                          <QuestionTypeIconContainer size="small" disableRipple>
                            <RadioButtonCheckedIcon fontSize="small" />
                          </QuestionTypeIconContainer>
                          <Typography>Single Choice</Typography>
                        </QuestionTypeItem>
                      </MenuItem>
                      <MenuItem value={QUESTION_TYPES.MULTIPLE_CHOICES}>
                        <QuestionTypeItem>
                          <QuestionTypeIconContainer size="small" disableRipple>
                            <LibraryAddCheckIcon fontSize="small" />
                          </QuestionTypeIconContainer>
                          <Typography>Multiple Choices</Typography>
                        </QuestionTypeItem>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </>
              }
              disableTypography
            />
            <CardContent>
              <OptionsTitleContainer>
                {errors.questions &&
                  errors.questions[questionIdx] &&
                  errors.questions[questionIdx]?.options && (
                    <QuestionErrorText error>
                      {errors.questions[questionIdx]?.options?.message}
                    </QuestionErrorText>
                  )}
                <Typography>Options</Typography>
              </OptionsTitleContainer>
              <Grid container spacing={2}>
                {[...question.options, {}]
                  .splice(0, MAX_QUESTION_OPTIONS)
                  .map((option: Partial<IOption>, optionIdx) => (
                    <Grid key={optionIdx} item xs={12} sm={6}>
                      <OptionField variant="outlined">
                        <InputOptionContainer>
                          <InputBaseOption
                            disabled={isOnline}
                            value={option.value ?? ""}
                            placeholder={`Answer ${optionIdx + 1}`}
                            onChange={handleOptionValueChange(
                              questionIdx,
                              optionIdx
                            )}
                            fullWidth
                          />
                        </InputOptionContainer>
                        <LineBreak />
                        <CorrectAnswerContainer>
                          {option.isCorrect !== undefined && (
                            <CorrectAnswerLabel
                              disabled={isOnline}
                              checked={option.isCorrect}
                              control={<Checkbox size="small" />}
                              onChange={handleOptionCheckedChange(
                                questionIdx,
                                optionIdx
                              )}
                              color="text.secondary"
                              label="Correct Answer"
                              labelPlacement="start"
                            />
                          )}
                          {option.isCorrect === undefined && <Empty />}
                        </CorrectAnswerContainer>
                      </OptionField>
                    </Grid>
                  ))}
              </Grid>
            </CardContent>
          </Card>
        ))}
        {!isOnline && (
          <Button
            disabled={isOnline || questions.length >= MAX_NUM_QUESTIONS}
            variant="contained"
            onClick={handleClickAddQuestion}
          >
            Add Question
          </Button>
        )}
        <ButtonsContainer>
          {!isOnline && (
            <>
              <Button
                fullWidth={false}
                variant="contained"
                onClick={handleSubmit(handleSaveQuiz)}
              >
                Save
              </Button>
              <Button
                fullWidth={false}
                variant="contained"
                onClick={handleSubmit(handlePublishQuiz)}
              >
                Save & Publish
              </Button>
            </>
          )}
          {isOnline && (
            <Button
              fullWidth={false}
              variant="contained"
              onClick={handleSwitchShare}
            >
              Share
            </Button>
          )}
        </ButtonsContainer>
      </Stack>
      <ShareDialog
        open={openShare}
        handleClose={handleSwitchShare}
        quizName={quizName}
        quizUrl={quizUrl}
      />
    </RootDiv>
  );
}
