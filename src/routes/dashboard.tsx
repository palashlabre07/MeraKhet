import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  MapPin,
  CloudSun,
  Sprout,
  Wallet,
  Leaf,
  ScanLine,
  FlaskConical,
  CloudRain,
  IndianRupee,
  Truck,
  Bot,
  Droplets,
  Thermometer,
} from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Card, Screen } from "@/components/screen";
import { useLang } from "@/lib/i18n";
import { getWeatherForecast, type WeatherData } from "@/services/weatherService";
import { getSoilHealth, type SoilHealth } from "@/services/soilService";

const BUDGET_KEY = "fs-budget";
const DEFAULT_BUDGET = 10000;
const SPENT = 3600;

function useBudgetRemaining() {
  const [remaining, setRemaining] = useState(DEFAULT_BUDGET - SPENT);
  const [budget, setBudget] = useState(DEFAULT_BUDGET);

  useEffect(() => {
    const stored = window.localStorage.getItem(BUDGET_KEY);
    if (stored) {
      const parsed = Number(stored);
      if (!Number.isNaN(parsed) && parsed > 0) {
        setBudget(parsed);
        setRemaining(Math.max(0, parsed - SPENT));
      }
    }
  }, []);

  const pct = budget > 0 ? (remaining / budget) * 100 : 0;
  return { remaining, pct };
}

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Farmer Dashboard — MeraKeth" },
      {
        name: "description",
        content:
          "Weather, soil health, crop health and budget at a glance, plus disease scanning, mandi prices and AI advisory.",
      },
      { property: "og:title", content: "Farmer Dashboard — MeraKeth" },
      {
        property: "og:description",
        content: "Weather, soil health, crop health and budget at a glance for your farm.",
      },
    ],
  }),
  component: Dashboard,
});

const services = [
  { to: "/scan", en: "Scan Crop Disease", hi: "फसल रोग स्कैन", Icon: ScanLine },
  { to: "/soil", en: "Soil Health", hi: "मिट्टी स्वास्थ्य", Icon: FlaskConical },
  { to: "/weather", en: "Weather Forecast", hi: "मौसम पूर्वानुमान", Icon: CloudRain },
  { to: "/market", en: "Mandi Prices", hi: "मंडी भाव", Icon: IndianRupee },
  { to: "/buyers", en: "Buyers & Logistics", hi: "खरीदार व परिवहन", Icon: Truck },
  { to: "/advisory", en: "AI Advisory", hi: "एआई सलाह", Icon: Bot },
] as const;

function Dashboard() {
  const { lang } = useLang();
  const tr = (en: string, hi: string) => (lang === "hi" ? hi : en);
  const { remaining, pct } = useBudgetRemaining();
  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [soil, setSoil] = useState<SoilHealth | null>(null);

  useEffect(() => {
    getWeatherForecast("Sehore, Madhya Pradesh").then((data) => setWeather(data.today));
    getSoilHealth("field-1").then((data) => setSoil(data));
  }, []);

  const moisture = soil?.metrics[0]?.value ?? "42%";
  const soilStatus = soil?.metrics[0]?.status ?? { en: "Good", hi: "अच्छी" };

  return (
    <>
      <Screen>
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-foreground">
            {tr("Namaste, Ramesh", "नमस्ते, रमेश")} 👋
          </h1>
          <p className="mt-1 flex items-center gap-1.5 text-base text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            {tr("Sehore, Madhya Pradesh", "सीहोर, मध्य प्रदेश")}
          </p>
        </header>

        <div
          className="rounded-2xl p-5 text-primary-foreground"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold opacity-90">{tr("Today's Weather", "आज का मौसम")}</p>
              <p className="mt-1 text-4xl font-extrabold">{weather?.temperature ?? 31}°C</p>
              <p className="text-sm opacity-90">
                {tr(
                  `Partly cloudy · Rain ${weather?.rainChance ?? 40}%`,
                  `आंशिक बादल · वर्षा ${weather?.rainChance ?? 40}%`,
                )}
              </p>
            </div>
            <CloudSun className="h-14 w-14 opacity-90" />
          </div>
          <div className="mt-4 flex gap-4 text-sm font-medium opacity-95">
            <span className="flex items-center gap-1">
              <Droplets className="h-4 w-4" /> {weather?.humidity ?? 68}%
            </span>
            <span className="flex items-center gap-1">
              <Thermometer className="h-4 w-4" /> {weather?.minTemp ?? 24}° / {weather?.maxTemp ?? 33}°
            </span>
            <Link to="/weather" className="ml-auto underline">
              {tr("View", "देखें")}
            </Link>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <Card>
            <Sprout className="h-7 w-7 text-primary" />
            <p className="mt-2 text-sm font-semibold text-muted-foreground">
              {tr("Soil Health", "मिट्टी स्वास्थ्य")}
            </p>
            <p className="text-2xl font-extrabold text-foreground">{tr(soilStatus.en, soilStatus.hi)}</p>
            <p className="text-xs text-muted-foreground">
              {tr(`Moisture ${moisture} · pH 6.8`, `नमी ${moisture} · pH 6.8`)}
            </p>
          </Card>
          <Card>
            <Wallet className="h-7 w-7 text-primary" />
            <p className="mt-2 text-sm font-semibold text-muted-foreground">
              {tr("Budget Remaining", "शेष बजट")}
            </p>
            <p className="text-2xl font-extrabold text-foreground">{inr(remaining)}</p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, background: "var(--gradient-primary)" }}
              />
            </div>
          </Card>
        </div>

        <Card className="mt-4 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary">
            <Leaf className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-muted-foreground">
              {tr("Crop Health Status", "फसल स्वास्थ्य")}
            </p>
            <p className="text-xl font-extrabold text-foreground">
              {tr("Healthy — Wheat", "स्वस्थ — गेहूँ")}
            </p>
          </div>
          <span className="rounded-full bg-secondary px-3 py-1 text-sm font-bold text-primary">92%</span>
        </Card>

        <h2 className="mb-3 mt-8 text-xl font-bold text-foreground">
          {tr("Services", "सेवाएँ")}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {services.map(({ to, en, hi, Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex flex-col gap-3 rounded-2xl border-2 border-transparent bg-card p-4 transition-colors active:border-primary"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-base font-bold leading-snug text-foreground">{tr(en, hi)}</span>
            </Link>
          ))}
        </div>
      </Screen>
      <BottomNav />
    </>
  );
}
