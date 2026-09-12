import { Dispatch, SetStateAction } from "react";

export interface SelectContextType {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    value: SelectValueType;
    handleSelect: (value: string) => void;
    multiple: boolean;
    options: SelectOption[];
}

export type SelectValueType = string | string[];

export type SelectOption = {
    label: string;
    value: any;
}