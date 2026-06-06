import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/layout/Topbar";
import { LEADS, PIPELINE_STAGES, type Lead } from "@/lib/mock-data";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { useState, useMemo } from "react";
import { Plus, TrendingUp, Filter, Search } from "lucide-react";

export const Route = createFileRoute("/_shell/crm")({
  head: () => ({ meta: [{ title: "CRM Pipeline — NexSpace ERP" }] }),
  component: CRMPage,
});

function CRMPage() {
  const [leads, setLeads] = useState<Lead[]>(LEADS);
  const [q, setQ] = useState("");

  const grouped = useMemo(() => {
    const filter = leads.filter(l => !q || l.company.toLowerCase().includes(q.toLowerCase()) || l.contact.toLowerCase().includes(q.toLowerCase()));
    return PIPELINE_STAGES.map(s => ({ ...s, leads: filter.filter(l => l.stage === s.id) }));
  }, [leads, q]);

  const total = leads.reduce((s, l) => s + l.value, 0);
  const won = leads.filter(l => l.stage === "won").reduce((s, l) => s + l.value, 0);

  return (
    <>
      <Topbar title="CRM & Pipeline" subtitle="Sales operations across all branches" />
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-6 space-y-5">
          {/* Top stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { l: "Pipeline Value", v: `₹${(total/100000).toFixed(1)}L`, hint: `${leads.length} deals` },
              { l: "Won (MTD)", v: `₹${(won/100000).toFixed(1)}L`, hint: `${leads.filter(l=>l.stage==='won').length} deals` },
              { l: "Conversion", v: "32.4%", hint: "+4.2% vs last mo" },
              { l: "Avg Deal Size", v: `₹${(total/leads.length/100000).toFixed(1)}L`, hint: "Across 11 deals" },
            ].map(s => (
              <div key={s.l} className="rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                <div className="mt-1 text-xl font-semibold tracking-tight">{s.v}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{s.hint}</div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-xs">
              <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="Search company or contact…"
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-1 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-[12px] transition"
              />
            </div>
            <button className="h-9 px-3 rounded-lg border border-border bg-surface-1 hover:bg-surface-2 text-[12px] flex items-center gap-1.5"><Filter className="h-3.5 w-3.5" /> All owners</button>
            <button className="h-9 px-3 rounded-lg border border-border bg-surface-1 hover:bg-surface-2 text-[12px] flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5" /> Forecast</button>
            <div className="flex-1" />
            <button className="h-9 px-3 rounded-lg gradient-primary text-primary-foreground text-[12px] font-medium shadow-glow flex items-center gap-1.5"><Plus className="h-3.5 w-3.5" /> New Deal</button>
          </div>

          {/* Kanban */}
          <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 lg:-mx-6 px-4 lg:px-6">
            {grouped.map((stage) => {
              const sum = stage.leads.reduce((s, l) => s + l.value, 0);
              return (
                <div key={stage.id} className="w-[280px] shrink-0 flex flex-col">
                  <div className="flex items-center justify-between mb-2.5 px-1">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full" style={{ background: `var(--color-${stage.color})` }} />
                      <span className="text-[12px] font-semibold">{stage.name}</span>
                      <span className="text-[11px] text-muted-foreground">{stage.leads.length}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground tabular-nums">₹{(sum/100000).toFixed(1)}L</span>
                  </div>
                  <Reorder.Group
                    axis="y"
                    values={stage.leads}
                    onReorder={(newOrder) => {
                      const others = leads.filter(l => l.stage !== stage.id);
                      setLeads([...others, ...newOrder]);
                    }}
                    className="space-y-2 min-h-[120px] rounded-xl bg-surface-1/40 p-2 border border-dashed border-border"
                  >
                    <AnimatePresence>
                      {stage.leads.map(lead => (
                        <Reorder.Item key={lead.id} value={lead} as="div">
                          <LeadCard lead={lead} onMove={(dir) => {
                            const idx = PIPELINE_STAGES.findIndex(s => s.id === lead.stage);
                            const next = PIPELINE_STAGES[idx + dir];
                            if (next) setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, stage: next.id } : l));
                          }} />
                        </Reorder.Item>
                      ))}
                    </AnimatePresence>
                  </Reorder.Group>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function LeadCard({ lead, onMove }: { lead: Lead; onMove: (dir: number) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className="group rounded-lg border border-border bg-card p-3 shadow-card cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[13px] font-semibold truncate">{lead.company}</div>
          <div className="text-[11px] text-muted-foreground truncate">{lead.contact}</div>
        </div>
        <ScoreRing score={lead.score} />
      </div>
      <div className="mt-2.5 flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">{lead.seats} seats</span>
        <span className="font-semibold tabular-nums">₹{(lead.value/100000).toFixed(1)}L</span>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-chart-5 to-primary text-[9px] font-bold flex items-center justify-center">
          {lead.owner.split(" ").map(s => s[0]).join("")}
        </div>
        <span className="text-[10px] text-muted-foreground">{lead.owner}</span>
        <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-surface-2 text-muted-foreground">{lead.source}</span>
      </div>
      <div className="opacity-0 group-hover:opacity-100 mt-2 flex gap-1 transition-opacity">
        <button onClick={() => onMove(-1)} className="flex-1 h-6 text-[10px] rounded bg-surface-2 hover:bg-surface-3">← Back</button>
        <button onClick={() => onMove(1)} className="flex-1 h-6 text-[10px] rounded bg-primary/15 text-primary hover:bg-primary/25">Advance →</button>
      </div>
    </motion.div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 85 ? "oklch(0.72 0.17 155)" : score >= 70 ? "oklch(0.62 0.22 295)" : "oklch(0.78 0.16 75)";
  const circ = 2 * Math.PI * 10;
  return (
    <div className="relative h-7 w-7 shrink-0">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="oklch(0.27 0.008 285)" strokeWidth="2.5" fill="none" />
        <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5" fill="none"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - score / 100)} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold">{score}</div>
    </div>
  );
}
