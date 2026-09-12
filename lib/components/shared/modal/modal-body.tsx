import { ReactNode } from 'react';

const ModalBody = ({ children, className = '' }: { children: ReactNode, className?: string }) => (
    <div className={`p-4 text-slate-700 dark:text-slate-300 ${className}`}>
        {children}
    </div>
);

export default ModalBody;