// import { Check, ChevronDown, Plus, X } from "lucide-react";
// import React, { useEffect, useRef, useState } from "react";

// interface Option {
//     value: string;
//     label: string;
//     group?: string;
// }

// interface ChoiceSelectProps {
//     options?: Option[];
//     defaultValue?: string | string[];
//     multiple?: boolean;
//     searchable?: boolean;
//     creatable?: boolean;
//     placeholder?: string;
//     className?: string;
//     removeItemButton?: boolean;
//     unique?: boolean; // For creatable inputs to prevent duplicates
// }

// const ChoiceSelect = ({
//     options = [],
//     defaultValue,
//     multiple = false,
//     searchable = true,
//     creatable = false,
//     placeholder = 'Select...',
//     className = '',
//     removeItemButton = true,
//     unique = false,
// }: ChoiceSelectProps) => {
//     // Normalize default value
//     const initialSelected = multiple
//         ? (Array.isArray(defaultValue) ? defaultValue : (defaultValue ? [defaultValue] : []))
//         : (defaultValue || '');

//     const [selected, setSelected] = useState<string | string[]>(initialSelected);
//     const [isOpen, setIsOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [customOptions, setCustomOptions] = useState<Option[]>([]); // For creatable inputs
//     const containerRef = useRef<HTMLDivElement>(null);

//     // Combine static options with created ones
//     const allOptions = [...options, ...customOptions];

