import { Button, Box, Avatar } from "@mui/material";
import { styled } from "@mui/system";

export const LoginButton = styled(Button)({
  marginTop: 24,
  marginBottom: 16,
});

export const LoginContainer = styled(Box)({
  marginTop: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const LoginAvatar = styled(Avatar)({
  margin: 8,
  bgcolor: "secondary.main",
});

export const LoginFields = styled(Box)({
  marginTop: 8,
});
