import { ReactNode } from "react";
import useSelect from "./useSelect";

interface SelectContentProps {
    children: ReactNode;
    className?: string;
}

const SelectContent: React.FC<SelectContentProps> = ({
    children,
    className = '',
}) => {
    const { isOpen } = useSelect();
    if (!isOpen) return null;

    return (
        <div
            className={`
        absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-sm
        border  bg-foreground shadow-md
        ${className}
      `}
        >
            <div className=" space-y-1">{children}</div>
        </div>
    );
};


export default SelectContent;