import React, { useContext } from 'react';
import { cn } from '../../utils/cn';
import { DropdownContext } from './dropdown-context';

export default function DropdownContent({ children, className }: { children: React.ReactNode, className?: string }) {
    const context = useContext(DropdownContext);

    if (!context) throw new Error("DropdownContent must be inside a Dropdown");
    const { isOpen, getMenuPosition } = context;
    return (
        <>
            {isOpen && (
                <div className={cn("absolute z-50 bg-foreground rounded-lg border border-slate-200 dark:border-slate-700 ring-opacity-5 focus:outline-none overflow-hidden animate-in fade-in zoom-in-95 duration-150 ease-out w-full ", getMenuPosition(), className)}>
                    {children}
                </div>
            )}
        </>
    )
}
