import { FOOTER, SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--color-raven-950)] py-12">
      <div className="container-xp flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-display text-lg font-black tracking-wider text-white">RAVENBALL</span>
          <p className="mt-2 max-w-sm text-sm text-white/50">{FOOTER.body}</p>
        </div>
        <div className="text-sm text-white/50">
          <p>{FOOTER.location}</p>
          <p>{FOOTER.email}</p>
        </div>
      </div>
      <div className="container-xp mt-8 border-t border-white/10 pt-6 text-xs text-white/40">
        © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados. Por mujeres, para mujeres.
      </div>
    </footer>
  );
}
