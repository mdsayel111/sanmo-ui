import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../lib/components/utils/cn";

const CodeSnippet: React.FC<{ code: string, className?: string }> = ({ code, className }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        const textarea = document.createElement('textarea');
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={cn("relative group mt-4")}>
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={copyToClipboard}
                    className="p-1.5 rounded bg-gradient-to-r from-blue-400 to-emerald-400 transition-colors"
                    title="Copy code"
                >
                    { copied ? <Check size={14} className="text-white" /> : <Copy size={14} className="text-white" /> }
                </button>
            </div>
            <pre className={cn("bg-background rounded-lg p-4 text-xs font-mono text-slate-900 dark:text-slate-400 overflow-x-auto border border-slate-300 dark:border-slate-800", className)}>
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default CodeSnippet;