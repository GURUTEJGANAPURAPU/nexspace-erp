import { Search, Bell, Plus, Command } from "lucide-react";
import { useState } from "react";
import { CommandPalette } from "@/components/CommandPalette";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="h-16 shrink-0 border-b border-border bg-background/60 backdrop-blur-xl flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-30">
        <div className="flex-1 min-w-0">
          <h1 className="text-[15px] font-semibold tracking-tight truncate">{title}</h1>
          {subtitle && <p className="text-[12px] text-muted-foreground truncate">{subtitle}</p>}
        </div>

        <button
          onClick={() => setOpen(true)}
          className="hidden md:flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-surface-1/70 hover:bg-surface-2 transition-colors w-72 text-left"
        >
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[12px] text-muted-foreground flex-1">Search or jump to…</span>
          <kbd className="text-[10px] text-muted-foreground inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border bg-background">
            <Command className="h-2.5 w-2.5" />K
          </kbd>
        </button>

        <div className="flex items-center gap-1.5">
          <button className="h-9 w-9 rounded-lg border border-border bg-surface-1/70 hover:bg-surface-2 transition flex items-center justify-center relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary pulse-ring" />
          </button>
          <button className="h-9 px-3 rounded-lg gradient-primary text-primary-foreground text-[12px] font-medium shadow-glow flex items-center gap-1.5 hover:opacity-90 transition">
            <Plus className="h-3.5 w-3.5" /> New
          </button>
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-chart-5 to-primary flex items-center justify-center text-[11px] font-bold ml-1">
            AR
          </div>
        </div>
      </header>
      <CommandPalette open={open} onOpenChange={setOpen} />
    </>
  );
}
