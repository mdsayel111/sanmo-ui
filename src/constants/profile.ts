import { LogOut, MessageSquareMore, Settings, UserRound } from "lucide-react";
import { ProfileMenuItem } from "../../lib/components/shared/header/profile-dropdown-contents";

export const menuItems: ProfileMenuItem[] = [
    {
        label: "Profile",
        icon: UserRound,
    },
    {
        label: "Message",
        icon: MessageSquareMore,
    },
    {
        label: "Settings",
        icon: Settings,
    },
];

export const logoutItem: ProfileMenuItem = {
    label: "Logout",
    icon: LogOut,
    className: "text-red-500",
};
