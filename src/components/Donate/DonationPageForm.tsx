"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

function DonationFormInner() {
  const params = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount: params.get("amount") || "",
    purpose: params.get("purpose") || "general",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.submitDonation({
        ...form,
        amount: parseFloat(form.amount as string),
      });
      if (res.message) toast.success(res.message);
      else toast.error("Something went wrong");
    } catch {
      toast.error("Failed to submit donation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
      <div>
        <label className="block text-sm font-medium mb-1">Full Name *</label>
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border rounded-lg px-4 py-2 dark:bg-slate-700" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email *</label>
        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border rounded-lg px-4 py-2 dark:bg-slate-700" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border rounded-lg px-4 py-2 dark:bg-slate-700" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Purpose</label>
        <select value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })}
          className="w-full border rounded-lg px-4 py-2 dark:bg-slate-700">
          <option value="general">General Donation</option>
          <option value="zakat">Zakat</option>
          <option value="fitrana">Fitrana</option>
          <option value="project">Project</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Amount (USD) *</label>
        <input type="number" min="1" step="0.01" required value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full border rounded-lg px-4 py-2 dark:bg-slate-700" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border rounded-lg px-4 py-2 dark:bg-slate-700" rows={3} />
      </div>
      <button type="submit" disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-lg font-semibold disabled:opacity-50">
        {loading ? "Submitting..." : "Submit Donation"}
      </button>
      <p className="text-xs text-gray-500 text-center">Payment gateway integration can be connected in admin settings.</p>
    </form>
  );
}

export default function DonationPageForm() {
  return (
    <Suspense fallback={<p className="text-center">Loading...</p>}>
      <DonationFormInner />
    </Suspense>
  );
}
