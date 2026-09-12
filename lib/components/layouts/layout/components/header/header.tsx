import {
    Menu,
    Moon,
    Sun
} from 'lucide-react';
import { useEffect, useState } from 'react';
import Minimize from './components/minimize';
import NotificationDropdown from './components/notification-dropdown';
import ProfileDropdown from './components/profile-dropdown';
import SearchDropdown from './components/search-dropdown';

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (value: boolean) => void;
    notificationsDropdownContents?: React.ReactNode;
    profileDropdownContents?: React.ReactNode;
    searchDropdownContents?: React.ReactNode;
    handleSearch?: (value: string) => void;
}

export default function Header({
    sidebarOpen,
    setSidebarOpen,
    notificationsDropdownContents,
    profileDropdownContents,
    searchDropdownContents,
    handleSearch,
}: HeaderProps) {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);


    return (
        <header className="h-16 bg-foreground flex items-center justify-between px-4 lg:pl-6 lg:pr-10 shadow-sm z-10">
            <div className="flex items-center gap-4 flex-1">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className=" text-slate-600 dark:text-slate-200 rounded-md">
                    <Menu size={24} />
                </button>
                {
                    searchDropdownContents && <SearchDropdown handleSearch={handleSearch}>
                        {searchDropdownContents}
                    </SearchDropdown>
                }
            </div>

            <div className="flex items-center gap-4 sm:gap-5 h-full">
                <button className="text-slate-600 dark:text-slate-200 hover:text-slate-400 dark:hover:text-slate-400 block" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                    {
                        theme === "light" ? (
                            <Moon size={24} />
                        ) : (
                            <Sun size={24} />
                        )
                    }
                </button>
                <Minimize />
                {
                    notificationsDropdownContents && <NotificationDropdown>
                        {notificationsDropdownContents}
                    </NotificationDropdown>
                }
                {
                    profileDropdownContents && <ProfileDropdown>
                        {profileDropdownContents}
                    </ProfileDropdown>
                }
            </div>
        </header>
    )
}
