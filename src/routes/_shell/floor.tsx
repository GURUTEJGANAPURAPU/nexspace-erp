import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/layout/Topbar";
import { FLOOR_SEATS, BRANCHES, type Seat } from "@/lib/mock-data";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Users, Coffee, DoorOpen, Wrench } from "lucide-react";

export const Route = createFileRoute("/_shell/floor")({
  head: () => ({ meta: [{ title: "Floor Plan — NexSpace ERP" }] }),
  component: FloorPage,
});

const STATUS_COLORS: Record<Seat["status"], string> = {
  available: "oklch(0.72 0.17 155)",
  occupied: "oklch(0.62 0.22 295)",
  reserved: "oklch(0.78 0.16 75)",
  maintenance: "oklch(0.5 0.01 285)",
};

function FloorPage() {
  const [branch, setBranch] = useState(BRANCHES[0].id);
  const [seats, setSeats] = useState(FLOOR_SEATS);
  const [selected, setSelected] = useState<Seat | null>(null);

  const counts = {
    available: seats.filter(s => s.status === "available").length,
    occupied: seats.filter(s => s.status === "occupied").length,
    reserved: seats.filter(s => s.status === "reserved").length,
    maintenance: seats.filter(s => s.status === "maintenance").length,
  };

  return (
    <>
      <Topbar title="Floor & Seat Management" subtitle="Live occupancy · Floor 2" />
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        {/* Map area */}
        <div className="flex-1 relative overflow-auto bg-background dot-bg">
          {/* Top controls */}
          <div className="sticky top-0 z-10 p-3 flex flex-wrap items-center gap-2 glass border-b border-border">
            <select
              value={branch} onChange={(e) => setBranch(e.target.value)}
              className="h-8 px-2.5 rounded-md bg-surface-2 border border-border text-[12px] outline-none"
            >
              {BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <div className="flex items-center gap-1 ml-2">
              {(["available", "occupied", "reserved", "maintenance"] as const).map(s => (
                <div key={s} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-surface-1 border border-border text-[11px]">
                  <span className="h-2 w-2 rounded-full" style={{ background: STATUS_COLORS[s] }} />
                  <span className="capitalize text-muted-foreground">{s}</span>
                  <span className="tabular-nums font-medium">{counts[s]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 min-w-[940px]">
            <svg viewBox="0 0 940 540" className="w-full h-auto rounded-2xl border border-border bg-surface-1/30">
              {/* walls */}
              <rect x="20" y="60" width="900" height="460" rx="14" fill="none" stroke="oklch(0.3 0.008 285)" strokeWidth="2" />
              {/* zones */}
              <rect x="40" y="80" width="740" height="160" rx="8" fill="oklch(1 0 0 / 0.015)" stroke="oklch(0.27 0.008 285)" strokeDasharray="4 4" />
              <text x="50" y="98" fontSize="10" fill="oklch(0.55 0.01 285)" letterSpacing="2">HOT DESKS · ZONE A</text>
              <rect x="40" y="260" width="740" height="240" rx="8" fill="oklch(1 0 0 / 0.015)" stroke="oklch(0.27 0.008 285)" strokeDasharray="4 4" />
              <text x="50" y="278" fontSize="10" fill="oklch(0.55 0.01 285)" letterSpacing="2">DEDICATED · ZONE B</text>
              <rect x="800" y="80" width="120" height="420" rx="8" fill="oklch(1 0 0 / 0.015)" stroke="oklch(0.27 0.008 285)" strokeDasharray="4 4" />
              <text x="810" y="98" fontSize="10" fill="oklch(0.55 0.01 285)" letterSpacing="2">CABINS</text>

              {seats.map((s) => {
                if (s.type === "meeting") {
                  return (
                    <g key={s.id} onClick={() => setSelected(s)} className="cursor-pointer">
                      <rect x={s.x - 60} y={s.y + 30} width="120" height="30" rx="6"
                        fill={STATUS_COLORS[s.status]} fillOpacity="0.15"
                        stroke={STATUS_COLORS[s.status]} strokeWidth="1.5" />
                      <text x={s.x} y={s.y + 49} textAnchor="middle" fontSize="10" fill="oklch(0.9 0 0)" fontWeight="500">{s.member || "Meeting"}</text>
                    </g>
                  );
                }
                if (s.type === "cabin") {
                  return (
                    <g key={s.id} onClick={() => setSelected(s)} className="cursor-pointer">
                      <rect x={s.x - 25} y={s.y - 25} width="80" height="70" rx="6"
                        fill={STATUS_COLORS[s.status]} fillOpacity="0.18"
                        stroke={STATUS_COLORS[s.status]} strokeWidth="1.5" />
                      <text x={s.x + 15} y={s.y + 5} textAnchor="middle" fontSize="9" fill="oklch(0.9 0 0)" fontWeight="600">CABIN</text>
                      <text x={s.x + 15} y={s.y + 18} textAnchor="middle" fontSize="8" fill="oklch(0.7 0 0)">{s.member || "Available"}</text>
                    </g>
                  );
                }
                return (
                  <motion.circle
                    key={s.id}
                    cx={s.x} cy={s.y} r="14"
                    fill={STATUS_COLORS[s.status]} fillOpacity={s.status === "available" ? 0.25 : 0.85}
                    stroke={STATUS_COLORS[s.status]} strokeWidth="1.5"
                    onClick={() => setSelected(s)}
                    whileHover={{ scale: 1.25 }}
                    className="cursor-pointer"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 40, opacity: 0 }}
              className="w-full lg:w-80 shrink-0 border-l border-border bg-card overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{selected.type}</div>
                    <h3 className="text-lg font-semibold mt-0.5">{selected.id}</h3>
                  </div>
                  <button onClick={() => setSelected(null)} className="h-7 w-7 rounded-md hover:bg-surface-2 flex items-center justify-center">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium" style={{ background: `${STATUS_COLORS[selected.status]}25`, color: STATUS_COLORS[selected.status] }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_COLORS[selected.status] }} />
                  <span className="capitalize">{selected.status}</span>
                </div>

                {selected.member && (
                  <div className="mt-5 p-3 rounded-lg border border-border bg-surface-1">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Occupied by</div>
                    <div className="mt-1 text-[13px] font-medium">{selected.member}</div>
                  </div>
                )}

                <dl className="mt-4 space-y-2.5 text-[12px]">
                  <Row icon={MapPin} label="Location" value="Floor 2, Zone B" />
                  <Row icon={Users} label="Capacity" value={selected.type === "cabin" ? "6 people" : selected.type === "meeting" ? "12 people" : "1 person"} />
                  <Row icon={Coffee} label="Amenities" value="Power, Locker, Coffee" />
                </dl>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSeats(prev => prev.map(s => s.id === selected.id ? { ...s, status: "reserved" } : s));
                      setSelected({ ...selected, status: "reserved" });
                    }}
                    className="h-9 rounded-lg bg-warning/15 text-warning text-[12px] font-medium hover:bg-warning/25 transition flex items-center justify-center gap-1.5"
                  ><DoorOpen className="h-3.5 w-3.5" /> Reserve</button>
                  <button
                    onClick={() => {
                      setSeats(prev => prev.map(s => s.id === selected.id ? { ...s, status: "maintenance" } : s));
                      setSelected({ ...selected, status: "maintenance" });
                    }}
                    className="h-9 rounded-lg bg-surface-2 text-[12px] font-medium hover:bg-surface-3 transition flex items-center justify-center gap-1.5"
                  ><Wrench className="h-3.5 w-3.5" /> Flag</button>
                </div>
                <button
                  onClick={() => {
                    setSeats(prev => prev.map(s => s.id === selected.id ? { ...s, status: "available", member: undefined } : s));
                    setSelected({ ...selected, status: "available", member: undefined });
                  }}
                  className="mt-2 w-full h-9 rounded-lg bg-success/15 text-success text-[12px] font-medium hover:bg-success/25 transition"
                >Mark Available</button>
              </div>
            </motion.div>
          ) : (
            <div className="hidden lg:flex w-80 shrink-0 border-l border-border bg-card items-center justify-center p-6 text-center">
              <div className="text-muted-foreground text-[12px]">
                <div className="h-12 w-12 mx-auto rounded-full bg-surface-2 flex items-center justify-center mb-3">
                  <MapPin className="h-5 w-5" />
                </div>
                Select a seat on the floor to manage it.
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function Row({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
      <div className="flex-1 flex justify-between gap-3">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-right">{value}</span>
      </div>
    </div>
  );
}
