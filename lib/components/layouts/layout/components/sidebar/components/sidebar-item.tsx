import { ChevronDown, ChevronRight } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../../../../../utils/cn";
import { CategoryItem, NavItem } from "../type";
import SidebarCategory from "./sidebar-category";



interface SidebarItemProps {
    item: NavItem | CategoryItem;
    depth?: number;
    expandedMenus: string;
    setExpandedMenus: any;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, depth = 0, expandedMenus, setExpandedMenus }) => {
    if ('category' in item) {
        return <SidebarCategory title={item.category} />;
    }

    const hasChildren = !!item.children?.length;
    const Icon = item.icon;

    const paddingLeft = 16 + depth * 11;

    return (
        <div>

            {/* Item row */}
            <div
                onClick={() => hasChildren ? setExpandedMenus(expandedMenus === item?.name ? "" : item?.name) : setExpandedMenus("")}
            >
                {/* Use Link only if there is no submenu */}
                {!hasChildren ? (
                    <>
                        <NavLink
                            to={item.href || "#"}
                            className={({ isActive }) => cn(
                                "text-sm font-medium gap-2 flex items-center py-2 px-2 cursor-pointer text-grey-900 dark:text-gray-300 hover:text-black dark:hover:text-white",
                                isActive && "text-secondary dark:text-secondary bg-background hover:text-secondary rounded-sm",
                                depth === 0 ? " w-full hover:bg-background" : "duration-300 transition-transform hover:translate-x-2 bg-transparent w-fit",
                            )}
                            onClick={e => e.stopPropagation()}
                            style={depth !== 0 ? { paddingLeft } : {}}
                        >
                            {Icon && <Icon size={18} />}
                            {item.name}
                        </NavLink>
                    </>
                ) : (
                    <div className={cn(
                        "flex justify-between items-center py-2 px-2 cursor-pointer",
                        expandedMenus === item.name ? "text-secondary bg-background rounded-sm" : "",
                    )}>
                        <div
                            // style={{ paddingLeft, paddingRight }}
                            className="flex items-center gap-2 ">
                            {Icon && <Icon size={18} />}
                            <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        {expandedMenus === item.name ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </div>
                )}
            </div>

            {/* Render children recursively */}
            {hasChildren && expandedMenus === item.name && (
                <div className="">
                    {item.children!.map((child, i) => (
                        <SidebarItem key={i} item={child} depth={depth + 1} expandedMenus={expandedMenus} setExpandedMenus={setExpandedMenus} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SidebarItem;

