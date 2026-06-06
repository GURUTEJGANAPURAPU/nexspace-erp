import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/layout/Topbar";
import { KPIS, REVENUE_SERIES, OCCUPANCY_SERIES, ACTIVITY_FEED, BRANCHES } from "@/lib/mock-data";
import { ArrowDownRight, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Cell,
} from "recharts";

export const Route = createFileRoute("/_shell/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — NexSpace ERP" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <>
      <Topbar title="Dashboard" subtitle="Tuesday, May 26 · All branches" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto p-4 lg:p-6 space-y-6">
          {/* KPI grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {KPIS.map((k, i) => (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="group relative rounded-xl border border-border bg-card p-4 shadow-card overflow-hidden hover:border-primary/40 transition-colors"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"
                  style={{ background: `var(--color-${k.accent})` }} />
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{k.label}</div>
                    <div className="mt-2 text-2xl font-semibold tracking-tight">{k.value}</div>
                  </div>
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: `oklch(from var(--color-${k.accent}) l c h / 0.15)`, color: `var(--color-${k.accent})` }}>
                    <k.icon className="h-4 w-4" />
                  </div>
                </div>
                <div className={`mt-3 inline-flex items-center gap-0.5 text-[11px] font-medium ${k.trend === "up" ? "text-success" : "text-warning"}`}>
                  {k.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {k.delta} <span className="text-muted-foreground ml-1 font-normal">vs last month</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main charts */}
          <div className="grid lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h3 className="text-[14px] font-semibold">Revenue vs Target</h3>
                  <p className="text-[11px] text-muted-foreground">Last 9 months · in ₹ Lakhs</p>
                </div>
                <button className="h-7 w-7 rounded-md hover:bg-surface-2 flex items-center justify-center"><MoreHorizontal className="h-4 w-4 text-muted-foreground" /></button>
              </div>
              <div className="h-64 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_SERIES} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.62 0.22 295)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="oklch(0.62 0.22 295)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                    <XAxis dataKey="m" tick={{ fontSize: 11, fill: "oklch(0.66 0.012 285)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "oklch(0.66 0.012 285)" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: "oklch(0.16 0.006 285 / 0.95)", border: "1px solid oklch(1 0 0 / 0.08)", borderRadius: 10, fontSize: 12 }}
                      labelStyle={{ color: "oklch(0.97 0.005 285)" }}
                    />
                    <Area type="monotone" dataKey="target" stroke="oklch(0.4 0.01 285)" strokeDasharray="4 4" fill="transparent" />
                    <Area type="monotone" dataKey="revenue" stroke="oklch(0.62 0.22 295)" strokeWidth={2} fill="url(#rev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="text-[14px] font-semibold">Weekly Occupancy</h3>
              <p className="text-[11px] text-muted-foreground mb-1">Avg across branches</p>
              <div className="h-64 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={OCCUPANCY_SERIES}>
                    <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                    <XAxis dataKey="d" tick={{ fontSize: 11, fill: "oklch(0.66 0.012 285)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "oklch(0.66 0.012 285)" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: "oklch(0.16 0.006 285 / 0.95)", border: "1px solid oklch(1 0 0 / 0.08)", borderRadius: 10, fontSize: 12 }}
                      cursor={{ fill: "oklch(1 0 0 / 0.04)" }}
                    />
                    <Bar dataKey="val" radius={[6, 6, 0, 0]}>
                      {OCCUPANCY_SERIES.map((d, i) => (
                        <Cell key={i} fill={d.val > 80 ? "oklch(0.62 0.22 295)" : d.val > 50 ? "oklch(0.68 0.15 230)" : "oklch(0.3 0.008 285)"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Branches + Activity */}
          <div className="grid lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="text-[14px] font-semibold mb-4">Branch Performance</h3>
              <div className="space-y-3">
                {BRANCHES.map((b) => (
                  <div key={b.id} className="flex items-center gap-4">
                    <div className="h-9 w-9 rounded-lg bg-surface-2 flex items-center justify-center text-[11px] font-bold">
                      {b.city.slice(0,3).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[13px]">
                        <span className="font-medium truncate">{b.name}</span>
                        <span className="text-muted-foreground tabular-nums">{b.occupancy}%</span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }} animate={{ width: `${b.occupancy}%` }} transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${b.occupancy >= 85 ? "bg-primary" : b.occupancy >= 70 ? "bg-info" : "bg-warning"}`}
                        />
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-muted-foreground tabular-nums">
                      {Math.round(b.seats * b.occupancy / 100)}/{b.seats}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="text-[14px] font-semibold mb-4">Activity</h3>
              <div className="space-y-3.5 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
                {ACTIVITY_FEED.map((a, i) => (
                  <div key={i} className="relative flex gap-3 pl-5">
                    <div className={`absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-card`} style={{ background: `var(--color-${a.color})` }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] leading-tight">
                        <span className="font-medium">{a.who}</span>
                        <span className="text-muted-foreground"> {a.what}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{a.where} · {a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
