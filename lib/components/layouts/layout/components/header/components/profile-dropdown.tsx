import Dropdown from '../../../../../shared/dropdown/dropdown'
import DropdownContent from '../../../../../shared/dropdown/dropdown-content'
import DropdownPlaceholder from '../../../../../shared/dropdown/dropdown-placeholder'

export default function ProfileDropdown({ children, profileImageSrc }: { children: React.ReactNode; profileImageSrc: string }) {
    return (
        <div className="flex items-center gap-3 pl-2 h-full">
            <Dropdown
                className='h-full flex items-center justify-center gap-2'
                direction='rightBottom'
            >
                <DropdownPlaceholder>
                    <img
                        src={profileImageSrc}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-sm cursor-pointer"
                    />
                </DropdownPlaceholder>
                <DropdownContent
                    className='mt-1 w-[180px]  px-4 py-2'
                >
                    {children}
                </DropdownContent>
            </Dropdown>
        </div>
    )
}
