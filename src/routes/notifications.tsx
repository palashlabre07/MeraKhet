import { createFileRoute } from "@tanstack/react-router";
import {
  CloudRain,
  Bug,
  IndianRupee,
  Landmark,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Card, Screen, ScreenHeader } from "@/components/screen";
import { useLang } from "@/lib/i18n";
import { notificationGroups, type NotificationType } from "@/data/notifications";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — MeraKeth" },
      {
        name: "description",
        content: "Weather alerts, pest alerts, mandi updates, scheme reminders and budget reminders.",
      },
      { property: "og:title", content: "Notifications — MeraKeth" },
      {
        property: "og:description",
        content: "Stay updated with weather, pest, mandi and scheme notifications.",
      },
    ],
  }),
  component: NotificationsScreen,
});

const typeIcons: Record<NotificationType, LucideIcon> = {
  weather: CloudRain,
  pest: Bug,
  mandi: IndianRupee,
  scheme: Landmark,
  budget: Wallet,
};

function NotificationsScreen() {
  const { lang } = useLang();
  const tr = (en: string, hi: string) => (lang === "hi" ? hi : en);

  return (
    <>
      <Screen>
        <ScreenHeader
          title={tr("Notifications", "सूचनाएँ")}
          subtitle={tr("Your alerts and updates", "आपकी चेतावनियाँ और अपडेट")}
        />

        <div className="space-y-6">
          {notificationGroups.map((group) => (
            <div key={group.group.en}>
              <h2 className="mb-3 text-base font-bold text-muted-foreground">
                {tr(group.group.en, group.group.hi)}
              </h2>
              <div className="space-y-3">
                {group.items.map((item) => {
                  const Icon = typeIcons[item.type];
                  return (
                    <Card key={item.id} className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between">
                          <p className="text-base font-bold text-foreground">
                            {tr(item.title.en, item.title.hi)}
                          </p>
                          <span className="text-xs font-semibold text-muted-foreground">
                            {item.time}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {tr(item.message.en, item.message.hi)}
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Screen>
      <BottomNav />
    </>
  );
}
