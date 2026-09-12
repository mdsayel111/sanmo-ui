import {
    type LucideIcon
} from "lucide-react";

export interface ProfileMenuItem {
    label: string;
    icon?: LucideIcon;
    onClick?: () => void;
    className?: string;
}

export interface ProfileDropdownContentsProps {
    username?: string;
    menuItems?: ProfileMenuItem[];
    logoutItem?: ProfileMenuItem;
}

export default function ProfileDropdownContents({
    username = "Gabriel",
    menuItems,
    logoutItem,
}: ProfileDropdownContentsProps) {
    return (
        <div className="flex flex-col items-start min-w-[220px]">
            {/* Welcome Text */}
            {username && (
                <p className="text-nowrap mb-2 text-gray-700 dark:text-gray-300 font-semibold text-sm">
                    Welcome, {username}!
                </p>
            )}

            {/* Menu Items */}
            {menuItems && menuItems.length > 0 && (
                <div className="space-y-2 mb-2 border-y border-gray-200 dark:border-gray-800 py-2 w-full">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <button
                                key={index}
                                onClick={item.onClick}
                                className={`text-slate-600 dark:text-slate-200 hover:text-slate-400 dark:hover:text-slate-400 flex items-center gap-2 transition-colors ${item.className || ""
                                    }`}
                            >
                                {Icon && <Icon size={17} />}
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Logout */}
            {logoutItem && (
                <button
                    onClick={logoutItem.onClick}
                    className={`flex items-center gap-2 transition-colors ${logoutItem.className || "text-red-500"
                        }`}
                >
                    {logoutItem.icon && <logoutItem.icon size={17} />}
                    {logoutItem.label}
                </button>
            )}
        </div>
    );
}