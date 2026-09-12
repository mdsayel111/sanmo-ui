import { Bell } from 'lucide-react';
import Dropdown from '../../../../../shared/dropdown/dropdown';
import DropdownContent from '../../../../../shared/dropdown/dropdown-content';
import DropdownPlaceholder from '../../../../../shared/dropdown/dropdown-placeholder';

export default function NotificationDropdown({ children }: { children: React.ReactNode }) {


    return (
        <div className="flex items-center gap-3 pl-2 h-full">
            <Dropdown
                className='h-full flex items-center justify-center gap-2'
                direction='rightBottom'
            >
                <DropdownPlaceholder className='flex justify-center items-center'>
                    <button className="text-slate-600 dark:text-slate-200 hover:text-slate-400 dark:hover:text-slate-400 relative">
                        <Bell size={24} />
                        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold px-1 rounded-full h-4 min-w-4 flex items-center justify-center">
                            5
                        </span>
                    </button>
                </DropdownPlaceholder>
                <DropdownContent
                    className='mt-1 w-[350px] px-0 py-2'
                >
                    {children}
                </DropdownContent>
            </Dropdown>
        </div>
    )
}
