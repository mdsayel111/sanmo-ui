import { Check } from "lucide-react";
import React, { InputHTMLAttributes } from "react";

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
export type Size = "sm" | "md" | "lg" | "xl";

interface CheckboxProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    variant?: Variant;
    styleType?: StyleType;
    size?: Size;
    className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
    variant = "primary",
    styleType = "solid",
    size = "md",
    className = "",
    checked,
    onChange,
    ...props
}) => {
    const sizeClasses: Record<Size, string> = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
        xl: "w-8 h-8",
    };

    const getVariantClasses = (): string => {
        const styles: Record<Variant, Record<StyleType, string>> = {
            primary: {
                solid: "peer-checked:bg-secondary peer-checked:text-white",
                outline: "peer-checked:bg-secondary peer-checked:text-white",
                soft: "peer-checked:bg-secondary/10 peer-checked:text-secondary",
            },
            secondary: {
                solid: "peer-checked:bg-slate-600 peer-checked:text-white",
                outline: "peer-checked:bg-slate-500 peer-checked:text-white",
                soft: "peer-checked:bg-slate-500/10 peer-checked:text-slate-400",
            },
            success: {
                solid: "peer-checked:bg-emerald-500 peer-checked:text-white",
                outline: "peer-checked:bg-emerald-500 peer-checked:text-white",
                soft: "peer-checked:bg-emerald-500/10 peer-checked:text-emerald-500",
            },
            danger: {
                solid: "peer-checked:bg-rose-500 peer-checked:text-white",
                outline: "peer-checked:bg-rose-500 peer-checked:text-white",
                soft: "peer-checked:bg-rose-500/10 peer-checked:text-rose-500",
            },
            warning: {
                solid: "peer-checked:bg-amber-500 peer-checked:text-white",
                outline: "peer-checked:bg-amber-500 peer-checked:text-white",
                soft: "peer-checked:bg-amber-500/10 peer-checked:text-amber-500",
            },
            info: {
                solid: "peer-checked:bg-cyan-500 peer-checked:text-white",
                outline: "peer-checked:bg-cyan-500 peer-checked:text-white",
                soft: "peer-checked:bg-cyan-500/10 peer-checked:text-cyan-500",
            },
            dark: {
                solid: "peer-checked:bg-slate-800 peer-checked:text-white",
                outline: "peer-checked:bg-slate-800 peer-checked:text-white",
                soft: "peer-checked:bg-slate-500/10 peer-checked:text-slate-700",
            },
            light: {
                solid: "peer-checked:bg-slate-200 peer-checked:text-white",
                outline: "peer-checked:bg-slate-200 peer-checked:text-white",
                soft: "peer-checked:bg-slate-200/10 peer-checked:text-slate-700",
            },
            link: {
                solid: "peer-checked:bg-transparent peer-checked:text-secondary",
                outline: "peer-checked:bg-transparent peer-checked:text-secondary",
                soft: "peer-checked:bg-transparent peer-checked:text-secondary",
            },
        };

        return styles[variant][styleType];
    };

    return (
        <label className="inline-flex items-center gap-2 cursor-pointer relative">
            <div className="relative">
                {/* Hidden input as peer */}
                <input
                    type="checkbox"
                    className={`peer absolute opacity-0 ${sizeClasses[size]}`}
                    checked={checked}
                    onChange={onChange}
                    {...props}
                />

                {/* Custom checkbox div */}
                <div
                    className={`flex items-center justify-center ${sizeClasses[size]} rounded-md border border-gray-300 dark:border-gray-600 bg-background transition-all duration-200 ${getVariantClasses()} ${className}`}
                >
                </div>
                <Check
                    className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2"
                    strokeWidth={3}
                />
            </div>
        </label>
    );
};

export default Checkbox;
