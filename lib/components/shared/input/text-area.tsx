
import { useId } from "react";
import FieldLabel from "../field-label";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = ({ label, id, className = '', ...props }: TextareaProps) => {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <div className="w-full">
      {label && <FieldLabel htmlFor={textareaId}>{label}</FieldLabel>}
      <textarea
        id={textareaId}
        className={`
          w-full bg-background rounded-sm text-gray-700 dark:text-slate-200 placeholder-slate-500
          focus:outline-none border
          disabled:opacity-50 disabled:cursor-not-allowed
          px-3 py-2 text-sm min-h-[100px] resize-y
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

export default Textarea;