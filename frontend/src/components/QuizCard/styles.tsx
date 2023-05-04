import { DialogContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";

export const TitleContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const HeaderTypography = styled(Typography)({
  fontSize: 14,
});

export const DescriptionTypography = styled(Typography)({
  height: "24px",
  marginBottom: 12,
});

export const DeleteDialogContent = styled(DialogContent)({
  marginTop: 8,
  maxWidth: "600px",
});

export const NoContentContainer = styled("div")({
  marginTop: "100px",
  textAlign: "center",
});

export const AddQuizIcon = styled(AddIcon)({
  fontSize: "50px",
});
