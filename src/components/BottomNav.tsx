import { Link } from "@tanstack/react-router";
import { Home, ScanLine, Store, Bell, User } from "lucide-react";
import { useLang } from "@/lib/i18n";

const items = [
  { to: "/dashboard", en: "Home", hi: "होम", Icon: Home },
  { to: "/scan", en: "Scan", hi: "स्कैन", Icon: ScanLine },
  { to: "/market", en: "Market", hi: "मंडी", Icon: Store },
  { to: "/notifications", en: "Alerts", hi: "सूचना", Icon: Bell },
  { to: "/profile", en: "Profile", hi: "प्रोफ़ाइल", Icon: User },
] as const;

export function BottomNav() {
  const { lang } = useLang();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card">
      <div className="mx-auto flex w-full max-w-md items-stretch justify-between px-2 py-2">
        {items.map(({ to, en, hi, Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-muted-foreground transition-colors data-[status=active]:text-primary"
            activeProps={{ className: "bg-secondary" }}
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs font-semibold">{lang === "hi" ? hi : en}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
