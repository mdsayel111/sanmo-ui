import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';

export type ModalSize =
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'full'
    | 'fullscreen-sm'
    | 'fullscreen-md'
    | 'fullscreen-lg'
    | 'fullscreen-xl'
    | 'fullscreen-xxl';

export type ModalPosition = 'top' | 'center' | 'bottom';
export type ModalVariant = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'info';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
    size?: ModalSize;
    position?: ModalPosition;
    variant?: ModalVariant;
    scrollable?: boolean;
    staticBackdrop?: boolean;
    className?: string;
    header?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md',
    position = 'center',
    variant = 'default',
    scrollable = false,
    staticBackdrop = false,
    className = '',
    header
}) => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    // Mount / unmount lifecycle
    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            // requestAnimationFrame(() => setVisible(true));
            setTimeout(() => setVisible(true), 100);
        } else {
            setVisible(false);
            const t = setTimeout(() => setMounted(false), 300);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    // Escape key + scroll lock
    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = 'hidden';

        const onEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (staticBackdrop) {
                    // setShake(true);
                    // setTimeout(() => setShake(false), 300);
                } else {
                    onClose();
                }
            }
        };

        window.addEventListener('keydown', onEsc);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onEsc);
        };
    }, [isOpen, onClose, staticBackdrop]);

    const onBackdropClick = (e: React.MouseEvent) => {
        if (!modalRef.current?.contains(e.target as Node)) {
            if (staticBackdrop) {
                // setShake(true);
                // setTimeout(() => setShake(false), 300);
            } else {
                onClose();
            }
        }
    };

    if (!mounted) return null;

    const sizeClasses: Record<ModalSize, string> = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-full m-4',
        'fullscreen-sm': 'max-w-none sm:rounded-lg h-full sm:h-auto',
        'fullscreen-md': 'max-w-none md:rounded-lg h-full md:h-auto',
        'fullscreen-lg': 'max-w-none lg:rounded-lg h-full lg:h-auto',
        'fullscreen-xl': 'max-w-none xl:rounded-lg h-full xl:h-auto',
        'fullscreen-xxl': 'max-w-none 2xl:rounded-lg h-full 2xl:h-auto',
    };

    const positionClasses: Record<ModalPosition, string> = {
        top: 'items-start mt-10',
        center: 'items-center',
        bottom: 'items-end mb-10',
    };

    const headerVariant = {
        primary: 'bg-blue-600/10 text-blue-500 border-blue-500/50',
        secondary: 'bg-slate-600/10 text-slate-400 border-slate-500/50',
        success: 'bg-emerald-600/10 text-emerald-500 border-emerald-500/50',
        danger: 'bg-rose-600/10 text-rose-500 border-rose-500/50',
        info: 'bg-cyan-600/10 text-cyan-500 border-cyan-500/50',
        default: 'bg-transparent',
    }[variant];

    return createPortal(
        <div
            className={`fixed inset-0 z-[9999] flex justify-center p-4 ${positionClasses[position]}`}
            onClick={onBackdropClick}
        >
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-slate-950/30 backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            {/* Dialog */}
            <div
                ref={modalRef}
                className={`
          relative z-10 w-full
          bg-background border border-slate-200 dark:border-slate-700 rounded-lg
          shadow-2xl shadow-black/50
          flex flex-col
          transform transition-all -translate-y-6
          ${sizeClasses[size]}
          ${visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-6'}
          ${scrollable ? 'max-h-[calc(100vh-3rem)]' : ''}
          ${className}
        `}
            >
                {!header ? (title || variant !== 'default') && (
                    <div className={cn(`flex items-center justify-between p-4 border-b text-gray-900 dark:text-white border-gray-200 dark:border-slate-700/80`, headerVariant)}>
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            {variant === 'danger' && <AlertTriangle size={18} />}
                            {variant === 'success' && <CheckCircle size={18} />}
                            {variant === 'info' && <Info size={18} />}
                            {title}
                        </h3>
                        <button onClick={onClose} className="opacity-70 hover:opacity-100">
                            <X size={20} />
                        </button>
                    </div>
                ) : header}

                <div className={`flex-1 ${scrollable ? 'overflow-y-auto' : ''}`}>{children}</div>

                {footer && (
                    <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-200 dark:border-slate-700/80">
                        {footer}
                    </div>
                )}
            </div>
        </div >,
        document.body
    );
};

export default Modal;
