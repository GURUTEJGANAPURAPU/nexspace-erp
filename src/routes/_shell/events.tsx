import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/layout/Topbar";
import { EVENTS, COMMUNITY_POSTS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Heart, MessageCircle, Plus } from "lucide-react";

export const Route = createFileRoute("/_shell/events")({
  head: () => ({ meta: [{ title: "Events & Community — NexSpace" }] }),
  component: EventsPage,
});

const typeColor: Record<string, string> = {
  Workshop: "primary", Networking: "chart-5", Talk: "info", Wellness: "success",
};

function EventsPage() {
  return (
    <>
      <Topbar title="Events & Community" subtitle="Drive engagement across your member community" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto p-4 lg:p-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-semibold">Upcoming Events</h3>
              <button className="h-8 px-3 rounded-lg gradient-primary text-primary-foreground text-[12px] shadow-glow flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Create Event
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {EVENTS.map((e, i) => {
                const pct = Math.round((e.rsvps / e.capacity) * 100);
                const color = typeColor[e.type];
                return (
                  <motion.div key={e.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    className="relative rounded-xl border border-border bg-card p-5 shadow-card overflow-hidden group hover:border-primary/40 transition">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition" style={{ background: `var(--color-${color})` }} />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: `var(--color-${color})` }}>{e.type}</span>
                        <div className="text-right">
                          <div className="text-[11px] text-muted-foreground">{e.date}</div>
                          <div className="text-[11px] font-medium">{e.time}</div>
                        </div>
                      </div>
                      <h4 className="mt-3 text-[15px] font-semibold leading-tight">{e.title}</h4>
                      <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {e.branch}</span>
                        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {e.host}</span>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-muted-foreground">{e.rsvps} of {e.capacity} RSVPs</span>
                          <span className="font-medium" style={{ color: `var(--color-${color})` }}>{pct}%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }}
                            className="h-full rounded-full" style={{ background: `var(--color-${color})` }} />
                        </div>
                      </div>
                      <button className="mt-4 w-full h-8 rounded-lg border border-border bg-surface-1 hover:bg-surface-2 text-[12px] font-medium transition flex items-center justify-center gap-1.5">
                        <Calendar className="h-3 w-3" /> Manage
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[14px] font-semibold">Community Feed</h3>
            <div className="space-y-3">
              {COMMUNITY_POSTS.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-border bg-card p-4 shadow-card">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-chart-5 to-primary flex items-center justify-center text-[10px] font-bold">
                      {p.author.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="leading-tight">
                      <div className="text-[12px] font-medium">{p.author}</div>
                      <div className="text-[10px] text-muted-foreground">{p.company} · {p.time}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-[13px] leading-snug">{p.text}</p>
                  <div className="mt-3 flex items-center gap-4 text-[11px] text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-primary transition"><Heart className="h-3 w-3" /> {p.likes}</button>
                    <button className="flex items-center gap-1 hover:text-primary transition"><MessageCircle className="h-3 w-3" /> {p.replies}</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
