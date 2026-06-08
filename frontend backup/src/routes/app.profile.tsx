import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useHalo } from "@/lib/halo-state";
import { Bell, MapPin, Lock, ShieldAlert, LogOut, Trash2, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [{ title: "Profile · HALO" }] }),
  component: Profile,
});

function Profile() {
  const { user } = useHalo();
  const navigate = useNavigate();
  return (
    <div className="px-5 pt-[max(env(safe-area-inset-top),24px)]">
      <header className="flex items-center gap-4 animate-fade-in-up">
        <div className="relative">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-teal/40 to-lavender/40 text-lg font-semibold">
            {user.name[0]}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-safe ring-4 ring-background" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">{user.name} Carter</h1>
          <p className="text-[12px] text-muted-foreground">alex@halo.app · Premium</p>
        </div>
      </header>

      <Section title="Preferences">
        <Toggle icon={<Bell className="h-4 w-4" />} label="Notifications" hint="Trip & safety alerts" defaultOn />
        <Toggle icon={<MapPin className="h-4 w-4" />} label="Location permissions" hint="Always · for safety" defaultOn />
        <Toggle icon={<Lock className="h-4 w-4" />} label="Private mode" hint="Hide trip from contacts" />
      </Section>

      <Section title="Emergency">
        <Row icon={<ShieldAlert className="h-4 w-4 text-emergency" />} label="Emergency preferences" hint="Auto-call after 10s" />
      </Section>

      <Section title="Account">
        <Row icon={<LogOut className="h-4 w-4" />} label="Log out" onClick={() => navigate({ to: "/auth" })} />
        <Row icon={<Trash2 className="h-4 w-4 text-emergency" />} label="Delete account" tone="emergency" />
      </Section>

      <p className="mt-6 text-center text-[11px] text-muted-foreground">HALO v1.0 · Made with care</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{title}</h2>
      <div className="glass overflow-hidden rounded-2xl divide-y divide-white/5">{children}</div>
    </section>
  );
}

function Row({ icon, label, hint, tone, onClick }: { icon: React.ReactNode; label: string; hint?: string; tone?: "emergency"; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/5">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-surface-2">{icon}</div>
      <div className="flex-1">
        <p className={`text-sm font-medium ${tone === "emergency" ? "text-emergency" : ""}`}>{label}</p>
        {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}

function Toggle({ icon, label, hint, defaultOn }: { icon: React.ReactNode; label: string; hint?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-surface-2">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-teal" : "bg-surface-3"}`}
        aria-pressed={on}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition-transform ${on ? "translate-x-[22px]" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}