import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ShareDialogProps {
  open: boolean;
  handleClose: () => void;
  quizName: string;
  quizUrl: string;
}

export default function ShareDialog({
  open,
  handleClose,
  quizName,
  quizUrl,
}: ShareDialogProps) {
  const navigate = useNavigate();

  const handleClickGoHome = () => {
    navigate("home");
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle noWrap>{quizName}</DialogTitle>
      <DialogContent>
        <DialogContentText>Your Quiz is now live in the URL:</DialogContentText>
        <TextField
          value={`${process.env.REACT_APP_FRONTEND_URL}/take/${quizUrl}`}
          variant="outlined"
          margin="dense"
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickGoHome} autoFocus>
          Go To Homepage
        </Button>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
