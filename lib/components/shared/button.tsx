import React, { ButtonHTMLAttributes, ReactNode } from "react";

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

export type Shape = "default" | "pill";

export type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: Variant;
    styleType?: StyleType;
    shape?: Shape;
    size?: Size;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    styleType = "solid",
    shape = "default",
    size = "md",
    className = "",
    ...props
}) => {
    const baseClasses =
        "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed";

    const sizeClasses: Record<Size, string> = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
    };

    const shapeClasses: Record<Shape, string> = {
        default: "rounded-md",
        pill: "rounded-full",
    };

    const getVariantClasses = (): string => {
        if (variant === "link") {
            return "text-blue-400 hover:text-blue-300 hover:underline bg-transparent shadow-none px-0";
        }

        const colors: Record<
            Variant,
            Record<StyleType, string>
        > = {
            primary: {
                solid:
                    "bg-secondary/80 hover:bg-secondary text-white border border-transparent",
                outline:
                    "bg-transparent border border-secondary/80 text-secondary hover:bg-secondary hover:text-white",
                soft: "bg-secondary/10 text-secondary hover:bg-secondary/20 border border-transparent",
            },
            secondary: {
                solid:
                    "bg-slate-600 hover:bg-slate-700 text-white border border-transparent",
                outline:
                    "bg-transparent border border-slate-500 text-slate-400 hover:bg-slate-500 hover:text-white",
                soft: "bg-slate-500/10 text-slate-400 hover:bg-slate-500/20 border border-transparent",
            },
            success: {
                solid:
                    "bg-emerald-500 hover:bg-emerald-600 text-white border border-transparent",
                outline:
                    "bg-transparent border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white",
                soft: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-transparent",
            },
            danger: {
                solid:
                    "bg-rose-500 hover:bg-rose-600 text-white border border-transparent",
                outline:
                    "bg-transparent border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white",
                soft: "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-transparent",
            },
            warning: {
                solid:
                    "bg-amber-500 hover:bg-amber-600 text-white border border-transparent",
                outline:
                    "bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white",
                soft: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border border-transparent",
            },
            info: {
                solid:
                    "bg-cyan-500 hover:bg-cyan-600 text-white border border-transparent",
                outline:
                    "bg-transparent border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white",
                soft: "bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 border border-transparent",
            },
            dark: {
                solid:
                    "bg-slate-800 hover:bg-slate-900 text-white border border-slate-700",
                outline:
                    "bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white",
                soft: "bg-slate-500/10 text-slate-300 hover:bg-slate-500/20 border border-transparent",
            },
            light: {
                solid:
                    "bg-slate-200 hover:bg-white text-slate-800 border border-transparent",
                outline:
                    "bg-transparent border border-slate-200 text-slate-200 hover:bg-slate-200 hover:text-slate-900",
                soft: "bg-white/10 text-white hover:bg-white/20 border border-transparent",
            },
            link: {
                solid: "",
                outline: "",
                soft: "",
            },
        };

        return colors[variant]?.[styleType] || colors.primary.solid;
    };

    return (
        <button
            className={`${baseClasses} ${sizeClasses[size]} ${shapeClasses[shape]} ${getVariantClasses()} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;