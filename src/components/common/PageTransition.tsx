import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

export function PageTransition({ children }: PropsWithChildren) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={false}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
