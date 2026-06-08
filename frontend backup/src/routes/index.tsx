import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { HaloLogo } from "@/components/halo/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HALO — Your Trip's Companion" },
      { name: "description", content: "Your intelligent travel safety companion." },
      { property: "og:title", content: "HALO — Your Trip's Companion" },
      { property: "og:description", content: "Your intelligent travel safety companion." },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/auth" }), 2600);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-lavender/10 blur-3xl" />

      <div className="relative flex flex-col items-center animate-fade-in-up">
        <div className="animate-glow">
          <HaloLogo />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.4em] text-muted-foreground animate-fade-in" style={{ animationDelay: "600ms" }}>
          Your Trip's Companion
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground animate-fade-in" style={{ animationDelay: "1200ms" }}>
        <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-teal" />
        Securing your session
      </div>
    </main>
  );
}
