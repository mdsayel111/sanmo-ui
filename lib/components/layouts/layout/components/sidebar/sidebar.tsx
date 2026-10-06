
import { useEffect, useState } from 'react';
// @ts-ignore
import logo from '../../../../../assets/logo.webp';
import SidebarItem from './components/sidebar-item';
import { CategoryItem, NavItem } from './type';

export type SidebarNavItem = NavItem | CategoryItem;

const normalizePath = (path?: string) => {
    if (path === undefined) return undefined;
    return path.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/';
};

const isItemActive = (item: NavItem, currentPath?: string): boolean => {
    const itemPath = normalizePath(item.href);
    return (
        currentPath !== undefined
        && (
            (itemPath !== undefined && normalizePath(currentPath) === itemPath)
            || !!item.children?.some((child) => isItemActive(child, currentPath))
        )
    );
};

const getActiveParentNames = (items: SidebarNavItem[], currentPath?: string): string[] => {
    if (currentPath === undefined) return [];

    return items.flatMap((item) => {
        if ('category' in item || !item.children?.length) return [];
        if (!item.children.some((child) => isItemActive(child, currentPath))) return [];
        return [item.name, ...getActiveParentNames(item.children, currentPath)];
    });
};

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;
    logoSrc?: string;
    navItems: SidebarNavItem[];
    LinkComponent?: React.ElementType;
    currentPath?: string;
}



export default function Sidebar({
    sidebarOpen,
    setSidebarOpen,
    logoSrc = logo,
    navItems = [],
    LinkComponent,
    currentPath,
}: SidebarProps) {
    const [expandedMenus, setExpandedMenus] = useState<string[]>(() => getActiveParentNames(navItems, currentPath));

    useEffect(() => {
        setExpandedMenus(getActiveParentNames(navItems, currentPath));
    }, [navItems, currentPath]);

    return (
        <div>
            < div
                className={`fixed inset-0 bg-black/50 dark:bg-white/50 z-20 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`
                }
                onClick={() => setSidebarOpen(false)}
            />
            <aside
                className={`
          fixed lg:static inset-y-0 left-0 z-30 overflow-y-auto bg-foreground h-screen text-grey-900 dark:text-gray-300 flex flex-col
          ${sidebarOpen ? 'translate-x-0 w-[270px]' : '-translate-x-full lg:translate-x-0 lg:w-0'}
        `}
            >
                <div className='w-full'>
                    {/* Logo Area */}
                    <div className="h-16 flex items-center pl-3.5 pr-6 bg-foreground border-b border-slate-700/30 sticky top-0">
                        <img src={logoSrc} alt="logo" className="w-28" />
                    </div>

                    {/* Scrollable Menu Area */}
                    <div className={`flex-1 px-3 overflow-x-hidden overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-600 space-y-1`}>
                        {navItems.map((item, i) => (
                            <SidebarItem
                                key={i}
                                item={item}
                                expandedMenus={expandedMenus}
                                setExpandedMenus={setExpandedMenus}
                                LinkComponent={LinkComponent}
                                currentPath={currentPath}
                            />
                        ))}
                    </div>
                </div>
            </aside>
        </div>
    )
}
