"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";

export default function ZakatCalculator() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [cash, setCash] = useState(0);
  const [goldGrams, setGoldGrams] = useState(0);
  const [silverGrams, setSilverGrams] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.calculatorSettings()
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  const goldRate = parseFloat(settings.gold_rate_per_gram || "75");
  const silverRate = parseFloat(settings.silver_rate_per_gram || "1");
  const nisabGold = parseFloat(settings.nisab_gold_grams || "87.48");
  const nisabSilver = parseFloat(settings.nisab_silver_grams || "612.36");
  const currency = settings.currency || "USD";

  const goldValue = goldGrams * goldRate;
  const silverValue = silverGrams * silverRate;
  const totalWealth = cash + goldValue + silverValue;
  const nisabValue = nisabGold * goldRate;
  const isLiable = totalWealth >= nisabValue;
  const zakatDue = isLiable ? totalWealth * 0.025 : 0;

  if (loading) return <p className="text-center py-10">Loading calculator...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Cash & Savings ({currency})</label>
          <input type="number" min="0" value={cash || ""} onChange={(e) => setCash(Number(e.target.value))}
            className="w-full border rounded-lg px-4 py-2 dark:bg-slate-700 dark:border-slate-600" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gold (grams)</label>
          <input type="number" min="0" value={goldGrams || ""} onChange={(e) => setGoldGrams(Number(e.target.value))}
            className="w-full border rounded-lg px-4 py-2 dark:bg-slate-700 dark:border-slate-600" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Silver (grams)</label>
          <input type="number" min="0" value={silverGrams || ""} onChange={(e) => setSilverGrams(Number(e.target.value))}
            className="w-full border rounded-lg px-4 py-2 dark:bg-slate-700 dark:border-slate-600" />
        </div>
      </div>

      <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
        <p className="text-sm text-gray-600 dark:text-gray-300">Total wealth: <strong>{currency} {totalWealth.toFixed(2)}</strong></p>
        <p className="text-sm text-gray-600 dark:text-gray-300">Nisab threshold: <strong>{currency} {nisabValue.toFixed(2)}</strong></p>
        <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mt-2">
          Zakat due (2.5%): {currency} {zakatDue.toFixed(2)}
        </p>
        {!isLiable && <p className="text-sm text-amber-600 mt-2">Wealth is below Nisab — Zakat not obligatory.</p>}
      </div>

      {zakatDue > 0 && (
        <Link
          href={`/donate?purpose=zakat&amount=${zakatDue.toFixed(2)}`}
          className="mt-6 block text-center bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90"
        >
          Pay Zakat — {currency} {zakatDue.toFixed(2)}
        </Link>
      )}
    </div>
  );
}
