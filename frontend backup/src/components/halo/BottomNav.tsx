import { Link, useLocation } from "@tanstack/react-router";
import { Home, Users, Route as RouteIcon, User } from "lucide-react";

const items = [
  { to: "/app", icon: Home, label: "Home" },
  { to: "/app/trip", icon: RouteIcon, label: "Trip" },
  { to: "/app/contacts", icon: Users, label: "Contacts" },
  { to: "/app/profile", icon: User, label: "Profile" },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 pb-[max(env(safe-area-inset-bottom),12px)] pt-2 px-4">
      <div className="mx-auto max-w-md glass-strong rounded-2xl px-2 py-2 shadow-[var(--shadow-elegant)]">
        <ul className="grid grid-cols-4">
          {items.map(({ to, icon: Icon, label }) => {
            const active = pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-medium transition-colors ${
                    active ? "text-teal" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} />
                  <span className="uppercase tracking-wider">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}