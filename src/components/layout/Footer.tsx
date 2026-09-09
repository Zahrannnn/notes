export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-slate-500">
        <span>
          © {new Date().getFullYear()} Mohamed Osama Zahran, built in public with React, TypeScript,
          and Tailwind.
        </span>
        <nav aria-label="Identity links" className="flex flex-wrap gap-4">
          <a href="https://mzahran.tech" className="hover:text-gold-ink dark:hover:text-gold">
            Portfolio
          </a>
          <a
            href="https://resume.mzahran.tech"
            className="hover:text-gold-ink dark:hover:text-gold"
          >
            Resume
          </a>
          <a
            href="https://github.com/Zahrannnn"
            className="hover:text-gold-ink dark:hover:text-gold"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
