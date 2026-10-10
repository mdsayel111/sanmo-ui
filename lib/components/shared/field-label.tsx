import type { LabelHTMLAttributes } from "react";
import { cn } from "../utils/cn";

interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const FieldLabel = ({ className, ...props }: FieldLabelProps) => (
    <label
        data-slot="field-label"
        className={cn(
            "mb-2 group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 font-semibold",
            "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border-[0.5px] has-[>[data-slot=field]]:border-(--border-color) [&>*]:data-[slot=field]:p-4",
            "has-[[data-state=checked][data-variant=primary]]:border-secondary has-[[data-variant=primary]:checked]:border-secondary",
            "has-[[data-state=checked][data-variant=secondary]]:border-slate-600 has-[[data-variant=secondary]:checked]:border-slate-600",
            "has-[[data-state=checked][data-variant=success]]:border-emerald-500 has-[[data-variant=success]:checked]:border-emerald-500",
            "has-[[data-state=checked][data-variant=danger]]:border-rose-500 has-[[data-variant=danger]:checked]:border-rose-500",
            "has-[[data-state=checked][data-variant=warning]]:border-amber-500 has-[[data-variant=warning]:checked]:border-amber-500",
            "has-[[data-state=checked][data-variant=info]]:border-cyan-500 has-[[data-variant=info]:checked]:border-cyan-500",
            "has-[[data-state=checked][data-variant=dark]]:border-slate-800 has-[[data-variant=dark]:checked]:border-slate-800",
            "has-[[data-state=checked][data-variant=light]]:border-slate-200 has-[[data-variant=light]:checked]:border-slate-200",
            "has-[[data-state=checked][data-variant=primary]]:bg-secondary/5 has-[[data-variant=primary]:checked]:bg-secondary/5",
            "has-[[data-state=checked][data-variant=secondary]]:bg-slate-600/5 has-[[data-variant=secondary]:checked]:bg-slate-600/5",
            "has-[[data-state=checked][data-variant=success]]:bg-emerald-500/5 has-[[data-variant=success]:checked]:bg-emerald-500/5",
            "has-[[data-state=checked][data-variant=danger]]:bg-rose-500/5 has-[[data-variant=danger]:checked]:bg-rose-500/5",
            "has-[[data-state=checked][data-variant=warning]]:bg-amber-500/5 has-[[data-variant=warning]:checked]:bg-amber-500/5",
            "has-[[data-state=checked][data-variant=info]]:bg-cyan-500/5 has-[[data-variant=info]:checked]:bg-cyan-500/5",
            "has-[[data-state=checked][data-variant=dark]]:bg-slate-800/5 has-[[data-variant=dark]:checked]:bg-slate-800/5",
            "has-[[data-state=checked][data-variant=light]]:bg-slate-200/20 has-[[data-variant=light]:checked]:bg-slate-200/20",
            className
        )}
        {...props}
    />
);

export default FieldLabel;