//     // Close dropdown on click outside
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
//                 setIsOpen(false);
//                 setSearchTerm('');
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     const handleSelect = (value: string) => {
//         if (multiple) {
//             const current = Array.isArray(selected) ? selected : [];
//             if (current.includes(value)) {
//                 setSelected(current.filter(item => item !== value));
//             } else {
//                 setSelected([...current, value]);
//             }
//             setSearchTerm(''); // Clear search on select for multiple
//             // Keep open for multiple selection comfort
//         } else {
//             setSelected(value);
//             setIsOpen(false);
//             setSearchTerm('');
//         }
//     };

//     const handleRemove = (e: React.MouseEvent, value: string) => {
//         e.stopPropagation();
//         if (Array.isArray(selected)) {
//             setSelected(selected.filter(item => item !== value));
//         } else if (selected === value) {
//             setSelected('');
//         }
//     };

//     const handleCreateOption = () => {
//         if (!searchTerm.trim()) return;

//         // Check duplicates if unique prop is true
//         if (unique) {
//             const exists = allOptions.some(opt => opt.value.toLowerCase() === searchTerm.toLowerCase()) ||
//                 (Array.isArray(selected) && selected.some(s => s.toLowerCase() === searchTerm.toLowerCase()));
//             if (exists) return;
//         }

//         const newOption = { value: searchTerm, label: searchTerm };
//         setCustomOptions([...customOptions, newOption]);
//         handleSelect(searchTerm);
//         setSearchTerm('');
//     };

//     const handleKeyDown = (e: React.KeyboardEvent) => {
//         if (e.key === 'Enter') {
//             e.preventDefault();
//             if (creatable && searchTerm) {
//                 handleCreateOption();
//             } else if (filteredOptions.length > 0) {
//                 handleSelect(filteredOptions[0].value);
//             }
//         }
//     };

//     // Filter Logic
//     const filteredOptions = allOptions.filter(opt =>
//         opt.label.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Grouping Logic
//     const groupedOptions = filteredOptions.reduce((acc, opt) => {
//         const group = opt.group || 'default';
//         if (!acc[group]) acc[group] = [];
//         acc[group].push(opt);
//         return acc;
//     }, {} as Record<string, Option[]>);

//     const hasGroups = Object.keys(groupedOptions).length > 1 || (Object.keys(groupedOptions).length === 1 && Object.keys(groupedOptions)[0] !== 'default');

//     return (
//         <div className={`relative w-full ${className}`} ref={containerRef}>
//             <div
//                 className={`
//           w-full bg-background rounded-lg min-h-[42px] px-3 py-1 flex items-center flex-wrap gap-2 cursor-pointer  transition-all
//         `}
//                 onClick={() => !creatable && setIsOpen(!isOpen)}
//             >
//                 {/* Render Selected Items */}
//                 {multiple && Array.isArray(selected) && selected.map(val => {
//                     const opt = allOptions.find(o => o.value === val) || { label: val, value: val };
//                     return (
//                         <span key={val} className="inline-flex items-center px-2 py-1 rounded bg-foreground text-sm text-gray-900 dark:text-slate-200 animate-in fade-in zoom-in duration-200">
//                             {opt.label}
//                             {removeItemButton && (
//                                 <button
//                                     onClick={(e) => handleRemove(e, val)}
//                                     className="ml-1 hover:text-rose-400 focus:outline-none"
//                                 >
//                                     <X size={14} />
//                                 </button>
//                             )}
//                         </span>
//                     );
//                 })}

//                 {/* Input / Placeholder */}
//                 <div className="flex-1 min-w-[60px] relative">
//                     {!multiple && !searchTerm && !Array.isArray(selected) && selected && (
//                         <div className="absolute inset-0 flex items-center text-gray-800 dark:text-slate-200 text-sm pointer-events-none">
//                             {allOptions.find(o => o.value === selected)?.label || selected}
//                         </div>
//                     )}

//                     <input
//                         type="text"
//                         className="w-full bg-transparent border-none outline-none text-slate-200 text-sm py-2 placeholder-slate-500 dark:placeholder-slate-200"
//                         placeholder={(!selected || (Array.isArray(selected) && selected.length === 0)) ? placeholder : ''}
//                         value={searchTerm}
//                         onChange={(e) => {
//                             setSearchTerm(e.target.value);
//                             if (!isOpen) setIsOpen(true);
//                         }}
//                         onKeyDown={handleKeyDown}
//                         onFocus={() => setIsOpen(true)}
//                         readOnly={!searchable && !creatable} // If not searchable or creatable, acts as button
//                     />
//                 </div>

//                 {/* Arrow Icon */}
//                 {!creatable && (
//                     <ChevronDown size={16} className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//                 )}
//             </div>

//             {/* Dropdown Menu */}
//             {isOpen && (
//                 <div className="absolute z-50 w-full mt-1 bg-foreground rounded-lg shadow-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
//                     {Object.entries(groupedOptions).length === 0 && creatable && searchTerm && (
//                         <div
//                             className="px-4 py-2 text-sm text-gray-800 dark:text-slate-300 hover:bg-background cursor-pointer flex items-center gap-2"
//                             onClick={handleCreateOption}
//                         >
//                             <Plus size={14} /> Create "{searchTerm}"
//                         </div>
//                     )}

//                     {Object.entries(groupedOptions).length === 0 && !creatable && (
//                         <div className="px-4 py-3 text-sm text-slate-500 text-center">No choices to choose from</div>
//                     )}

//                     {Object.entries(groupedOptions).map(([group, groupOptions]) => (
//                         <React.Fragment key={group}>
//                             {hasGroups && group !== 'default' && (
//                                 <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-100 bg-foreground uppercase tracking-wider sticky top-0 backdrop-blur-sm">
//                                     {group}
//                                 </div>
//                             )}
//                             {groupOptions.map(option => {
//                                 const isSelected = multiple
//                                     ? Array.isArray(selected) && selected.includes(option.value)
//                                     : selected === option.value;

//                                 return (
//                                     <div
//                                         key={option.value}
//                                         onClick={() => handleSelect(option.value)}
//                                         className={`
//                       px-4 py-2 text-sm cursor-pointer flex items-center justify-between
//                       ${isSelected ? 'bg-background text-secondary' : 'text-gray-800 dark:text-slate-300 hover:bg-background'}
//                     `}
//                                     >
//                                         <span>{option.label}</span>
//                                         {isSelected && <Check size={14} className="text-blue-500" />}
//                                     </div>
//                                 );
//                             })}
//                         </React.Fragment>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ChoiceSelect;

import { Check, ChevronDown, Plus, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface Option {
    value: string;
    label: string;
    group?: string;
}

interface ChoiceSelectProps {
    options?: Option[];
    defaultValue?: string | string[];
    multiple?: boolean;
    searchable?: boolean;
    creatable?: boolean;
    placeholder?: string;
    className?: string;
    removeItemButton?: boolean;
    unique?: boolean; // For creatable inputs to prevent duplicates
}

const ChoiceSelect = ({
    options = [],
    defaultValue,
    multiple = false,
    searchable = true,
    creatable = false,
    placeholder = 'Select...',
    className = '',
    removeItemButton = true,
    unique = false,
}: ChoiceSelectProps) => {
    // Normalize default value
    const initialSelected = multiple
        ? (Array.isArray(defaultValue) ? defaultValue : (defaultValue ? [defaultValue] : []))
        : (defaultValue || '');

    const [selected, setSelected] = useState<string | string[]>(initialSelected);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [customOptions, setCustomOptions] = useState<Option[]>([]); // For creatable inputs
    const containerRef = useRef<HTMLDivElement>(null);

    // Combine static options with created ones
    const allOptions = [...options, ...customOptions];

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value: string) => {
        if (multiple) {
            const current = Array.isArray(selected) ? selected : [];
            if (current.includes(value)) {
                setSelected(current.filter(item => item !== value));
            } else {
                setSelected([...current, value]);
            }
            setSearchTerm(''); // Clear search on select for multiple
        } else {
            setSelected(value);
            setIsOpen(false);
            setSearchTerm('');
        }
    };

    const handleRemove = (e: React.MouseEvent, value: string) => {
        e.stopPropagation();
        if (Array.isArray(selected)) {
            setSelected(selected.filter(item => item !== value));
        } else if (selected === value) {
            setSelected('');
        }
    };

    const handleCreateOption = () => {
        if (!searchTerm.trim()) return;

        if (unique) {
            const exists = allOptions.some(opt => opt.value.toLowerCase() === searchTerm.toLowerCase()) ||
                (Array.isArray(selected) && selected.some(s => s.toLowerCase() === searchTerm.toLowerCase()));
            if (exists) return;
        }

        const newOption = { value: searchTerm, label: searchTerm };
        setCustomOptions([...customOptions, newOption]);
        handleSelect(searchTerm);
        setSearchTerm('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (creatable && searchTerm) {
                handleCreateOption();
            } else if (filteredOptions.length > 0) {
                handleSelect(filteredOptions[0].value);
            }
        }
    };

    const filteredOptions = allOptions.filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedOptions = filteredOptions.reduce((acc, opt) => {
        const group = opt.group || 'default';
        if (!acc[group]) acc[group] = [];
        acc[group].push(opt);
        return acc;
    }, {} as Record<string, Option[]>);

    const hasGroups = Object.keys(groupedOptions).length > 1 || (Object.keys(groupedOptions).length === 1 && Object.keys(groupedOptions)[0] !== 'default');

    return (
        <div className={`relative w-full ${className}`} ref={containerRef}>
            <div
                className={`
                    w-full bg-background rounded-lg min-h-[42px] px-3 py-1 flex items-center flex-wrap gap-2 cursor-pointer transition-all
                `}
                onClick={() => {
                    if (!searchable && !creatable) setIsOpen(!isOpen);
                }}
            >
                {/* Render Selected Items */}
                {multiple && Array.isArray(selected) && selected.map(val => {
                    const opt = allOptions.find(o => o.value === val) || { label: val, value: val };
                    return (
                        <span key={val} className="inline-flex items-center px-2 py-1 rounded bg-foreground text-sm text-gray-900 dark:text-slate-200 animate-in fade-in zoom-in duration-200">
                            {opt.label}
                            {removeItemButton && (
                                <button
                                    onClick={(e) => handleRemove(e, val)}
                                    className="ml-1 hover:text-rose-400 focus:outline-none"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </span>
                    );
                })}

                {/* Input / Placeholder */}
                <div className="flex-1 min-w-[60px] relative">
                    {!multiple && !searchTerm && !Array.isArray(selected) && selected && (
                        <div className="absolute inset-0 flex items-center text-gray-800 dark:text-slate-200 text-sm pointer-events-none">
                            {allOptions.find(o => o.value === selected)?.label || selected}
                        </div>
                    )}

                    <input
                        type="text"
                        className="w-full bg-transparent border-none outline-none text-slate-200 text-sm py-2 placeholder-slate-500 dark:placeholder-slate-200"
                        placeholder={(!selected || (Array.isArray(selected) && selected.length === 0)) ? placeholder : ''}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            if (!isOpen) setIsOpen(true);
                        }}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setIsOpen(true)}
                        onClick={(e) => e.stopPropagation()} // Prevent immediate close
                        readOnly={!searchable && !creatable}
                    />
                </div>

                {!creatable && (
                    <ChevronDown size={16} className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                )}
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-foreground rounded-lg shadow-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                    {Object.entries(groupedOptions).length === 0 && creatable && searchTerm && (
                        <div
                            className="px-4 py-2 text-sm text-gray-800 dark:text-slate-300 hover:bg-background cursor-pointer flex items-center gap-2"
                            onClick={handleCreateOption}
                        >
                            <Plus size={14} /> Create "{searchTerm}"
                        </div>
                    )}

                    {Object.entries(groupedOptions).length === 0 && !creatable && (
                        <div className="px-4 py-3 text-sm text-slate-500 text-center">No choices to choose from</div>
                    )}

                    {Object.entries(groupedOptions).map(([group, groupOptions]) => (
                        <React.Fragment key={group}>
                            {hasGroups && group !== 'default' && (
                                <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-100 bg-foreground uppercase tracking-wider sticky top-0 backdrop-blur-sm">
                                    {group}
                                </div>
                            )}
                            {groupOptions.map(option => {
                                const isSelected = multiple
                                    ? Array.isArray(selected) && selected.includes(option.value)
                                    : selected === option.value;

                                return (
                                    <div
                                        key={option.value}
                                        onClick={() => handleSelect(option.value)}
                                        className={`
                                            px-4 py-2 text-sm cursor-pointer flex items-center justify-between
                                            ${isSelected ? 'bg-background text-secondary' : 'text-gray-800 dark:text-slate-300 hover:bg-background'}
                                        `}
                                    >
                                        <span>{option.label}</span>
                                        {isSelected && <Check size={14} className="text-blue-500" />}
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChoiceSelect;
