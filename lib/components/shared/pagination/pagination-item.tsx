import React from "react";
import { PaginationItemProps } from "./types";
import PaginationContext from "./pagination-context";

const PaginationItem = ({
    children,
    active = false,
    disabled = false,
    onClick,
    href = '#'
}: PaginationItemProps) => {
    const { size, rounded } = React.useContext(PaginationContext);

    // Size Styling
    const sizeClasses = {
        sm: 'px-2 py-1 text-xs min-w-[32px] h-[32px]',
        md: 'px-3 py-2 text-sm min-w-[40px] h-[40px]',
        lg: 'px-4 py-3 text-base min-w-[48px] h-[48px]',
    }[size];

    // Shape Styling
    const shapeClasses = rounded ? 'rounded-full' : 'rounded-md';

    // State Styling
    let stateClasses = '';
    if (disabled) {
        stateClasses = 'text-gray-900 dark:text-white cursor-not-allowed bg-background';
    } else if (active) {
        stateClasses = 'bg-secondary text-white';
    } else {
        stateClasses = 'text-gray-900 dark:text-white bg-background transition-all';
    }

    const Component = disabled ? 'span' : 'a';

    return (
        <li>
            <Component
                href={disabled ? undefined : href}
                onClick={(e: React.MouseEvent) => {
                    if (disabled) e.preventDefault();
                    else if (onClick) onClick(e);
                }}
                className={`
          flex items-center justify-center font-medium leading-none
          ${sizeClasses}
          ${shapeClasses}
          ${stateClasses}
          focus:outline-none focus:z-10 relative
        `}
            >
                {children}
            </Component>
        </li>
    );
};

export default PaginationItem;