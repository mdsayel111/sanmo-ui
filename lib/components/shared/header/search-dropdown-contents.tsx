import { Search } from "lucide-react";

export interface SearchItem {
    id?: number | string;
    title: string;
    content: string;
    icon?: React.ElementType;
    onClick?: () => void;
}

export interface SearchDropdownContentsProps {
    items: SearchItem[];
}



export default function SearchDropdownContents({
    items,
}: SearchDropdownContentsProps) {
    return (
        <div className="w-full max-w-xl overflow-hidden">
            {/* Search Results */}
            <div>
                {items.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id || index}
                            onClick={item.onClick}
                            className="group w-full flex items-start gap-4 px-5 py-3 border-b border-slate-200 dark:border-slate-700 hover:bg-background transition-colors text-left"
                        >
                            {/* Icon */}
                            {Icon && (
                                <div className="shrink-0 mt-1 text-slate-400">
                                    <Icon size={18} />
                                </div>
                            )}

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-black dark:text-white truncate">
                                    {item.title}
                                </p>

                                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                                    {item.content}
                                </p>
                            </div>
                        </button>
                    );
                })}

                {/* Empty State */}
                {items.length === 0 && (
                    <div className="px-5 py-10 flex flex-col items-center justify-center text-center">
                        <Search
                            size={28}
                            className="text-slate-300 dark:text-slate-700 mb-3"
                        />

                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            No results found
                        </p>

                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                            Try searching with another keyword
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}