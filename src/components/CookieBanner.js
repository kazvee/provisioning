import { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import posthog from 'posthog-js';

export default function CookieBanner() {
  const { siteConfig } = useDocusaurusContext();
  const {
    posthogKey,
    posthogHost,
    umamiWebsiteId,
    umamiScriptUrl,
    cloudflareBeaconToken,
  } = siteConfig.customFields ?? {};

  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState('undecided');
  const [hovered, setHovered] = useState('');
  const [fading, setFading] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('cookie_consent') ?? 'undecided';
    setConsent(stored);
  }, []);

  const handleConsent = (value) => {
    setFading(true);
    setTimeout(() => {
      localStorage.setItem('cookie_consent', value);
      setConsent(value);
      setFading(false);

      if (value === 'yes') {
        if (!window.posthog?._initialized) {
          posthog.init(posthogKey, {
            api_host: posthogHost,
            autocapture: true,
            person_profiles: 'identified_only',
            cookie_domain: window.location.hostname,
          });
          window.posthog._initialized = true;
        }

        posthog.opt_in_capturing();
        posthog.capture('$pageview');

        if (!document.getElementById('umami-script') && umamiWebsiteId && umamiScriptUrl) {
          const umamiScript = document.createElement('script');
          umamiScript.id = 'umami-script';
          umamiScript.async = true;
          umamiScript.defer = true;
          umamiScript.setAttribute('data-website-id', umamiWebsiteId);
          umamiScript.src = umamiScriptUrl;
          document.body.appendChild(umamiScript);
        }

        if (!document.getElementById('cf-beacon') && cloudflareBeaconToken) {
          const cfScript = document.createElement('script');
          cfScript.id = 'cf-beacon';
          cfScript.defer = true;
          cfScript.src = 'https://static.cloudflareinsights.com/beacon.min.js';
          cfScript.setAttribute(
            'data-cf-beacon',
            JSON.stringify({ token: cloudflareBeaconToken })
          );
          document.body.appendChild(cfScript);
        }
      }

      if (value === 'no') {
        if (window.posthog?.opt_out_capturing) posthog.opt_out_capturing();
        const umamiScript = document.getElementById('umami-script');
        if (umamiScript) umamiScript.remove();
        const cfScript = document.getElementById('cf-beacon');
        if (cfScript) cfScript.remove();
      }
    }, 500);
  };

  if (!mounted) return null;
  if (consent !== 'undecided' && !fading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '600px',
        height: '600px',
        background: 'rgba(121, 25, 183, 0.90)',
        clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: '1rem',
        color: '#fff',
        fontFamily: "'Inter', sans-serif",
        zIndex: 1000,
        transformOrigin: 'top right',
        transform: fading
          ? 'scale(0.7) translateY(-50px)'
          : 'scale(1) translateY(0)',
        opacity: fading ? 0 : 1,
        transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
      }}
    >
      <div style={{ marginTop: '8rem', textAlign: 'right' }}>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
          This site uses cookies so I can tell if anyone even visits. 😄
        </p>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
          Please accept cookies to help me improve. ❤️
        </p>
        <p style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
          See{' '}
          <a
            href='https://kazvee.com'
            target='_blank'
            rel='noopener noreferrer'
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            main site
          </a>{' '}
          for privacy policy.
        </p>
        <div>
          <button
            aria-label='Accept cookies'
            onMouseEnter={() => setHovered('accept')}
            onMouseLeave={() => setHovered('')}
            onClick={() => handleConsent('yes')}
            style={{
              backgroundColor:
                hovered === 'accept'
                  ? 'rgba(5, 104, 5, 0.9)'
                  : 'rgba(0, 128, 0, 0.85)',
              color: '#fff',
              border: '1px solid #fff',
              borderRadius: '4px',
              padding: '0.3rem 0.6rem',
              cursor: 'pointer',
              marginRight: '0.3rem',
              fontWeight: '600',
              fontSize: '0.7rem',
              transition: 'background-color 0.2s ease',
            }}
          >
            Accept 🍪
          </button>
          <button
            aria-label='Decline cookies'
            onMouseEnter={() => setHovered('decline')}
            onMouseLeave={() => setHovered('')}
            onClick={() => handleConsent('no')}
            style={{
              backgroundColor:
                hovered === 'decline' ? 'rgba(255,255,255,0.2)' : 'transparent',
              color: '#fff',
              border: '1px solid #fff',
              borderRadius: '4px',
              padding: '0.3rem 0.6rem',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.7rem',
              transition: 'background-color 0.2s ease',
            }}
          >
            Decline ☹️
          </button>
        </div>
      </div>
    </div>
  );
}
