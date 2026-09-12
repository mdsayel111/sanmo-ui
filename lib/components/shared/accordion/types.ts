export interface AccordionContextType {
  openItems: string[];
  toggleItem: (value: string) => void;
  flush?: boolean;
}
