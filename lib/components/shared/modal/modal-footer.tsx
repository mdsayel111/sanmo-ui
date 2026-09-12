import { ReactNode } from 'react';

const ModalFooter = ({ children }: { children: ReactNode }) => (
    <div className="flex items-center justify-end gap-2 p-4 border-t border-slate-700/50">
        {children}
    </div>
);

export default ModalFooter;