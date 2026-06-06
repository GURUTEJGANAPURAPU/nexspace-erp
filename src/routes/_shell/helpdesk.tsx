import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/layout/Topbar";
import { TICKETS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { LifeBuoy, Filter, Plus } from "lucide-react";

export const Route = createFileRoute("/_shell/helpdesk")({
  head: () => ({ meta: [{ title: "Helpdesk — NexSpace" }] }),
  component: HelpdeskPage,
});

const priorityStyle: Record<string, string> = {
  Low: "text-muted-foreground bg-muted",
  Medium: "text-info bg-info/15",
  High: "text-warning bg-warning/15",
  Urgent: "text-destructive bg-destructive/15",
};
const statusStyle: Record<string, string> = {
  Open: "bg-info/15 text-info border-info/20",
  "In Progress": "bg-warning/15 text-warning border-warning/20",
  Resolved: "bg-success/15 text-success border-success/20",
};

function HelpdeskPage() {
  const cols = ["Open", "In Progress", "Resolved"] as const;
  return (
    <>
      <Topbar title="Helpdesk" subtitle="Member tickets and facility requests across branches" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto p-4 lg:p-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Open Tickets", value: TICKETS.filter((t) => t.status === "Open").length, accent: "info" },
              { label: "In Progress", value: TICKETS.filter((t) => t.status === "In Progress").length, accent: "warning" },
              { label: "Resolved (24h)", value: TICKETS.filter((t) => t.status === "Resolved").length, accent: "success" },
              { label: "Avg First Response", value: "8m", accent: "primary" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                <div className="mt-2 text-2xl font-semibold tracking-tight" style={{ color: `var(--color-${s.accent})` }}>{s.value}</div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 rounded-lg border border-border bg-surface-1 hover:bg-surface-2 text-[12px] flex items-center gap-1.5">
                <Filter className="h-3.5 w-3.5" /> All branches
              </button>
              <button className="h-8 px-3 rounded-lg border border-border bg-surface-1 hover:bg-surface-2 text-[12px]">All categories</button>
            </div>
            <button className="h-8 px-3 rounded-lg gradient-primary text-primary-foreground text-[12px] shadow-glow flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5" /> New Ticket
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {cols.map((col) => {
              const list = TICKETS.filter((t) => t.status === col);
              return (
                <div key={col} className="rounded-xl border border-border bg-card/60 p-3 min-h-[60vh]">
                  <div className="flex items-center justify-between px-2 py-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[11px] font-medium ${statusStyle[col]}`}>{col}</span>
                      <span className="text-[11px] text-muted-foreground">{list.length}</span>
                    </div>
                  </div>
                  <div className="mt-2 space-y-2">
                    {list.map((t, i) => (
                      <motion.div key={t.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                        className="rounded-lg border border-border bg-card p-3 shadow-card hover:border-primary/40 transition-colors cursor-pointer">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                            <LifeBuoy className="h-3 w-3" /> {t.id}
                          </div>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${priorityStyle[t.priority]}`}>{t.priority}</span>
                        </div>
                        <div className="mt-2 text-[13px] font-medium leading-snug">{t.subject}</div>
                        <div className="mt-2 text-[11px] text-muted-foreground">{t.member} · {t.branch}</div>
                        <div className="mt-3 flex items-center justify-between text-[11px]">
                          <span className="text-muted-foreground">{t.category}</span>
                          <span className="flex items-center gap-1.5">
                            <span className="h-5 w-5 rounded-full bg-gradient-to-br from-chart-5 to-primary inline-flex items-center justify-center text-[9px] font-bold">{t.assignee.slice(0, 2).toUpperCase()}</span>
                            <span className="text-muted-foreground">{t.created}</span>
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
