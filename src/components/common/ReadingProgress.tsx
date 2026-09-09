import { useEffect, useState } from 'react';

type ReadingProgressProps = {
  /** id of the element whose scroll progress is tracked */
  targetId: string;
};

/**
 * Scroll-linked progress bar for long-form posts.
 * Transform-only (scaleX), no transitions: safe under prefers-reduced-motion.
 */
export function ReadingProgress({ targetId }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    function update() {
      raf = 0;
      const el = document.getElementById(targetId);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(scrolled / total);
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [targetId]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-slate-200/60 dark:bg-slate-800/60"
    >
      <div
        className="h-full origin-left bg-gold-ink dark:bg-gold"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
