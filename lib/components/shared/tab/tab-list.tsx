import React, { ReactNode } from "react";
import TabsContext from "./tab-context";

const TabList = ({ children, className = '' }: { children: ReactNode, className?: string }) => {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error('TabsList must be used within Tabs');
    const { orientation, variant } = context;

    const baseClasses = orientation === 'vertical'
        ? 'flex flex-col min-w-[200px] gap-1'
        : 'flex flex-wrap gap-1';

    // Pills specific spacing
    const variantClasses = variant === 'pills' && orientation === 'horizontal'
        ? 'border-b-0 gap-2'
        : '';

    return (
        <div className={`${baseClasses} ${variantClasses} ${className}`} role="tablist">
            {children}
        </div>
    );
};

export default TabList;