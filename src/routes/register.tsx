import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Field, fieldClass } from "@/components/Field";
import { crops, useLang } from "@/lib/i18n";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Farmer Registration — MeraKeth" },
      {
        name: "description",
        content: "Register as a farmer on MeraKeth with your village, land size and primary crop.",
      },
      { property: "og:title", content: "Farmer Registration — MeraKeth" },
      {
        property: "og:description",
        content: "Register as a farmer on MeraKeth with your village, land size and primary crop.",
      },
    ],
  }),
  component: RegisterScreen,
});

const states = [
  "Andhra Pradesh",
  "Bihar",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Madhya Pradesh",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Uttar Pradesh",
  "West Bengal",
];

function RegisterScreen() {
  const { t, lang } = useLang();
  const navigate = useNavigate();
  const [unit, setUnit] = useState<"acres" | "hectares">("acres");

  return (
    <main className="mx-auto w-full max-w-md px-5 pb-12 pt-8">
      <header className="mb-6 flex items-center gap-3">
        <Link
          to="/"
          aria-label="Back"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="text-left">
          <h1 className="text-2xl font-extrabold text-foreground">{t("regTitle")}</h1>
          <p className="text-sm text-muted-foreground">{t("regSub")}</p>
        </div>
      </header>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/budget" });
        }}
      >
        <Field label={t("farmerName")} htmlFor="name">
          <input id="name" required className={fieldClass} placeholder="Ramesh Kumar" />
        </Field>
        <Field label={t("mobile")} htmlFor="mobile">
          <input
            id="mobile"
            type="tel"
            required
            inputMode="numeric"
            className={fieldClass}
            placeholder="98765 43210"
          />
        </Field>
        <Field label={t("email")} htmlFor="email">
          <input id="email" type="email" className={fieldClass} placeholder="name@email.com" />
        </Field>
        <Field label={t("password")} htmlFor="password">
          <input id="password" type="password" required className={fieldClass} placeholder="••••••" />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label={t("state")} htmlFor="state">
            <select id="state" required defaultValue="" className={fieldClass}>
              <option value="" disabled>
                {t("select")}
              </option>
              {states.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label={t("district")} htmlFor="district">
            <input id="district" required className={fieldClass} />
          </Field>
        </div>

        <Field label={t("village")} htmlFor="village">
          <input id="village" required className={fieldClass} />
        </Field>

        <Field label={t("landSize")} htmlFor="land">
          <div className="flex gap-3">
            <input
              id="land"
              type="number"
              min="0"
              step="0.1"
              required
              className={`${fieldClass} flex-1`}
              placeholder="2.5"
            />
            <div className="flex rounded-xl border-2 border-border bg-card p-1">
              {(["acres", "hectares"] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={`rounded-lg px-3 text-sm font-semibold ${
                    unit === u ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {u === "acres" ? t("acres") : t("hectares")}
                </button>
              ))}
            </div>
          </div>
        </Field>

        <Field label={t("primaryCrop")} htmlFor="crop">
          <select id="crop" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              {t("select")}
            </option>
            {crops.map((c) => (
              <option key={c.en} value={c.en}>
                {lang === "hi" ? `${c.hi} (${c.en})` : c.en}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t("preferredLanguage")} htmlFor="lng">
          <select id="lng" className={fieldClass} defaultValue={lang === "hi" ? "हिन्दी" : "English"}>
            <option>English</option>
            <option>हिन्दी</option>
          </select>
        </Field>

        <button
          type="submit"
          className="mt-2 flex h-16 w-full items-center justify-center rounded-2xl text-xl font-bold text-primary-foreground transition-transform active:scale-[0.98]"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-card)" }}
        >
          {t("continueBtn")}
        </button>
      </form>
    </main>
  );
}
