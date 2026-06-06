import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Loader2 } from "lucide-react";

export function NexAIChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("nexai:open", handler);
    return () => window.removeEventListener("nexai:open", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    sendMessage({ text });
    setInput("");
  };

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-40 h-12 w-12 rounded-full gradient-primary shadow-glow flex items-center justify-center text-primary-foreground"
        aria-label="Open NexAI assistant"
      >
        {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-20 right-5 z-40 w-[380px] max-w-[calc(100vw-2.5rem)] h-[560px] max-h-[calc(100vh-7rem)] glass-strong rounded-2xl shadow-elev flex flex-col overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg gradient-primary flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold">NexAI Assistant</div>
                <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Powered by Gemini
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="h-7 w-7 rounded-md hover:bg-surface-2 flex items-center justify-center">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="h-12 w-12 mx-auto rounded-2xl gradient-primary flex items-center justify-center mb-3">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="text-[13px] font-semibold">How can I help?</div>
                  <div className="text-[11px] text-muted-foreground mt-1 mb-4">Ask about your coworking operations</div>
                  <div className="space-y-1.5">
                    {[
                      "Forecast occupancy this month",
                      "Summarize overdue invoices",
                      "Suggest upsell candidates",
                      "Draft a renewal email",
                    ].map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage({ text: s })}
                        className="w-full text-left text-[11.5px] px-3 py-2 rounded-lg bg-surface-1 hover:bg-surface-2 border border-border transition"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => {
                const text = m.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("");
                const isUser = m.role === "user";
                return (
                  <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={
                        isUser
                          ? "max-w-[85%] rounded-2xl rounded-br-sm px-3.5 py-2 text-[12.5px] bg-primary text-primary-foreground"
                          : "max-w-[90%] text-[12.5px] text-foreground whitespace-pre-wrap leading-relaxed"
                      }
                    >
                      {text || (isUser ? "" : <span className="text-muted-foreground italic">…</span>)}
                    </div>
                  </div>
                );
              })}

              {status === "submitted" && (
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" /> Thinking…
                </div>
              )}

              {error && (
                <div className="text-[11px] text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
                  {error.message || "Something went wrong."}
                </div>
              )}
            </div>

            {/* Composer */}
            <form onSubmit={handleSubmit} className="border-t border-border p-2.5 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask NexAI anything…"
                disabled={isLoading}
                className="flex-1 h-9 px-3 rounded-lg bg-surface-1 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-[12.5px] transition disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="h-9 w-9 rounded-lg gradient-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-glow"
              >
                {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
