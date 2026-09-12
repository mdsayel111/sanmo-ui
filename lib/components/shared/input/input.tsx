import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { InputSize } from "./types";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    inputSize?: InputSize;
    plaintext?: boolean;
}

const Input = ({
    label,
    className = '',
    inputSize = 'default',
    plaintext = false,
    type = 'text',
    ...props
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
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
       transition-all duration-200`;

    return (
        <div className="w-full">
            {label && <label className="block text-sm text-gray-900 dark:text-slate-400 mb-1.5">{label}</label>}
            <div className="relative">
                <input
                    type={isPassword && showPassword ? 'text' : type}
                    className={`${baseClasses} ${!plaintext ? sizeClasses : ''} ${className}`}
                    {...props}
                />
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