import { Star } from "lucide-react";
import { useState } from "react";

interface RatingProps {
  value?: number;
  defaultValue?: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  disabled?: boolean;
  highlightSelectedOnly?: boolean;
  className?: string;
  itemClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

const Rating = ({
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  onChange,
  readOnly = false,
  disabled = false,
  highlightSelectedOnly = false,
  className = '',
  itemClassName = '',
  activeClassName = 'fill-orange-400 text-orange-400',
  inactiveClassName = 'fill-transparent text-slate-600',
}: RatingProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleMouseEnter = (index: number) => {
    if (!readOnly && !disabled) {
      setHoverValue(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly && !disabled) {
      setHoverValue(null);
    }
  };

  const handleClick = (index: number) => {
    if (!readOnly && !disabled) {
      if (!isControlled) {
        setInternalValue(index);
      }
      if (onChange) {
        onChange(index);
      }
    }
  };

  return (
    <div 
      className={`inline-flex items-center gap-1 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onMouseLeave={handleMouseLeave}
    >
      {[...Array(max)].map((_, i) => {
        const index = i + 1;
        
        // Determination logic for active state
        let isActive = false;
        const targetValue = hoverValue !== null ? hoverValue : currentValue;

        if (highlightSelectedOnly) {
          isActive = targetValue === index;
        } else {
          isActive = targetValue >= index;
        }

        return (
          <button
            key={index}
            type="button"
            disabled={disabled || readOnly}
            className={`
              transition-transform duration-100 focus:outline-none
              ${!readOnly && !disabled ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}
              ${itemClassName}
            `}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            aria-label={`Rate ${index} out of ${max}`}
          >
            <Star 
              size={24} 
              className={`transition-colors duration-200 ${isActive ? activeClassName : inactiveClassName}`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Rating;