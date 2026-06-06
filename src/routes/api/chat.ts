import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are NexAI, the in-app assistant for NexSpace ERP — a coworking space CRM and operations platform.
You help operators with: CRM pipeline, leads, clients, contracts, billing/invoices, floor/seat management, meeting room bookings, visitor check-in, helpdesk tickets, events, team/HR, and analytics.
Be concise, friendly, and action-oriented. Use markdown. When relevant, suggest concrete next steps inside NexSpace (e.g. "Open the CRM pipeline", "Check overdue invoices in Billing"). You can also answer general questions helpfully.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as { messages?: UIMessage[] };
          if (!Array.isArray(messages)) {
            return new Response("Messages are required", { status: 400 });
          }
          const key = process.env.LOVABLE_API_KEY;
          if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

          const gateway = createLovableAiGatewayProvider(key);
          const result = streamText({
            model: gateway("google/gemini-3-flash-preview"),
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(messages),
          });
          return result.toUIMessageStreamResponse({ originalMessages: messages });
        } catch (err) {
          console.error("/api/chat error:", err);
          const msg = err instanceof Error ? err.message : "Unknown error";
          return new Response(
            JSON.stringify({ error: msg }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});
