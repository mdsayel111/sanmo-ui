import { ChevronDown, ChevronRight } from "lucide-react";
import React from "react";
import { cn } from "../../../../../utils/cn";
import { CategoryItem, NavItem } from "../type";
import SidebarCategory from "./sidebar-category";



interface SidebarItemProps {
    item: NavItem | CategoryItem;
    depth?: number;
    expandedMenus: string[];
    setExpandedMenus: React.Dispatch<React.SetStateAction<string[]>>;
    LinkComponent?: React.ElementType;
    currentPath?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    item,
    depth = 0,
    expandedMenus,
    setExpandedMenus,
    LinkComponent = 'a',
    currentPath,
}) => {
    if ('category' in item) {
        return <SidebarCategory title={item.category} />;
    }

    const hasChildren = !!item.children?.length;
    const Icon = item.icon;

    const marginLeft = 16 + depth * 11;
    const normalizedPath = (path?: string) => {
        if (path === undefined) return undefined;
        return path.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/';
    };
    const isItemActive = (navItem: NavItem): boolean => {
        const itemPath = normalizedPath(navItem.href);
        return (
            currentPath !== undefined
            && (
                (itemPath !== undefined && normalizedPath(currentPath) === itemPath)
                || !!navItem.children?.some(isItemActive)
            )
        );
    };
    const isActive = isItemActive(item);

    return (
        <div>

            {/* Item row */}
            <div
                onClick={() => hasChildren && setExpandedMenus((menus) => (
                    menus.includes(item.name)
                        ? menus.filter((name) => name !== item.name)
                        : [...menus, item.name]
                ))}
            >
                {/* Use Link only if there is no submenu */}
                {!hasChildren ? (
                    <>
                        <LinkComponent
                            href={item.href || "#"}
                            className={cn(
                                "text-sm font-medium gap-2 flex items-center py-2 px-2 rounded-sm cursor-pointer text-gray-900 dark:text-gray-300 hover:bg-background hover:text-black dark:hover:text-white",
                                isActive && "text-secondary dark:text-secondary bg-background hover:text-secondary",
                            )}
                            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
                            style={depth !== 0 ? { marginLeft } : {}}
                        >
                            {Icon && <Icon size={18} />}
                            {item.name}
                        </LinkComponent>
                    </>
                ) : (
                    <div className={cn(
                        "flex justify-between items-center py-2 px-2 w-full rounded-sm cursor-pointer text-gray-900 dark:text-gray-300 hover:bg-background hover:text-black dark:hover:text-white",
                        isActive && "text-secondary dark:text-secondary bg-background hover:text-secondary",
                    )}>
                        <div
                            className="flex items-center gap-2 ">
                            {Icon && <Icon size={18} />}
                            <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        {expandedMenus.includes(item.name) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </div>
                )}
            </div>

            {/* Render children recursively */}
            {hasChildren && expandedMenus.includes(item.name) && (
                <div className="mt-1 space-y-0.5">
                    {item.children!.map((child, i) => (
                        <SidebarItem
                            key={i}
                            item={child}
                            depth={depth + 1}
                            expandedMenus={expandedMenus}
                            setExpandedMenus={setExpandedMenus}
                            LinkComponent={LinkComponent}
                            currentPath={currentPath}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SidebarItem;
