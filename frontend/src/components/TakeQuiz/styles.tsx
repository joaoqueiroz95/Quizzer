import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const QuizTitle = styled(Typography)({
  marginBottom: 16,
  fontWeight: 700,
});

export const QuizDescriptionTypography = styled(Typography)({
  marginBottom: 32,
  wordWrap: "break-word",
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 7,
});

export const QuestionTypography = styled(Typography)({
  marginBottom: 32,
});

export const ResultsTitleTypography = styled(Typography)({
  marginBottom: 32,
});

export const QuestionNumTypography = styled(Typography)({
  marginBottom: 16,
});

export const QuestionCard = styled(Paper)({
  padding: 32,
  maxWidth: "-moz-available",
});

export const ResultsContainer = styled(Paper)({
  padding: "10px 16px",
  marginBottom: "40px",
});

export const QuestionOptions = styled(Paper)({
  padding: "10px 16px",
  display: "flex",
  alignItems: "center",
});

export const ButtonsContainer = styled("div")(
  ({ hasMultipleButtons }: { hasMultipleButtons: boolean }) => ({
    display: "flex",
    justifyContent: hasMultipleButtons ? "space-between" : "end",
    marginTop: "100px",
    gap: "10px",
  })
);

export const QuestionCardContainer = styled("div")({
  minHeight: "90vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
});

export const CenteredDiv = styled("div")({
  textAlign: "center",
});

export const InvalidPageTypography = styled(Typography)({
  marginBottom: "10px",
});
