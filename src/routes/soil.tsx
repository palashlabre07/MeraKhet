import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Leaf, FlaskConical, Sprout, Thermometer, Waves } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Card, Screen, ScreenHeader } from "@/components/screen";
import { useLang } from "@/lib/i18n";

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

function SoilScreen() {
  const { lang } = useLang();
  const tr = (en: string, hi: string) => (lang === "hi" ? hi : en);

  const metrics = [
    { en: "Soil Moisture", hi: "मिट्टी की नमी", value: "42%", pct: 42, status: tr("Optimal", "उपयुक्त"), Icon: Droplets },
    { en: "Nitrogen (N)", hi: "नाइट्रोजन (N)", value: "268 kg/ha", pct: 72, status: tr("Good", "अच्छा"), Icon: Leaf },
    { en: "Phosphorus (P)", hi: "फॉस्फोरस (P)", value: "18 kg/ha", pct: 38, status: tr("Low", "कम"), Icon: FlaskConical },
    { en: "Potassium (K)", hi: "पोटैशियम (K)", value: "210 kg/ha", pct: 65, status: tr("Good", "अच्छा"), Icon: Sprout },
    { en: "Soil Temperature", hi: "मिट्टी का तापमान", value: "27°C", pct: 60, status: tr("Normal", "सामान्य"), Icon: Thermometer },
  ];

  return (
    <>
      <Screen>
        <ScreenHeader
          title={tr("Soil Health", "मिट्टी स्वास्थ्य")}
          subtitle={tr("Field 1 · Wheat · Updated 2h ago", "खेत 1 · गेहूँ · 2 घंटे पहले")}
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
              "Moisture is sufficient today. Rain is likely tomorrow — delay irrigation by 2 days, then give a light 25 mm watering in the evening.",
              "आज नमी पर्याप्त है। कल वर्षा संभव है — सिंचाई 2 दिन टालें, फिर शाम को हल्की 25 मिमी सिंचाई करें।",
            )}
          </p>
        </Card>
      </Screen>
      <BottomNav />
    </>
  );
}
