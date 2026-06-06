import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/layout/Topbar";
import { REVENUE_BY_BRANCH, CHURN_SERIES, LEAD_SOURCE_MIX, REVENUE_SERIES } from "@/lib/mock-data";
import {
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
  LineChart, Line, PieChart, Pie, AreaChart, Area,
} from "recharts";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export const Route = createFileRoute("/_shell/analytics")({
  head: () => ({ meta: [{ title: "Analytics — NexSpace" }] }),
  component: AnalyticsPage,
});

const palette = ["primary", "info", "chart-5", "success", "warning"];

function AnalyticsPage() {
  return (
    <>
      <Topbar title="Analytics & Reports" subtitle="Executive insights across revenue, retention and pipeline" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto p-4 lg:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {["7d", "30d", "90d", "YTD", "All"].map((r, i) => (
                <button key={r} className={`h-8 px-3 rounded-lg text-[12px] font-medium border transition ${i === 2 ? "bg-primary/15 text-primary border-primary/30" : "border-border bg-surface-1 hover:bg-surface-2"}`}>{r}</button>
              ))}
            </div>
            <button className="h-8 px-3 rounded-lg border border-border bg-surface-1 hover:bg-surface-2 text-[12px] flex items-center gap-1.5">
              <Download className="h-3.5 w-3.5" /> Export PDF
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="text-[14px] font-semibold">Revenue Trend</h3>
              <p className="text-[11px] text-muted-foreground mb-2">Monthly recognised revenue</p>
              <div className="h-64 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_SERIES}>
                    <defs>
                      <linearGradient id="rev2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.62 0.22 295)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="oklch(0.62 0.22 295)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                    <XAxis dataKey="m" tick={{ fontSize: 11, fill: "oklch(0.66 0.012 285)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "oklch(0.66 0.012 285)" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "oklch(0.16 0.006 285 / 0.95)", border: "1px solid oklch(1 0 0 / 0.08)", borderRadius: 10, fontSize: 12 }} />
                    <Area type="monotone" dataKey="revenue" stroke="oklch(0.62 0.22 295)" strokeWidth={2} fill="url(#rev2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="text-[14px] font-semibold">Lead Source Mix</h3>
              <p className="text-[11px] text-muted-foreground mb-2">Last 90 days</p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={LEAD_SOURCE_MIX} dataKey="value" innerRadius={45} outerRadius={75} paddingAngle={2}>
                      {LEAD_SOURCE_MIX.map((d, i) => (
                        <Cell key={i} fill={`var(--color-${d.color})`} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "oklch(0.16 0.006 285 / 0.95)", border: "1px solid oklch(1 0 0 / 0.08)", borderRadius: 10, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 mt-2">
                {LEAD_SOURCE_MIX.map((s) => (
                  <div key={s.name} className="flex items-center gap-2 text-[11px]">
                    <span className="h-2 w-2 rounded-full" style={{ background: `var(--color-${s.color})` }} />
                    <span className="flex-1">{s.name}</span>
                    <span className="text-muted-foreground tabular-nums">{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="text-[14px] font-semibold">Revenue by Branch</h3>
              <p className="text-[11px] text-muted-foreground mb-2">₹ Lakhs · current month</p>
              <div className="h-64 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={REVENUE_BY_BRANCH} layout="vertical">
                    <CartesianGrid stroke="oklch(1 0 0 / 0.05)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "oklch(0.66 0.012 285)" }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="branch" width={90} tick={{ fontSize: 11, fill: "oklch(0.85 0.005 285)" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "oklch(0.16 0.006 285 / 0.95)", border: "1px solid oklch(1 0 0 / 0.08)", borderRadius: 10, fontSize: 12 }} cursor={{ fill: "oklch(1 0 0 / 0.04)" }} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                      {REVENUE_BY_BRANCH.map((_, i) => (
                        <Cell key={i} fill={`var(--color-${palette[i % palette.length]})`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="text-[14px] font-semibold">Churn vs NPS</h3>
              <p className="text-[11px] text-muted-foreground mb-2">Retention health</p>
              <div className="h-64 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={CHURN_SERIES}>
                    <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                    <XAxis dataKey="m" tick={{ fontSize: 11, fill: "oklch(0.66 0.012 285)" }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="l" tick={{ fontSize: 11, fill: "oklch(0.66 0.012 285)" }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11, fill: "oklch(0.66 0.012 285)" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "oklch(0.16 0.006 285 / 0.95)", border: "1px solid oklch(1 0 0 / 0.08)", borderRadius: 10, fontSize: 12 }} />
                    <Line yAxisId="l" type="monotone" dataKey="churn" stroke="oklch(0.62 0.22 25)" strokeWidth={2} dot={{ r: 3 }} />
                    <Line yAxisId="r" type="monotone" dataKey="nps" stroke="oklch(0.72 0.17 155)" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-4 text-[11px] mt-1">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" /> Churn %</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /> NPS</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "ARR", value: "₹5.78 Cr", delta: "+24% YoY" },
              { label: "LTV : CAC", value: "4.8×", delta: "Healthy" },
              { label: "Avg Tenure", value: "18.4 mo", delta: "+1.2 mo" },
              { label: "Net Revenue Retention", value: "118%", delta: "+6 pts" },
            ].map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{m.label}</div>
                <div className="mt-2 text-2xl font-semibold tracking-tight">{m.value}</div>
                <div className="text-[11px] text-success mt-1">{m.delta}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
