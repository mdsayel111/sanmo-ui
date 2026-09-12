import { Check, CloudUpload, File, X } from "lucide-react";
import { useRef, useState } from "react";

interface FileUploaderProps {
    multiple?: boolean;
    onFilesSelected?: (files: File[]) => void;
    className?: string;
}

const FileUploader = ({
    multiple = true,
    onFilesSelected,
    className = ''
}: FileUploaderProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFiles(droppedFiles);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            handleFiles(selectedFiles);
        }
    };

    const handleFiles = (newFiles: File[]) => {
        let updatedFiles: File[] = [];

        if (multiple) {
            // Multiple mode: Append new files to existing ones
            updatedFiles = [...files, ...newFiles];
        } else {
            // Single mode: Replace existing file with the first new one
            if (newFiles.length > 0) {
                updatedFiles = [newFiles[0]];
            }
        }

        setFiles(updatedFiles);
        if (onFilesSelected) onFilesSelected(updatedFiles);
    };

    const removeFile = (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        if (onFilesSelected) onFilesSelected(updatedFiles);
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className={`w-full ${className}`}>
            {/* Drop Zone */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
          relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200 bg-background hover:bg-background/80
          ${isDragging
                        ? 'border-secondary'
                        : 'border-slate-700 hover:border-slate-500'}
        `}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple={multiple}
                    onChange={handleFileInput}
                />

                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="p-4 bg-foreground rounded-full text-black dark:text-white">
                        <CloudUpload size={48} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="text-xl font-medium text-gray-800 dark:text-slate-200 mb-1">
                            {multiple ? 'Drop files here or click to upload.' : 'Drop a file here or click to upload.'}
                        </h3>
                        <p className="text-sm text-slate-500">
                            (This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)
                        </p>
                    </div>
                </div>
            </div>

            {/* File Previews */}
            {files.length > 0 && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {files.map((file, index) => (
                        <div
                            key={`${file.name}-${index}`}
                            className="bg-slate-800 border border-slate-700 rounded-lg p-3 flex items-start gap-3 relative group"
                        >
                            {/* Preview Icon/Image */}
                            <div className="w-12 h-12 bg-slate-900 rounded flex items-center justify-center shrink-0 overflow-hidden">
                                {file.type.startsWith('image/') ? (
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="w-full h-full object-cover"
                                        onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                                    />
                                ) : (
                                    <File className="text-slate-500" size={24} />
                                )}
                            </div>

                            {/* File Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-200 truncate pr-6">{file.name}</p>
                                <p className="text-xs text-slate-500 mt-1">{formatSize(file.size)}</p>

                                {/* Simulated Progress Bar */}
                                <div className="w-full bg-slate-900 h-1 mt-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
                                </div>
                            </div>

                            {/* Remove Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                                className="absolute top-2 right-2 text-slate-500 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <X size={16} />
                            </button>

                            {/* Success Checkmark (Simulated) */}
                            <div className="absolute bottom-2 right-2 text-emerald-500">
                                <Check size={14} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUploader;