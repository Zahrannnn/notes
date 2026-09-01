import { env } from '@/config/env';

export async function setupAxe() {
  if (!import.meta.env.DEV || !env.VITE_ENABLE_AXE) {
    return;
  }

  await runWhenIdle(async () => {
    const React = await import('react');
    const ReactDOM = await import('react-dom');
    const axe = await import('@axe-core/react');

    axe.default(React, ReactDOM, 1000);
  });
}

function runWhenIdle(callback: () => Promise<void>) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      void callback();
    });
    return;
  }

  globalThis.setTimeout(() => {
    void callback();
  }, 1500);
}
