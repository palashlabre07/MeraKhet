import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/fasal-logo.png";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MeraKeth — Fasal Saathi Farm Assistant" },
      {
        name: "description",
        content:
          "Fasal Saathi by MeraKeth: an AI powered farm-to-market assistant for Indian farmers, in Hindi and English.",
      },
      { property: "og:title", content: "MeraKeth — Fasal Saathi Farm Assistant" },
      {
        property: "og:description",
        content: "AI powered farm-to-market assistant for Indian farmers, in Hindi and English.",
      },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const { t } = useLang();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-6 pb-10 pt-14 text-center">
      <div
        className="flex h-36 w-36 items-center justify-center rounded-3xl"
        style={{ background: "var(--gradient-soft)", boxShadow: "var(--shadow-card)" }}
      >
        <img src={logo} alt="Fasal Saathi leaf and crop logo" width={112} height={112} className="h-28 w-28" />
      </div>

      <p className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-primary">
        {t("brand")}
      </p>
      <h1 className="mt-2 text-5xl font-extrabold tracking-tight text-foreground">{t("appName")}</h1>
      <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{t("tagline")}</p>

      <div className="mt-10 w-full space-y-4">
        <Link
          to="/register"
          className="flex h-16 w-full items-center justify-center rounded-2xl text-xl font-bold text-primary-foreground transition-transform active:scale-[0.98]"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-card)" }}
        >
          {t("login")}
        </Link>
        <Link
          to="/register"
          className="flex h-16 w-full items-center justify-center rounded-2xl border-2 border-primary bg-card text-xl font-bold text-primary transition-transform active:scale-[0.98]"
        >
          {t("register")}
        </Link>
      </div>

      <div className="mt-auto pt-12">
        <p className="mb-3 text-sm font-medium text-muted-foreground">{t("chooseLanguage")}</p>
        <LanguageToggle />
      </div>
    </main>
  );
}
