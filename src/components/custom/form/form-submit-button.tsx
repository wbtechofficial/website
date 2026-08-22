import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface FormSubmitButtonProps {
    label: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    className?: string;
}

export default function FormSubmitButton({
    label,
    isLoading = false,
    isDisabled = false,
    className,
}: FormSubmitButtonProps) {
    return (
        <Button
            type="submit"
            disabled={isDisabled || isLoading}
            className={cn(
                "w-full h-9 rounded-none text-white font-semibold cursor-pointer shadow-sm hover:shadow-md transition-all",
                className,
            )}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {label}
        </Button>
    );
}
