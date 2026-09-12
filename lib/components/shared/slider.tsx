import { useCallback, useEffect, useRef, useState } from "react";

interface RangeSliderProps {
    min?: number;
    max?: number;
    step?: number;
    value: number | number[];
    onChange: (value: number | number[]) => void;
    vertical?: boolean;
    className?: string;
    color?: string;
}

const Slider = ({
    min = 0,
    max = 100,
    step = 1,
    value,
    onChange,
    vertical = false,
    className = '',
    color = 'bg-secondary' // Tailwind class for the active track/handle
}: RangeSliderProps) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const isRange = Array.isArray(value);
    const [isDragging, setIsDragging] = useState<number | null>(null);

    // Helper to get percentage from value
    const getPercent = useCallback((val: number) => {
        return ((val - min) / (max - min)) * 100;
    }, [min, max]);

    // Helper to get value from mouse/touch position
    const getValueFromPointer = useCallback((e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
        if (!trackRef.current) return 0;
        const rect = trackRef.current.getBoundingClientRect();

        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as MouseEvent).clientX;
            clientY = (e as MouseEvent).clientY;
        }

        let percent;
        if (vertical) {
            // For vertical, 0 is at bottom usually, but DOM coords Y increases downwards.
            // Let's assume standard slider: top is 100%, bottom is 0%? 
            // Actually usually sliders go bottom-up.
            // Let's implement bottom-up.
            const offsetY = rect.bottom - clientY;
            percent = Math.max(0, Math.min(100, (offsetY / rect.height) * 100));
        } else {
            const offsetX = clientX - rect.left;
            percent = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
        }

        const rawValue = min + (percent / 100) * (max - min);
        // Snap to step
        const steppedValue = Math.round(rawValue / step) * step;
        return Math.max(min, Math.min(max, steppedValue));
    }, [min, max, step, vertical]);

    const handlePointerDown = (index: number) => (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        setIsDragging(index);
    };

    useEffect(() => {
        const handlePointerUp = () => setIsDragging(null);

        const handlePointerMove = (e: MouseEvent | TouchEvent) => {
            if (isDragging !== null) {
                const newValue = getValueFromPointer(e);

                if (isRange) {
                    const arrVal = [...(value as number[])];

                    // Logic to prevent crossing handles
                    if (isDragging === 0) {
                        arrVal[0] = Math.min(newValue, arrVal[1]);
                    } else {
                        arrVal[1] = Math.max(newValue, arrVal[0]);
                    }
                    onChange(arrVal);
                } else {
                    onChange(newValue);
                }
            }
        };

        if (isDragging !== null) {
            window.addEventListener('mousemove', handlePointerMove);
            window.addEventListener('mouseup', handlePointerUp);
            window.addEventListener('touchmove', handlePointerMove);
            window.addEventListener('touchend', handlePointerUp);
        }

        return () => {
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('mouseup', handlePointerUp);
            window.removeEventListener('touchmove', handlePointerMove);
            window.removeEventListener('touchend', handlePointerUp);
        };
    }, [isDragging, getValueFromPointer, isRange, value, onChange]);

    // Styles
    const trackStyles = vertical
        ? `w-1.5 h-full`
        : `h-1.5 w-full`;

    const fillStyles = vertical
        ? {
            bottom: isRange ? `${getPercent((value as number[])[0])}%` : '0%',
            top: isRange ? `${100 - getPercent((value as number[])[1])}%` : `${100 - getPercent(value as number)}%`,
            width: '100%',
        }
        : {
            left: isRange ? `${getPercent((value as number[])[0])}%` : '0%',
            right: isRange ? `${100 - getPercent((value as number[])[1])}%` : `${100 - getPercent(value as number)}%`,
            height: '100%',
        };

    const handleStyle = (val: number) => vertical
        ? { bottom: `${getPercent(val)}%`, left: '50%', transform: 'translate(-50%, 50%)' }
        : { left: `${getPercent(val)}%`, top: '50%', transform: 'translate(-50%, -50%)' };

    return (
        <div
            className={`relative flex items-center justify-center select-none touch-none ${vertical ? 'h-full py-3' : 'w-full px-3'} ${className}`}
        >
            {/* Track */}
            <div ref={trackRef} className={`relative bg-background rounded-full ${trackStyles}`}>

                {/* Active Fill */}
                <div className={`absolute rounded-full ${color}`} style={fillStyles} />

                {/* Handles */}
                {(isRange ? (value as number[]) : [value as number]).map((val, index) => (
                    <div
                        key={index}
                        className={`
              absolute w-4 h-4 rounded-full border-2 border-white shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform
              ${color}
            `}
                        style={handleStyle(val)}
                        onMouseDown={handlePointerDown(index)}
                        onTouchStart={handlePointerDown(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;