import {
  TextField,
  FormHelperText,
  Paper,
  InputBase,
  FormControlLabel,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { styled, palette } from "@mui/system";
import { text } from "stream/consumers";

export const TextFieldQuestion = styled(TextField)({
  marginBottom: 16,
});

export const QuestionErrorText = styled(FormHelperText)({
  position: "absolute",
  top: "-22px",
});

export const OptionField = styled(Paper)({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
});

export const InputBaseOption = styled(InputBase)({
  padding: 0,
});

export const LineBreak = styled("div")({
  height: 0,
  flexBasis: "100%",
});

export const CorrectAnswerContainer = styled("div")({
  width: "100%",
  paddingRight: "14px",
  display: "flex",
  justifyContent: "end",
  backgroundColor: "#f0f0f0",
});

export const CorrectAnswerLabel = styled(FormControlLabel)(() => ({
  "& .MuiFormControlLabel-label": {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: "14px",
  },
  height: "38px",
}));

export const Empty = styled("div")({
  height: "38px",
});

export const QuestionTypeItem = styled("div")({
  display: "flex",
  alignItems: "center",
});

export const QuestionTypeIconContainer = styled(IconButton)({
  padding: "0 5px 0 5px",
});

export const ButtonsContainer = styled("div")({
  display: "flex",
  gap: "10px",
  justifyContent: "end",
});

export const QuestionNumberContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

export const QuestionCardHeader = styled(CardHeader)({
  paddingTop: "8px",
  backgroundColor: "#f0f0f0",
});

export const OptionsTitleContainer = styled("div")({
  marginBottom: "16px",
  marginTop: "16px",
  position: "relative",
});

export const InputOptionContainer = styled("div")({
  padding: "4.5px 14px",
  width: "100%",
});

export const RootDiv = styled("div")({
  paddingBottom: "15px",
});

export const CenteredDiv = styled("div")({
  textAlign: "center",
});

export const InvalidPageTypography = styled(Typography)({
  marginBottom: "10px",
});
