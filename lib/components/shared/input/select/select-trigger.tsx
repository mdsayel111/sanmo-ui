import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";
import { InputSize } from "../types";
import useSelect from "./useSelect";
import { cn } from "../../../utils/cn";

interface SelectTriggerProps {
    children: ReactNode;
    className?: string;
    selectSize?: InputSize;
}

const SelectTrigger: React.FC<SelectTriggerProps> = ({
    children,
    className = '',
    selectSize = "default",
}) => {
    const { isOpen, setIsOpen } = useSelect();

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs h-8',
        default: 'px-3 py-2 text-sm h-10',
        lg: 'px-4 py-3 text-lg h-12',
    }[selectSize];

    return (
        <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(`
        flex min-h-[2.5rem] w-full items-center justify-between rounded-sm border 
         bg-background px-3 py-2 text-sm
        focus:outline-none
        transition-colors duration-200
        ${className}
      `, sizeClasses)}
        >
            {children}
            <ChevronDown
                className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''
                    }`}
            />
        </button>
    );
};


export default SelectTrigger;