import { X } from 'lucide-react';
import { ReactNode } from 'react';

const ModalHeader = ({ children, onClose }: { children: ReactNode, onClose?: () => void }) => (
    <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-white">{children}</h3>
        {onClose && (
            <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700/50"
            >
                <X size={20} />
            </button>
        )}
    </div>
);

export default ModalHeader;