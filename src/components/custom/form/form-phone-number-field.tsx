import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { CountryDialCode, getCountryByIso } from "@/lib/country-codes";
import CountryCodePicker from "./form-country-code-picker";
import { Input } from "@/components/ui/input";

interface PhoneNumberFieldProps {
    value: string;
    iso: string;
    onChange: (value: string) => void;
    onIsoChange: (iso: string) => void;
    onBlur: () => void;
    error?: string;
}

export default function PhoneNumberField({
    value,
    iso,
    onChange,
    onIsoChange,
    onBlur,
    error,
}: PhoneNumberFieldProps) {
    const selected = getCountryByIso(iso);
    const national = (value ?? "").startsWith(`+${selected.dial}`)
        ? (value ?? "").slice(selected.dial.length + 1).replace(/\D/g, "")
        : (value ?? "").replace(/\D/g, "");

    const commitNational = (nat: string) => {
        onChange(nat ? `+${selected.dial}${nat}` : "");
    };

    const handleSelectCountry = (c: CountryDialCode) => {
        onIsoChange(c.iso);
        // Rebuild E.164 with the newly selected country's dial, keeping digits.
        onChange(national ? `+${c.dial}${national}` : "");
    };

    const isInvalid = !!error;

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
            <div className="flex gap-2">
                <CountryCodePicker
                    selected={selected}
                    onSelect={handleSelectCountry}
                    onBlur={onBlur}
                    invalid={isInvalid}
                />
                <Input
                    id="contactNumber"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="Mobile number"
                    maxLength={15}
                    aria-invalid={isInvalid}
                    aria-describedby={isInvalid ? "contactNumber-error" : undefined}
                    className="h-10 rounded-none bg-muted/20 focus:bg-background transition-all"
                    value={national}
                    onChange={(e) => {
                        commitNational(e.target.value.replace(/\D/g, "").slice(0, 15));
                    }}
                    onBlur={onBlur}
                />
            </div>
            {isInvalid && error && (
                <FieldError id="contactNumber-error" errors={[{ message: error }]} />
            )}
        </Field>
    );
}
