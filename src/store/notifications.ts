import { create } from "zustand";

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  tone?: "info" | "success" | "warning" | "danger";
}

interface NotificationStore {
  items: Notification[];
  unread: () => number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  push: (n: Omit<Notification, "id" | "read" | "time">) => void;
}

const SEED: Notification[] = [
  { id: "n1", title: "Payment received", body: "ETB 4,500 from Bole International Academy.", time: "2m ago", read: false, tone: "success" },
  { id: "n2", title: "New approval pending", body: "Wolaita Sodo Academy has requested onboarding.", time: "1h ago", read: false, tone: "info" },
  { id: "n3", title: "Server health alert", body: "API latency spiked to 480ms briefly at 09:15.", time: "3h ago", read: false, tone: "warning" },
  { id: "n4", title: "Report cards published", body: "Term 3 report cards are now available.", time: "Yesterday", read: true, tone: "info" },
  { id: "n5", title: "Backup completed", body: "Nightly database backup finished in 42s.", time: "Yesterday", read: true, tone: "success" },
];

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  items: SEED,
  unread: () => get().items.filter((n) => !n.read).length,
  markRead: (id) =>
    set((s) => ({ items: s.items.map((n) => (n.id === id ? { ...n, read: true } : n)) })),
  markAllRead: () => set((s) => ({ items: s.items.map((n) => ({ ...n, read: true })) })),
  push: (n) =>
    set((s) => ({
      items: [
        { ...n, id: `n${Date.now()}`, time: "just now", read: false },
        ...s.items,
      ],
    })),
}));
