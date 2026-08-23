import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Sprout,
  Wallet,
  History,
  ScanLine,
  Globe,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Card, Screen, ScreenHeader } from "@/components/screen";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLang } from "@/lib/i18n";
import { farmerProfile, cropHistory, scanHistory } from "@/data/farmer";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — MeraKeth" },
      {
        name: "description",
        content: "Your farmer profile, farm details, budget, crop history, scan history and settings.",
      },
      { property: "og:title", content: "Profile — MeraKeth" },
      {
        property: "og:description",
        content: "View your farmer profile, farm details, budget and history.",
      },
    ],
  }),
  component: ProfileScreen,
});

const BUDGET_KEY = "fs-budget";
const DEFAULT_BUDGET = 10000;
const SPENT = 3600;

function useBudget() {
  const [budget, setBudget] = useState(DEFAULT_BUDGET);

  useEffect(() => {
    const stored = window.localStorage.getItem(BUDGET_KEY);
    if (stored) {
      const parsed = Number(stored);
      if (!Number.isNaN(parsed) && parsed > 0) setBudget(parsed);
    }
  }, []);

  return { budget, remaining: Math.max(0, budget - SPENT), spent: SPENT };
}

function DetailRow({ Icon, label, value }: { Icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="text-base font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function MenuRow({ Icon, label, to }: { Icon: LucideIcon; label: string; to?: string }) {
  const content = (
    <div className="flex items-center gap-3 py-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <span className="flex-1 text-base font-bold text-foreground">{label}</span>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block">
        {content}
      </Link>
    );
  }
  return <div className="block">{content}</div>;
}

function ProfileScreen() {
  const { lang } = useLang();
  const tr = (en: string, hi: string) => (lang === "hi" ? hi : en);
  const { budget, remaining, spent } = useBudget();
  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <>
      <Screen>
        <ScreenHeader
          title={tr("Profile", "प्रोफ़ाइल")}
          subtitle={tr("Your account and farm details", "आपका खाता और खेत विवरण")}
        />

        <Card className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full"
            style={{ background: "var(--gradient-soft)" }}
          >
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="text-xl font-extrabold text-foreground">
              {tr(farmerProfile.name.en, farmerProfile.name.hi)}
            </p>
            <p className="text-sm text-muted-foreground">{farmerProfile.mobile}</p>
          </div>
        </Card>

        <h2 className="mb-2 mt-6 text-lg font-bold text-foreground">
          {tr("Personal Details", "व्यक्तिगत विवरण")}
        </h2>
        <Card>
          <DetailRow Icon={Phone} label={tr("Mobile", "मोबाइल")} value={farmerProfile.mobile} />
          <DetailRow Icon={Mail} label={tr("Email", "ईमेल")} value={farmerProfile.email} />
          <DetailRow
            Icon={MapPin}
            label={tr("Location", "स्थान")}
            value={`${tr(farmerProfile.village.en, farmerProfile.village.hi)}, ${tr(
              farmerProfile.district.en,
              farmerProfile.district.hi,
            )}, ${tr(farmerProfile.state.en, farmerProfile.state.hi)}`}
          />
        </Card>

        <h2 className="mb-2 mt-6 text-lg font-bold text-foreground">
          {tr("Farm Information", "खेत जानकारी")}
        </h2>
        <Card>
          <DetailRow
            Icon={Sprout}
            label={tr("Land Size", "भूमि आकार")}
            value={`${farmerProfile.landSize} ${tr(farmerProfile.landUnit.en, farmerProfile.landUnit.hi)}`}
          />
          <DetailRow
            Icon={Sprout}
            label={tr("Primary Crop", "मुख्य फसल")}
            value={tr(farmerProfile.primaryCrop.en, farmerProfile.primaryCrop.hi)}
          />
        </Card>

        <h2 className="mb-2 mt-6 text-lg font-bold text-foreground">
          {tr("Budget Summary", "बजट सारांश")}
        </h2>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-muted-foreground">
                {tr("Total Budget", "कुल बजट")}
              </p>
              <p className="text-2xl font-extrabold text-foreground">{inr(budget)}</p>
            </div>
          </div>
          <div className="mt-3 flex justify-between text-sm font-semibold">
            <span className="text-muted-foreground">
              {tr("Spent", "खर्च")}: {inr(spent)}
            </span>
            <span className="text-primary">
              {tr("Remaining", "शेष")}: {inr(remaining)}
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full"
              style={{
                width: `${budget > 0 ? (remaining / budget) * 100 : 0}%`,
                background: "var(--gradient-primary)",
              }}
            />
          </div>
        </Card>

        <h2 className="mb-2 mt-6 text-lg font-bold text-foreground">
          {tr("Crop History", "फसल इतिहास")}
        </h2>
        <Card>
          {cropHistory.map((c, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 py-2 ${
                i < cropHistory.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <History className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-base font-bold text-foreground">{tr(c.crop.en, c.crop.hi)}</p>
                <p className="text-xs text-muted-foreground">
                  {tr(c.season.en, c.season.hi)} · {c.area}{" "}
                  {tr(farmerProfile.landUnit.en, farmerProfile.landUnit.hi)} · {c.yield} qt
                </p>
              </div>
              <p className="text-sm font-bold text-primary">{inr(c.revenue)}</p>
            </div>
          ))}
        </Card>

        <h2 className="mb-2 mt-6 text-lg font-bold text-foreground">
          {tr("Disease Scan History", "रोग स्कैन इतिहास")}
        </h2>
        <Card>
          {scanHistory.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 py-2 ${
                i < scanHistory.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <ScanLine className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-base font-bold text-foreground">
                  {tr(s.disease.en, s.disease.hi)}
                </p>
                <p className="text-xs text-muted-foreground">{s.date}</p>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-sm font-bold text-primary">
                {s.confidence}%
              </span>
            </div>
          ))}
        </Card>

        <h2 className="mb-2 mt-6 text-lg font-bold text-foreground">
          {tr("Language Settings", "भाषा सेटिंग्स")}
        </h2>
        <Card className="flex items-center justify-between">
          <p className="flex items-center gap-3 text-base font-bold text-foreground">
            <Globe className="h-5 w-5 text-primary" /> {tr("App Language", "ऐप भाषा")}
          </p>
          <LanguageToggle />
        </Card>

        <h2 className="mb-2 mt-6 text-lg font-bold text-foreground">{tr("More", "और")}</h2>
        <Card className="divide-y divide-border">
          <MenuRow Icon={HelpCircle} label={tr("Help Center", "सहायता केंद्र")} />
          <MenuRow Icon={Info} label={tr("About", "परिचय")} />
          <MenuRow Icon={LogOut} label={tr("Logout", "लॉगआउट")} />
        </Card>
      </Screen>
      <BottomNav />
    </>
  );
}
