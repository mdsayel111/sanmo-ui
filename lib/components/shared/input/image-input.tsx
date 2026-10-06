import { ImagePlus, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../../utils/cn";

export type ImageInputValue = File | string | null;

interface ImageInputProps {
    label?: string;
    id?: string;
    value?: ImageInputValue;
    onChange?: (value: ImageInputValue) => void;
    accept?: string;
    disabled?: boolean;
    className?: string;
}

const ImageInput = ({
    label,
    id,
    value,
    onChange,
    accept = "image/*",
    disabled = false,
    className = "",
}: ImageInputProps) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const labelId = `${inputId}-label`;
    const inputRef = useRef<HTMLInputElement>(null);
    const [internalValue, setInternalValue] = useState<ImageInputValue>(null);
    const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const selectedValue = value !== undefined ? value : internalValue;

    useEffect(() => {
        if (typeof File === "undefined" || !(selectedValue instanceof File)) {
            setFilePreviewUrl(null);
            return;
        }

        const previewUrl = URL.createObjectURL(selectedValue);
        setFilePreviewUrl(previewUrl);
        return () => URL.revokeObjectURL(previewUrl);
    }, [selectedValue]);

    const updateValue = (nextValue: ImageInputValue) => {
        if (value === undefined) {
            setInternalValue(nextValue);
        }
        onChange?.(nextValue);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select an image file.");
            event.currentTarget.value = "";
            return;
        }

        setError(null);
        updateValue(file);
        event.currentTarget.value = "";
    };

    const previewUrl = typeof selectedValue === "string" ? selectedValue : filePreviewUrl;

    return (
        <div className="w-full">
            {label && (
                <label id={labelId} className="mb-1.5 block text-sm text-gray-900 dark:text-slate-400">
                    {label}
                </label>
            )}
            <input
                ref={inputRef}
                id={inputId}
                type="file"
                accept={accept}
                disabled={disabled}
                onChange={handleFileChange}
                aria-labelledby={label ? labelId : undefined}
                aria-label={label ? undefined : "Choose an image"}
                className="sr-only"
            />
            {previewUrl ? (
                <div className={cn("image-input-surface group relative min-h-48 w-full overflow-hidden rounded-sm border border-(--border-color) bg-background", className)}>
                    <img
                        src={previewUrl}
                        alt={label ? `${label} preview` : "Selected image preview"}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <button
                        type="button"
                        disabled={disabled}
                        onClick={() => inputRef.current?.click()}
                        aria-label={label ? `Change ${label}` : "Change image"}
                        className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 text-sm font-medium text-white opacity-0 group-hover:bg-black/45 group-hover:opacity-100 focus-visible:bg-black/45 focus-visible:opacity-100 disabled:cursor-not-allowed"
                    >
                        <ImagePlus size={18} aria-hidden="true" />
                        Change image
                    </button>
                    <button
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                            setError(null);
                            updateValue(null);
                            if (inputRef.current) inputRef.current.value = "";
                        }}
                        aria-label="Remove image"
                        className="absolute right-2 top-2 inline-flex items-center justify-center rounded-sm border border-(--border-color) bg-background p-2 text-gray-700 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-foreground disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-200"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => inputRef.current?.click()}
                    aria-label={label ? `Choose an image for ${label}` : undefined}
                    className={cn("image-input-surface flex min-h-48 w-full items-center justify-center gap-2 rounded-sm border border-(--border-color) bg-background px-4 py-6 text-sm text-gray-700 hover:bg-foreground disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-200", className)}
                >
                    <ImagePlus size={20} aria-hidden="true" />
                    Choose an image
                </button>
            )}
            {error && <p role="alert" className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
};

export default ImageInput;
