import { ReactNode, useContext } from "react";
import AccordionContext from "./accordion-context";

interface AccordionItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

const AccordionItem = ({ value, children, className = '' }: AccordionItemProps) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');
  const { flush, openItems } = context;
  // @ts-ignore
  const isOpen = openItems.includes(value);
  const borderClasses = flush
    ? 'border-b border-slate-200 dark:border-slate-700 last:border-b-0'
    : 'border-b border-slate-200 dark:border-slate-700 last:border-b-0';

  return (
    <div className={`${borderClasses} ${className}`}>
      {children}
    </div>
  );
};

export default AccordionItem;