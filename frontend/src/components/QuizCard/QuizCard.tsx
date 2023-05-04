import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  DeleteDialogContent,
  DescriptionTypography,
  HeaderTypography,
  TitleContainer,
} from "./styles";

export interface QuizCardProps {
  title: string;
  description: string;
  date: string;
  isOnline: boolean;
  link: string;
  onEdit: () => void;
  onDelete: () => void;
}

export default function QuizCard({
  title,
  description,
  date,
  isOnline,
  link,
  onEdit,
  onDelete,
}: QuizCardProps) {
  const [openShare, setOpenShare] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleClickShare = () => {
    setOpenShare(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickDelete = () => {
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    await onDelete();
    setOpenDelete(false);
  };

  return (
    <>
      <Card>
        <CardContent>
          <TitleContainer>
            <HeaderTypography color="text.secondary" gutterBottom>
              {date} · {isOnline ? "Published" : "Not Published"}
            </HeaderTypography>
            <IconButton onClick={handleClickDelete}>
              <DeleteIcon />
            </IconButton>
          </TitleContainer>
          <Typography noWrap variant="h6" component="div">
            {title}
          </Typography>
          <DescriptionTypography noWrap color="text.secondary">
            {description || "No Description"}
          </DescriptionTypography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onEdit}>
            {isOnline ? "Preview" : "Edit"}
          </Button>
          {isOnline && (
            <Button size="small" onClick={handleClickShare}>
              Share
            </Button>
          )}
        </CardActions>
      </Card>
      <Dialog fullWidth open={openShare} onClose={handleCloseShare}>
        <DialogTitle noWrap>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>Your Quiz lives in this URL:</DialogContentText>
          <TextField
            defaultValue={link}
            variant="outlined"
            margin="dense"
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseShare} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth onClose={handleCloseDelete} open={openDelete}>
        <DialogTitle>Delete Quiz</DialogTitle>
        <DeleteDialogContent>
          <DialogContentText>
            Are you sure you want to delete {title}?
          </DialogContentText>
        </DeleteDialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={handleCloseDelete}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
