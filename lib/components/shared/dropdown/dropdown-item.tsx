import React, { ReactNode } from 'react';

interface DropdownItemProps {
    children: ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    header?: boolean;
}

// Helper Components exported as part of the system
const DropdownItem: React.FC<DropdownItemProps> = ({
    children, active, disabled, onClick, header
}) => {
    if (header) {
        return <div className="px-4 py-2 text-xs font-semibold dark:text-gray-500 uppercase tracking-wider">{children}</div>;
    }
    return (
        <button
            onClick={(e) => {
                if (disabled) e.preventDefault();
                else if (onClick) onClick();
            }}
            disabled={disabled}
            className={`
        w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-background
        ${active ? 'bg-secondary text-black dark:text-white' : 'dark:text-slate-300 text-gray-700  dark:hover:text-white hover:text-slate-500'}
        ${disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : ''}
        transition-colors duration-150
      `}
    //   style={{
    //     color: "var(--foreground)",
    //   }}
        >
            {children}
        </button>
    );
};

export default DropdownItem;