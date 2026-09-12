import useSelect from "./useSelect";

interface SelectValueProps {
    placeholder?: string;
    displayValue?: string;
}

const SelectValue: React.FC<SelectValueProps> = ({ placeholder, displayValue }) => {
    const { value, multiple, options } = useSelect();


    if (multiple && Array.isArray(value)) {
        displayValue = options.filter(option => value.includes(option.value))?.map(option => option.label).join(', ');
    } else if (!multiple) {
        displayValue = options?.find(option => option.value === value)?.label;
    }

    return (
        <span
            className={`block truncate text-left font-normal ${displayValue ? 'text-slate-900 dark:text-slate-200' : 'text-gray-900 dark:text-slate-400'
                }`}
        >
            {displayValue || placeholder}
        </span>
    );
};

export default SelectValue;