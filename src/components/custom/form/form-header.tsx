import { cn } from "@/lib/utils";

interface FormHeaderProps {
    title: string;
    description: string;
    className?: string;
}

export default function FormHeader({ title, description, className }: FormHeaderProps) {
    return (
        <div className={cn("space-y-1 text-center", className)}>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground leading-tight tracking-tight">
                {title}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm leading-snug">{description}</p>
        </div>
    );
}
