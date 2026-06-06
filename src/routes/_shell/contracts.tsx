import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/layout/Topbar";
import { CONTRACTS, MEMBERSHIP_PLANS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { FileSignature, RefreshCw, AlertTriangle, Check } from "lucide-react";

export const Route = createFileRoute("/_shell/contracts")({
  head: () => ({ meta: [{ title: "Contracts & Memberships — NexSpace" }] }),
  component: ContractsPage,
});

const statusMeta: Record<string, { color: string; icon: typeof Check }> = {
  Active: { color: "success", icon: Check },
  Renewing: { color: "info", icon: RefreshCw },
  Ending: { color: "warning", icon: AlertTriangle },
  Draft: { color: "muted-foreground", icon: FileSignature },
};

function ContractsPage() {
  const tcv = CONTRACTS.reduce((s, c) => s + c.value, 0);
  return (
    <>
      <Topbar title="Contracts & Memberships" subtitle="Manage agreements, renewals and plan catalog" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto p-4 lg:p-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Active Contracts", value: CONTRACTS.filter((c) => c.status === "Active").length },
              { label: "Total Contract Value", value: `₹${(tcv / 10000000).toFixed(2)}Cr` },
              { label: "Renewing in 60 days", value: CONTRACTS.filter((c) => c.status === "Renewing").length },
              { label: "Ending — Action Needed", value: CONTRACTS.filter((c) => c.status === "Ending").length },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                <div className="mt-2 text-2xl font-semibold tracking-tight">{s.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Plan catalog */}
          <div>
            <h3 className="text-[14px] font-semibold mb-3">Membership Plans</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {MEMBERSHIP_PLANS.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="relative rounded-xl border border-border bg-card p-5 shadow-card overflow-hidden group hover:border-primary/40 transition-colors">
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-30 blur-2xl group-hover:opacity-60 transition" style={{ background: `var(--color-${p.color})` }} />
                  <div className="relative">
                    <div className="text-[11px] uppercase tracking-wider" style={{ color: `var(--color-${p.color})` }}>{p.name}</div>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-3xl font-semibold tracking-tight">{p.price ? `₹${p.price.toLocaleString("en-IN")}` : "Talk"}</span>
                      <span className="text-[12px] text-muted-foreground">{p.period}</span>
                    </div>
                    <ul className="mt-4 space-y-1.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-[12px] text-muted-foreground">
                          <Check className="h-3 w-3 text-success" /> {f}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-5 w-full h-8 rounded-lg border border-border bg-surface-1 hover:bg-surface-2 text-[12px] font-medium transition">
                      Edit Plan
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contracts list */}
          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h3 className="text-[14px] font-semibold">Active Contracts</h3>
              <button className="h-8 px-3 rounded-lg gradient-primary text-primary-foreground text-[12px] shadow-glow">+ New Contract</button>
            </div>
            <div className="divide-y divide-border/60">
              {CONTRACTS.map((c) => {
                const meta = statusMeta[c.status];
                return (
                  <div key={c.id} className="p-5 hover:bg-surface-1/60 transition flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-surface-2 flex items-center justify-center">
                      <FileSignature className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[13px]">{c.client}</span>
                        <span className="text-[11px] text-muted-foreground font-mono">· {c.id}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{c.plan} · {c.seats} seats · {c.start} → {c.end}</div>
                    </div>
                    <div className="hidden md:block text-right">
                      <div className="text-[13px] font-semibold tabular-nums">₹{(c.value / 100000).toFixed(1)}L</div>
                      <div className="text-[11px] text-muted-foreground">{c.auto ? "Auto-renew" : "Manual renew"}</div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-[11px] font-medium`}
                      style={{ color: `var(--color-${meta.color})`, background: `oklch(from var(--color-${meta.color}) l c h / 0.12)`, borderColor: `oklch(from var(--color-${meta.color}) l c h / 0.25)` }}>
                      <meta.icon className="h-3 w-3" /> {c.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
