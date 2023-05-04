import { Button, Box, Avatar } from "@mui/material";
import { styled } from "@mui/system";

export const SignupButton = styled(Button)({
  marginTop: 24,
  marginBottom: 16,
});

export const RegisterContainer = styled(Box)({
  marginTop: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const RegisterAvatar = styled(Avatar)({
  margin: 8,
  bgcolor: "secondary.main",
});

export const RegisterFields = styled(Box)({
  marginTop: 8,
});
