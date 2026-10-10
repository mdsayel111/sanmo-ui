import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface InputValueProps {
    label: string;
    value: ReactNode;
    className?: string;
}

const InputValue = ({ label, value, className }: InputValueProps) => (
    <div className={cn("w-full rounded-lg border border-(--border-color) bg-background px-4 py-2", className)}>
        <dl>
            <dt className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {label}
            </dt>
            <dd className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {value}
            </dd>
        </dl>
    </div>
);

export default InputValue;
