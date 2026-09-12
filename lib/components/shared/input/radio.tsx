import React, { InputHTMLAttributes } from "react";

/* ---------------- Types ---------------- */
export type Variant =
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "dark"
    | "light"
    | "link";

export type StyleType = "solid" | "outline" | "soft";
export type Size = "sm" | "md" | "lg";

interface RadioProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    variant?: Variant;
    styleType?: StyleType;
    size?: Size;
    className?: string;

}

/* ---------------- Component ---------------- */
const Radio: React.FC<RadioProps> = ({
    variant = "primary",
    styleType = "solid",
    size = "md",
    className = "",
    checked,
    onChange,
    ...props
}) => {
    const baseClasses =
        "relative inline-flex items-center justify-center transition-all duration-200 cursor-pointer bg-background";

    const sizeClasses: Record<Size, string> = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
    };

    const dotSizes: Record<Size, string> = {
        sm: "w-1.5 h-1.5",
        md: "w-2.5 h-2.5",
        lg: "w-3.5 h-3.5",
    };

    const getVariantClasses = (): string => {
        if (variant === "link") {
            return "border border-transparent text-blue-400";
        }

        const styles: Record<Variant, Record<StyleType, string>> = {
            primary: {
                solid:
                    "border border-secondary bg-background text-white peer-checked:bg-secondary dark:border-secondary dark:peer-checked:bg-secondary/90",
                outline:
                    "border border-secondary bg-background text-secondary peer-checked:bg-secondary peer-checked:text-white dark:border-secondary dark:bg-background dark:peer-checked:bg-secondary/90 dark:peer-checked:text-white",
                soft:
                    "border border-secondary/20 bg-background text-secondary peer-checked:bg-secondary/10 dark:border-secondary/30 dark:bg-background dark:peer-checked:bg-secondary/20 dark:text-secondary",
            },

            secondary: {
                solid:
                    "border border-slate-600 bg-background text-white peer-checked:bg-slate-600 dark:border-slate-500 dark:peer-checked:bg-slate-500",
                outline:
                    "border border-slate-500 bg-background text-slate-600 peer-checked:bg-slate-600 peer-checked:text-white dark:border-slate-400 dark:bg-background dark:peer-checked:bg-slate-500 dark:peer-checked:text-white",
                soft:
                    "border border-slate-500/20 bg-background text-slate-600 peer-checked:bg-slate-500/10 dark:border-slate-400/30 dark:bg-background dark:peer-checked:bg-slate-400/20 dark:text-slate-300",
            },

            success: {
                solid:
                    "border border-emerald-500 bg-background text-white peer-checked:bg-emerald-500 dark:border-emerald-400 dark:peer-checked:bg-emerald-400",
                outline:
                    "border border-emerald-500 bg-background text-emerald-500 peer-checked:bg-emerald-500 peer-checked:text-white dark:border-emerald-400 dark:bg-background dark:peer-checked:bg-emerald-400 dark:peer-checked:text-white",
                soft:
                    "border border-emerald-500/20 bg-background text-emerald-500 peer-checked:bg-emerald-500/10 dark:border-emerald-400/30 dark:bg-background dark:peer-checked:bg-emerald-400/20 dark:text-emerald-400",
            },

            danger: {
                solid:
                    "border border-rose-500 bg-background text-white peer-checked:bg-rose-500 dark:border-rose-400 dark:peer-checked:bg-rose-400",
                outline:
                    "border border-rose-500 bg-background text-rose-500 peer-checked:bg-rose-500 peer-checked:text-white dark:border-rose-400 dark:bg-background dark:peer-checked:bg-rose-400 dark:peer-checked:text-white",
                soft:
                    "border border-rose-500/20 bg-background text-rose-500 peer-checked:bg-rose-500/10 dark:border-rose-400/30 dark:bg-background dark:peer-checked:bg-rose-400/20 dark:text-rose-400",
            },

            warning: {
                solid:
                    "border border-amber-500 bg-background text-white peer-checked:bg-amber-500 dark:border-amber-400 dark:peer-checked:bg-amber-400",
                outline:
                    "border border-amber-500 bg-background text-amber-500 peer-checked:bg-amber-500 peer-checked:text-white dark:border-amber-400 dark:bg-background dark:peer-checked:bg-amber-400 dark:peer-checked:text-white",
                soft:
                    "border border-amber-500/20 bg-background text-amber-500 peer-checked:bg-amber-500/10 dark:border-amber-400/30 dark:bg-background dark:peer-checked:bg-amber-400/20 dark:text-amber-400",
            },

            info: {
                solid:
                    "border border-cyan-500 bg-background text-white peer-checked:bg-cyan-500 dark:border-cyan-400 dark:peer-checked:bg-cyan-400",
                outline:
                    "border border-cyan-500 bg-background text-cyan-500 peer-checked:bg-cyan-500 peer-checked:text-white dark:border-cyan-400 dark:bg-background dark:peer-checked:bg-cyan-400 dark:peer-checked:text-white",
                soft:
                    "border border-cyan-500/20 bg-background text-cyan-500 peer-checked:bg-cyan-500/10 dark:border-cyan-400/30 dark:bg-background dark:peer-checked:bg-cyan-400/20 dark:text-cyan-400",
            },

            dark: {
                solid:
                    "border border-slate-800 bg-background text-white peer-checked:bg-slate-800 dark:border-slate-900 dark:peer-checked:bg-slate-900",
                outline:
                    "border border-slate-700 bg-background text-slate-800 peer-checked:bg-slate-800 peer-checked:text-white dark:border-slate-600 dark:bg-background dark:peer-checked:bg-slate-900 dark:peer-checked:text-white",
                soft:
                    "border border-slate-500/20 bg-background text-slate-700 peer-checked:bg-slate-500/10 dark:border-slate-600/30 dark:bg-background dark:peer-checked:bg-slate-600/30 dark:text-slate-200",
            },

            light: {
                solid:
                    "border border-slate-200 bg-background text-slate-800 peer-checked:bg-slate-200 dark:border-slate-700 dark:peer-checked:bg-slate-700 dark:text-white",
                outline:
                    "border border-slate-200 bg-background text-slate-700 peer-checked:bg-slate-200 peer-checked:text-white dark:border-slate-600 dark:bg-background dark:peer-checked:bg-slate-700 dark:peer-checked:text-white",
                soft:
                    "border border-slate-200/20 bg-background text-slate-700 peer-checked:bg-slate-200/60 dark:border-slate-700/30 dark:bg-background dark:peer-checked:bg-slate-700/40 dark:text-slate-200",
            },

            link: {
                solid:
                    "border border-transparent bg-background text-secondary peer-checked:bg-transparent dark:border-transparent dark:bg-background dark:peer-checked:text-secondary/90",
                outline:
                    "border border-transparent bg-background text-secondary peer-checked:bg-transparent peer-checked:text-secondary/90 dark:border-transparent dark:bg-background",
                soft:
                    "border border-transparent bg-background text-secondary peer-checked:bg-transparent peer-checked:text-secondary/90 dark:border-transparent dark:bg-background",
            },
        };





        return styles[variant][styleType];
    };

    return (
        <label className="inline-flex items-center gap-2 cursor-pointer relative">
            <input
                type="radio"
                className="peer hidden"
                checked={checked}
                onChange={onChange}
                {...props}
            />

            {/* Outer circle */}
            <span
                className={`
      ${baseClasses}
      ${sizeClasses[size]}
      ${getVariantClasses()}
      rounded-full
      flex items-center justify-center
      ${className}
    `}
            />

            {/* Inner dot (SIBLING) */}
            <span
                className={`
      ${dotSizes[size]}
      rounded-full
      transform scale-0
      transition-transform duration-200
      peer-checked:scale-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white
    `}
            />
        </label>
    );
};

export default Radio;
