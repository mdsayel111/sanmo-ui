import React from "react";
import { PaginationSize } from "./types";

// Context to pass props down to items without prop drilling
const PaginationContext = React.createContext<{ size: PaginationSize; rounded: boolean }>({
    size: 'md',
    rounded: false
});

export default PaginationContext;