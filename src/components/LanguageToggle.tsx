import { useLang } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-sm">
      {(
        [
          { id: "en", label: "English" },
          { id: "hi", label: "हिन्दी" },
        ] as const
      ).map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => setLang(o.id)}
          className={`rounded-full px-5 py-2 text-base font-semibold transition-colors ${
            lang === o.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
