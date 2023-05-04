import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/user.service";
import {
  RegisterAvatar,
  RegisterContainer,
  RegisterFields,
  SignupButton,
} from "./styles";
import { NotificationManager } from "react-notifications";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e: any) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e: any) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleClickLogin = () => {
    navigate("/login");
  };

  const handleSignUp = async () => {
    await createUser({
      email,
      password,
    }).then(() => {
      NotificationManager.success(
        `User ${email} successfully created`,
        "Success"
      );
      navigate("/login");
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <RegisterContainer>
        <RegisterAvatar>
          <LockOutlinedIcon />
        </RegisterAvatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <RegisterFields>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            onChange={onChangeEmail}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={onChangePassword}
          />
          <SignupButton onClick={handleSignUp} fullWidth variant="contained">
            Sign Up
          </SignupButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={handleClickLogin}
              >
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </RegisterFields>
      </RegisterContainer>
    </Container>
  );
}
