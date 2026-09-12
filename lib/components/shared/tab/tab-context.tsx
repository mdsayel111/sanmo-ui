import React from "react";
import { TabOrientation, TabVariant } from "./types";

interface TabContextType {
    activeTab: string;
    setActiveTab: (value: string) => void;
    variant: TabVariant;
    orientation: TabOrientation;
    justified: boolean;
}

const TabContext = React.createContext<TabContextType | undefined>(undefined);

export default TabContext;