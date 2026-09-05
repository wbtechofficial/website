import { forwardRef, useState } from "react";
import { User, Mail, Phone, Briefcase, GraduationCap, Building2, Check, ChevronDown } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  OnboardingFormData,
  onboardingFormSchema,
} from "../schemas/onboarding.schema";
import {
  COUNTRY_DIAL_CODES,
  getCountryByIso,
  splitE164,
  type CountryDialCode,
} from "../data/country-dial-codes";
import { cn } from "@/lib/utils";
import { FieldGroup, Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import FormBanner from "@/components/custom/form/form-banner";
import FormHeader from "@/components/custom/form/form-header";
import FormSubmitButton from "@/components/custom/form/form-submit-button";
import IconFormInputField from "@/components/custom/form/form-input-field";
import FormToggleInputField from "@/components/custom/form/form-toggle-input-field";

interface OnboardingFormProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onSubmit"
> {
  title: string;
  description: string;
  buttonText: string;
  onSubmit: (data: OnboardingFormData) => void;
  isSubmitting?: boolean;
}
const professionOptions = [
  {
    label: "Professional",
    value: "Working Professional",
    icon: <Briefcase className="h-3.5 w-3.5" />,
  },
  {
    label: "Student",
    value: "Student",
    icon: <GraduationCap className="h-3.5 w-3.5" />,
  },
];
const onboardingFormCoverImage =
  "https://images.unsplash.com/photo-1758270705317-3ef6142d306f?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function CountryCodePicker({
  selected,
  onSelect,
  onBlur,
  invalid,
}: {
  selected: CountryDialCode;
  onSelect: (country: CountryDialCode) => void;
  onBlur: () => void;
  invalid: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setSearch("");
          onBlur();
        }
      }}
    >
      <div className="relative shrink-0">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground flex items-center justify-center pointer-events-none">
          <Phone className="h-4 w-4" />
        </div>
        <PopoverTrigger
          aria-label="Country code"
          aria-invalid={invalid}
          className="flex h-10 items-center gap-1.5 rounded-none border border-input bg-muted/20 hover:bg-muted/40 transition-all pl-10 pr-2 text-sm outline-none max-w-[136px] aria-invalid:border-destructive"
        >
          <span className="font-semibold">{selected.iso}</span>
          <span className="text-muted-foreground">+{selected.dial}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        </PopoverTrigger>
      </div>
      <PopoverContent align="start" className="w-[300px] p-1">
        <Command>
          <CommandInput
            placeholder="Search country or code..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            {COUNTRY_DIAL_CODES.map((c) => (
              <CommandItem
                key={c.iso}
                value={`${c.name} ${c.iso} ${c.dial}`}
                onSelect={() => {
                  onSelect(c);
                  setOpen(false);
                  setSearch("");
                }}
              >
                <span className="font-semibold w-7 shrink-0">{c.iso}</span>
                <span className="flex-1 truncate">{c.name}</span>
                <span className="text-muted-foreground shrink-0">+{c.dial}</span>
                <Check
                  className={cn(
                    "h-4 w-4 shrink-0",
                    c.iso === selected.iso ? "opacity-100" : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

interface PhoneNumberFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
}

function PhoneNumberField({ value, onChange, onBlur, error }: PhoneNumberFieldProps) {
  const [[countryIso, national], setParts] = useState<[string, string]>(() => {
    const parts = splitE164(value ?? "");
    return [parts.iso, parts.national];
  });
  const selected = getCountryByIso(countryIso);

  const commit = (iso: string, nat: string) => {
    setParts([iso, nat]);
    const dial = getCountryByIso(iso).dial;
    onChange(nat ? `+${dial}${nat}` : "");
  };

  const isInvalid = !!error;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
      <div className="flex gap-2">
        <CountryCodePicker
          selected={selected}
          onSelect={(c) => commit(c.iso, national)}
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
            commit(countryIso, e.target.value.replace(/\D/g, "").slice(0, 15));
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

export const OnboardingForm = forwardRef<HTMLDivElement, OnboardingFormProps>(
  (
    {
      className,
      title,
      description,
      buttonText,
      onSubmit,
      isSubmitting = false,
      ...props
    },
    ref,
  ) => {
    const {
      register,
      handleSubmit,
      control,
      formState: { errors, isSubmitting: isSubmittingState },
    } = useForm<OnboardingFormData>({
      resolver: zodResolver(onboardingFormSchema),
      defaultValues: {
        name: "",
        email: "",
        contactNumber: "",
        profession: "Working Professional",
        organisation_name: "",
      },
    });

    const handleFormSubmit = handleSubmit((data) => {
      onSubmit(data);
    });

    return (
      <div
        className={cn(
          "w-full max-w-md rounded-none border border-border/80 bg-card shadow-2xl backdrop-blur-lg animate-in fade-in zoom-in-95 duration-300 overflow-hidden",
          className,
        )}
        ref={ref}
        {...props}
      >
        <FormBanner src={onboardingFormCoverImage} alt="Welcome Banner" />

        <div className="space-y-4 p-4 sm:p-6">
          <FormHeader title={title} description={description} />

          <form onSubmit={handleFormSubmit} className="space-y-3">
            <FieldGroup>
              {/* Profession Toggle Field */}
              <Controller
                name="profession"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <FormToggleInputField
                    label="Profession"
                    options={professionOptions}
                    value={value}
                    onChange={onChange}
                    error={errors.profession?.message}
                  />
                )}
              />

              {/* Name Field */}
              <IconFormInputField
                icon={<User className="h-4 w-4" />}
                label="Full Name"
                fieldName="name"
                type="text"
                placeholder="Enter your name"
                maxLength={50}
                showCharacterCount={true}
                error={errors.name?.message}
                {...register("name")}
              />

              {/* Email Field */}
              <IconFormInputField
                icon={<Mail className="h-4 w-4" />}
                label="Email Address"
                fieldName="email"
                type="email"
                placeholder="name@domain.com"
                maxLength={100}
                error={errors.email?.message}
                {...register("email")}
              />

              {/* Contact Number Field */}
              <Controller
                name="contactNumber"
                control={control}
                render={({ field }) => (
                  <PhoneNumberField
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={errors.contactNumber?.message}
                  />
                )}
              />

              {/* Organisation Name Field */}
              <IconFormInputField
                icon={<Building2 className="h-4 w-4" />}
                label="Organisation / Institution Name"
                fieldName="organisation_name"
                type="text"
                placeholder="Company, startup, college or university"
                maxLength={100}
                showCharacterCount={true}
                error={errors.organisation_name?.message}
                {...register("organisation_name")}
              />
            </FieldGroup>

            {/* Submit Button */}
            <FormSubmitButton
              label={buttonText}
              isLoading={isSubmitting || isSubmittingState}
              isDisabled={isSubmitting || isSubmittingState}
            />
          </form>
        </div>
      </div>
    );
  },
);

OnboardingForm.displayName = "OnboardingForm";
