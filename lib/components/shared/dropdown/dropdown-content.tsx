import React, { useContext, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { DropdownContext } from './dropdown-context';

export default function DropdownContent({ children, className }: { children: React.ReactNode, className?: string }) {
    const context = useContext(DropdownContext);

    if (!context) throw new Error("DropdownContent must be inside a Dropdown");
    const { isOpen, getMenuPosition, getMenuStyle, menuRef } = context;
    const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

    useLayoutEffect(() => {
        if (!isOpen) return;

        const updatePosition = () => {
            if (menuRef.current) setMenuStyle(getMenuStyle(menuRef.current));
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [getMenuStyle, isOpen, menuRef]);

    if (!isOpen || typeof document === 'undefined') return null;

    return createPortal(
        <div
            ref={menuRef}
            role="menu"
            style={{
                position: 'fixed',
                width: 'max-content',
                ...menuStyle
            }}
            className={cn("z-50 bg-foreground rounded-lg border border-slate-200 dark:border-slate-700 ring-opacity-5 focus:outline-none overflow-x-hidden overflow-y-auto animate-in fade-in zoom-in-95 duration-150 ease-out", getMenuPosition(), className)}
        >
            {children}
        </div>,
        document.body
    );
}
