import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard, Briefcase, Building2, CalendarDays, UserCheck, Users2, Settings, Sparkles,
  Receipt, FileSignature, LifeBuoy, PartyPopper, BarChart3, UsersRound,
} from "lucide-react";

const items = [
  { label: "Go to Dashboard", to: "/dashboard", icon: LayoutDashboard, group: "Navigate" },
  { label: "Open Analytics", to: "/analytics", icon: BarChart3, group: "Navigate" },
  { label: "Open CRM Pipeline", to: "/crm", icon: Briefcase, group: "Navigate" },
  { label: "Clients", to: "/clients", icon: Users2, group: "Navigate" },
  { label: "Contracts & Plans", to: "/contracts", icon: FileSignature, group: "Navigate" },
  { label: "Billing & Invoices", to: "/billing", icon: Receipt, group: "Navigate" },
  { label: "View Floor Plan", to: "/floor", icon: Building2, group: "Navigate" },
  { label: "Book a Meeting Room", to: "/bookings", icon: CalendarDays, group: "Navigate" },
  { label: "Visitor Check-in", to: "/visitors", icon: UserCheck, group: "Navigate" },
  { label: "Helpdesk Tickets", to: "/helpdesk", icon: LifeBuoy, group: "Navigate" },
  { label: "Events & Community", to: "/events", icon: PartyPopper, group: "Navigate" },
  { label: "Team & HR", to: "/team", icon: UsersRound, group: "Navigate" },
  { label: "Settings & Members", to: "/settings", icon: Settings, group: "Navigate" },
  { label: "Ask NexAI: forecast occupancy", to: "/analytics", icon: Sparkles, group: "AI" },
  { label: "Ask NexAI: draft renewal email", to: "/clients", icon: Sparkles, group: "AI" },
  { label: "Ask NexAI: summarize overdue invoices", to: "/billing", icon: Sparkles, group: "AI" },
  { label: "Ask NexAI: suggest upsell candidates", to: "/crm", icon: Sparkles, group: "AI" },
];

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm flex items-start justify-center pt-[12vh] px-4"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ y: -10, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl glass-strong rounded-2xl shadow-elev overflow-hidden"
          >
            <input
              autoFocus
              placeholder="Type a command or search…"
              className="w-full h-14 px-5 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground border-b border-border"
            />
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {["Navigate", "AI"].map((group) => (
                <div key={group} className="mb-2">
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">{group}</div>
                  {items.filter((i) => i.group === group).map((item) => (
                    <button
                      key={item.label}
                      onClick={() => { navigate({ to: item.to }); onOpenChange(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-[13px] hover:bg-surface-2 transition group"
                    >
                      <div className="h-7 w-7 rounded-md bg-surface-2 group-hover:bg-primary/15 group-hover:text-primary flex items-center justify-center transition">
                        <item.icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="flex-1">{item.label}</span>
                      <span className="text-[10px] text-muted-foreground">↵</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-border flex items-center gap-3 text-[10px] text-muted-foreground">
              <span>↑↓ Navigate</span><span>↵ Select</span><span>esc Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
