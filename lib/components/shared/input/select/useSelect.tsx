import { useContext } from "react";
import SelectContext from "./select-context";
import { SelectContextType } from "./types";

const useSelect = (): SelectContextType => {
    const context = useContext(SelectContext);
    if (!context) {
        throw new Error('Select components must be used within a <Select> wrapper');
    }
    return context;
};

export default useSelect;