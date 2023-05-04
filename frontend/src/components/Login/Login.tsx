import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import {
  LoginAvatar,
  LoginButton,
  LoginContainer,
  LoginFields,
} from "./styles";

export default function Login() {
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

  const handleClickRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async () => {
    await login(email, password).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    if (localStorage.getItem("user")) navigate("/");
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <LoginContainer>
        <LoginAvatar>
          <LockOutlinedIcon />
        </LoginAvatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <LoginFields>
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
          <LoginButton onClick={handleSubmit} fullWidth variant="contained">
            Log In
          </LoginButton>
          <Grid container>
            <Grid item>
              <Link
                component="button"
                onClick={handleClickRegister}
                variant="body2"
              >
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </LoginFields>
      </LoginContainer>
    </Container>
  );
}
