import React, { ReactNode } from "react";
import TabsContext from "./tab-context";

const TabsContent = ({
    value,
    children,
    className = ''
}: {
    value: string,
    children: ReactNode,
    className?: string
}) => {
    const context = React.useContext(TabsContext);
    if (!context) throw new Error('TabsContent must be used within Tabs');
    const { activeTab, orientation } = context;

    if (activeTab !== value) return null;

    const animation = "animate-in fade-in slide-in-from-bottom-2 duration-300";
    const layout = orientation === 'vertical' ? 'flex-1 p-0' : 'pt-4';

    return (
        <div
            role="tabpanel"
            className={`${layout} ${animation} text-slate-400 leading-relaxed ${className}`}
        >
            {children}
        </div>
    );
};

export default TabsContent;