import { COUNTRY_DIAL_CODES, DEFAULT_COUNTRY_ISO } from "@/base/constants/country-codes";

export interface CountryDialCode {
    iso: string;
    name: string;
    dial: string;
}

export const FALLBACK_COUNTRY: CountryDialCode = { iso: "IN", name: "India", dial: "91" };

export const COUNTRY_BY_ISO = new Map<string, CountryDialCode>(
    COUNTRY_DIAL_CODES.map((c) => [c.iso, c]),
);

export function getCountryByIso(iso: string): CountryDialCode {
    return COUNTRY_BY_ISO.get(iso) ?? COUNTRY_BY_ISO.get(DEFAULT_COUNTRY_ISO) ?? FALLBACK_COUNTRY;
}

export const PREFERRED_ISO_FOR_DIAL: Record<string, string> = { "1": "US", "7": "RU" };

export const SORTED_DIALS = [...new Set(COUNTRY_DIAL_CODES.map((c) => c.dial))].sort(
    (a, b) => b.length - a.length,
);

export function splitE164(value: string): { iso: string; national: string } {
    const cleaned = value.trim().replace(/[\s\-.()]/g, "");
    if (!cleaned.startsWith("+")) {
        return { iso: DEFAULT_COUNTRY_ISO, national: cleaned.replace(/\D/g, "") };
    }
    const rest = cleaned.slice(1);
    const dial = SORTED_DIALS.find((d) => rest.startsWith(d));
    if (!dial) return { iso: DEFAULT_COUNTRY_ISO, national: "" };
    const iso =
        PREFERRED_ISO_FOR_DIAL[dial] ??
        COUNTRY_DIAL_CODES.find((c) => c.dial === dial)?.iso ??
        DEFAULT_COUNTRY_ISO;
    return { iso, national: rest.slice(dial.length).replace(/\D/g, "") };
}
