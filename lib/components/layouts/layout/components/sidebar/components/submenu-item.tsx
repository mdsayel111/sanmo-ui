import React from 'react';


interface SubMenuItemProps {
    label: string;
    isActive?: boolean;
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({ label, isActive }) => (
    <li
        className={`
    pl-9 py-2 text-sm cursor-pointer rounded-md transition-colors
    ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'}
  `}
    >
        {label}
    </li>
);

export default SubMenuItem;