import { Search } from "lucide-react";
import Input from "./input";
import { InputSize } from "./types";

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    inputSize?: InputSize;
}

const SearchInput = ({ ...props }: SearchInputProps) => (
    <Input
        {...props}
        type="search"
        leadingIcon={<Search aria-hidden="true" size={16} />}
    />
);

export default SearchInput;
