import React from "react";

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

export type Size = "sm" | "md" | "lg";

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  className?: string;
}

/* ---------------- Component ---------------- */
const Switch: React.FC<ToggleProps> = ({
  checked,
  onChange,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}) => {
  const baseClasses =
    "relative inline-flex items-center rounded-full transition-all duration-200 focus:outline-none";

  const sizeClasses: Record<Size, string> = {
    sm: "w-10 h-5",
    md: "w-14 h-8",
    lg: "w-20 h-10",
  };

  const knobSizes: Record<Size, string> = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const translateX: Record<Size, string> = {
    sm: "translate-x-[17px]",
    md: "translate-x-6",
    lg: "translate-x-10",
  };

  const getVariantBg = (): string => {
    if (!checked) return "bg-slate-300";

    const map: Record<Variant, string> = {
      primary: "bg-secondary/80",
      secondary: "bg-slate-600",
      success: "bg-emerald-500",
      danger: "bg-rose-500",
      warning: "bg-amber-500",
      info: "bg-cyan-500",
      dark: "bg-slate-800",
      light: "bg-slate-200",
      link: "bg-transparent",
    };

    return map[variant];
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${getVariantBg()}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      <span
        className={`
          absolute top-1/2 -translate-y-1/2 left-1 bg-white rounded-full shadow transition-transform
          ${knobSizes[size]}
          ${checked ? translateX[size] : ""}
        `}
      />
    </button>
  );
};

export default Switch;
