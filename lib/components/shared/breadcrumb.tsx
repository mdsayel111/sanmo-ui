import { ChevronRight, Home } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';


export interface BreadcrumbItemType {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    active?: boolean;
}

export interface BreadcrumbProps {
    items: BreadcrumbItemType[];
    separator?: React.ReactNode | string;
    className?: string;
    showHomeIcon?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
    items,
    separator = <ChevronRight size={16} />,
    className = '',
    showHomeIcon = false
}) => {

    // Base classes for the nav container
    const navClasses = "flex text-sm text-slate-400";

    // List item classes
    const listClasses = "inline-flex items-center space-x-2";

    // Link/Text classes
    const linkBaseClasses = "inline-flex items-center font-medium transition-colors duration-200";
    const activeClasses = "text-black dark:text-slate-100 cursor-default pointer-events-none"; // Last item usually
    const inactiveClasses = "text-gray-500 dark:text-gray-500 hover:text-blue-400"; // Clickable items

    return (
        <nav className={`${navClasses} ${className}`} aria-label="Breadcrumb">
            <ol className={listClasses}>

                {/* Optional Auto-Home Icon */}
                {showHomeIcon && (
                    <li className="inline-flex items-center">
                        <a href="#" className={inactiveClasses}>
                            <Home size={16} />
                            <span className="sr-only">Home</span>
                        </a>
                    </li>
                )}

                {/* Breadcrumb Items */}
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    const isActive = item.active || isLast;

                    return (
                        <li key={`${item.label}-${index}`} className="inline-flex items-center">

                            {/* Separator (Don't show before the first item if showHomeIcon is false) */}
                            {(index > 0 || showHomeIcon) && (
                                <span className="mx-2 text-slate-600 select-none">
                                    {separator}
                                </span>
                            )}

                            {/* Item Content */}
                            {isActive ? (
                                <span className={`${linkBaseClasses} ${activeClasses}`}>
                                    {item.icon && <span className="mr-2">{item.icon}</span>}
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    to={item.href || '#'}
                                    className={`${linkBaseClasses} ${inactiveClasses}`}
                                >
                                    {item.icon && <span className="mr-2">{item.icon}</span>}
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;