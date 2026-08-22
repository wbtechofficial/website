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
  error?: string;
  className?: string;
}

export default function FormToggleInputField({
  label,
  options,
  value,
  onChange,
  error,
  className,
}: FormToggleInputFieldProps) {
  const isInvalid = !!error;

  return (
    <Field data-invalid={isInvalid} className={className}>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex p-1 bg-muted/40 dark:bg-muted/15 border border-border/60 rounded-xl w-full gap-1">
        {options.map((option) => {
          const isActive = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={isActive}
              aria-label={`Select ${option.label}`}
              className={cn(
                "grow flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer select-none border",
                isActive
                  ? "bg-primary text-white border-transparent shadow-xs"
                  : "bg-transparent text-muted-foreground hover:text-foreground border-transparent hover:bg-muted/30 dark:hover:bg-muted/10",
              )}
            >
              <span className="h-3.5 w-3.5 flex items-center justify-center shrink-0">
                {option.icon}
              </span>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
      {isInvalid && error && <FieldError errors={[{ message: error }]} />}
    </Field>
  );
}
