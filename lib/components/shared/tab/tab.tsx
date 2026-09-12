import { ReactNode, useState } from 'react';
import TabsContext from './tab-context';
import { TabOrientation, TabVariant } from "./types";

interface TabsProps {
    defaultValue: string;
    variant?: TabVariant;
    orientation?: TabOrientation;
    justified?: boolean;
    reverse?: boolean; // For Vertical Right
    className?: string;
    children: ReactNode;
}



const Tab = ({
    defaultValue,
    variant = 'tabs',
    orientation = 'horizontal',
    justified = false,
    reverse = false,
    className = '',
    children
}: TabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultValue);

    const orientationClasses = orientation === 'vertical'
        ? `flex ${reverse ? 'flex-row-reverse' : 'flex-row'} gap-6`
        : 'flex flex-col';

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab, variant, orientation, justified }}>
            <div className={`${orientationClasses} ${className}`}>
                {children}
            </div>
        </TabsContext.Provider>
    );
};

export default Tab;