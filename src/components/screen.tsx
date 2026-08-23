import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function ScreenHeader({
  title,
  subtitle,
  backTo = "/dashboard",
}: {
  title: string;
  subtitle?: string;
  backTo?: string;
}) {
  return (
    <header className="mb-6 flex items-center gap-3">
      <Link
        to={backTo}
        aria-label="Back"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-foreground"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>
      <div className="text-left">
        <h1 className="text-2xl font-extrabold leading-tight text-foreground">{title}</h1>
        {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
    </header>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-card p-4 ${className}`}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {children}
    </div>
  );
}

export function Screen({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-md px-5 pb-28 pt-8">
      {children}
    </main>
  );
}
