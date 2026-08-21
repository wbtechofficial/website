import { ReactNode } from "react";
import { FieldLikeState } from "@tanstack/react-form";

import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

interface IconInputFieldProps {
    icon: ReactNode;
    label: string;
    fieldName: string;
    type?: "text" | "email" | "tel";
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    fieldState: any;
    className?: string;
}

export default function IconFormInputField({
    icon,
    label,
    fieldName,
    type = "text",
    placeholder,
    value,
    onChange,
    onBlur,
    fieldState,
    className,
}: IconInputFieldProps) {
    const isInvalid = fieldState.meta.isTouched && !fieldState.meta.isValid;

    return (
        <Field data-invalid={isInvalid} className={className}>
            <FieldLabel htmlFor={fieldName}>{label}</FieldLabel>
            <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground flex items-center justify-center">
                    {icon}
                </div>
                <Input
                    id={fieldName}
                    name={fieldName}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    aria-invalid={isInvalid}
                    aria-describedby={isInvalid ? `${fieldName}-error` : undefined}
                    className="pl-10 h-10 rounded-xl bg-muted/20 focus:bg-background transition-all"
                    autoComplete="off"
                />
            </div>
            {isInvalid && <FieldError id={`${fieldName}-error`} errors={fieldState.meta.errors} />}
        </Field>
    );
}
