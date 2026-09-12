import { createContext, ReactNode } from "react";

export interface DropdownContext {
    toggle: () => void;
    isOpen: boolean;
    getVariantClasses: (isSplitPart?: boolean) => string;
    renderArrow: () => ReactNode;
    getMenuPosition: () => string;
}

export const DropdownContext = createContext<DropdownContext>({} as DropdownContext);