export interface NavItem {
    name: string;
    href?: string;
    icon?: React.ComponentType<{ size?: number }>;
    children?: NavItem[];
}

export interface CategoryItem {
    category: string;
}
