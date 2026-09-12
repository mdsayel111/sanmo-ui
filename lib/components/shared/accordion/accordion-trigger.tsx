import { ChevronDown } from "lucide-react";
import { ReactNode, useContext } from "react";
import AccordionContext from "./accordion-context";

interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
  value: string; // Must match Item value to know which to toggle
}

const AccordionTrigger = ({ children, className = '', value }: AccordionTriggerProps) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionTrigger must be used within Accordion');
  const { openItems, toggleItem, flush } = context;

  const isOpen = openItems.includes(value);

  return (
    <h3 className="m-0">
      <button
        type="button"
        onClick={() => toggleItem(value)}
        className={`
          flex items-center justify-between w-full p-4 text-left text-sm font-medium transition-all
          focus:outline-none z-10 relative
          ${isOpen 
            ? 'text-secondary bg-background'
            : 'text-gray-900 dark:text-slate-200 hover:bg-background'}
          ${flush && isOpen ? 'bg-transparent text-blue-400' : ''}
          ${className}
        `}
        aria-expanded={isOpen}
      >
        {children}
        <ChevronDown 
          size={16} 
          className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : ''}`} 
        />
      </button>
    </h3>
  );
};

export default AccordionTrigger;