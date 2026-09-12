import React, { ReactNode, useState } from 'react';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
    content: ReactNode;
    children: ReactNode;
    position?: TooltipPosition;
    className?: string;
    delay?: number;
}

const Tooltip = ({
    content,
    children,
    position = 'top',
    className = '',
    delay = 200
}: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounting, setIsMounting] = useState(false);
    // @ts-ignore
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const show = () => {
        timeoutRef.current = setTimeout(() => {
            setIsMounting(true);
            // Small delay to trigger animation
            requestAnimationFrame(() => setIsVisible(true));
        }, delay);
    };

    const hide = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsVisible(false);
        // Wait for animation to finish before unmounting
        setTimeout(() => setIsMounting(false), 200);
    };

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    }[position];

    const arrowClasses = {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-foreground border-l-transparent border-r-transparent border-b-transparent',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-foreground border-l-transparent border-r-transparent border-t-transparent',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-foreground border-t-transparent border-b-transparent border-r-transparent',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-foreground border-t-transparent border-b-transparent border-l-transparent',
    }[position];

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
        >
            {children}
            {isMounting && (
                <div
                    role="tooltip"
                    className={`
            absolute z-50 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-white bg-foreground rounded shadow-xl shadow-gray-400/50 dark:shadow-slate-700/50 border border-slate-200 dark:border-slate-700
            whitespace-nowrap transition-all duration-200 ease-out origin-center
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            ${positionClasses}
            ${className}
          `}
                >
                    {content}
                    {/* Arrow */}
                    <div className={`absolute w-0 h-0 border-4 ${arrowClasses}`} />
                </div>
            )}
        </div>
    );
};

export default Tooltip;