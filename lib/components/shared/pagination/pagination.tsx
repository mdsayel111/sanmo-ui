import { ReactNode } from "react";
import PaginationContext from "./pagination-context";
import { PaginationSize } from "./types";

type PaginationAlign = 'start' | 'center' | 'end';


interface PaginationProps {
    children: ReactNode;
    className?: string;
    size?: PaginationSize;
    align?: PaginationAlign;
    rounded?: boolean;
}

const Pagination = ({
    children,
    className = '',
    size = 'md',
    align = 'start',
    rounded = false
}: PaginationProps) => {

    const alignClass = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
    }[align];

    return (
        <PaginationContext.Provider value={{ size, rounded }}>
            <nav aria-label="Page navigation" className={className}>
                <ul className={`flex flex-wrap items-center gap-1 ${alignClass}`}>
                    {children}
                </ul>
            </nav>
        </PaginationContext.Provider>
    );
};

export default Pagination;
