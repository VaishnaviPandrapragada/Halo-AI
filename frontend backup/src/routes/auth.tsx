import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { HaloMark } from "@/components/halo/Logo";
import { Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in · HALO" },
      { name: "description", content: "Sign in to HALO to monitor your trips safely." },
    ],
  }),
  component: Auth,
});

function Auth() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden px-6 pt-[max(env(safe-area-inset-top),24px)] pb-12" style={{ background: "var(--gradient-hero)" }}>
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-teal/10 blur-3xl" />

      <header className="relative flex items-center justify-between">
        <HaloMark size={26} />
        <Link to="/" className="text-xs text-muted-foreground">Back</Link>
      </header>

      <section className="relative mt-14 animate-fade-in-up">
        <h1 className="text-balance text-3xl font-semibold leading-tight">
          {mode === "signin" ? "Welcome back." : "Travel with HALO."}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Your trips, your contacts, your peace of mind."
            : "Set up your safety companion in under a minute."}
        </p>
      </section>

      <form
        onSubmit={(e) => { e.preventDefault(); navigate({ to: "/app" }); }}
        className="relative mt-10 space-y-3 animate-fade-in-up"
        style={{ animationDelay: "120ms" }}
      >
        <button
          type="button"
          onClick={() => navigate({ to: "/app" })}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-surface-1 py-3.5 text-sm font-medium transition-colors hover:bg-surface-2"
        >
          <GoogleIcon /> Continue with Google
        </button>

        <div className="flex items-center gap-3 py-2 text-[11px] uppercase tracking-widest text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or email <span className="h-px flex-1 bg-border" />
        </div>

        <Field icon={<Mail className="h-4 w-4" />} placeholder="you@halo.app" type="email" />
        <Field icon={<Lock className="h-4 w-4" />} placeholder="Password" type="password" />

        <button
          type="submit"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-teal py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--glow-teal)] transition-transform active:scale-[0.98]"
        >
          {mode === "signin" ? "Sign in" : "Create account"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <p className="relative mt-8 text-center text-sm text-muted-foreground">
        {mode === "signin" ? "New to HALO?" : "Already have an account?"}{" "}
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="font-medium text-teal"
        >
          {mode === "signin" ? "Create an account" : "Sign in"}
        </button>
      </p>

      <p className="relative mt-6 text-center text-[11px] leading-relaxed text-muted-foreground">
        By continuing you agree to HALO's Terms and acknowledge our Privacy Policy.
      </p>
    </main>
  );
}

function Field({ icon, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-border bg-surface-1 px-4 py-3.5 focus-within:border-teal/50 transition-colors">
      <span className="text-muted-foreground">{icon}</span>
      <input {...rest} className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8a12 12 0 1 1 7.9-21l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12a12 12 0 0 1 7.9 3l5.7-5.7A20 20 0 0 0 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44a20 20 0 0 0 13.4-5.1l-6.2-5.2A12 12 0 0 1 12.7 28L6 33.2A20 20 0 0 0 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.5H24v8h11.3a12 12 0 0 1-4.1 5.7l6.2 5.2C41.4 35.9 44 30.5 44 24c0-1.2-.1-2.4-.4-3.5z"/>
    </svg>
  );
}