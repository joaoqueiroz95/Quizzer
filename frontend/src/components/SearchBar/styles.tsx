import { Paper, Input, IconButton } from "@mui/material";
import { styled } from "@mui/system";

export const SearchContainer = styled(Paper)({
  padding: "2px 4px",
  display: "flex",
  alignItems: "center",
});

export const InputSearch = styled(Input)({
  marginLeft: "8px",
  flex: 1,
});

export const SearchIconContainer = styled(IconButton)({
  padding: "10px",
});
