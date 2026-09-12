
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = ({ label, className = '', ...props }: TextareaProps) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm text-gray-900 dark:text-slate-400 mb-1.5">{label}</label>}
      <textarea
        className={`
          w-full bg-background rounded-sm text-gray-700 dark:text-slate-200 placeholder-slate-500
          focus:outline-none border
          disabled:opacity-50 disabled:cursor-not-allowed
          px-3 py-2 text-sm min-h-[100px] resize-y transition-all duration-200
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

export default Textarea;