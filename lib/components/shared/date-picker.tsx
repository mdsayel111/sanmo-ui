import {
    Calendar as CalendarIcon,
    ChevronDown,
    ChevronLeft, ChevronRight,
    ChevronUp,
    Clock
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
};

const formatDate = (date: Date, includeTime = false, time24hr = false) => {
    if (!date) return '';
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    const dateStr = `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;

    if (!includeTime) return dateStr;

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (time24hr) {
        return `${dateStr} ${hours.toString().padStart(2, '0')}:${minutes}`;
    }

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${dateStr} ${hours}:${minutes} ${ampm}`;
};

const formatTimeOnly = (date: Date, time24hr = false) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (time24hr) {
        return `${hours.toString().padStart(2, '0')}:${minutes}`;
    }

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
};

const isDateDisabled = (date: Date, minDate?: Date, maxDate?: Date, disable?: Date[]) => {
    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true;
    if (maxDate && date > new Date(maxDate.setHours(0, 0, 0, 0))) return true;
    if (disable && disable.some(d => isSameDate(d, date))) return true;
    return false;
};

const isSameDate = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false;
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
};

interface DateTimePickerProps {
    value?: Date | Date[];
    onChange?: (date: Date | Date[]) => void;
    placeholder?: string;
    enableTime?: boolean;
    noCalendar?: boolean; // Time picker only
    time_24hr?: boolean;
    mode?: 'single' | 'multiple' | 'range';
    minDate?: Date;
    maxDate?: Date;
    minTime?: string; // "HH:MM"
    maxTime?: string; // "HH:MM"
    disable?: Date[];
    className?: string;
}

