import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Droplets, Leaf, FlaskConical, Sprout, Thermometer, Waves, type LucideIcon } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Card, Screen, ScreenHeader } from "@/components/screen";
import { useLang } from "@/lib/i18n";
import { getSoilHealth, type SoilHealth } from "@/services/soilService";

export const Route = createFileRoute("/soil")({
  head: () => ({
    meta: [
      { title: "Soil Health — MeraKeth" },
      {
        name: "description",
        content: "Live soil moisture, nitrogen, phosphorus, potassium and temperature with irrigation advice.",
      },
      { property: "og:title", content: "Soil Health — MeraKeth" },
      {
        property: "og:description",
        content: "Soil moisture, NPK levels and irrigation recommendation for your field.",
      },
    ],
  }),
  component: SoilScreen,
});

const iconMap: Record<string, LucideIcon> = {
  Droplets,
  Leaf,
  FlaskConical,
  Sprout,
  Thermometer,
};

function SoilScreen() {
  const { lang } = useLang();
  const tr = (en: string, hi: string) => (lang === "hi" ? hi : en);
  const [soil, setSoil] = useState<SoilHealth | null>(null);

  useEffect(() => {
    getSoilHealth("field-1").then(setSoil);
  }, []);

  const metrics = (soil?.metrics ?? []).map((m) => ({
    en: m.label.en,
    hi: m.label.hi,
    value: m.value,
    pct: m.pct,
    status: tr(m.status.en, m.status.hi),
    Icon: iconMap[m.icon] ?? Droplets,
  }));

  return (
    <>
      <Screen>
        <ScreenHeader
          title={tr("Soil Health", "मिट्टी स्वास्थ्य")}
          subtitle={tr(soil?.fieldLabel.en ?? "Field 1 · Wheat · Updated 2h ago", soil?.fieldLabel.hi ?? "खेत 1 · गेहूँ · 2 घंटे पहले")}
        />

        <div className="space-y-3">
          {metrics.map(({ en, hi, value, pct, status, Icon }) => (
            <Card key={en} className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between">
                  <p className="text-base font-bold text-foreground">{tr(en, hi)}</p>
                  <p className="text-lg font-extrabold text-primary">{value}</p>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: "var(--gradient-primary)" }}
                  />
                </div>
                <p className="mt-1 text-xs font-semibold text-muted-foreground">{status}</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-6 border-2 border-primary">
          <p className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Waves className="h-5 w-5 text-primary" /> {tr("Irrigation Recommendation", "सिंचाई सलाह")}
          </p>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            {tr(
              soil?.recommendation.en ??
                "Moisture is sufficient today. Rain is likely tomorrow — delay irrigation by 2 days, then give a light 25 mm watering in the evening.",
              soil?.recommendation.hi ??
                "आज नमी पर्याप्त है। कल वर्षा संभव है — सिंचाई 2 दिन टालें, फिर शाम को हल्की 25 मिमी सिंचाई करें।",
            )}
          </p>
        </Card>
      </Screen>
      <BottomNav />
    </>
  );
}
