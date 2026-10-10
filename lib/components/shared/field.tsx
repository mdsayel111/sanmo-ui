import { useMemo } from "react";
import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";
import FieldLabel from "./field-label";

function FieldSet({ className, ...props }: ComponentProps<"fieldset">) {
    return (
        <fieldset
            data-slot="field-set"
            className={cn(
                "flex flex-col gap-6",
                "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
                className
            )}
            {...props}
        />
    );
}

function FieldLegend({
    className,
    variant = "legend",
    ...props
}: ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
    return (
        <legend
            data-slot="field-legend"
            data-variant={variant}
            className={cn(
                "mb-3 font-medium",
                "data-[variant=legend]:text-base",
                "data-[variant=label]:text-sm",
                className
            )}
            {...props}
        />
    );
}

function FieldGroup({ className, ...props }: ComponentProps<"div">) {
    return (
        <div
            data-slot="field-group"
            className={cn(
                "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
                className
            )}
            {...props}
        />
    );
}

const fieldVariants = cva(
    "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
    {
        variants: {
            orientation: {
                vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
                horizontal: [
                    "flex-row items-center rounded-md border-(--border-color) p-4 transition-colors",
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
                    "[&>[data-slot=field-label]]:flex-auto",
                    "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
                ],
                responsive: [
                    "flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
                    "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
                    "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
                ],
            },
        },
        defaultVariants: {
            orientation: "vertical",
        },
    }
);

function Field({
    className,
    orientation = "vertical",
    ...props
}: ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
    return (
        <div
            role="group"
            data-slot="field"
            data-orientation={orientation}
            className={cn(fieldVariants({ orientation }), className)}
            {...props}
        />
    );
}

function FieldContent({ className, ...props }: ComponentProps<"div">) {
    return (
        <div
            data-slot="field-content"
            className={cn(
                "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
                className
            )}
            {...props}
        />
    );
}

function FieldTitle({ className, ...props }: ComponentProps<"div">) {
    return (
        <div
            data-slot="field-label"
            className={cn(
                "flex w-fit items-center gap-2 leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
                className
            )}
            {...props}
        />
    );
}

function FieldDescription({ className, ...props }: ComponentProps<"p">) {
    return (
        <p
            data-slot="field-description"
            className={cn(
                "text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance",
                "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
                "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
                className
            )}
            {...props}
        />
    );
}

function FieldSeparator({
    children,
    className,
    ...props
}: ComponentProps<"div"> & { children?: ReactNode }) {
    return (
        <div
            role="separator"
            aria-orientation="horizontal"
            data-slot="field-separator"
            data-content={Boolean(children)}
            className={cn("relative -my-2 h-5 text-sm", className)}
            {...props}
        >
            <div className="absolute inset-x-0 top-1/2 border-t border-(--border-color)" />
            {children && (
                <span
                    className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground"
                    data-slot="field-separator-content"
                >
                    {children}
                </span>
            )}
        </div>
    );
}

function FieldError({
    className,
    children,
    errors,
    ...props
}: ComponentProps<"div"> & {
    errors?: Array<{ message?: string } | undefined>;
}) {
    const content = useMemo(() => {
        if (children) return children;
        if (!errors?.length) return null;

        const uniqueErrors = [
            ...new Map(errors.map((error) => [error?.message, error])).values(),
        ];

        if (uniqueErrors.length === 1) return uniqueErrors[0]?.message ?? null;

        return (
            <ul className="ml-4 flex list-disc flex-col gap-1">
                {uniqueErrors.map(
                    (error, index) =>
                        error?.message && <li key={index}>{error.message}</li>
                )}
            </ul>
        );
    }, [children, errors]);

    if (!content) return null;

    return (
        <div
            role="alert"
            data-slot="field-error"
            className={cn("text-destructive text-sm font-normal", className)}
            {...props}
        >
            {content}
        </div>
    );
}

export {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldContent,
    FieldTitle,
};
