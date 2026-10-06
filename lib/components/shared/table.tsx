import { ReactNode } from "react";
import { cn } from "../utils/cn";

// export const Avatar = ({ src, alt }: { src: string, alt: string }) => (
//     <img
//         src={src}
//         alt={alt}
//         className="w-8 h-8 rounded-full object-cover"
//     />
// );


export type TableStyle = 'default' | 'border';

interface TableProps {
    children: ReactNode;
    className?: string;
    tableStyle?: TableStyle;
}

// Basic Table Structure
export const Table = ({ children, className = '', tableStyle = 'default' }: TableProps) => (
    <div className="overflow-x-auto">
        <table className={cn(
            'w-full text-left border-collapse',
            tableStyle === 'border' && 'border border-(--border-color) [&_th]:border [&_td]:border [&_th]:border-(--border-color) [&_td]:border-(--border-color)',
            className,
        )}>
            {children}
        </table>
    </div>
);

export const Thead = ({ children, className = '' }: { children: ReactNode, className?: string }) => (
    <thead className={`text-xs uppercase font-semibold border-b border-slate-700/50  text-black dark:text-white ${className}`}>
        {children}
    </thead>
);

export const Tbody = ({ children }: { children: ReactNode }) => (
    <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50 text-gray-600 dark:text-gray-400">
        {children}
    </tbody>
);

export const Tfoot = ({ children, className = '' }: { children: ReactNode, className?: string }) => (
    <tfoot className={cn(`text-xs font-semibold border-t text-black dark:text-white`, className)}>
        {children}
    </tfoot>
);

export const Tr = ({ children, className = '' }: { children: ReactNode, className?: string }) => (
    <tr className={cn(className)}>
        {children}
    </tr>
);

export const Th = ({ children, className = '' }: { children: ReactNode, className?: string }) => (
    <th className={cn(`px-6 py-4 whitespace-nowrap`, className)}>
        {children}
    </th>
);

export const Td = ({ children, className = '' }: { children: ReactNode, className?: string }) => (
    <td className={cn(`px-6 py-4 whitespace-nowrap text-sm`, className)}>
        {children}
    </td>
);