import AddIcon from "@mui/icons-material/Add";
import { FabCreate } from "./styles";

interface CreateQuizFabProps {
  handleClick: () => void;
}

export default function CreateQuizFab({ handleClick }: CreateQuizFabProps) {
  return (
    <FabCreate color="primary" onClick={handleClick}>
      <AddIcon />
    </FabCreate>
  );
}
