import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Sprout, FlaskConical, Droplets, Bug, Users } from "lucide-react";
import { useLang, type Key } from "@/lib/i18n";

export const Route = createFileRoute("/budget")({
  head: () => ({
    meta: [
      { title: "Crop Budget Setup — MeraKeth" },
      {
        name: "description",
        content:
          "Set your estimated crop season budget and see the split across seeds, fertilizer, irrigation, pesticide and labour.",
      },
      { property: "og:title", content: "Crop Budget Setup — MeraKeth" },
      {
        property: "og:description",
        content: "Plan your crop season budget across seeds, fertilizer, irrigation and labour.",
      },
    ],
  }),
  component: BudgetScreen,
});

const presets = [5000, 10000, 15000, 25000];

const items: { key: Key; share: number; Icon: typeof Sprout }[] = [
  { key: "seeds", share: 0.25, Icon: Sprout },
  { key: "fertilizer", share: 0.25, Icon: FlaskConical },
  { key: "irrigation", share: 0.15, Icon: Droplets },
  { key: "pesticide", share: 0.15, Icon: Bug },
  { key: "labour", share: 0.2, Icon: Users },
];

function BudgetScreen() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | "custom">(10000);
  const [customValue, setCustomValue] = useState("");
  const total = selected === "custom" ? Number(customValue) || 0 : selected;
  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const saveAndContinue = () => {
    if (total > 0) window.localStorage.setItem("fs-budget", String(total));
    navigate({ to: "/dashboard" });
  };

  return (
    <main className="mx-auto w-full max-w-md px-5 pb-12 pt-8">
      <header className="mb-6 flex items-center gap-3">
        <Link
          to="/register"
          aria-label="Back"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="text-left">
          <h1 className="text-2xl font-extrabold text-foreground">{t("budgetTitle")}</h1>
          <p className="text-sm text-muted-foreground">
            {t("step")} 3 {t("of")} 3
          </p>
        </div>
      </header>

      <p className="mb-5 text-lg font-semibold leading-snug text-foreground">{t("budgetQ")}</p>

      <div className="grid grid-cols-2 gap-4">
        {presets.map((p) => {
          const active = selected === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => setSelected(p)}
              className={`h-20 rounded-2xl border-2 text-2xl font-bold transition-colors ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground"
              }`}
            >
              {inr(p)}
            </button>
          );
        })}
      </div>

      <div
        className={`mt-4 rounded-2xl border-2 p-4 ${
          selected === "custom" ? "border-primary bg-secondary" : "border-border bg-card"
        }`}
      >
        <button
          type="button"
          onClick={() => setSelected("custom")}
          className="mb-3 text-lg font-bold text-foreground"
        >
          {t("custom")}
        </button>
        <div className="flex items-center gap-2 rounded-xl border-2 border-border bg-card px-4">
          <span className="text-xl font-bold text-primary">₹</span>
          <input
            type="number"
            min="0"
            value={customValue}
            onFocus={() => setSelected("custom")}
            onChange={(e) => setCustomValue(e.target.value)}
            placeholder="20000"
            className="h-14 w-full bg-transparent text-xl text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <section className="mt-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-bold text-foreground">{t("spendPlan")}</h2>
          <span className="text-base font-semibold text-primary">
            {t("total")}: {inr(total)}
          </span>
        </div>
        <div className="space-y-3">
          {items.map(({ key, share, Icon }) => (
            <div
              key={key}
              className="flex items-center gap-4 rounded-2xl bg-card p-4"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-foreground">{t(key)}</p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${share * 100}%`, background: "var(--gradient-primary)" }}
                  />
                </div>
              </div>
              <p className="text-lg font-bold text-primary">{inr(Math.round(total * share))}</p>
            </div>
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={saveAndContinue}
        className="mt-8 flex h-16 w-full items-center justify-center rounded-2xl text-xl font-bold text-primary-foreground transition-transform active:scale-[0.98]"
        style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-card)" }}
      >
        {t("saveBudget")}
      </button>
    </main>
  );
}
