import { useEffect } from 'react';
import CookieBanner from '@site/src/components/CookieBanner';

export default function Root({ children }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!window.posthog) {
      const script = document.createElement('script');
      script.src = 'https://us-assets.i.posthog.com/static/array.js';
      script.async = true;
      document.head.appendChild(script);

      window.posthog = window.posthog || [];
    }
  }, []);

  return (
    <>
      {children}
      <CookieBanner />
    </>
  )
}
