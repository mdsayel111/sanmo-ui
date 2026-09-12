import { ReactNode } from "react";

const AlertHeading = ({ children, className = '' }: { children: ReactNode, className?: string }) => (
  <h4 className={`text-base font-bold mb-1 ${className}`}>{children}</h4>
);

export default AlertHeading;