import React, { useState } from 'react';
import Sidebar, { SidebarNavItem } from './components/sidebar/sidebar';
import Header from './components/header/header';

// --- MAIN APP ---
interface LayoutProps {
    children: React.ReactNode;
    logoSrc: string;
    navItems: SidebarNavItem[];
    notificationsDropdownContents?: React.ReactNode;
    settingsModalContents?: React.ReactNode;
    profileDropdownContents?: React.ReactNode;
    searchDropdownContents?: React.ReactNode;
    handleSearch?: (value: string) => void;
}


const Layout: React.FC<LayoutProps> = ({
    children,
    logoSrc,
    navItems,
    notificationsDropdownContents,
    profileDropdownContents,
    searchDropdownContents,
    handleSearch
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);


    return (
        <div className={`flex h-screen font-sans overflow-hidden components`}>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} logoSrc={logoSrc} navItems={navItems} />
            <div className="flex-1 flex flex-col min-w-0">
                <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    notificationsDropdownContents={notificationsDropdownContents}
                    profileDropdownContents={profileDropdownContents}
                    searchDropdownContents={searchDropdownContents}
                    handleSearch={handleSearch}
                />
                <main className="flex-1 overflow-auto py-6 px-4 lg:px-[30px]">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
