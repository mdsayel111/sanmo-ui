import React, { ReactNode } from 'react';
import { cn } from '../../../lib/components/utils/cn';

interface SectionProps {
    title?: string;
    description?: ReactNode;
    children: ReactNode;
    className?: string;
    contentClassName?: string;
}

const Section: React.FC<SectionProps> = ({
    title,
    description,
    children,
    className,
    contentClassName,
}) => (
    <div className={cn("mb-12 border border-slate-200 dark:border-slate-700/50 bg-foreground rounded-xl p-6 md:p-8 backdrop-blur-sm", contentClassName)}>
        {
            (title || description) && (<div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-1">{title}</h2>
                <p className="text-sm text-slate-700 dark:text-slate-300">{description}</p>
            </div>)
        }
        <div className={cn(" space-x-3 space-y-3 items-center ", className)}>{children}</div>
    </div>
);

export default Section;