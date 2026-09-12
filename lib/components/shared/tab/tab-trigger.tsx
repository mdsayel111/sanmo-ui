import React, { ReactNode } from "react";
import TabsContext from "./tab-context";

const TabTrigger = ({
    value,
    children,
    className = ''
}: {
    value: string,
    children: ReactNode,
    className?: string
}) => {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error('TabsTrigger must be used within Tabs');
    const { activeTab, setActiveTab, variant, orientation, justified } = context;

    const isActive = activeTab === value;

    // Base styles
    let styles = `
    px-4 py-2 text-sm font-medium transition-all duration-200 outline-none
  `;

    if (justified) styles += ' flex-1 text-center justify-center';

    // Variant Styles
    if (variant === 'tabs') {
        if (orientation === 'horizontal') {
            styles += ` border-b-2 -mb-px hover:text-blue-400 ${isActive
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-slate-800 dark:text-slate-300 hover:border-blue-500'}`;
        } else {
            // Vertical Tabs (Left/Right) - typically simulate a pill or side-border look. 
            // Emulating the Bootstrap/Standard look:
            styles += ` text-left rounded-md hover:bg-slate-800 hover:text-white ${isActive
                ? 'bg-slate-800 text-white'
                : 'text-slate-800 dark:text-slate-300'}`;
        }
    } else if (variant === 'pills') {
        styles += ` rounded-md hover:text-white ${isActive
            ? 'bg-blue-600 text-white'
            : 'text-slate-800 dark:text-slate-300 hover:bg-slate-800'}`;
    }

    return (
        <button
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveTab(value)}
            className={`${styles} ${className}`}
        >
            {children}
        </button>
    );
};

export default TabTrigger;