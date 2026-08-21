import { cn } from "@/lib/utils";

interface FormBannerProps {
    src: string;
    alt?: string;
    className?: string;
}

export default function FormBanner({ src, alt = "Banner", className }: FormBannerProps) {
    return (
        <div className={cn("relative h-20 w-full overflow-hidden shrink-0", className)}>
            <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-linear-to-t from-card to-transparent" />
        </div>
    );
}
