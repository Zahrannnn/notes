export function Footer() {
  return (
    <footer className="border-t border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm text-slate-500">
        <span>
          © {new Date().getFullYear()} Mohamed Osama Zahran — built in public, React + TypeScript +
          Tailwind.
        </span>
        <nav aria-label="Identity links" className="flex flex-wrap gap-4">
          <a href="https://mzahran.tech" className="hover:text-sky-300">
            Portfolio
          </a>
          <a href="https://resume.mzahran.tech" className="hover:text-sky-300">
            Resume
          </a>
          <a href="https://github.com/Zahrannnn" className="hover:text-sky-300">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
