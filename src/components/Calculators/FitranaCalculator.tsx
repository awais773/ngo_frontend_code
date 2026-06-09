"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";

export default function FitranaCalculator() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [persons, setPersons] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.calculatorSettings()
      .then(setSettings)
      .finally(() => setLoading(false));
  }, []);

  const perPerson = parseFloat(settings.fitrana_amount || "10");
  const currency = settings.currency || "USD";
  const total = perPerson * persons;

  if (loading) return <p className="text-center py-10">Loading calculator...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Fitrana per person: <strong>{currency} {perPerson.toFixed(2)}</strong> (set by admin)
      </p>
      <div>
        <label className="block text-sm font-medium mb-1">Number of persons</label>
        <input type="number" min="1" value={persons} onChange={(e) => setPersons(Math.max(1, Number(e.target.value)))}
          className="w-full border rounded-lg px-4 py-2 dark:bg-slate-700 dark:border-slate-600" />
      </div>
      <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
        <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
          Total Fitrana: {currency} {total.toFixed(2)}
        </p>
      </div>
      <Link
        href={`/donate?purpose=fitrana&amount=${total.toFixed(2)}`}
        className="mt-6 block text-center bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90"
      >
        Pay Fitrana — {currency} {total.toFixed(2)}
      </Link>
    </div>
  );
}
