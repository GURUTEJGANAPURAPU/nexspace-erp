import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — NexSpace ERP" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-aurora)" }} />

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="relative w-full max-w-md glass-strong rounded-2xl shadow-elev p-8"
      >
        <Link to="/" className="flex items-center gap-2.5 mb-8">
          <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-semibold tracking-tight">NexSpace ERP</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Operator console</div>
          </div>
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-[13px] text-muted-foreground mt-1">Sign in to your workspace.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setTimeout(() => navigate({ to: "/dashboard" }), 600);
          }}
          className="mt-7 space-y-3"
        >
          <label className="block">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Email</span>
            <div className="mt-1.5 relative">
              <Mail className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                defaultValue="anita@cowork.global"
                type="email"
                className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-1 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-[13px] transition"
              />
            </div>
          </label>
          <label className="block">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Password</span>
            <div className="mt-1.5 relative">
              <Lock className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                defaultValue="••••••••"
                type="password"
                className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-1 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-[13px] transition"
              />
            </div>
          </label>

          <button
            disabled={loading}
            className="w-full h-10 rounded-lg gradient-primary text-primary-foreground text-[13px] font-medium shadow-glow flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Signing in…" : <>Sign in <ArrowRight className="h-3.5 w-3.5" /></>}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-[11px] text-muted-foreground">
          <div className="flex-1 h-px bg-border" /> OR <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button className="h-10 rounded-lg border border-border bg-surface-1 text-[12px] hover:bg-surface-2 transition">SSO</button>
          <button className="h-10 rounded-lg border border-border bg-surface-1 text-[12px] hover:bg-surface-2 transition">Magic link</button>
        </div>

        <p className="mt-6 text-[12px] text-muted-foreground text-center">
          New here? <a className="text-primary hover:underline">Start a workspace</a>
        </p>
      </motion.div>
    </div>
  );
}
