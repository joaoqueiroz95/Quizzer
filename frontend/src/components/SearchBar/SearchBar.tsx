import SearchIcon from "@mui/icons-material/Search";
import { InputSearch, SearchContainer, SearchIconContainer } from "./styles";

interface SearchBarProps {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
}: SearchBarProps) {
  return (
    <SearchContainer>
      <InputSearch
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disableUnderline={true}
      />
      <SearchIconContainer>
        <SearchIcon />
      </SearchIconContainer>
    </SearchContainer>
  );
}
