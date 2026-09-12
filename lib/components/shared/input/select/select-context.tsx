import { createContext } from "react";
import { SelectContextType } from "./types";


const SelectContext = createContext<SelectContextType | null>(null);



export default SelectContext;