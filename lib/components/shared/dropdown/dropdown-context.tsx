import { createContext, CSSProperties, ReactNode, RefObject } from "react";
import type { DropdownDirection } from "./dropdown";

export interface DropdownContext {
    toggle: () => void;
    isOpen: boolean;
    getVariantClasses: (isSplitPart?: boolean) => string;
    renderArrow: () => ReactNode;
    getMenuPosition: () => string;
    getMenuStyle: (menu: HTMLElement) => CSSProperties;
    triggerRef: RefObject<HTMLDivElement | null>;
    menuRef: RefObject<HTMLDivElement | null>;
    direction: DropdownDirection;
}

export const DropdownContext = createContext<DropdownContext>({} as DropdownContext);