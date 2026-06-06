import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/layout/Topbar";
import { CLIENTS } from "@/lib/mock-data";
import { MoreHorizontal, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/_shell/clients")({
  head: () => ({ meta: [{ title: "Clients — NexSpace ERP" }] }),
  component: ClientsPage,
});

const statusColor: Record<string, string> = {
  Active: "success",
  "At Risk": "warning",
  Trial: "info",
};

function ClientsPage() {
  const mrr = CLIENTS.reduce((s, c) => s + c.mrr, 0);
  return (
    <>
      <Topbar title="Clients" subtitle={`${CLIENTS.length} active accounts`} />
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-6 space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { l: "Total MRR", v: `₹${(mrr/100000).toFixed(1)}L` },
              { l: "Active", v: CLIENTS.filter(c => c.status === "Active").length },
              { l: "At Risk", v: CLIENTS.filter(c => c.status === "At Risk").length },
              { l: "Trials", v: CLIENTS.filter(c => c.status === "Trial").length },
            ].map(s => (
              <div key={s.l} className="rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                <div className="mt-1 text-2xl font-semibold">{s.v}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <table className="w-full text-[13px]">
              <thead className="bg-surface-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left py-3 px-4">Client</th>
                  <th className="text-left py-3 px-4">Plan</th>
                  <th className="text-left py-3 px-4">Branch</th>
                  <th className="text-right py-3 px-4">MRR</th>
                  <th className="text-left py-3 px-4">Renewal</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {CLIENTS.map(c => (
                  <tr key={c.id} className="border-t border-border hover:bg-surface-1/50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-chart-5 to-primary text-[11px] font-bold flex items-center justify-center">
                          {c.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium">{c.name}</div>
                          <div className="text-[11px] text-muted-foreground">Since {c.since}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{c.plan}</td>
                    <td className="py-3 px-4 text-muted-foreground">{c.branch}</td>
                    <td className="py-3 px-4 text-right font-semibold tabular-nums">₹{(c.mrr/100000).toFixed(2)}L</td>
                    <td className="py-3 px-4 text-muted-foreground">{c.renewal}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium"
                        style={{ background: `oklch(from var(--color-${statusColor[c.status]}) l c h / 0.15)`, color: `var(--color-${statusColor[c.status]})` }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: `var(--color-${statusColor[c.status]})` }} />
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 justify-end">
                        <button className="h-7 w-7 rounded-md hover:bg-surface-2 flex items-center justify-center text-muted-foreground"><Mail className="h-3.5 w-3.5" /></button>
                        <button className="h-7 w-7 rounded-md hover:bg-surface-2 flex items-center justify-center text-muted-foreground"><Phone className="h-3.5 w-3.5" /></button>
                        <button className="h-7 w-7 rounded-md hover:bg-surface-2 flex items-center justify-center text-muted-foreground"><MoreHorizontal className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
