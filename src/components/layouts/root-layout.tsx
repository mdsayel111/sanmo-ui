import {
    ArrowRightLeft,
    Component,
    GitCompareArrowsIcon,
    LayoutPanelLeftIcon,
    LockKeyholeIcon,
    MonitorStopIcon,
    Sheet
} from 'lucide-react';

import { Outlet } from 'react-router-dom';
import { SidebarNavItem } from '../../../lib/components/layouts/layout/components/sidebar/sidebar';
import NotificationDropdownContents from '../../../lib/components/shared/header/notification-dropdown-contents';
import ProfileDropdownContents from '../../../lib/components/shared/header/profile-dropdown-contents';
import SearchDropdownContents from '../../../lib/components/shared/header/search-dropdown-contents';
import { RootLayout as LibRootLayout } from '../../../lib/index';
import { notifications } from '../../constants/notifications';
import { logoutItem, menuItems } from '../../constants/profile';
import { searchItems } from '../../constants/search';

const navItemsData: SidebarNavItem[] = [
    {
        category: "Apps",
    },
    {
        name: 'Installation',
        href: '/',
        icon: MonitorStopIcon,
    },
    // {
    //     name: 'Analitics',
    //     href: '/',
    //     icon: ChartBarIcon,
    // },
    // {
    //     name: 'Messages',
    //     href: '/messages',
    //     icon: MessageSquareTextIcon,
    // },
    // {
    //     name: 'Emails',
    //     href: '/emails',
    //     icon: MailIcon,
    // },
    // {
    //     name: 'Todos',
    //     href: '/todos',
    //     icon: ListChecksIcon,
    // },
    // {
    //     name: 'Invoice',
    //     href: '/invoice',
    //     icon: FileMinusIcon,
    // },
    // {
    //     category: "Custom",
    // },
    {
        category: "Layouts",
    },
    {
        name: 'Root Layout',
        href: '/root-layout',
        icon: LayoutPanelLeftIcon,
    },
    {
        category: "Custom",
    },
    {
        name: 'Authentication',
        icon: LockKeyholeIcon,
        children: [
            {
                name: 'Sign In',
                href: '/signin',
            },
            {
                name: 'Sign Up',
                href: '/signup',
            },
            {
                name: 'Reset Password',
                href: '/reset-password',
            },
        ],
    },
    {
        category: "Components",
    },
    {
        name: 'Basic Components',
        href: '/components',
        icon: Component,
        children: [
            {
                name: 'Buttons',
                href: '/components/buttons',
            },
            {
                name: 'Breadcrumbs',
                href: '/components/breadcrumbs',
            },
            {
                name: 'Badges',
                href: '/components/badges',
            },
            {
                name: 'Dropdowns',
                href: '/components/dropdowns',
            },
            {
                name: 'Modals',
                href: '/components/modals',
            },
            {
                name: 'Tabs',
                href: '/components/tabs',
            },
            {
                name: 'Drawers',
                href: '/components/drawers',
            },
            {
                name: 'Paginations',
                href: '/components/paginations',
            },
            {
                name: 'Tooltips',
                href: '/components/tooltips',
            },
            {
                name: 'Toasts',
                href: '/components/toasts',
            },
            {
                name: 'Accordions',
                href: '/components/accordions',
            },
            {
                name: 'Alerts',
                href: '/components/alerts',
            },
            {
                name: 'Avatars',
                href: '/components/avatars',
            },
            {
                name: 'Collapses',
                href: '/components/collapses',
            },
            {
                name: 'Popovers',
                href: '/components/popovers',
            },
            {
                name: 'Spinners',
                href: '/components/spinners',
            },

        ],
    },
    {
        name: 'Inputs',
        href: '/components',
        icon: GitCompareArrowsIcon,
        children: [
            {
                name: 'Ratings',
                href: '/components/ratings',
            },
            {
                name: 'Inputs',
                href: '/components/inputs',
            },
            {
                name: 'Checkbox & Radio',
                href: '/components/checkboxesAndRadios',
            },
            {
                name: 'Choice Select',
                href: '/components/choice-select',
            },
            {
                name: 'Date & Time Picker',
                href: '/components/date-and-time-picker',
            },
            {
                name: 'File Uploader',
                href: '/components/file-uploader',
            },
            {
                name: 'Text Editor',
                href: '/components/text-editor',
            },
            {
                name: 'Masked Input',
                href: '/components/mask-inputs',
            },
            {
                name: 'Sliders',
                href: '/components/sliders',
            },
        ],
    },
    {
        name: 'Table',
        href: '/table',
        icon: Sheet,
    },
    {
        name: 'Pagination',
        href: '/pagination',
        icon: ArrowRightLeft,
    },
]

type RootLayoutProps = {
    navItems?: SidebarNavItem[];
    logo: string;
}



export default function RootLayout({ navItems = navItemsData, logo }: RootLayoutProps) {
    return (
        <LibRootLayout
            navItems={navItems}
            logoSrc={logo}
            notificationsDropdownContents={
                <NotificationDropdownContents
                    notifications={notifications}
                    handleClearAll={() => { }}
                    handleViewAll={() => { }}
                />
            }
            profileDropdownContents={
                <ProfileDropdownContents
                    username='Sanmo'
                    menuItems={menuItems}
                    logoutItem={logoutItem}
                />
            }
            searchDropdownContents={<SearchDropdownContents
                items={searchItems}
            />}
            handleSearch={(value) => {
                console.log(value);
            }}
        >
            <Outlet />
        </LibRootLayout>
    )
}
