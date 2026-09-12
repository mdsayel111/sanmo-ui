import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

type PaginationVariant =
    | "default"
    | "outline"
    | "ghost";

type PaginationSize =
    | "sm"
    | "md"
    | "lg";

interface PaginationProps {
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;

    showInfo?: boolean;

    variant?: PaginationVariant;
    size?: PaginationSize;

    rounded?: boolean;

    visiblePages?: number;
}

export default function Pagination({
    currentPage = 1,
    totalPages = 10,
    onPageChange,

    showInfo = false,

    variant = "outline",
    size = "md",

    rounded = true,

    visiblePages = 5,
}: PaginationProps) {

    const generatePages = () => {

        const pages: number[] = [];

        // Example:
        // visiblePages = 5
        // 1-5
        // 6-10
        // 11-15

        const currentGroup = Math.ceil(
            currentPage / visiblePages
        );

        const startPage =
            (currentGroup - 1) * visiblePages + 1;

        const endPage = Math.min(
            startPage + visiblePages - 1,
            totalPages
        );

        for (
            let i = startPage;
            i <= endPage;
            i++
        ) {
            pages.push(i);
        }

        return pages;
    };

    const pages = generatePages();

    const sizeClasses = {
        sm: {
            button: "h-8 min-w-[32px] px-2 text-xs",
            icon: 16,
        },

        md: {
            button: "h-10 min-w-[40px] px-3 text-sm",
            icon: 18,
        },

        lg: {
            button: "h-12 min-w-[48px] px-4 text-base",
            icon: 20,
        },
    };

    const variantClasses = {
        default:
            "border border-secondary bg-secondary text-white hover:opacity-90",

        outline:
            "border border-slate-200 dark:border-slate-800 hover:bg-background text-slate-700 dark:text-slate-300",

        ghost:
            "hover:bg-background text-slate-700 dark:text-slate-300",
    };

    const activeClasses = {
        default:
            "bg-secondary border-secondary text-white",

        outline:
            "bg-secondary border-secondary text-white",

        ghost:
            "bg-slate-200 dark:bg-slate-700 text-black dark:text-white",
    };

    const radiusClass = rounded
        ? "rounded-md"
        : "rounded-none";

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Info */}
            {showInfo && (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Page{" "}
                    <span className="font-semibold text-slate-700 dark:text-white">
                        {currentPage}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-slate-700 dark:text-white">
                        {totalPages}
                    </span>
                </p>
            )}

            {/* Pagination */}
            <div className="flex items-center gap-1">

                {/* Previous */}
                <button
                    disabled={currentPage === 1}
                    onClick={() =>
                        onPageChange?.(currentPage - 1)
                    }
                    className={`
                        flex items-center justify-center transition-colors
                        disabled:opacity-50 disabled:pointer-events-none

                        ${sizeClasses[size].button}
                        ${variantClasses[variant]}
                        ${radiusClass}
                    `}
                >
                    <ChevronLeft
                        size={sizeClasses[size].icon}
                    />
                </button>

                {/* First Page */}
                {pages[0] > 1 && (
                    <>
                        <button
                            onClick={() =>
                                onPageChange?.(1)
                            }
                            className={`
                                transition-colors font-medium

                                ${sizeClasses[size].button}
                                ${variantClasses[variant]}
                                ${radiusClass}
                            `}
                        >
                            1
                        </button>

                        <button
                            onClick={() =>
                                onPageChange?.(
                                    pages[0] - visiblePages
                                )
                            }
                            className={`
                                transition-colors font-medium

                                ${sizeClasses[size].button}
                                ${variantClasses[variant]}
                                ${radiusClass}
                            `}
                        >
                            ...
                        </button>
                    </>
                )}

                {/* Pages */}
                {pages.map((page) => {

                    const isActive =
                        currentPage === page;

                    return (
                        <button
                            key={page}
                            onClick={() =>
                                onPageChange?.(page)
                            }
                            className={`
                                transition-colors font-medium

                                ${sizeClasses[size].button}
                                ${radiusClass}

                                ${isActive
                                    ? activeClasses[variant]
                                    : variantClasses[variant]
                                }
                            `}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* Last Page */}
                {pages[pages.length - 1] <
                    totalPages && (
                        <>
                            <button
                                onClick={() =>
                                    onPageChange?.(
                                        pages[
                                        pages.length - 1
                                        ] + 1
                                    )
                                }
                                className={`
                                    transition-colors font-medium

                                    ${sizeClasses[size].button}
                                    ${variantClasses[variant]}
                                    ${radiusClass}
                                `}
                            >
                                ...
                            </button>

                            <button
                                onClick={() =>
                                    onPageChange?.(
                                        totalPages
                                    )
                                }
                                className={`
                                    transition-colors font-medium

                                    ${sizeClasses[size].button}
                                    ${variantClasses[variant]}
                                    ${radiusClass}
                                `}
                            >
                                {totalPages}
                            </button>
                        </>
                    )}

                {/* Next */}
                <button
                    disabled={
                        currentPage === totalPages
                    }
                    onClick={() =>
                        onPageChange?.(
                            currentPage + 1
                        )
                    }
                    className={`
                        flex items-center justify-center transition-colors
                        disabled:opacity-50 disabled:pointer-events-none

                        ${sizeClasses[size].button}
                        ${variantClasses[variant]}
                        ${radiusClass}
                    `}
                >
                    <ChevronRight
                        size={sizeClasses[size].icon}
                    />
                </button>
            </div>
        </div>
    );
}