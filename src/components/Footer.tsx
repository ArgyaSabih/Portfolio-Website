import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-ink-sunken">
      <div className="mx-auto flex max-w-shell flex-col-reverse items-start gap-8 px-[var(--gutter)] py-10 sm:flex-row sm:items-center sm:justify-between md:py-12">
        <p className="font-mono text-xs tracking-[0.08em] text-paper-faint">
          © 2026 - Argya Sabih
        </p>
        <SocialIcons />
      </div>
    </footer>
  );
}
