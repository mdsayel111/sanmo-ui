import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import PaginationItem from "./pagination-item";
import { PaginationItemProps } from "./types";

// Helper components for Icons to ensure consistency
export const PaginationPrevious = ({ iconOnly = false, ...props }: PaginationItemProps & { iconOnly?: boolean }) => (
    <PaginationItem {...props}>
        {iconOnly ? <ChevronLeft size={16} /> : 'Previous'}
    </PaginationItem>
);

export const PaginationNext = ({ iconOnly = false, ...props }: PaginationItemProps & { iconOnly?: boolean }) => (
    <PaginationItem {...props}>
        {iconOnly ? <ChevronRight size={16} /> : 'Next'}
    </PaginationItem>
);

export const PaginationFirst = (props: PaginationItemProps) => (
    <PaginationItem {...props}>
        <ChevronsLeft size={16} />
    </PaginationItem>
);

export const PaginationLast = (props: PaginationItemProps) => (
    <PaginationItem {...props}>
        <ChevronsRight size={16} />
    </PaginationItem>
);