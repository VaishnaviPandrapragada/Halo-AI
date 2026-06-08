import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { HaloMark } from "@/components/halo/Logo";
import { MapCanvas } from "@/components/halo/MapCanvas";
import { useHalo } from "@/lib/halo-state";
import { Bell, ShieldCheck, Navigation, Share2, CheckCircle2, PhoneCall } from "lucide-react";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Home · HALO" }] }),
  component: Home,
});

function Home() {
  const { user, trip } = useHalo();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="px-5 pt-[max(env(safe-area-inset-top),20px)]">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <HaloMark size={22} />
          <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Halo</span>
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-full glass">
          <Bell className="h-4 w-4" />
        </button>
      </header>

      <section className="mt-6 animate-fade-in-up">
        <p className="text-sm text-muted-foreground">{greeting},</p>
        <h1 className="text-2xl font-semibold tracking-tight">{user.name}.</h1>
      </section>

     <div
  className="mt-5 glass rounded-2xl p-4 animate-fade-in-up"
  style={{ animationDelay: "60ms" }}
>
  <div className="flex items-center gap-3">
    <div className="grid h-10 w-10 place-items-center rounded-full bg-safe/15 text-safe">
      <ShieldCheck className="h-5 w-5" />
    </div>

    <div className="flex-1">
      <p className="text-sm font-medium">
        HALO Monitoring Active
      </p>

      <p className="text-[11px] text-muted-foreground">
        Safety Score: 92% · 3 Contacts Protected
      </p>
    </div>

    <span className="rounded-full bg-safe/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-safe">
      Online
    </span>
  </div>
</div>

      <div className="mt-4 h-[44vh] min-h-[280px] animate-fade-in-up" style={{ animationDelay: "120ms" }}>
        <div className="relative h-full overflow-hidden rounded-[28px] border border-border shadow-[var(--shadow-card)]">
          <MapCanvas />
          <div className="absolute left-3 top-3 glass rounded-full px-3 py-1.5 text-[11px]">
            {trip.from} → <span className="text-foreground">{trip.to}</span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 glass-strong rounded-2xl px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">ETA</p>
                <p className="text-base font-semibold">{trip.etaMinutes} min</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Safety</p>
                <p className="text-base font-semibold text-safe">Optimal</p>
              </div>
              <Link
                     to="/app/trip"
  className="rounded-full bg-teal px-4 py-2 text-xs font-semibold text-primary-foreground"
>
  Open
</Link>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-5 animate-fade-in-up" style={{ animationDelay: "180ms" }}>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Quick actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <Action icon={<Navigation className="h-4 w-4" />} label="Start Trip" hint="Plan a safe route" accent="teal" />
          <Action icon={<Share2 className="h-4 w-4" />} label="Share Location" hint="With trusted contacts" accent="lavender" />
          <Action icon={<CheckCircle2 className="h-4 w-4" />} label="Check In" hint="Confirm you're safe" accent="sage" />
          <Action icon={<PhoneCall className="h-4 w-4" />} label="Contacts" hint="3 on standby" accent="teal" />
        </div>
      </section>
    </div>
  );
}

function Action({ icon, label, hint, accent }: { icon: React.ReactNode; label: string; hint: string; accent: "teal" | "lavender" | "sage" }) {
  const tint = {
    teal: "bg-teal/15 text-teal",
    lavender: "bg-lavender/15 text-lavender",
    sage: "bg-sage/15 text-sage",
  }[accent];
  return (
    <button className="glass rounded-2xl p-4 text-left transition-transform active:scale-[0.98]">
      <div className={`mb-3 grid h-9 w-9 place-items-center rounded-xl ${tint}`}>{icon}</div>
      <p className="text-sm font-semibold">{label}</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>
    </button>
  );
}