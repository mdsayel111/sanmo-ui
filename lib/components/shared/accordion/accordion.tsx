import { ReactNode, useState } from "react";
import AccordionContext from "./accordion-context";

interface AccordionProps {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  flush?: boolean;
  className?: string;
  children: ReactNode;
}

const Accordion = ({
  type = 'single',
  defaultValue,
  flush = false,
  className = '',
  children
}: AccordionProps) => {
  // Normalize default value to array
  const initialOpen = Array.isArray(defaultValue) 
    ? defaultValue 
    : defaultValue ? [defaultValue] : [];

  const [openItems, setOpenItems] = useState<string[]>(initialOpen);

  const toggleItem = (value: string) => {
    setOpenItems(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value); // Close it
      } else {
        if (type === 'single') {
          return [value]; // Close others, open this
        } else {
          return [...prev, value]; // Add to open list
        }
      }
    });
  };

  const flushClasses = flush ? '' : 'border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden';

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, flush }}>
      <div className={`${flushClasses} ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export default Accordion;