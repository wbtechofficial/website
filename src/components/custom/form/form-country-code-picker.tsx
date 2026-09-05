import { COUNTRY_DIAL_CODES } from "@/base/constants/country-codes";
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CountryDialCode } from "@/lib/country-codes";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Phone } from "lucide-react";
import { useState } from "react";

interface CountryCodePickerProps {
    selected: CountryDialCode;
    onSelect: (country: CountryDialCode) => void;
    onBlur: () => void;
    invalid?: boolean;
}

export default function CountryCodePicker({
    selected,
    onSelect,
    onBlur,
    invalid,
}: CountryCodePickerProps) {
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
