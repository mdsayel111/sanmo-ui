import { Eye, EyeOff } from "lucide-react";
import { ReactNode } from "react";
import { useId, useState } from "react";
import { InputSize } from "./types";
import { cn } from "../../utils/cn";
import FieldLabel from "../field-label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    inputSize?: InputSize;
    plaintext?: boolean;
    leadingIcon?: ReactNode;
}

const Input = ({
    label,
    id,
    className = '',
    inputSize = 'default',
    plaintext = false,
    leadingIcon,
    type = 'text',
    ...props
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const isPassword = type === 'password';

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs h-8',
        default: 'px-3 py-2 text-sm h-10',
        lg: 'px-4 py-3 text-lg h-12',
    }[inputSize];

    const baseClasses = plaintext
        ? 'bg-transparent border-transparent w-full text-gray-950 dark:text-slate-300 px-0 py-2 outline-none cursor-default'
        : `w-full bg-background rounded-sm border text-gray-700 dark:text-slate-200 placeholder-slate-500
       focus:outline-none
       disabled:bg-background disabled:text-slate-500 disabled:cursor-not-allowed disabled:border-slate-800
       read-only:bg-background
      `;

    return (
        <div className={cn("w-full", className)}>
            {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}
            <div className="relative">
                <input
                    id={inputId}
                    type={isPassword && showPassword ? 'text' : type}
                    className={`${baseClasses} ${!plaintext ? sizeClasses : ''} ${leadingIcon ? 'pl-10' : ''}`}
                    {...props}
                />
                {leadingIcon && (
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                        {leadingIcon}
                    </span>
                )}
                {isPassword && !props.disabled && !props.readOnly && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-950 dark:text-slate-500 hover:text-slate-300 focus:outline-none"
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;