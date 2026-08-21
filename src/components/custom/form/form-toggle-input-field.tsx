import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";

export type ToggleOption = string;

interface ToggleButtonConfig {
    label: string;
    value: ToggleOption;
    icon: ReactNode;
}

interface FormToggleInputFieldProps {
    label: string;
    options: ToggleButtonConfig[];
    value: ToggleOption;
    onChange: (value: ToggleOption) => void;
    fieldState: any;
    className?: string;
}

export default function FormToggleInputField({
    label,
    options,
    value,
    onChange,
    fieldState,
    className,
}: FormToggleInputFieldProps) {
    const isInvalid = fieldState.meta.isTouched && !fieldState.meta.isValid;

    return (
        <Field data-invalid={isInvalid} className={className}>
            <FieldLabel>{label}</FieldLabel>
            <div className="flex gap-2">
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        aria-pressed={value === option.value}
                        aria-label={`Select ${option.label}`}
                        className={cn(
                            "grow flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer select-none",
                            value === option.value
                                ? "bg-primary text-white border-transparent shadow-xs"
                                : "bg-muted/30 text-muted-foreground border-border/60 hover:bg-muted/60",
                        )}
                    >
                        <span className="h-3.5 w-3.5 flex items-center justify-center">
                            {option.icon}
                        </span>
                        <span>{option.label}</span>
                    </button>
                ))}
            </div>
            {isInvalid && <FieldError errors={fieldState.meta.errors} />}
        </Field>
    );
}
