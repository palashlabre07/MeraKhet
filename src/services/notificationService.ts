import { api, withFallback } from "./api";
import { notificationGroups } from "@/data/notifications";
import type { NotificationGroup, NotificationItem, NotificationType } from "@/data/notifications";

export type { NotificationGroup, NotificationItem, NotificationType };

export async function getNotifications(farmerId: string): Promise<NotificationGroup[]> {
  return withFallback(
    async () => (await api.get<NotificationGroup[]>(`/notifications/${farmerId}`)).data,
    () => notificationGroups,
  );
}

export async function markNotificationRead(notificationId: string): Promise<{ success: boolean }> {
  return withFallback(
    async () => (await api.put<{ success: boolean }>(`/notifications/${notificationId}/read`)).data,
    () => ({ success: true }),
  );
}
