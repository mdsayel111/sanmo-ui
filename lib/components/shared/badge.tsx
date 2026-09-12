

export type BadgeVariant =
    | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
    | 'dark' | 'purple' | 'pink' | 'orange';

export type BadgeStyleType = 'solid' | 'outline' | 'soft';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    styleType?: BadgeStyleType;
    pill?: boolean;
    circle?: boolean; // For notification dots
    children?: React.ReactNode;
    className?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'primary',
    styleType = 'solid',
    pill = false,
    circle = false,
    className = '',
    ...props
}) => {

    // Base classes
    const baseClasses = "inline-flex items-center justify-center font-medium leading-none";

    // Shape classes
    let shapeClasses = "rounded"; // Default
    if (pill) shapeClasses = "rounded-full";
    if (circle) shapeClasses = "rounded-full w-5 h-5 p-0 flex items-center justify-center text-xs"; // Notification dot
    else shapeClasses += " px-2.5 py-1 text-xs"; // Standard badge padding

    // Color Logic
    const getVariantClasses = (): string => {
        const colors: Record<BadgeVariant, Record<BadgeStyleType, string>> = {
            primary: {
                solid: "bg-blue-600 text-white border border-transparent",
                outline: "bg-transparent text-blue-600 border border-blue-600",
                soft: "bg-blue-100 text-blue-700 border border-transparent dark:bg-blue-500/10 dark:text-blue-400",
            },
            secondary: {
                solid: "bg-slate-500 text-white border border-transparent",
                outline: "bg-transparent text-slate-500 border border-slate-500",
                soft: "bg-slate-100 text-slate-700 border border-transparent dark:bg-slate-500/10 dark:text-slate-400",
            },
            success: {
                solid: "bg-emerald-500 text-white border border-transparent",
                outline: "bg-transparent text-emerald-500 border border-emerald-500",
                soft: "bg-emerald-100 text-emerald-700 border border-transparent dark:bg-emerald-500/10 dark:text-emerald-400",
            },
            danger: {
                solid: "bg-rose-500 text-white border border-transparent",
                outline: "bg-transparent text-rose-500 border border-rose-500",
                soft: "bg-rose-100 text-rose-700 border border-transparent dark:bg-rose-500/10 dark:text-rose-400",
            },
            warning: {
                solid: "bg-amber-500 text-white border border-transparent",
                outline: "bg-transparent text-amber-500 border border-amber-500",
                soft: "bg-amber-100 text-amber-700 border border-transparent dark:bg-amber-500/10 dark:text-amber-400",
            },
            info: {
                solid: "bg-cyan-500 text-white border border-transparent",
                outline: "bg-transparent text-cyan-500 border border-cyan-500",
                soft: "bg-cyan-100 text-cyan-700 border border-transparent dark:bg-cyan-500/10 dark:text-cyan-400",
            },
            dark: {
                solid: "bg-slate-800 text-white border border-transparent",
                outline: "bg-transparent text-slate-400 border border-slate-600",
                soft: "bg-slate-200 text-slate-800 border border-transparent dark:bg-slate-700/30 dark:text-slate-300",
            },
            purple: {
                solid: "bg-purple-600 text-white border border-transparent",
                outline: "bg-transparent text-purple-600 border border-purple-600",
                soft: "bg-purple-100 text-purple-700 border border-transparent dark:bg-purple-500/10 dark:text-purple-400",
            },
            pink: {
                solid: "bg-pink-500 text-white border border-transparent",
                outline: "bg-transparent text-pink-500 border border-pink-500",
                soft: "bg-pink-100 text-pink-700 border border-transparent dark:bg-pink-500/10 dark:text-pink-400",
            },
            orange: {
                solid: "bg-orange-500 text-white border border-transparent",
                outline: "bg-transparent text-orange-500 border border-orange-500",
                soft: "bg-orange-100 text-orange-700 border border-transparent dark:bg-orange-500/10 dark:text-orange-400",
            },
        };

        return colors[variant]?.[styleType] || colors.primary.solid;
    };

    return (
        <span
            className={`
        ${baseClasses} 
        ${shapeClasses} 
        ${getVariantClasses()} 
        ${className}
      `}
            {...props}
        >
            {children}
        </span>
    );
};


export default Badge;