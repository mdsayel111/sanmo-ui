import { createContext } from "react";
import { AccordionContextType } from "./types";

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export default AccordionContext;