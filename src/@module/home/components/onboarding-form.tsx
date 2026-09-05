import { forwardRef } from "react";
import { User, Mail, Briefcase, GraduationCap, Building2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    OnboardingFormData,
    OnboardingFormInput,
    onboardingFormSchema,
} from "../schemas/onboarding.schema";

import { cn } from "@/lib/utils";
import { FieldGroup } from "@/components/ui/field";

import FormBanner from "@/components/custom/form/form-banner";
import FormHeader from "@/components/custom/form/form-header";
import FormSubmitButton from "@/components/custom/form/form-submit-button";
import IconFormInputField from "@/components/custom/form/form-input-field";
import FormToggleInputField from "@/components/custom/form/form-toggle-input-field";
import PhoneNumberField from "@/components/custom/form/form-phone-number-field";

interface OnboardingFormProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
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

export const OnboardingForm = forwardRef<HTMLDivElement, OnboardingFormProps>(
    (
        { className, title, description, buttonText, onSubmit, isSubmitting = false, ...props },
        ref,
    ) => {
        const {
            register,
            handleSubmit,
            control,
            setValue,
            watch,
            formState: { errors, isSubmitting: isSubmittingState },
        } = useForm<OnboardingFormInput, unknown, OnboardingFormData>({
            resolver: zodResolver(onboardingFormSchema),
            defaultValues: {
                name: "",
                email: "",
                countryCode: "IN",
                contactNumber: "",
                profession: "Working Professional",
                organisation_name: "",
            },
        });

        const countryIso = watch("countryCode");

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
                            <input type="hidden" {...register("countryCode")} />
                            <Controller
                                name="contactNumber"
                                control={control}
                                render={({ field }) => (
                                    <PhoneNumberField
                                        value={field.value}
                                        iso={countryIso}
                                        onChange={field.onChange}
                                        onIsoChange={(iso) =>
                                            setValue("countryCode", iso, {
                                                shouldValidate: true,
                                                shouldDirty: true,
                                            })
                                        }
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
