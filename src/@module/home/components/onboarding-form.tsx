import { forwardRef } from "react";
import { User, Mail, Phone, Briefcase, GraduationCap } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { OnboardingFormData, onboardingFormSchema } from "../schemas/onboarding.schema";
import { cn } from "@/lib/utils";
import { FieldGroup } from "@/components/ui/field";
import FormBanner from "@/components/custom/form/form-banner";
import FormHeader from "@/components/custom/form/form-header";
import FormSubmitButton from "@/components/custom/form/form-submit-button";
import IconFormInputField from "@/components/custom/form/form-input-field-with-icon";
import FormToggleInputField, {
    ToggleOption,
} from "@/components/custom/form/form-toggle-input-field";

interface OnboardingFormProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
    title: string;
    description: string;
    buttonText: string;
    onSubmit: (data: OnboardingFormData) => void;
    isSubmitting?: boolean;
}

const onboardingFormCoverImage =
    "https://images.unsplash.com/photo-1758270705317-3ef6142d306f?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const OnboardingForm = forwardRef<HTMLDivElement, OnboardingFormProps>(
    (
        { className, title, description, buttonText, onSubmit, isSubmitting = false, ...props },
        ref,
    ) => {
        const form = useForm({
            defaultValues: {
                name: "",
                email: "",
                contactNumber: "",
                profession: "Working Professional" as "Working Professional" | "Student",
            },
            validators: {
                onChange: onboardingFormSchema,
            },
            onSubmit: async ({ value }) => {
                onSubmit(value);
            },
        });

        const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
        };

        return (
            <div
                className={cn(
                    "w-full max-w-md rounded-3xl border border-border/80 bg-card shadow-2xl backdrop-blur-lg animate-in fade-in zoom-in-95 duration-300",
                    className,
                )}
                ref={ref}
                {...props}
            >
                <FormBanner src={onboardingFormCoverImage} alt="Welcome Banner" />

                <div className="space-y-4 p-5 sm:p-6">
                    <FormHeader title={title} description={description} />

                    <form onSubmit={handleFormSubmit} className="space-y-3">
                        <FieldGroup>
                            {/* Name Field */}
                            <form.Field
                                name="name"
                                children={(field) => (
                                    <IconFormInputField
                                        icon={<User className="h-4 w-4" />}
                                        label="Full Name"
                                        fieldName={field.name}
                                        type="text"
                                        placeholder="Enter your name"
                                        value={field.state.value}
                                        onChange={(val) => field.handleChange(val)}
                                        onBlur={() => field.handleBlur()}
                                        fieldState={field.state.meta}
                                    />
                                )}
                            />

                            {/* Email Field */}
                            <form.Field
                                name="email"
                                children={(field) => (
                                    <IconFormInputField
                                        icon={<Mail className="h-4 w-4" />}
                                        label="Email Address"
                                        fieldName={field.name}
                                        type="email"
                                        placeholder="name@domain.com"
                                        value={field.state.value}
                                        onChange={(val) => field.handleChange(val)}
                                        onBlur={() => field.handleBlur()}
                                        fieldState={field.state}
                                    />
                                )}
                            />

                            {/* Contact Number Field */}
                            <form.Field
                                name="contactNumber"
                                children={(field) => (
                                    <IconFormInputField
                                        icon={<Phone className="h-4 w-4" />}
                                        label="Contact Number"
                                        fieldName={field.name}
                                        type="tel"
                                        placeholder="10-digit mobile number"
                                        value={field.state.value}
                                        onChange={(val) => field.handleChange(val)}
                                        onBlur={() => field.handleBlur()}
                                        fieldState={field.state}
                                    />
                                )}
                            />

                            {/* Profession Toggle Field */}
                            <form.Field
                                name="profession"
                                children={(field) => (
                                    <FormToggleInputField
                                        label="Profession"
                                        options={[
                                            {
                                                label: "Professional",
                                                value: "Working Professional" as ToggleOption,
                                                icon: <Briefcase className="h-3.5 w-3.5" />,
                                            },
                                            {
                                                label: "Student",
                                                value: "Student" as ToggleOption,
                                                icon: <GraduationCap className="h-3.5 w-3.5" />,
                                            },
                                        ]}
                                        value={field.state.value}
                                        onChange={(val) =>
                                            field.handleChange(
                                                val as "Working Professional" | "Student",
                                            )
                                        }
                                        fieldState={field.state}
                                    />
                                )}
                            />
                        </FieldGroup>

                        {/* Submit Button */}
                        <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                            children={([canSubmit, isSubmittingState]) => (
                                <FormSubmitButton
                                    label={buttonText}
                                    isLoading={isSubmitting || isSubmittingState}
                                    isDisabled={!canSubmit || isSubmitting || isSubmittingState}
                                />
                            )}
                        />
                    </form>
                </div>
            </div>
        );
    },
);

OnboardingForm.displayName = "OnboardingForm";
