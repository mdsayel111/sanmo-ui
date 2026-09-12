import { X } from "lucide-react";
import { ReactNode, useState } from "react";

type AlertVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

interface AlertProps {
  variant?: AlertVariant;
  children: ReactNode;
  dismissible?: boolean;
  icon?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const Alert = ({
  variant = 'primary',
  children,
  dismissible = false,
  icon,
  onDismiss,
  className = ''
}: AlertProps) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };

  const variants = {
    primary: "bg-blue-900/30 text-blue-400 border-blue-800",
    secondary: "bg-slate-800/50 text-slate-400 border-slate-700",
    success: "bg-emerald-900/30 text-emerald-400 border-emerald-800",
    danger: "bg-rose-900/30 text-rose-400 border-rose-800",
    warning: "bg-amber-900/30 text-amber-400 border-amber-800",
    info: "bg-cyan-900/30 text-cyan-400 border-cyan-800",
    light: "bg-slate-100 text-slate-600 border-slate-200", // Light theme adaptation
    dark: "bg-slate-900 text-slate-300 border-slate-800",
  };

  return (
    <div 
      role="alert" 
      className={`
        relative px-4 py-3 rounded-lg border text-sm flex items-start gap-3
        ${variants[variant]} 
        ${className}
        transition-all duration-300 ease-out
      `}
    >
      {icon && <span className="mt-0.5 shrink-0">{icon}</span>}
      
      <div className="flex-1 min-w-0 break-words">
        {children}
      </div>

      {dismissible && (
        <button 
          onClick={handleDismiss}
          className="ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/10 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-current"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default Alert;