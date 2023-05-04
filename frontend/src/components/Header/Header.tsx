import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { TitleContainer } from "./styles";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  handleClickBack?: () => void;
}

export default function Header({ title, handleClickBack }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <TitleContainer>
          {handleClickBack && (
            <IconButton color="inherit" onClick={handleClickBack}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography
            color="inherit"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Typography>
        </TitleContainer>
        <Button color="inherit" variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
