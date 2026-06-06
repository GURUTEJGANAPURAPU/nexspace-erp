import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/layout/Topbar";
import { TEAM, HR_KPIS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Mail, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/_shell/team")({
  head: () => ({ meta: [{ title: "Team & HR — NexSpace" }] }),
  component: TeamPage,
});

const statusStyle: Record<string, string> = {
  Active: "bg-success/15 text-success border-success/20",
  "On Leave": "bg-warning/15 text-warning border-warning/20",
  Remote: "bg-info/15 text-info border-info/20",
};

function TeamPage() {
  return (
    <>
      <Topbar title="Team & HR" subtitle="Internal operators and workspace staff" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto p-4 lg:p-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {HR_KPIS.map((k, i) => (
              <motion.div key={k.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{k.label}</div>
                <div className="mt-2 text-2xl font-semibold tracking-tight">{k.value}</div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-surface-1 w-72">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input placeholder="Search team…" className="bg-transparent text-[12px] outline-none flex-1" />
            </div>
            <button className="h-9 px-3 rounded-lg gradient-primary text-primary-foreground text-[12px] shadow-glow flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5" /> Invite Member
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {TEAM.map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="rounded-xl border border-border bg-card p-5 shadow-card hover:border-primary/40 transition group">
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-chart-5 to-primary flex items-center justify-center text-[14px] font-bold shadow-glow">
                    {m.avatar}
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-medium ${statusStyle[m.status]}`}>
                    {m.status}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="text-[14px] font-semibold leading-tight">{m.name}</div>
                  <div className="text-[12px] text-muted-foreground">{m.role}</div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Mail className="h-3 w-3" /> {m.email}
                </div>
                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">{m.branch}</span>
                  <button className="text-primary opacity-0 group-hover:opacity-100 transition font-medium">View →</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
