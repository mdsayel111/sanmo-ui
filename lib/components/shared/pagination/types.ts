import { ReactNode } from "react";

export type PaginationSize = 'sm' | 'md' | 'lg';

export interface PaginationItemProps {
    children?: ReactNode;
    active?: boolean;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    href?: string;
}
