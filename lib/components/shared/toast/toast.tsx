 import { ReactNode, useEffect, useState } from 'react';

 interface ToastProps {
  show: boolean;
  onClose?: () => void;
  variant?: ToastVariant;
  className?: string;
  children: ReactNode;
  autohide?: boolean;
  delay?: number;
}

type ToastVariant = 'default' | 'primary' | 'success' | 'danger';

 const Toast = ({
  show,
  onClose,
  variant = 'default',
  className = '',
  children,
  autohide = false,
  delay = 5000
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    if (show && autohide && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [show, autohide, delay, onClose]);

  if (!isVisible) return null;

  const variantClasses = {
    default: "bg-foreground border-slate-200 dark:border-slate-700 text-slate-200",
    primary: "bg-primary border-secondary text-white",
    success: "bg-emerald-600 border-emerald-500 text-white",
    danger: "bg-rose-600 border-rose-500 text-white",
  }[variant];

  return (
    <div 
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true" 
      className={`
        w-80 rounded-lg border overflow-hidden backdrop-blur-sm
        transition-all duration-300 ease-in-out transform
        ${show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'}
        ${variantClasses} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Toast;