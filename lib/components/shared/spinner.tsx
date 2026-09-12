type SpinnerVariant = 'border' | 'grow';
type SpinnerColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
type SpinnerSize = 'sm' | 'md';

interface SpinnerProps {
  variant?: SpinnerVariant;
  color?: SpinnerColor;
  size?: SpinnerSize;
  className?: string;
}

const Spinner = ({
  variant = 'border',
  color = 'primary',
  size = 'md',
  className = ''
}: SpinnerProps) => {

  // Colors mapped to text utility classes
  const colors = {
    primary: 'text-blue-500',
    secondary: 'text-slate-400',
    success: 'text-emerald-500',
    danger: 'text-rose-500',
    warning: 'text-amber-500',
    info: 'text-cyan-500',
    light: 'text-slate-200',
    dark: 'text-slate-800',
  };

  // Sizes
  const sizes = {
    border: {
      sm: 'w-4 h-4 border-2',
      md: 'w-8 h-8 border-[3px]',
    },
    grow: {
      sm: 'w-4 h-4',
      md: 'w-8 h-8',
    }
  };

  if (variant === 'border') {
    return (
      <div
        className={`
          inline-block rounded-full animate-spin
          border-current border-r-transparent
          ${colors[color]} 
          ${sizes.border[size]} 
          ${className}
        `}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (variant === 'grow') {
    return (
      <>
        {/* Custom Grow Animation Keyframe because Tailwind's ping is slightly different */}
        <style>{`
          @keyframes spinner-grow {
            0% { transform: scale(0); }
            50% { opacity: 1; transform: none; }
          }
          .animate-spinner-grow {
            animation: spinner-grow 0.75s linear infinite;
          }
        `}</style>
        <div
          className={`
            inline-block bg-current rounded-full opacity-0 animate-spinner-grow
            ${colors[color]} 
            ${sizes.grow[size]} 
            ${className}
          `}
          role="status"
          aria-label="Loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );
  }

  return null;
};

export default Spinner;