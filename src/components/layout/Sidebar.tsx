import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users2, Building2, CalendarDays, UserCheck,
  Briefcase, Settings, Sparkles, ChevronDown, Receipt, FileSignature,
  LifeBuoy, PartyPopper, BarChart3, UsersRound,
} from "lucide-react";
import { motion } from "framer-motion";

const navGroups = [
  {
    label: "Workspace",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Revenue",
    items: [
      { to: "/crm", label: "CRM & Pipeline", icon: Briefcase },
      { to: "/clients", label: "Clients", icon: Users2 },
      { to: "/contracts", label: "Contracts & Plans", icon: FileSignature },
      { to: "/billing", label: "Billing & Invoices", icon: Receipt },
    ],
  },
  {
    label: "Operations",
    items: [
      { to: "/floor", label: "Floor & Seats", icon: Building2 },
      { to: "/bookings", label: "Room Bookings", icon: CalendarDays },
      { to: "/visitors", label: "Visitors", icon: UserCheck },
      { to: "/helpdesk", label: "Helpdesk", icon: LifeBuoy },
    ],
  },
  {
    label: "Community",
    items: [
      { to: "/events", label: "Events & Community", icon: PartyPopper },
      { to: "/team", label: "Team & HR", icon: UsersRound },
      { to: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border bg-sidebar/80 backdrop-blur-xl">
      <div className="h-16 flex items-center gap-2.5 px-5 border-b border-border">
        <div className="relative">
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-success border-2 border-sidebar" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-[15px] font-semibold tracking-tight">NexSpace</span>
          <span className="text-[10px] text-muted-foreground tracking-wider uppercase">ERP Suite</span>
        </div>
      </div>

      <div className="px-3 pt-3">
        <button className="w-full group flex items-center gap-2.5 px-3 py-2 rounded-lg border border-border bg-surface-1 hover:bg-surface-2 transition-colors">
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-primary to-chart-5 flex items-center justify-center text-[11px] font-bold">
            CW
          </div>
          <div className="flex-1 text-left leading-tight">
            <div className="text-[12px] font-medium">CoWork Global</div>
            <div className="text-[10px] text-muted-foreground">5 branches · Pro plan</div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-3 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            <div className="px-3 pb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {group.label}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative group flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                      active ? "text-foreground bg-sidebar-accent" : "text-sidebar-foreground/70 hover:text-foreground hover:bg-sidebar-accent/60"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r-full bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <item.icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        <div className="glass rounded-xl p-3 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-aurora)" }} />
          <div className="relative">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-primary">
              <Sparkles className="h-3 w-3" /> AI Co-Pilot
            </div>
            <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
              Forecast next quarter occupancy or generate a renewal email.
            </p>
            <button className="mt-2 w-full text-[11px] font-medium py-1.5 rounded-md bg-primary/15 text-primary hover:bg-primary/25 transition-colors">
              Ask NexAI →
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
