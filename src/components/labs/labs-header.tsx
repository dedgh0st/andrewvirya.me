import Link from "next/link";
import ThemeSwitcher from "@/components/theme-switcher";

export default function LabsHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4">
      <nav aria-label="Labs navigation" className="flex items-center gap-2">
        <Link
          href="/"
          className="font-heading text-sm text-primary underline underline-offset-4"
        >
          andrewvirya.me
        </Link>
        <span aria-hidden="true" className="text-muted-foreground">
          /
        </span>
        <Link
          href="/labs"
          className="font-heading text-sm text-primary underline underline-offset-4"
        >
          # labs
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <p className="hidden font-mono text-xs text-muted-foreground sm:block">
          Security Awareness &amp; PoC Labs
        </p>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
