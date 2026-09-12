import { ReactNode } from "react";
import useSelect from "./useSelect";
import { Check } from "lucide-react";
import { InputSize } from "../types";
import { cn } from "../../../utils/cn";

interface SelectItemProps {
    value: string;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    selectSize?: InputSize;
}

const SelectItem: React.FC<SelectItemProps> = ({
    value,
    children,
    className = '',
    disabled = false,
    selectSize = "default",
}) => {
    const { value: selectedValue, handleSelect, multiple } = useSelect();

    const isSelected = multiple
        ? Array.isArray(selectedValue) && selectedValue.includes(value)
        : selectedValue === value;

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs h-8',
        default: 'px-3 py-2 text-sm h-10',
        lg: 'px-4 py-3 text-lg h-12',
    }[selectSize];

    return (
        <div
            onClick={e => {
                if (!disabled) {
                    e.stopPropagation();
                    handleSelect(value);
                }
            }}
            className={
                cn(`
        relative flex cursor-pointer items-center rounded-sm
        py-1.5 pl-8 pr-2 text-sm transition-colors
        hover:bg-background
        ${isSelected ? 'bg-background' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${className}
      `, sizeClasses)}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {isSelected && <Check className="h-4 w-4" />}
            </span>
            <span className="truncate pl-6">{children}</span>
        </div>
    );
};

export default SelectItem;