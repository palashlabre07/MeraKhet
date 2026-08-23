import { createFileRoute } from "@tanstack/react-router";
import {
  Landmark,
  FlaskConical,
  ShieldCheck,
  CreditCard,
  Sprout,
  CloudRain,
  Bug,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Card, Screen, ScreenHeader } from "@/components/screen";
import { useLang } from "@/lib/i18n";
import { schemes, advisoryAlerts, farmingTips } from "@/data/advisory";

export const Route = createFileRoute("/advisory")({
  head: () => ({
    meta: [
      { title: "AI Advisory & Schemes — MeraKeth" },
      {
        name: "description",
        content:
          "Government schemes, weather advisory, pest alerts and daily farming recommendations.",
      },
      { property: "og:title", content: "AI Advisory & Schemes — MeraKeth" },
      {
        property: "og:description",
        content: "Explore government schemes and get daily farming advisory.",
      },
    ],
  }),
  component: AdvisoryScreen,
});

const iconMap: Record<string, LucideIcon> = {
  Landmark,
  FlaskConical,
  ShieldCheck,
  CreditCard,
  Sprout,
  CloudRain,
  Bug,
};

function AdvisoryScreen() {
  const { lang } = useLang();
  const tr = (en: string, hi: string) => (lang === "hi" ? hi : en);

  return (
    <>
      <Screen>
        <ScreenHeader
          title={tr("Advisory & Schemes", "सलाह व योजनाएँ")}
          subtitle={tr("Government schemes and farming tips", "सरकारी योजनाएँ और खेती सलाह")}
        />

        <h2 className="mb-3 text-lg font-bold text-foreground">
          {tr("Government Schemes", "सरकारी योजनाएँ")}
        </h2>
        <div className="space-y-3">
          {schemes.map((s) => {
            const Icon = iconMap[s.Icon] ?? Landmark;
            return (
              <Card key={s.id}>
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-foreground">{tr(s.title.en, s.title.hi)}</p>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      {tr("Eligibility", "पात्रता")}
                    </p>
                    <p className="text-sm leading-relaxed text-foreground">
                      {tr(s.eligibility.en, s.eligibility.hi)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      {tr("Benefits", "लाभ")}
                    </p>
                    <p className="text-sm leading-relaxed text-foreground">
                      {tr(s.benefits.en, s.benefits.hi)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center gap-2 rounded-xl text-base font-bold text-primary-foreground transition-transform active:scale-[0.98]"
                    style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-card)" }}
                  >
                    {tr("Apply", "आवेदन")}
                  </button>
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-primary bg-card text-base font-bold text-primary transition-transform active:scale-[0.98]"
                  >
                    {tr("Read More", "और पढ़ें")} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

        <h2 className="mb-3 mt-8 text-lg font-bold text-foreground">
          {tr("Alerts", "चेतावनियाँ")}
        </h2>
        <div className="space-y-3">
          {advisoryAlerts.map((a, i) => {
            const Icon = iconMap[a.Icon] ?? CloudRain;
            return (
              <Card key={i} className="border-2 border-primary">
                <p className="flex items-center gap-2 text-lg font-bold text-foreground">
                  <Icon className="h-5 w-5 text-primary" /> {tr(a.title.en, a.title.hi)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {tr(a.message.en, a.message.hi)}
                </p>
              </Card>
            );
          })}
        </div>

        <h2 className="mb-3 mt-8 text-lg font-bold text-foreground">
          {tr("Today's Recommendations", "आज की सिफारिशें")}
        </h2>
        <div className="space-y-3">
          {farmingTips.map((tip, i) => (
            <Card key={i}>
              <p className="flex items-center gap-2 text-base font-bold text-foreground">
                <Lightbulb className="h-5 w-5 text-primary" /> {tr(tip.title.en, tip.title.hi)}
              </p>
              <p className="mt-1 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {tr(tip.message.en, tip.message.hi)}
              </p>
            </Card>
          ))}
        </div>
      </Screen>
      <BottomNav />
    </>
  );
}
