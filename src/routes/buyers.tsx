import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Phone, MapPin, Navigation } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Card, Screen, ScreenHeader } from "@/components/screen";
import { useLang } from "@/lib/i18n";
import { buyers } from "@/data/buyers";

export const Route = createFileRoute("/buyers")({
  head: () => ({
    meta: [
      { title: "Buyers & Logistics — MeraKeth" },
      {
        name: "description",
        content: "Find buyers for your crop with price offered, distance, contact and directions.",
      },
      { property: "og:title", content: "Buyers & Logistics — MeraKeth" },
      {
        property: "og:description",
        content: "Connect with crop buyers near you and get the best price for your harvest.",
      },
    ],
  }),
  component: BuyersScreen,
});

const filterChips = [
  { en: "All", hi: "सभी", crop: "" },
  { en: "Wheat", hi: "गेहूँ", crop: "Wheat" },
  { en: "Soybean", hi: "सोयाबीन", crop: "Soybean" },
  { en: "Rice", hi: "चावल", crop: "Rice" },
  { en: "Cotton", hi: "कपास", crop: "Cotton" },
  { en: "Maize", hi: "मक्का", crop: "Maize" },
];

function BuyersScreen() {
  const { lang } = useLang();
  const tr = (en: string, hi: string) => (lang === "hi" ? hi : en);
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState("");

  const filtered = buyers.filter((b) => {
    const matchesQuery =
      b.name.en.toLowerCase().includes(query.toLowerCase()) ||
      b.name.hi.includes(query) ||
      b.crop.en.toLowerCase().includes(query.toLowerCase()) ||
      b.crop.hi.includes(query);
    const matchesChip = activeChip === "" || b.crop.en === activeChip;
    return matchesQuery && matchesChip;
  });

  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <>
      <Screen>
        <ScreenHeader
          title={tr("Buyers & Logistics", "खरीदार व परिवहन")}
          subtitle={tr("Connect with buyers near you", "अपने पास खरीदार से जुड़ें")}
        />

        <div className="mb-4 flex items-center gap-2 rounded-xl border-2 border-border bg-card px-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tr("Search crop or buyer...", "फसल या खरीदार खोजें...")}
            className="h-12 w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {filterChips.map((chip) => {
            const active = activeChip === chip.crop;
            return (
              <button
                key={chip.en}
                type="button"
                onClick={() => setActiveChip(chip.crop)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "border-2 border-border bg-card text-muted-foreground"
                }`}
              >
                {tr(chip.en, chip.hi)}
              </button>
            );
          })}
        </div>

        <div className="space-y-3">
          {filtered.map((b) => (
            <Card key={b.name.en}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-lg font-bold text-foreground">{tr(b.name.en, b.name.hi)}</p>
                  <p className="text-sm font-semibold text-primary">
                    {tr(b.crop.en, b.crop.hi)} · {inr(b.priceOffered)}/quintal
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" /> {b.distanceKm} km {tr("away", "दूर")}
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <a
                  href={`tel:${b.phone.replace(/\s/g, "")}`}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-primary bg-card text-base font-bold text-primary transition-transform active:scale-[0.98]"
                >
                  <Phone className="h-5 w-5" /> {tr("Contact", "संपर्क")}
                </a>
                <button
                  type="button"
                  className="flex h-12 items-center justify-center gap-2 rounded-xl text-base font-bold text-primary-foreground transition-transform active:scale-[0.98]"
                  style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-card)" }}
                >
                  <Navigation className="h-5 w-5" /> {tr("Directions", "रास्ता")}
                </button>
              </div>
            </Card>
          ))}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-base font-semibold text-muted-foreground">
              {tr("No buyers found", "कोई खरीदार नहीं मिला")}
            </p>
          )}
        </div>
      </Screen>
      <BottomNav />
    </>
  );
}
