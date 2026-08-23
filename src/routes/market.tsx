import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Clock,
  CalendarCheck,
} from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Card, Screen, ScreenHeader } from "@/components/screen";
import { useLang } from "@/lib/i18n";
import { marketPrices, sellRecommendation, type Trend } from "@/data/market";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Mandi Prices — MeraKeth" },
      {
        name: "description",
        content:
          "Live mandi prices for wheat, soybean, rice, cotton, maize and onion with trend and best day to sell.",
      },
      { property: "og:title", content: "Mandi Prices — MeraKeth" },
      {
        property: "og:description",
        content: "Check today's mandi prices and find the best day to sell your crop.",
      },
    ],
  }),
  component: MarketScreen,
});

const locations = [
  { en: "Sehore, Madhya Pradesh", hi: "सीहोर, मध्य प्रदेश" },
  { en: "Bhopal, Madhya Pradesh", hi: "भोपाल, मध्य प्रदेश" },
  { en: "Indore, Madhya Pradesh", hi: "इंदौर, मध्य प्रदेश" },
];

function TrendIcon({ trend }: { trend: Trend }) {
  if (trend === "up") return <TrendingUp className="h-5 w-5 text-primary" />;
  if (trend === "down") return <TrendingDown className="h-5 w-5 text-destructive" />;
  return <Minus className="h-5 w-5 text-muted-foreground" />;
}

function MarketScreen() {
  const { lang } = useLang();
  const tr = (en: string, hi: string) => (lang === "hi" ? hi : en);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState(0);

  const filtered = marketPrices.filter(
    (p) =>
      p.crop.en.toLowerCase().includes(query.toLowerCase()) || p.crop.hi.includes(query),
  );

  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <>
      <Screen>
        <ScreenHeader
          title={tr("Mandi Prices", "मंडी भाव")}
          subtitle={tr("Today's crop prices near you", "आपके पास आज के फसल भाव")}
        />

        <div className="mb-4 flex items-center gap-2 rounded-xl border-2 border-border bg-card px-4">
          <MapPin className="h-5 w-5 shrink-0 text-primary" />
          <select
            value={location}
            onChange={(e) => setLocation(Number(e.target.value))}
            className="h-12 w-full bg-transparent text-base font-semibold text-foreground outline-none"
          >
            {locations.map((loc, i) => (
              <option key={loc.en} value={i}>
                {tr(loc.en, loc.hi)}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5 flex items-center gap-2 rounded-xl border-2 border-border bg-card px-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tr("Search crop...", "फसल खोजें...")}
            className="h-12 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="space-y-3">
          {filtered.map((p) => {
            const diff = p.todayPrice - p.yesterdayPrice;
            return (
              <Card key={p.crop.en}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-bold text-foreground">{tr(p.crop.en, p.crop.hi)}</p>
                    <p className="text-sm text-muted-foreground">
                      {tr(p.market.en, p.market.hi)}
                    </p>
                  </div>
                  <TrendIcon trend={p.trend} />
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-extrabold text-primary">
                      {inr(p.todayPrice)}
                      <span className="text-sm font-semibold text-muted-foreground">/quintal</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {tr("Yesterday", "कल")}: {inr(p.yesterdayPrice)}
                      {diff !== 0 && (
                        <span className={diff > 0 ? "text-primary" : "text-destructive"}>
                          {" "}
                          ({diff > 0 ? "+" : ""}
                          {inr(diff)})
                        </span>
                      )}
                    </p>
                  </div>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" /> {p.updatedAt}
                  </p>
                </div>
              </Card>
            );
          })}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-base font-semibold text-muted-foreground">
              {tr("No crops found", "कोई फसल नहीं मिली")}
            </p>
          )}
        </div>

        <Card className="mt-6 border-2 border-primary">
          <p className="flex items-center gap-2 text-lg font-bold text-foreground">
            <CalendarCheck className="h-5 w-5 text-primary" />{" "}
            {tr("Best Day to Sell", "बिक्री का सर्वोत्तम दिन")}
          </p>
          <p className="mt-2 text-base font-semibold text-primary">
            {tr(sellRecommendation.crop.en, sellRecommendation.crop.hi)} —{" "}
            {tr(sellRecommendation.day.en, sellRecommendation.day.hi)}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {tr(sellRecommendation.reason.en, sellRecommendation.reason.hi)}
          </p>
        </Card>
      </Screen>
      <BottomNav />
    </>
  );
}
