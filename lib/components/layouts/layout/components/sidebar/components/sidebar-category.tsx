import React from 'react';

interface SidebarCategoryProps {
    title: string;
}

const SidebarCategory: React.FC<SidebarCategoryProps> = ({ title }) => (
    <div className="pl-2 pr-6 mt-5 mb-2 text-sm font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider">{title}</div>
);

export default SidebarCategory;