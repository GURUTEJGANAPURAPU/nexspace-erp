import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/layout/Topbar";
import { VISITORS } from "@/lib/mock-data";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Bell, Check, X, UserPlus, Clock } from "lucide-react";

export const Route = createFileRoute("/_shell/visitors")({
  head: () => ({ meta: [{ title: "Visitors — NexSpace ERP" }] }),
  component: VisitorsPage,
});

const statusColor: Record<string, string> = {
  "Awaiting": "warning",
  "Checked In": "success",
  "Checked Out": "muted-foreground",
};

function VisitorsPage() {
  const [visitors, setVisitors] = useState(VISITORS);
  const [showQR, setShowQR] = useState(false);

  const update = (id: string, status: string) => {
    setVisitors(prev => prev.map(v => v.id === id ? { ...v, status } : v));
  };

  const stats = {
    today: visitors.length,
    awaiting: visitors.filter(v => v.status === "Awaiting").length,
    in: visitors.filter(v => v.status === "Checked In").length,
    vip: visitors.filter(v => v.badge === "VIP").length,
  };

  return (
    <>
      <Topbar title="Visitor Management" subtitle="Reception · BLR Koramangala" />
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-6 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { l: "Today", v: stats.today, hint: "Total visitors" },
              { l: "Awaiting", v: stats.awaiting, hint: "Pending check-in" },
              { l: "On Site", v: stats.in, hint: "Currently checked in" },
              { l: "VIP", v: stats.vip, hint: "Priority guests" },
            ].map(s => (
              <div key={s.l} className="rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                <div className="mt-1 text-2xl font-semibold tabular-nums">{s.v}</div>
                <div className="text-[11px] text-muted-foreground">{s.hint}</div>
              </div>
            ))}
          </div>

          {/* Action bar */}
          <div className="flex items-center gap-2">
            <button onClick={() => setShowQR(true)} className="h-10 px-4 rounded-lg gradient-primary text-primary-foreground text-[13px] font-medium shadow-glow flex items-center gap-2"><QrCode className="h-4 w-4" /> QR Self Check-in</button>
            <button className="h-10 px-4 rounded-lg border border-border bg-surface-1 hover:bg-surface-2 text-[13px] flex items-center gap-2"><UserPlus className="h-4 w-4" /> Pre-register Visitor</button>
          </div>

          {/* Visitor list */}
          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <table className="w-full text-[13px]">
              <thead className="bg-surface-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left py-3 px-4">Visitor</th>
                  <th className="text-left py-3 px-4">Host</th>
                  <th className="text-left py-3 px-4">Purpose</th>
                  <th className="text-left py-3 px-4">Check-in</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((v, i) => (
                  <motion.tr
                    key={v.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    className="border-t border-border hover:bg-surface-1/50 transition"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-chart-5 to-primary text-[11px] font-bold flex items-center justify-center">
                          {v.name.split(" ").map(s => s[0]).join("")}
                        </div>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {v.name}
                            {v.badge === "VIP" && <span className="text-[9px] px-1.5 py-0.5 rounded bg-warning/20 text-warning font-bold tracking-wider">VIP</span>}
                          </div>
                          <div className="text-[11px] text-muted-foreground">{v.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{v.host}</td>
                    <td className="py-3 px-4 text-muted-foreground">{v.purpose}</td>
                    <td className="py-3 px-4 text-muted-foreground tabular-nums">
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{v.checkIn}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium" style={{ background: `oklch(from var(--color-${statusColor[v.status]}) l c h / 0.15)`, color: `var(--color-${statusColor[v.status]})` }}>
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: `var(--color-${statusColor[v.status]})` }} />
                        {v.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {v.status === "Awaiting" && (
                        <div className="inline-flex gap-1">
                          <button onClick={() => update(v.id, "Checked In")} className="h-7 w-7 rounded-md bg-success/15 text-success hover:bg-success/25 flex items-center justify-center"><Check className="h-3.5 w-3.5" /></button>
                          <button className="h-7 w-7 rounded-md bg-info/15 text-info hover:bg-info/25 flex items-center justify-center"><Bell className="h-3.5 w-3.5" /></button>
                          <button onClick={() => update(v.id, "Checked Out")} className="h-7 w-7 rounded-md bg-surface-2 hover:bg-surface-3 flex items-center justify-center"><X className="h-3.5 w-3.5" /></button>
                        </div>
                      )}
                      {v.status === "Checked In" && (
                        <button onClick={() => update(v.id, "Checked Out")} className="h-7 px-2.5 rounded-md text-[11px] bg-surface-2 hover:bg-surface-3">Check out</button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl p-8 max-w-sm w-full text-center shadow-elev"
            >
              <h3 className="text-xl font-semibold">Visitor Self Check-in</h3>
              <p className="text-[12px] text-muted-foreground mt-1">Display this QR at reception</p>
              <div className="mt-6 mx-auto h-56 w-56 rounded-2xl bg-white p-4 flex items-center justify-center shadow-glow">
                <svg viewBox="0 0 33 33" className="w-full h-full">
                  {Array.from({ length: 33 }).map((_, r) =>
                    Array.from({ length: 33 }).map((_, c) => {
                      const on = ((r * 7 + c * 3 + (r ^ c)) % 5) < 2 || (r < 7 && c < 7) || (r < 7 && c > 25) || (r > 25 && c < 7);
                      return on ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="black" /> : null;
                    })
                  )}
                </svg>
              </div>
              <button onClick={() => setShowQR(false)} className="mt-6 w-full h-10 rounded-lg gradient-primary text-primary-foreground text-[13px] font-medium">Done</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
