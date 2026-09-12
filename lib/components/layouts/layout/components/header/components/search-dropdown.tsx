import { Search } from 'lucide-react';
import Dropdown from '../../../../../shared/dropdown/dropdown';
import DropdownContent from '../../../../../shared/dropdown/dropdown-content';
import DropdownPlaceholder from '../../../../../shared/dropdown/dropdown-placeholder';

export default function SearchDropdown({ children, handleSearch }: { children: React.ReactNode, handleSearch?: (value: string) => void }) {
    return (
        <div className="flex items-center gap-3 pl-2 h-full">
            <Dropdown
                className='h-full flex items-center justify-center gap-2'
                direction='rightBottom'
            >
                <DropdownPlaceholder className='flex justify-center items-center'>
                    <div className="hidden sm:flex items-center bg-background rounded-md px-3 py-2  w-[350px]">
                        <Search size={16} className="text-slate-400 dark:text-slate-200 mr-2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm text-slate-600 dark:text-slate-200 w-full placeholder-slate-400 dark:placeholder-slate-200"
                            onChange={(e) => handleSearch?.(e.target.value)}
                        />
                    </div>
                </DropdownPlaceholder>
                <DropdownContent
                    className='mt-1 w-[350px] px-0'
                >
                    {children}
                </DropdownContent>
            </Dropdown>
        </div>
    )
}
