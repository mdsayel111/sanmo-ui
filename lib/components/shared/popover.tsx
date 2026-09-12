import { ReactNode, useEffect, useRef, useState } from 'react';
type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';
type PopoverTrigger = 'click' | 'hover' | 'focus';
type PopoverVariant = 'default' | 'primary' | 'success' | 'danger' | 'info';

interface PopoverProps {
  children: ReactNode;
  content: ReactNode;
  title?: ReactNode;
  placement?: PopoverPlacement;
  trigger?: PopoverTrigger;
  variant?: PopoverVariant;
  className?: string;
}

const Popover = ({
  children,
  content,
  title,
  placement = 'right',
  trigger = 'click',
  variant = 'default',
  className = ''
}: PopoverProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Handle click outside for click trigger
  useEffect(() => {
    if (trigger === 'click' && isVisible) {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsVisible(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible, trigger]);

  const toggle = () => {
    if (trigger === 'click') setIsVisible(!isVisible);
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') setIsVisible(true);
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') setIsVisible(false);
  };

  const handleFocus = () => {
    if (trigger === 'focus') setIsVisible(true);
  };

  const handleBlur = () => {
    if (trigger === 'focus') setIsVisible(false);
  };

  // Styles
  const placementStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
    left: 'right-full top-1/2 -translate-y-1/2 mr-3',
    right: 'left-full top-1/2 -translate-y-1/2 ml-3',
  }[placement];

  const arrowStyles = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-current border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-current border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-current border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-current border-t-transparent border-b-transparent border-l-transparent',
  }[placement];

  // Variant Styles (affects header mainly)
  const headerStyles = {
    default: "bg-background border-b border-slate-700 text-slate-200",
    primary: "bg-secondary text-white border-b border-blue-500",
    success: "bg-emerald-600 text-white border-b border-emerald-500",
    danger: "bg-rose-600 text-white border-b border-rose-500",
    info: "bg-cyan-600 text-white border-b border-cyan-500",
  }[variant];

  // The arrow color needs to match the adjacent background (header or body)
  // If positioned bottom, arrow touches header. If top, arrow touches body.
  // For simplicity in this demo, we'll keep the arrow matching the general border/bg color or text-slate-800
  const arrowColorClass = placement === 'bottom' 
    ? (variant === 'default' ? 'text-slate-800' : 
       variant === 'primary' ? 'text-blue-600' :
       variant === 'success' ? 'text-emerald-600' :
       variant === 'danger' ? 'text-rose-600' :
       variant === 'info' ? 'text-cyan-600' : 'text-slate-800')
    : 'text-slate-800'; 

  return (
    <div 
      className="relative inline-block" 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={triggerRef}
        onClick={toggle}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="inline-block"
        tabIndex={trigger === 'focus' ? 0 : undefined} // Make focusable
      >
        {children}
      </div>

      <div
        className={`
          absolute z-50 w-64 text-sm bg-slate-800 border border-background rounded-lg
          transition-all duration-200 origin-center overflow-hidden
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
          ${placementStyles}
          ${className}
        `}
        role="tooltip"
      >
        {title && (
          <div className={`px-3 py-2 rounded-t-lg font-semibold ${headerStyles}`}>
            {title}
          </div>
        )}
        <div className="px-3 py-2 bg-foreground text-slate-300">
          {content}
        </div>
        
        {/* Arrow */}
        <div className={`absolute w-0 h-0 border-[6px] ${arrowStyles} ${arrowColorClass}`} />
      </div>
    </div>
  );
};

export default Popover;