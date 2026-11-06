"use client";

import { useCurrency, type Currency } from "@/lib/currency-context";

const OPTIONS: { value: Currency; flag: string; label: string }[] = [
  { value: "USD", flag: "🇺🇸", label: "USD" },
];

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px", padding: "3px", borderRadius: "7px", background: "#edf3f0", fontSize: "10px", fontWeight: 700 }}>
      {OPTIONS.map(({ value, flag, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => setCurrency(value)}
          aria-pressed={currency === value}
          style={{
            padding: "4px 8px",
            border: 0,
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "10px",
            lineHeight: 1.2,
            background: currency === value ? "#0b2f2c" : "transparent",
            color: currency === value ? "#fff" : "#6b8580",
            transition: "background 0.15s, color 0.15s",
            whiteSpace: "nowrap",
          }}
        >
          {flag} {label}
        </button>
      ))}
    </div>
  );
}
