import type { LabelHTMLAttributes } from "react";
import { cn } from "../utils/cn";

interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const FieldLabel = ({ className, ...props }: FieldLabelProps) => (
    <label
        className={cn("mb-1.5 block text-sm text-gray-900 dark:text-slate-400", className)}
        {...props}
    />
);

export default FieldLabel;
