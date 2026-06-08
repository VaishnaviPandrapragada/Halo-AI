import { useState } from "react";
import { Sparkles, Send, X } from "lucide-react";

const quickPrompts = [
  "I feel unsafe",
  "My route changed",
  "Share my location",
  "Contact emergency contact",
];

type Msg = {
  role: "user" | "ai";
  text: string;
};

export function AiChat({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Hi! I'm HALO. How can I help keep you safe today?",
    },
  ]);

  const send = async (text: string) => {
    const t = text.trim();

    if (!t) return;

    setMessages((m) => [...m, { role: "user", text: t }]);
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: t,
        }),
      });

      const data = await response.json();

      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: data.reply || "Sorry, I couldn't respond.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: "Unable to connect to HALO server.",
        },
      ]);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 animate-fade-in"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-md glass-strong rounded-t-3xl border-b-0 p-5 pb-[max(env(safe-area-inset-bottom),20px)] shadow-[var(--shadow-elegant)] animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/15" />

        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-teal/15 text-teal">
              <Sparkles className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-semibold">HALO AI</p>
              <p className="text-[11px] text-muted-foreground">
                Safety assistant · online
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenChange(false)}
            className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="my-4 flex max-h-[44vh] flex-col gap-2 overflow-y-auto pr-1">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "ai"
                  ? "self-start bg-surface-2 text-foreground rounded-bl-md"
                  : "self-end bg-teal/15 text-foreground rounded-br-md border border-teal/20"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="mb-3 flex flex-wrap gap-1.5">
          {quickPrompts.map((p) => (
            <button
              key={p}
              onClick={() => send(p)}
              className="rounded-full border border-border bg-surface-1 px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground hover:border-teal/40"
            >
              {p}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 rounded-2xl bg-surface-2 px-3 py-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask HALO anything..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />

          <button
            type="submit"
            className="grid h-8 w-8 place-items-center rounded-full bg-teal text-primary-foreground"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export function AiChatFab({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open HALO AI chat"
      className="fixed right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-lavender text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform active:scale-95"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 108px)" }}
    >
      <Sparkles className="h-5 w-5" />
    </button>
  );
}