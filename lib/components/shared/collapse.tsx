import { ReactNode, useEffect, useRef, useState } from "react";

interface CollapseProps {
  isOpen: boolean;
  horizontal?: boolean;
  children: ReactNode;
  className?: string;
}

const Collapse = ({
  isOpen,
  horizontal = false,
  children,
  className = ''
}: CollapseProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<string | number>(0);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        const value = horizontal
          ? contentRef.current.scrollWidth
          : contentRef.current.scrollHeight;
        setSize(value);
      } else {
        setSize(0);
      }
    }
  }, [isOpen, horizontal]);

  const style = horizontal
    ? { width: isOpen ? size : 0 }
    : { height: isOpen ? size : 0 };

  return (
    <div
      className={`
        overflow-hidden transition-all duration-300 rounded-lg  ease-in-out bg-background
        ${horizontal ? '' : 'w-full'}
        ${className}
        ${isOpen ? "dark:border-slate-700 border-slate-200  border ": "border-none"}
      `}
      style={style}
    >
      <div ref={contentRef} className={horizontal ? 'w-max' : ''}>
        {children}
      </div>
    </div>
  );
};

export default Collapse;