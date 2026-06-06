import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/layout/Topbar";
import { ROOMS, BOOKINGS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Users, Video } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_shell/bookings")({
  head: () => ({ meta: [{ title: "Room Bookings — NexSpace ERP" }] }),
  component: BookingsPage,
});

const HOURS = Array.from({ length: 11 }, (_, i) => i + 8); // 8 .. 18

function BookingsPage() {
  const [day, setDay] = useState("Today · Tue, May 26");

  return (
    <>
      <Topbar title="Room Bookings" subtitle="Conference rooms · Live calendar" />
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 lg:p-6 space-y-5">
          {/* Header */}
          <div className="flex items-center gap-2">
            <button className="h-9 w-9 rounded-lg border border-border bg-surface-1 hover:bg-surface-2 flex items-center justify-center"><ChevronLeft className="h-4 w-4" /></button>
            <div className="h-9 px-3 rounded-lg border border-border bg-surface-1 text-[12px] flex items-center font-medium">{day}</div>
            <button className="h-9 w-9 rounded-lg border border-border bg-surface-1 hover:bg-surface-2 flex items-center justify-center"><ChevronRight className="h-4 w-4" /></button>
            <div className="flex-1" />
            <button className="h-9 px-3 rounded-lg gradient-primary text-primary-foreground text-[12px] font-medium shadow-glow flex items-center gap-1.5"><Plus className="h-3.5 w-3.5" /> Book Room</button>
          </div>

          {/* Calendar grid */}
          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            <div className="grid" style={{ gridTemplateColumns: `220px repeat(${HOURS.length}, minmax(80px, 1fr))` }}>
              {/* corner */}
              <div className="border-b border-r border-border p-3 text-[11px] uppercase tracking-wider text-muted-foreground bg-surface-1 sticky left-0 z-10">Room</div>
              {HOURS.map(h => (
                <div key={h} className="border-b border-border p-3 text-center text-[11px] text-muted-foreground bg-surface-1">{h}:00</div>
              ))}

              {ROOMS.map((room) => {
                const bookings = BOOKINGS.filter(b => b.roomId === room.id);
                return (
                  <div key={room.id} className="contents">
                    <div className="border-b border-r border-border p-3 bg-surface-1/40 sticky left-0 z-10">
                      <div className="text-[13px] font-semibold">{room.name}</div>
                      <div className="text-[11px] text-muted-foreground flex items-center gap-2 mt-0.5">
                        <Users className="h-3 w-3" /> {room.capacity}
                        {room.amenities.includes("Zoom") && <Video className="h-3 w-3" />}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-1">{room.floor}</div>
                    </div>
                    <div className="relative border-b border-border col-span-11" style={{ gridColumn: `2 / span ${HOURS.length}` }}>
                      <div className="grid h-full" style={{ gridTemplateColumns: `repeat(${HOURS.length}, 1fr)` }}>
                        {HOURS.map((h, i) => (
                          <div key={h} className={`h-20 ${i < HOURS.length - 1 ? "border-r border-border/50" : ""} hover:bg-primary/5 cursor-pointer transition`} />
                        ))}
                      </div>
                      {bookings.map((b, i) => {
                        const startIdx = b.start - HOURS[0];
                        const span = b.end - b.start;
                        return (
                          <motion.div
                            key={b.id}
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                            className="absolute top-1.5 bottom-1.5 rounded-lg px-2.5 py-1.5 overflow-hidden cursor-pointer shadow-card hover:shadow-glow transition"
                            style={{
                              left: `calc(${(startIdx / HOURS.length) * 100}% + 4px)`,
                              width: `calc(${(span / HOURS.length) * 100}% - 8px)`,
                              background: `oklch(from var(--color-${b.color}) l c h / 0.18)`,
                              borderLeft: `2px solid var(--color-${b.color})`,
                            }}
                          >
                            <div className="text-[11px] font-semibold truncate" style={{ color: `var(--color-${b.color})` }}>{b.title}</div>
                            <div className="text-[10px] text-muted-foreground truncate">{b.by}</div>
                            <div className="text-[10px] text-muted-foreground">{b.start}:00 – {b.end}:00</div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Utilization */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
            {ROOMS.map(room => {
              const hours = BOOKINGS.filter(b => b.roomId === room.id).reduce((s, b) => s + (b.end - b.start), 0);
              const util = Math.round((hours / 10) * 100);
              return (
                <div key={room.id} className="rounded-xl border border-border bg-card p-4 shadow-card">
                  <div className="text-[12px] font-semibold">{room.name}</div>
                  <div className="text-[10px] text-muted-foreground">{room.floor} · {room.capacity} ppl</div>
                  <div className="mt-3 flex items-end justify-between">
                    <div className="text-2xl font-semibold tabular-nums">{util}%</div>
                    <div className="text-[10px] text-muted-foreground">{hours}h booked</div>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${util}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
