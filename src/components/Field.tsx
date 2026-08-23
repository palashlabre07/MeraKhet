import type { ReactNode } from "react";

export function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-base font-semibold text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

export const fieldClass =
  "w-full rounded-xl border-2 border-border bg-card px-4 py-3.5 text-lg text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";
