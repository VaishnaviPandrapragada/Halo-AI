import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { HaloProvider } from "@/lib/halo-state";
import { BottomNav } from "@/components/halo/BottomNav";
import { SosButton } from "@/components/halo/SosButton";
import { AiChat, AiChatFab } from "@/components/halo/AiChat";
import { EmergencyOverlay } from "@/components/halo/EmergencyOverlay";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const [chat, setChat] = useState(false);
  return (
    <HaloProvider>
      <main className="mx-auto min-h-screen max-w-md pb-32">
        <Outlet />
      </main>
      <SosButton />
      <AiChatFab onClick={() => setChat(true)} />
      <BottomNav />
      <AiChat open={chat} onOpenChange={setChat} />
      <EmergencyOverlay />
    </HaloProvider>
  );
}