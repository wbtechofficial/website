import { forwardRef } from "react";
import { Loader2, User, Mail, Phone, Briefcase, GraduationCap } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { OnboardingFormData, onboardingFormSchema } from "../schemas/onboarding.schema";

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

        return (
            <div
                className={cn(
                    "w-full max-w-md rounded-3xl border border-border/80 bg-card shadow-2xl backdrop-blur-lg animate-in fade-in zoom-in-95 duration-300",
                    className,
                )}
                ref={ref}
                {...props}
            >
                {/* Decorative top image */}
                <div className="relative h-20 w-full overflow-hidden shrink-0">
                    <img
                        src={onboardingFormCoverImage}
                        alt="Welcome Banner"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>

                <div className="space-y-4 p-5 sm:p-6">
                    {/* Main title and description */}
                    <div className="space-y-1 text-center">
                        <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground leading-tight tracking-tight">
                            {title}
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm leading-snug">
                            {description}
                        </p>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="space-y-3"
                    >
                        <FieldGroup>
                            {/* Name Field */}
                            <form.Field
                                name="name"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                                            <div className="relative">
                                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) =>
                                                        field.handleChange(e.target.value)
                                                    }
                                                    aria-invalid={isInvalid}
                                                    type="text"
                                                    placeholder="Enter your name"
                                                    className="pl-10 h-10 rounded-xl bg-muted/20 focus:bg-background transition-all"
                                                    autoComplete="off"
                                                />
                                            </div>
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    );
                                }}
                            />

                            {/* Email Field */}
                            <form.Field
                                name="email"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Email Address
                                            </FieldLabel>
                                            <div className="relative">
                                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) =>
                                                        field.handleChange(e.target.value)
                                                    }
                                                    aria-invalid={isInvalid}
                                                    type="email"
                                                    placeholder="name@domain.com"
                                                    className="pl-10 h-10 rounded-xl bg-muted/20 focus:bg-background transition-all"
                                                    autoComplete="off"
                                                />
                                            </div>
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    );
                                }}
                            />

                            {/* Contact Field */}
                            <form.Field
                                name="contactNumber"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>
                                                Contact Number
                                            </FieldLabel>
                                            <div className="relative">
                                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) =>
                                                        field.handleChange(e.target.value)
                                                    }
                                                    aria-invalid={isInvalid}
                                                    type="tel"
                                                    placeholder="10-digit mobile number"
                                                    className="pl-10 h-10 rounded-xl bg-muted/20 focus:bg-background transition-all"
                                                    required
                                                    autoComplete="off"
                                                />
                                            </div>
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    );
                                }}
                            />

                            {/* Profession Select Toggle */}
                            <form.Field
                                name="profession"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel>Profession</FieldLabel>
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        field.handleChange("Working Professional")
                                                    }
                                                    className={cn(
                                                        "flex-grow flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer select-none",
                                                        field.state.value === "Working Professional"
                                                            ? "bg-primary text-white border-transparent shadow-xs"
                                                            : "bg-muted/30 text-muted-foreground border-border/60 hover:bg-muted/60",
                                                    )}
                                                >
                                                    <Briefcase className="h-3.5 w-3.5" />
                                                    <span>Professional</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => field.handleChange("Student")}
                                                    className={cn(
                                                        "flex-grow flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer select-none",
                                                        field.state.value === "Student"
                                                            ? "bg-primary text-white border-transparent shadow-xs"
                                                            : "bg-muted/30 text-muted-foreground border-border/60 hover:bg-muted/60",
                                                    )}
                                                >
                                                    <GraduationCap className="h-3.5 w-3.5" />
                                                    <span>Student</span>
                                                </button>
                                            </div>
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    );
                                }}
                            />
                        </FieldGroup>

                        <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                            children={([canSubmit, isSubmittingState]) => (
                                <Button
                                    type="submit"
                                    className="w-full h-9 rounded-xl text-white font-semibold cursor-pointer shadow-sm hover:shadow-md transition-all"
                                    disabled={!canSubmit || isSubmitting || isSubmittingState}
                                >
                                    {isSubmitting || isSubmittingState ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : null}
                                    {buttonText}
                                </Button>
                            )}
                        />
                    </form>
                </div>
            </div>
        );
    },
);

OnboardingForm.displayName = "OnboardingForm";
