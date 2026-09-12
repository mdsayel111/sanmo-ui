import { ReactNode } from "react";

const ToastBody = ({ children, className = '' }: { children: ReactNode, className?: string }) => (
  <div className={`p-3 text-sm text-slate-500 dark:text-slate-300 ${className}`}>
    {children}
  </div>
);

export default ToastBody;