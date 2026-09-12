import { useState } from "react";

type InputSize = 'sm' | 'default' | 'lg';

interface MaskedInputProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'onChange' | 'size'
    > {
    label?: string;
    maskType?: 'date' | 'time' | 'phone-us' | 'phone-br' | 'currency' | 'ip' | 'zip' | 'cpf' | 'credit-card';
    onChange?: (value: string) => void;
    helperText?: string;
    size?: InputSize;
}


const MaskedInput = ({
    label,
    maskType = 'date',
    className = '',
    onChange,
    helperText,
    size = 'default',
    ...props
}: MaskedInputProps) => {
    const [value, setValue] = useState('');

    // Formatting Logic
    const formatValue = (val: string, type: string) => {
        // Strip non-numeric for most masks (except currency which might handle decimals differently)
        const digits = val.replace(/\D/g, '');

        switch (type) {
            case 'date': // DD/MM/YYYY
                if (digits.length <= 2) return digits;
                if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
                return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;

            case 'time': // HH:MM:SS
                if (digits.length <= 2) return digits;
                if (digits.length <= 4) return `${digits.slice(0, 2)}:${digits.slice(2)}`;
                return `${digits.slice(0, 2)}:${digits.slice(2, 4)}:${digits.slice(4, 6)}`;

            case 'phone-us': // (XXX) XXX-XXXX
                if (digits.length <= 3) return digits;
                if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
                return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;

            case 'phone-br': // (XX) XXXXX-XXXX
                if (digits.length <= 2) return digits;
                if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
                return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;

            case 'zip': // XXXXX-XXX
                if (digits.length <= 5) return digits;
                return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;

            case 'cpf': // XXX.XXX.XXX-XX
                if (digits.length <= 3) return digits;
                if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
                if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
                return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;

            case 'ip': // XXX.XXX.XXX.XXX (Simple implementation)
                // Just inserts dots every 3 chars for demo, complex IP validation is harder
                let ip = digits;
                if (ip.length > 3) ip = ip.slice(0, 3) + '.' + ip.slice(3);
                if (ip.length > 7) ip = ip.slice(0, 7) + '.' + ip.slice(7);
                if (ip.length > 11) ip = ip.slice(0, 11) + '.' + ip.slice(11);
                return ip.slice(0, 15);

            case 'currency':
                // Simple currency formatter (cents)
                if (!digits) return '';
                const number = parseInt(digits, 10) / 100;
                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);

            case 'credit-card': // XXXX XXXX XXXX XXXX
                return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim().slice(0, 19);

            default:
                return val;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // If currency, we handle raw digits differently to avoid cursor jumping issues in this simple implementation
        // For this demo, we'll just format the entire string on every change.
        const rawVal = e.target.value;
        const formatted = formatValue(rawVal, maskType);
        setValue(formatted);
        if (onChange) onChange(formatted);
    };

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs h-8',
        default: 'px-3 py-2 text-sm h-10',
        lg: 'px-4 py-3 text-lg h-12',
    }[size];

    return (
        <div className="w-full">
            {label && <label className={`block font-medium text-slate-400 mb-1.5 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>{label}</label>}
            <input
                type="text"
                className={`
          w-full bg-background rounded-lg text-gray-900 dark:text-slate-200 dark:placeholder-slate-200 placeholder-gray-800
          focus:outline-none
          transition-all duration-200
          ${sizeClasses}
          ${className}
        `}
                value={value}
                onChange={handleChange}
                placeholder={props.placeholder}
                maxLength={
                    maskType === 'date' ? 10 :
                        maskType === 'time' ? 8 :
                            maskType === 'phone-us' ? 14 :
                                maskType === 'phone-br' ? 15 :
                                    maskType === 'zip' ? 9 :
                                        maskType === 'cpf' ? 14 :
                                            maskType === 'credit-card' ? 19 :
                                                maskType === 'ip' ? 15 :
                                                    undefined
                }
                {...props}
            />
            {helperText && <p className="mt-1 text-xs text-gray-800 dark:text-slate-200">{helperText}</p>}
        </div>
    );
};

export default MaskedInput;