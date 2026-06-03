"use client";

import { useEffect, useRef, useState } from "react";
import { useCurrency } from "./CurrencyProvider";
import { CURRENCIES, currencyInfo } from "@/lib/currency";

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const cur = currencyInfo(currency) ?? CURRENCIES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm font-semibold shadow-sm hover:bg-neutral-50"
        aria-label="Select currency"
      >
        <span className="font-black">{cur.symbol}</span>
        <span>{cur.code}</span>
        <span className="text-xs text-neutral-800">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 max-h-96 w-52 overflow-y-auto rounded-2xl border border-neutral-100 bg-white shadow-xl">
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                setCurrency(c.code);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-semibold hover:bg-neutral-50 ${
                c.code === currency ? "bg-neutral-100" : ""
              }`}
            >
              <span
                className={`fi fi-${c.fi} rounded-sm shrink-0`}
                style={{ width: 22, height: 16, display: "inline-block" }}
              />
              <span className="w-9 font-black text-neutral-800">{c.code}</span>
              <span className="flex-1 truncate text-neutral-700">{c.name}</span>
              {c.code === currency && (
                <span className="ml-auto text-xs text-green-600">✓</span>
              )}
            </button>
          ))}
          <p className="border-t border-neutral-100 px-4 py-2 text-[10px] leading-4 text-neutral-800">
            Prices are approximate. Charged in TRY.
          </p>
        </div>
      )}
    </div>
  );
}
