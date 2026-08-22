import { ReactNode, useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

interface FormInputFieldProps extends React.ComponentProps<"input"> {
  icon: ReactNode;
  label: string;
  fieldName: string;
  error?: string;
  showCharacterCount?: boolean;
}

export default function FormInputField({
  icon,
  label,
  fieldName,
  error,
  type = "text",
  placeholder,
  className,
  maxLength,
  showCharacterCount = false,
  ref,
  onChange,
  defaultValue,
  value,
  ...props
}: FormInputFieldProps) {
  const isInvalid = !!error;
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const val = value ?? defaultValue ?? "";
    setCharCount(val.toString().length);
  }, [value, defaultValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharCount(e.target.value.length);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Field data-invalid={isInvalid} className={className}>
      <div className="flex justify-between items-center w-full">
        <FieldLabel htmlFor={fieldName}>{label}</FieldLabel>
        {maxLength && showCharacterCount && (
          <span className="text-[10px] font-semibold text-muted-foreground select-none">
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground flex items-center justify-center">
          {icon}
        </div>
        <Input
          ref={ref}
          id={fieldName}
          name={fieldName}
          type={type}
          placeholder={placeholder}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${fieldName}-error` : undefined}
          className="pl-10 h-10 rounded-none bg-muted/20 focus:bg-background transition-all"
          autoComplete="off"
          maxLength={maxLength}
          onChange={handleInputChange}
          defaultValue={defaultValue}
          value={value}
          {...props}
        />
      </div>
      {isInvalid && error && (
        <FieldError id={`${fieldName}-error`} errors={[{ message: error }]} />
      )}
    </Field>
  );
}
