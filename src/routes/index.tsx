import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles, ArrowRight, Building2, BarChart3, CalendarDays, UserCheck, Briefcase, Shield, Zap, Globe,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NexSpace ERP — The Operating System for Modern Coworking" },
      { name: "description", content: "Multi-branch CRM + ERP for coworking spaces. Manage members, floors, bookings, billing, and teams in one beautiful platform." },
      { property: "og:title", content: "NexSpace ERP — The Operating System for Modern Coworking" },
      { property: "og:description", content: "Multi-branch CRM + ERP for coworking spaces." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Briefcase, t: "CRM & Pipeline", d: "Kanban deal flow, lead scoring, proposal-to-contract in one place." },
  { icon: Building2, t: "Live Floor Plans", d: "Interactive seat maps with real-time occupancy across every branch." },
  { icon: CalendarDays, t: "Room Bookings", d: "Conflict-free scheduling with calendar sync and QR check-in." },
  { icon: UserCheck, t: "Visitor Management", d: "QR pre-registration, host alerts, and digital badges in seconds." },
  { icon: BarChart3, t: "Analytics Suite", d: "Occupancy, revenue, retention — all forecasted by NexAI." },
  { icon: Shield, t: "Enterprise RBAC", d: "Granular roles, audit trails, MFA, and multi-tenant isolation." },
];

export default function Landing() { return <LandingPage />; }

function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-aurora)" }} />

      {/* Nav */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-semibold tracking-tight">NexSpace</span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded px-1.5 py-0.5">ERP</span>
        </div>
        <nav className="hidden md:flex items-center gap-7 text-[13px] text-muted-foreground">
          <a className="hover:text-foreground transition">Product</a>
          <a className="hover:text-foreground transition">Solutions</a>
          <a className="hover:text-foreground transition">Pricing</a>
          <a className="hover:text-foreground transition">Docs</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="text-[13px] text-muted-foreground hover:text-foreground transition">Sign in</Link>
          <Link to="/dashboard" className="h-9 px-3.5 rounded-lg gradient-primary text-primary-foreground text-[13px] font-medium shadow-glow flex items-center gap-1.5 hover:opacity-90 transition">
            Launch App <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface-1/70 text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success pulse-ring" />
            Now with NexAI · Forecast occupancy & auto-draft renewals
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tighter leading-[0.95]">
            The operating system
            <br />
            for <span className="gradient-text">modern coworking</span>.
          </h1>
          <p className="mt-6 text-[17px] text-muted-foreground max-w-xl leading-relaxed">
            One platform for visitors, leads, members, floors, bookings, billing, and teams —
            across every branch. Built for operators who refuse to use 12 tools.
          </p>
          <div className="mt-9 flex items-center gap-3">
            <Link to="/dashboard" className="h-11 px-5 rounded-xl gradient-primary text-primary-foreground font-medium shadow-glow flex items-center gap-2 hover:opacity-90 transition">
              Open the demo <ArrowRight className="h-4 w-4" />
            </Link>
            <a className="h-11 px-5 rounded-xl border border-border bg-surface-1/60 text-[14px] font-medium flex items-center gap-2 hover:bg-surface-2 transition">
              Book a tour
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5"><Zap className="h-3 w-3" /> SOC 2 Type II</div>
            <div className="flex items-center gap-1.5"><Globe className="h-3 w-3" /> 24 cities</div>
            <div className="flex items-center gap-1.5"><Shield className="h-3 w-3" /> 99.99% uptime</div>
          </div>
        </motion.div>

        {/* Mock product preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 relative"
        >
          <div className="absolute -inset-8 bg-primary/20 blur-3xl rounded-[3rem] opacity-50" />
          <div className="relative glass-strong rounded-2xl p-2 shadow-elev">
            <div className="rounded-xl overflow-hidden border border-border bg-background grid grid-cols-12 h-[420px]">
              <div className="col-span-3 border-r border-border p-4 space-y-2 bg-sidebar">
                <div className="h-6 w-20 rounded bg-surface-2" />
                {["Dashboard", "Pipeline", "Floor", "Bookings", "Visitors", "Clients"].map((l, i) => (
                  <div key={l} className={`h-7 px-2 flex items-center text-[11px] rounded ${i === 0 ? "bg-surface-2 text-foreground" : "text-muted-foreground"}`}>
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />{l}
                  </div>
                ))}
              </div>
              <div className="col-span-9 p-4 space-y-3">
                <div className="grid grid-cols-4 gap-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="rounded-lg border border-border bg-surface-1 p-3">
                      <div className="h-2 w-12 rounded bg-surface-3 mb-2" />
                      <div className="h-5 w-16 rounded bg-foreground/80" />
                      <div className="h-1.5 w-10 rounded bg-success/60 mt-2" />
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border border-border bg-surface-1 h-[230px] p-3 relative overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full">
                    <defs>
                      <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="oklch(0.62 0.22 295)" stopOpacity="0.5" />
                        <stop offset="1" stopColor="oklch(0.62 0.22 295)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,180 C100,140 200,100 320,80 C420,65 520,110 620,60 L620,230 L0,230 Z" fill="url(#g)" />
                    <path d="M0,180 C100,140 200,100 320,80 C420,65 520,110 620,60" stroke="oklch(0.62 0.22 295)" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-[11px] uppercase tracking-wider text-primary font-medium">Everything you need</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Run every branch from one console.</h2>
          <p className="mt-3 text-muted-foreground">Replace your CRM, booking tool, visitor app, and billing system with one cohesive platform.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-2xl border border-border bg-surface-1/60 p-6 hover:bg-surface-2/60 hover:border-primary/40 transition-all"
            >
              <div className="h-10 w-10 rounded-lg bg-surface-3 group-hover:bg-primary/15 group-hover:text-primary flex items-center justify-center transition">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-[15px] font-semibold">{f.t}</h3>
              <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-muted-foreground">
          <div>© 2026 NexSpace. Built for coworking operators.</div>
          <div className="flex items-center gap-5"><a>Privacy</a><a>Terms</a><a>Security</a><a>Contact</a></div>
        </div>
      </footer>
    </div>
  );
}