const DateTimePicker = ({
    value,
    onChange,
    placeholder = "Select Date...",
    enableTime = false,
    noCalendar = false,
    time_24hr = false,
    mode = 'single',
    minDate,
    maxDate,
    minTime,
    maxTime,
    disable = [],
    className = ''
}: DateTimePickerProps) => {
    // --- State ---
    const [isOpen, setIsOpen] = useState(false);

    // Internal selection state
    const initialSelection = Array.isArray(value) ? value : (value ? [value] : []);
    const [selectedDates, setSelectedDates] = useState<Date[]>(initialSelection);

    // Navigation state (viewing month/year)
    const [viewDate, setViewDate] = useState(selectedDates[0] || new Date());

    const containerRef = useRef<HTMLDivElement>(null);

    // --- Effects ---
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // --- Helpers ---
    const enforceTimeLimits = (date: Date) => {
        if (!minTime && !maxTime) return date;

        const [minH, minM] = minTime ? minTime.split(':').map(Number) : [0, 0];
        const [maxH, maxM] = maxTime ? maxTime.split(':').map(Number) : [23, 59];

        const currentH = date.getHours();
        const currentM = date.getMinutes();

        const currentTotal = currentH * 60 + currentM;
        const minTotal = minH * 60 + minM;
        const maxTotal = maxH * 60 + maxM;

        if (currentTotal < minTotal) {
            date.setHours(minH);
            date.setMinutes(minM);
        } else if (currentTotal > maxTotal) {
            date.setHours(maxH);
            date.setMinutes(maxM);
        }
        return date;
    };

    // --- Handlers ---

    const updateSelection = (newDates: Date[]) => {
        setSelectedDates(newDates);
        if (onChange) onChange(mode === 'single' ? newDates[0] : newDates);
    };

    const handleDateClick = (day: number) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);

        // Preserve time if time is enabled and we already have a selected date
        if (enableTime) {
            const baseTime = selectedDates[0] || new Date();
            newDate.setHours(baseTime.getHours());
            newDate.setMinutes(baseTime.getMinutes());
            enforceTimeLimits(newDate);
        }

        if (isDateDisabled(newDate, minDate, maxDate, disable)) return;

        let newSelection: Date[] = [];

        if (mode === 'single') {
            newSelection = [newDate];
            if (!enableTime) setIsOpen(false);
        } else if (mode === 'multiple') {
            const exists = selectedDates.find(d => isSameDate(d, newDate));
            if (exists) {
                newSelection = selectedDates.filter(d => !isSameDate(d, newDate));
            } else {
                newSelection = [...selectedDates, newDate];
            }
        } else if (mode === 'range') {
            if (selectedDates.length === 1 && newDate >= selectedDates[0]) {
                newSelection = [selectedDates[0], newDate]; // Complete range
                if (!enableTime) setIsOpen(false);
            } else {
                newSelection = [newDate]; // Start new range
            }
        }

        updateSelection(newSelection);
    };

    const handleTimeIncrement = (type: 'hours' | 'minutes', amount: number) => {
        const baseDate = selectedDates.length > 0 ? new Date(selectedDates[0]) : new Date();

        if (type === 'hours') {
            baseDate.setHours(baseDate.getHours() + amount);
        } else {
            baseDate.setMinutes(baseDate.getMinutes() + amount);
        }

        enforceTimeLimits(baseDate);

        const newSelection = selectedDates.length > 0
            ? [baseDate, ...selectedDates.slice(1)]
            : [baseDate];

        updateSelection(newSelection);
    };

    const handleAMPMToggle = () => {
        const baseDate = selectedDates.length > 0 ? new Date(selectedDates[0]) : new Date();
        const hours = baseDate.getHours();

        if (hours >= 12) {
            baseDate.setHours(hours - 12);
        } else {
            baseDate.setHours(hours + 12);
        }

        enforceTimeLimits(baseDate);

        const newSelection = selectedDates.length > 0
            ? [baseDate, ...selectedDates.slice(1)]
            : [baseDate];

        updateSelection(newSelection);
    };

    // --- Render Helpers ---

    const renderInputValue = () => {
        if (selectedDates.length === 0) return '';

        if (mode === 'range') {
            if (selectedDates.length === 2) {
                return `${formatDate(selectedDates[0], enableTime, time_24hr)} to ${formatDate(selectedDates[1], enableTime, time_24hr)}`;
            }
            return formatDate(selectedDates[0], enableTime, time_24hr);
        }

        if (mode === 'multiple') {
            return selectedDates.map(d => formatDate(d, enableTime, time_24hr)).join(', ');
        }

        // Single
        return noCalendar
            ? formatTimeOnly(selectedDates[0], time_24hr)
            : formatDate(selectedDates[0], enableTime, time_24hr);
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(viewDate.getMonth(), viewDate.getFullYear());
        const firstDay = getFirstDayOfMonth(viewDate.getMonth(), viewDate.getFullYear());
        const days = [];

        // Empty slots for prev month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-9 w-9" />);
        }

        // Days
        for (let d = 1; d <= daysInMonth; d++) {
            const current = new Date(viewDate.getFullYear(), viewDate.getMonth(), d);
            const disabled = isDateDisabled(current, minDate, maxDate, disable);

            let isSelected = false;
            let isInRange = false;

            if (mode === 'single') {
                isSelected = selectedDates.some(sd => isSameDate(sd, current));
            } else if (mode === 'multiple') {
                isSelected = selectedDates.some(sd => isSameDate(sd, current));
            } else if (mode === 'range') {
                isSelected = selectedDates.some(sd => isSameDate(sd, current));
                if (selectedDates.length === 2) {
                    isInRange = current > selectedDates[0] && current < selectedDates[1];
                }
            }

            // Check if current is today
            const isToday = isSameDate(current, new Date());

            days.push(
                <button
                    key={d}
                    type="button"
                    disabled={disabled}
                    onClick={() => handleDateClick(d)}
                    className={`
            h-9 w-9 text-sm rounded-full flex items-center justify-center transition-all
            ${isSelected ? 'bg-secondary text-white' : ''}
            ${isInRange && !isSelected ? 'bg-slate-800 text-blue-200 rounded-none' : ''}
            ${!isSelected && !isInRange && !disabled ? 'hover:bg-background text-gray-700 dark:text-slate-300' : ''}
            ${disabled ? 'text-slate-600 cursor-not-allowed' : ''}
            ${isToday && !isSelected ? 'border border-secondary text-secondary' : ''}
          `}
                >
                    {d}
                </button>
            );
        }
        return days;
    };

    // Time Rendering Vars
    const currentDate = selectedDates[0] || new Date();
    let displayHours = currentDate.getHours();
    const displayMinutes = currentDate.getMinutes().toString().padStart(2, '0');
    const ampm = displayHours >= 12 ? 'PM' : 'AM';

    if (!time_24hr) {
        displayHours = displayHours % 12;
        displayHours = displayHours ? displayHours : 12;
    }
    const displayHoursStr = displayHours.toString().padStart(2, '0');

    const TimeInputGroup = ({ val, onUp, onDown }: { val: string, onUp: () => void, onDown: () => void }) => (
        <div className="flex flex-col items-center group">
            <button
                type="button"
                onClick={onUp}
                className="text-slate-500 hover:text-black dark:hover:text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <ChevronUp size={14} />
            </button>
            <input
                type="text"
                readOnly
                className="w-10 bg-transparent text-center text-black dark:text-white text-lg font-medium focus:outline-none appearance-none"
                value={val}
            />
            <button
                type="button"
                onClick={onDown}
                className="text-slate-500 hover:text-black dark:hover:text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <ChevronDown size={14} />
            </button>
        </div>
    );

    return (
        <div className={`relative w-full ${className}`} ref={containerRef}>
            {/* Input Trigger */}
            <div
                className="relative cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <input
                    type="text"
                    readOnly
                    placeholder={placeholder}
                    value={renderInputValue()}
                    className={`
            w-full bg-background rounded-lg py-2.5 px-4 text-sm dark:text-slate-200 
            placeholder:text-gray-700 dark:placeholder:text-slate-100 focus:outline-none
          `}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                    {noCalendar ? <Clock size={16} /> : <CalendarIcon size={16} />}
                </div>
            </div>

            {/* Popup */}
            {isOpen && (
                <div className="absolute z-10 mt-2 p-4 bg-foreground rounded-xl animate-in fade-in zoom-in-95 duration-200 min-w-[300px]">

                    {/* Calendar Header */}
                    {!noCalendar && (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    type="button"
                                    onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
                                    className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <div className="font-semibold dark:text-slate-200">
                                    {MONTH_NAMES[viewDate.getMonth()]} <span className="text-gray-500 dark:text-slate-500">{viewDate.getFullYear()}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
                                    className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                            {/* Weekdays */}
                            <div className="grid grid-cols-7 mb-2">
                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                    <div key={day} className="text-center text-xs font-bold text-gray700 dark:text-slate-300 uppercase">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Days Grid */}
                            <div className="grid grid-cols-7 gap-y-1">
                                {renderCalendarDays()}
                            </div>
                        </>
                    )}

                    {/* Time Picker Section */}
                    {enableTime && (
                        <div className={`flex items-center justify-center gap-1 pt-2 ${!noCalendar ? 'mt-2 border-t border-background' : ''}`}>
                            <span className="text-xs text-gray-700 dark:text-slate-500 font-medium mr-2">Time</span>

                            {/* Hours */}
                            <TimeInputGroup
                                val={displayHoursStr}
                                onUp={() => handleTimeIncrement('hours', 1)}
                                onDown={() => handleTimeIncrement('hours', -1)}
                            />

                            <span className="text-slate-500 font-bold mb-1">:</span>

                            {/* Minutes */}
                            <TimeInputGroup
                                val={displayMinutes}
                                onUp={() => handleTimeIncrement('minutes', 1)}
                                onDown={() => handleTimeIncrement('minutes', -1)}
                            />

                            {/* AM/PM */}
                            {!time_24hr && (
                                <div className="flex flex-col items-center group ml-2">
                                    <button
                                        type="button"
                                        onClick={handleAMPMToggle}
                                        className="text-gray-700 dark:text-slate-500 hover:text-black dark:hover:text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <ChevronUp size={14} />
                                    </button>
                                    <div className="w-10 bg-transparent text-center text-black dark:text-white text-lg font-medium cursor-default">
                                        {ampm}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleAMPMToggle}
                                        className="text-gray-700 dark:text-slate-500 hover:text-black dark:hover:text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <ChevronDown size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DateTimePicker;