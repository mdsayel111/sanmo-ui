import { X } from 'lucide-react';
import { ReactNode } from 'react';

const ToastHeader = ({ children, time, onClose, icon }: { children: ReactNode, time?: string, onClose?: () => void, icon?: ReactNode }) => (
  <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-700 bg-background rounded-t-lg">
    <div className="flex items-center gap-2  text-black dark:text-white text-xl font-medium">
      {icon && <span className="">{icon}</span>}
      <strong className="font-semibold">{children}</strong>
    </div>
    <div className="flex items-center gap-3">
      {time && <small className="text-xs text-slate-500 dark:text-slate-400">{time}</small>}
      {onClose && (
        <button onClick={onClose} className="text-slate-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none">
          <X size={16} />
        </button>
      )}
    </div>
  </div>
);

export default ToastHeader;