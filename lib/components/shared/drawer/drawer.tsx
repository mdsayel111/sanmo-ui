import { X } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  position?: DrawerPosition;
  backdrop?: boolean;
  scroll?: boolean; // allow body scroll while open
  className?: string;
  headerClassName?: string;
}

const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'left',
  backdrop = true,
  scroll = false,
  className = '',
  headerClassName = 'bg-background',
}: DrawerProps) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  // --- Mount / Unmount with animation ---
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      //   requestAnimationFrame(() => setVisible(true));
      setTimeout(() => setVisible(true), 100);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // --- Body scroll lock ---
  useEffect(() => {
    if (!mounted) return;

    if (!scroll) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mounted, scroll]);

  // --- Escape key ---
  useEffect(() => {
    if (!mounted) return;

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [mounted, onClose]);

  if (!mounted) return null;

  // --- Classes ---
  const positionClasses: Record<DrawerPosition, string> = {
    left: 'top-0 left-0 h-full w-80 border-r',
    right: 'top-0 right-0 h-full w-80 border-l',
    top: 'top-0 left-0 w-full h-1/3 border-b',
    bottom: 'bottom-0 left-0 w-full h-1/3 border-t',
  };

  const transformClasses: Record<DrawerPosition, string> = {
    left: visible ? 'translate-x-0' : '-translate-x-full',
    right: visible ? 'translate-x-0' : 'translate-x-full',
    top: visible ? 'translate-y-0' : '-translate-y-full',
    bottom: visible ? 'translate-y-0' : 'translate-y-full',
  };

  return createPortal(
    <>
      {/* Backdrop */}
      {backdrop && (
        <div
          onClick={onClose}
          className={`
            fixed inset-0 z-40 bg-gray-100/30 dark:bg-gray-950/80 backdrop-blur-sm
            transition-opacity duration-300
            ${visible ? 'opacity-100' : 'opacity-0'}
          `}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed z-50 bg-background border-slate-100 dark:border-slate-700/80 shadow-2xl
          transition-transform duration-300 ease-out
          flex flex-col
          ${positionClasses[position]}
          ${transformClasses[position]}
          ${className}
        `}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className={cn("flex items-center justify-between p-4 border-b text-gray-900 dark:text-white border-slate-200 dark:border-slate-700/50", headerClassName)}>
          <h3 className="text-lg font-semibold ">
            {title || 'Offcanvas'}
          </h3>
          <button
            onClick={onClose}
            className=" transition-colors
                       p-1 rounded opacity-70 hover:opacity-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 text-gray-700 dark:text-slate-300 leading-relaxed">
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};

export default Drawer;
