import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/layout/Topbar";
import { INVOICES, BILLING_SERIES } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Download, MoreHorizontal, Plus, Search } from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/_shell/billing")({
  head: () => ({ meta: [{ title: "Billing & Invoices — NexSpace" }] }),
  component: BillingPage,
});

const statusStyle: Record<string, string> = {
  Paid: "bg-success/15 text-success border-success/20",
  Pending: "bg-info/15 text-info border-info/20",
  Overdue: "bg-destructive/15 text-destructive border-destructive/20",
  Draft: "bg-muted text-muted-foreground border-border",
};

function BillingPage() {
  const total = INVOICES.reduce((s, i) => s + i.amount, 0);
  const paid = INVOICES.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const overdue = INVOICES.filter((i) => i.status === "Overdue").reduce((s, i) => s + i.amount, 0);
  const pending = total - paid - overdue;

  const stats = [
    { label: "Total Billed (May)", value: `₹${(total / 100000).toFixed(1)}L`, accent: "primary" },
    { label: "Collected", value: `₹${(paid / 100000).toFixed(1)}L`, accent: "success" },
    { label: "Pending", value: `₹${(pending / 100000).toFixed(1)}L`, accent: "info" },
    { label: "Overdue", value: `₹${(overdue / 100000).toFixed(1)}L`, accent: "destructive" },
  ];

  return (
    <>
      <Topbar title="Billing & Invoices" subtitle="Track revenue, collections and outstanding dues" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto p-4 lg:p-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                <div className="mt-2 text-2xl font-semibold tracking-tight" style={{ color: `var(--color-${s.accent})` }}>{s.value}</div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between mb-1">
              <div>
                <h3 className="text-[14px] font-semibold">Cash Flow — Paid vs Outstanding</h3>
                <p className="text-[11px] text-muted-foreground">Last 6 months · ₹ Lakhs</p>
              </div>
            </div>
            <div className="h-56 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={BILLING_SERIES}>
                  <defs>
                    <linearGradient id="paid" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.72 0.17 155)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="oklch(0.72 0.17 155)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="out" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.78 0.16 75)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="oklch(0.78 0.16 75)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 11, fill: "oklch(0.66 0.012 285)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "oklch(0.66 0.012 285)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "oklch(0.16 0.006 285 / 0.95)", border: "1px solid oklch(1 0 0 / 0.08)", borderRadius: 10, fontSize: 12 }} />
                  <Area type="monotone" dataKey="paid" stroke="oklch(0.72 0.17 155)" strokeWidth={2} fill="url(#paid)" />
                  <Area type="monotone" dataKey="outstanding" stroke="oklch(0.78 0.16 75)" strokeWidth={2} fill="url(#out)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="text-[14px] font-semibold">Invoices</h3>
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2 h-8 px-3 rounded-lg border border-border bg-surface-1 w-56">
                  <Search className="h-3.5 w-3.5 text-muted-foreground" />
                  <input placeholder="Search invoices…" className="bg-transparent text-[12px] outline-none flex-1" />
                </div>
                <button className="h-8 px-3 rounded-lg border border-border bg-surface-1 hover:bg-surface-2 text-[12px] flex items-center gap-1.5">
                  <Download className="h-3.5 w-3.5" /> Export
                </button>
                <button className="h-8 px-3 rounded-lg gradient-primary text-primary-foreground text-[12px] flex items-center gap-1.5 shadow-glow">
                  <Plus className="h-3.5 w-3.5" /> New Invoice
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wider text-muted-foreground border-b border-border">
                    <th className="text-left font-medium px-5 py-3">Invoice</th>
                    <th className="text-left font-medium px-5 py-3">Client</th>
                    <th className="text-right font-medium px-5 py-3">Amount</th>
                    <th className="text-left font-medium px-5 py-3">Issued</th>
                    <th className="text-left font-medium px-5 py-3">Due</th>
                    <th className="text-left font-medium px-5 py-3">Status</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {INVOICES.map((inv) => (
                    <tr key={inv.id} className="border-b border-border/60 hover:bg-surface-1/60 transition">
                      <td className="px-5 py-3 font-mono text-[12px]">{inv.id}</td>
                      <td className="px-5 py-3 font-medium">{inv.client}</td>
                      <td className="px-5 py-3 text-right tabular-nums font-medium">₹{inv.amount.toLocaleString("en-IN")}</td>
                      <td className="px-5 py-3 text-muted-foreground">{inv.issued}</td>
                      <td className="px-5 py-3 text-muted-foreground">{inv.due}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[11px] font-medium ${statusStyle[inv.status]}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button className="h-7 w-7 rounded-md hover:bg-surface-2 inline-flex items-center justify-center">
                          <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
