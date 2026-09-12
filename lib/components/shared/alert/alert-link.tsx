import { ReactNode } from "react";

const AlertLink = ({ href = '#', children, className = '' }: { href?: string, children: ReactNode, className?: string }) => (
  <a href={href} className={`font-bold hover:underline ${className}`}>{children}</a>
);

export default AlertLink;