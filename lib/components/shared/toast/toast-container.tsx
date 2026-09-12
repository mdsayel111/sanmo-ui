import { ReactNode } from "react";
import { ToastPosition } from "./types";

const ToastContainer = ({ position = 'top-right', children, className = '' }: { position?: ToastPosition, children: ReactNode, className?: string }) => {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'middle-left': 'top-1/2 left-4 -translate-y-1/2',
    'middle-center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'middle-right': 'top-1/2 right-4 -translate-y-1/2',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  }[position];

  return (
    <div className={`fixed z-50 flex flex-col gap-4 ${positionClasses} ${className}`}>
      {children}
    </div>
  );
};

export default ToastContainer;