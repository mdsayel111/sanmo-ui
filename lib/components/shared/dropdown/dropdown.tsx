import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import React, { ReactNode, useRef, useState } from 'react';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { DropdownContext } from './dropdown-context';
import { cn } from '../../utils/cn';


export type DropdownVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'dark' | 'link';
export type DropdownDirection = 'up' | 'down' | 'left' | 'right' | 'rightBottom';
export type AutoCloseBehavior = 'true' | 'inside' | 'outside' | 'manual';
export type DropdownStyleType = 'solid' | 'outline' | 'soft';

export interface DropdownProps {
    label?: ReactNode;
    variant?: DropdownVariant;
    styleType?: DropdownStyleType;
    split?: boolean;
    direction?: DropdownDirection;
    // darkMenu?: boolean;
    autoClose?: AutoCloseBehavior;
    // content?: ReactNode;
    className?: string;
    // menuClassName?: string;
    // options?: DropdownOption[];
    value?: any;
    // onChange?: (value: any) => void;
    triggerClassName?: string;
    children?: ReactNode;
}

export interface DropdownOption {
    label: string;
    value: any;
}



// Main Component
const Dropdown: React.FC<DropdownProps> = ({
    label,
    variant = 'secondary',
    styleType = 'solid',
    split = false,
    direction = 'down',
    // darkMenu = false,
    autoClose = 'true',
    // content,
    className = 'w-48',
    // menuClassName = '',
    // options = [],
    // onChange,
    triggerClassName = '',
    children
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useOnClickOutside(ref as any, () => {
        if (autoClose === 'true' || autoClose === 'outside') setIsOpen(false);
    });

    const toggle = () => setIsOpen(!isOpen);

    const getVariantClasses = (isSplitPart = false): string => {
        const base = "font-medium text-sm transition-all duration-200 focus:outline-none";

        // Shape logic
        const rounded = split
            ? (isSplitPart ? "rounded-l-md border-r border-black/10" : "rounded-r-md px-2")
            : "rounded-md px-4 py-2";

        const padding = split && !isSplitPart ? "px-2 py-2" : "px-4 py-2";

        const colors: Record<DropdownVariant, string> = {
            primary: "bg-secondary/80 hover:bg-secondary text-white",
            secondary: "bg-slate-700 hover:bg-slate-600 text-white",
            success: "bg-emerald-600 hover:bg-emerald-700 text-white",
            danger: "bg-rose-600 hover:bg-rose-700 text-white",
            dark: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700",
            link: "bg-transparent text-blue-400 hover:text-blue-300 underline shadow-none px-0 hover:bg-transparent"
        };

        return `${base} ${!split || !isSplitPart ? rounded : 'rounded-l-md'} ${colors[variant]} ${padding}`;
    };

    const getMenuPosition = (): string => {
        const positions: Record<DropdownDirection, string> = {
            up: "bottom-full left-0 mb-2 origin-bottom-left",
            left: "right-full top-0 mr-2 origin-top-right",
            right: "left-full top-0 ml-2 origin-top-left",
            rightBottom: "top-full right-0 mt-2 origin-top-right",
            down: "top-full left-0 mt-2 origin-top-left"
        };
        return positions[direction];
    };

    const renderArrow = () => {
        const size = 16;
        switch (direction) {
            case 'left': return <ChevronLeft size={size} />;
            case 'right': return <ChevronRight size={size} />;
            case 'up': return <ChevronUp size={size} />;
            default: return <ChevronDown size={size} />;
        }
    };

    const triggerColors: Record<DropdownVariant, Record<DropdownStyleType, string>> = {
        primary: {
            solid: "border-secondary/80 bg-secondary/80 text-white hover:bg-secondary",
            outline: "border-secondary bg-white text-secondary hover:bg-secondary/5 dark:bg-slate-900",
            soft: "border-secondary/30 bg-secondary/10 text-secondary hover:bg-secondary/20"
        },
        secondary: {
            solid: "border-slate-700 bg-slate-700 text-white hover:bg-slate-600",
            outline: "border-slate-500 bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300",
            soft: "border-slate-500/30 bg-slate-500/10 text-slate-600 hover:bg-slate-500/20 dark:text-slate-300"
        },
        success: {
            solid: "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700",
            outline: "border-emerald-600 bg-white text-emerald-600 hover:bg-emerald-50 dark:bg-slate-900",
            soft: "border-emerald-600/30 bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600/20"
        },
        danger: {
            solid: "border-rose-600 bg-rose-600 text-white hover:bg-rose-700",
            outline: "border-rose-500 bg-white text-rose-500 hover:bg-rose-50 dark:bg-slate-900",
            soft: "border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
        },
        dark: {
            solid: "border-slate-800 bg-slate-800 text-white hover:bg-slate-700",
            outline: "border-slate-600 bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300",
            soft: "border-slate-500/30 bg-slate-500/10 text-slate-700 hover:bg-slate-500/20 dark:text-slate-300"
        },
        link: {
            solid: "border-transparent bg-transparent px-0 text-blue-600 underline hover:text-blue-700",
            outline: "border-transparent bg-transparent px-0 text-blue-600 underline hover:text-blue-700",
            soft: "border-transparent bg-transparent px-0 text-blue-600 underline hover:text-blue-700"
        }
    };

    return (
        <div className={cn(`relative inline-block text-left`, className)} ref={ref}>
            <DropdownContext.Provider value={{ toggle, isOpen, getVariantClasses, renderArrow, getMenuPosition }}>
                {label !== undefined && (
                    <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={isOpen}
                        onClick={toggle}
                        className={cn(
                            "inline-flex items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                            triggerColors[variant][styleType],
                            triggerClassName
                        )}
                    >
                        {label}
                        {renderArrow()}
                    </button>
                )}
                {children}
            </DropdownContext.Provider>
            {/* {
                (split ? (
                    <span onClick={toggle} className='flex'>
                        <button type="button" className={cn(getVariantClasses(true), "focus:outline-0 focus:ring-0")}>
                            {label}
                        </button>
                        <button type="button" className={cn(getVariantClasses(false), "focus:outline-0 focus:ring-0")} >
                            {renderArrow()}
                        </button>
                    </span>
                ) : (
                    <button type="button" className={`${getVariantClasses()} flex items-center gap-2`} onClick={toggle}>
                        {label}
                        {variant !== 'link' && renderArrow()}
                    </button>
                ))
            } */}
            {/* {isOpen && (
                <div
                    className={`
            absolute z-50 min-w-48
            bg-foreground rounded-lg border border-white/5 dark:border-black/5
             ring-opacity-5 focus:outline-none
            animate-in fade-in zoom-in-95 duration-150 ease-out
            ${getMenuPosition()}
            ${darkMenu ? 'bg-slate-900 border-slate-800' : ''}
            ${menuClassName}
          `}
                >
                    <div className="py-1.5" onClick={() => (autoClose === 'true' || autoClose === 'inside') && setIsOpen(false)}>
                        {content || (
                            <>
                                {options?.map((option, index) => (
                                    <DropdownItem key={index} onClick={() => onChange && onChange(option.value)}>
                                        {option.label}
                                    </DropdownItem>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default Dropdown;