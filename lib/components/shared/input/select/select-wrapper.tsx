import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";
import SelectContext from "./select-context";
import { SelectOption, SelectValueType } from "./types";

interface SelectWrapperProps {
    children: ReactNode;
    onValueChange?: Dispatch<SetStateAction<any>>;
    defaultValue?: SelectValueType;
    value?: SelectValueType;
    multiple?: boolean;
    options: SelectOption[];
}



const SelectWrapper: React.FC<SelectWrapperProps> = ({
    children,
    onValueChange,
    defaultValue,
    value: controlledValue,
    multiple = false,
    options,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [internalValue, setInternalValue] = useState<SelectValueType>(
        defaultValue ?? (multiple ? [] : '')
    );
    const containerRef = useRef<HTMLDivElement | null>(null);

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleSelect = (itemValue: string) => {
        if (multiple) {
            const currentValues = Array.isArray(value) ? value : [];
            const newValues = currentValues.includes(itemValue)
                ? currentValues.filter(v => v !== itemValue)
                : [...currentValues, itemValue];

            if (!isControlled) setInternalValue(newValues);
            onValueChange?.(newValues);
        } else {
            if (!isControlled) setInternalValue(itemValue);
            onValueChange?.(itemValue);
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    return (
        <SelectContext.Provider
            value={{ isOpen, setIsOpen, value, handleSelect, multiple, options }}
        >
            <div ref={containerRef} className="relative w-full">
                {children}
            </div>
        </SelectContext.Provider>
    );
};

export default SelectWrapper;