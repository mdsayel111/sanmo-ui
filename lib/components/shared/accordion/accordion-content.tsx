import { ReactNode, useContext } from "react";
import AccordionContext from "./accordion-context";

interface AccordionContentProps {
  children: ReactNode;
  value: string; // Must match Item value to know visibility
  className?: string;
}

const AccordionContent = ({ children, value, className = '' }: AccordionContentProps) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionContent must be used within Accordion');
  const { openItems } = context;

  const isOpen = openItems.includes(value);

  return (
    <div
      className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
      `}
    >
      <div className={`p-4 text-sm text-gray-900 dark:text-slate-400 leading-relaxed ${className}`}>
        {children}
      </div>
    </div>
  );
};

export default AccordionContent;