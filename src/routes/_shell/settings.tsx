import { createFileRoute } from "@tanstack/react-router";
import { Topbar } from "@/components/layout/Topbar";
import { Shield, Users, Building2, Bell, CreditCard, Key } from "lucide-react";

export const Route = createFileRoute("/_shell/settings")({
  head: () => ({ meta: [{ title: "Settings — NexSpace ERP" }] }),
  component: SettingsPage,
});

const ROLES = [
  { name: "Super Admin", count: 2, perms: "Full access" },
  { name: "Org Owner", count: 1, perms: "Manage org & billing" },
  { name: "Branch Manager", count: 5, perms: "Manage 1 branch" },
  { name: "Community Mgr", count: 8, perms: "Members & floor ops" },
  { name: "Finance", count: 3, perms: "Invoices & payouts" },
  { name: "Sales", count: 6, perms: "CRM & proposals" },
  { name: "Receptionist", count: 5, perms: "Visitors & check-in" },
  { name: "Member", count: 1284, perms: "Self-service portal" },
];

function SettingsPage() {
  return (
    <>
      <Topbar title="Settings" subtitle="Workspace · Roles · Billing" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl p-4 lg:p-6 space-y-5">
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { icon: Users, l: "Members", v: "1,314" },
              { icon: Building2, l: "Branches", v: "5" },
              { icon: Shield, l: "Plan", v: "Enterprise" },
            ].map(s => (
              <div key={s.l} className="rounded-xl border border-border bg-card p-4 shadow-card flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center"><s.icon className="h-5 w-5" /></div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                  <div className="text-lg font-semibold">{s.v}</div>
                </div>
              </div>
            ))}
          </div>

          <Section icon={Shield} title="Roles & Permissions" desc="Granular RBAC for your organization.">
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-[13px]">
                <thead className="bg-surface-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  <tr><th className="text-left py-2.5 px-4">Role</th><th className="text-left py-2.5 px-4">Permissions</th><th className="text-right py-2.5 px-4">Members</th></tr>
                </thead>
                <tbody>
                  {ROLES.map(r => (
                    <tr key={r.name} className="border-t border-border hover:bg-surface-1/50">
                      <td className="py-2.5 px-4 font-medium">{r.name}</td>
                      <td className="py-2.5 px-4 text-muted-foreground">{r.perms}</td>
                      <td className="py-2.5 px-4 text-right tabular-nums">{r.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section icon={Bell} title="Notifications" desc="Choose how operators get notified.">
            {["Email", "SMS", "WhatsApp", "In-app", "Push"].map((c, i) => (
              <Toggle key={c} label={c} defaultOn={i < 3} />
            ))}
          </Section>

          <Section icon={CreditCard} title="Billing" desc="Enterprise plan · billed annually.">
            <div className="rounded-lg border border-border p-4 bg-surface-1 flex items-center justify-between">
              <div>
                <div className="text-[14px] font-semibold">Enterprise</div>
                <div className="text-[12px] text-muted-foreground">Unlimited branches · NexAI · 24/7 support</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold">₹24,999<span className="text-[11px] text-muted-foreground font-normal">/mo</span></div>
                <button className="text-[11px] text-primary hover:underline">Manage plan →</button>
              </div>
            </div>
          </Section>

          <Section icon={Key} title="API & Integrations" desc="Connect Slack, Razorpay, Google Calendar.">
            <div className="grid sm:grid-cols-2 gap-2">
              {["Razorpay", "Stripe", "Google Calendar", "Zoom", "Slack", "WhatsApp Business"].map(i => (
                <div key={i} className="rounded-lg border border-border bg-surface-1 p-3 flex items-center justify-between">
                  <span className="text-[13px] font-medium">{i}</span>
                  <button className="text-[11px] px-2.5 py-1 rounded-md bg-primary/15 text-primary hover:bg-primary/25 transition">Connect</button>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}

function Section({ icon: Icon, title, desc, children }: { icon: any; title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start gap-3 mb-4">
        <div className="h-8 w-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center"><Icon className="h-4 w-4" /></div>
        <div>
          <h3 className="text-[14px] font-semibold">{title}</h3>
          <p className="text-[12px] text-muted-foreground">{desc}</p>
        </div>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Toggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  return (
    <label className="flex items-center justify-between py-2 cursor-pointer">
      <span className="text-[13px]">{label}</span>
      <input type="checkbox" defaultChecked={defaultOn} className="peer sr-only" />
      <span className="relative h-5 w-9 rounded-full bg-surface-2 peer-checked:bg-primary transition after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-foreground after:transition peer-checked:after:translate-x-4" />
    </label>
  );
}
