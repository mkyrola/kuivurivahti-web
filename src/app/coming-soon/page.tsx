'use client';

import { useEffect, useState, useCallback } from 'react';

/* ─── Launch: 31.3.2026 12:00 EEST (UTC+3) = 09:00 UTC ─── */
const LAUNCH_TS = new Date('2026-03-31T09:00:00Z').getTime();
const BYPASS_COOKIE = 'kv_preview';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function getTimeLeft(): TimeLeft {
  const total = Math.max(0, LAUNCH_TS - Date.now());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / 1000 / 60 / 60) % 24);
  const days = Math.floor(total / 1000 / 60 / 60 / 24);
  return { days, hours, minutes, seconds, total };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function setBypassCookie() {
  document.cookie = `${BYPASS_COOKIE}=1; Path=/; Max-Age=2592000; SameSite=Lax`;
}

interface TileProps {
  value: number;
  label: string;
}

function Tile({ value, label }: TileProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="tabular-nums"
        style={{
          fontFamily: 'var(--font-jetbrains), JetBrains Mono, monospace',
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.92)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          minWidth: '2ch',
          textAlign: 'center',
        }}
      >
        {pad(value)}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-jetbrains), JetBrains Mono, monospace',
          fontSize: '0.6rem',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div
      style={{
        fontFamily: 'var(--font-jetbrains), JetBrains Mono, monospace',
        fontSize: 'clamp(2rem, 6vw, 4rem)',
        fontWeight: 700,
        color: 'rgba(245,100,30,0.6)',
        lineHeight: 1,
        marginBottom: '1.4rem',
        userSelect: 'none',
      }}
    >
      :
    </div>
  );
}

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [entering, setEntering] = useState(false);

  /* ─── Countdown tick ─── */
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  /* ─── Redirect if past launch ─── */
  useEffect(() => {
    if (timeLeft.total === 0) {
      window.location.href = '/';
    }
  }, [timeLeft.total]);

  /* ─── Open modal on any click ─── */
  const handlePageClick = useCallback(() => {
    if (!showModal) setShowModal(true);
  }, [showModal]);

  /* ─── Credential check ─── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Kuivurivahti2026' && password === 'kevät2026!') {
      setBypassCookie();
      setEntering(true);
      setTimeout(() => { window.location.href = '/'; }, 500);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  const launched = timeLeft.total === 0;

  return (
    <div
      onClick={handlePageClick}
      style={{
        minHeight: '100dvh',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        cursor: showModal ? 'default' : 'pointer',
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient orange glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(245,100,30,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Wordmark */}
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-space-grotesk), sans-serif',
          fontSize: 'clamp(0.8rem, 2vw, 1rem)',
          fontWeight: 700,
          letterSpacing: '0.25em',
          color: 'rgba(255,255,255,0.9)',
        }}>
          SEEMOTO{' '}
          <span style={{ color: '#F5641E' }}>KUIVURIVAHTI</span>
        </div>
      </div>

      {/* Label */}
      <div style={{
        fontFamily: 'var(--font-jetbrains), monospace',
        fontSize: '0.6rem',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.2)',
        marginBottom: '1.5rem',
      }}>
        {launched ? 'Julkaistu' : 'Julkistus'}
      </div>

      {/* Countdown tiles */}
      {!launched && (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'clamp(0.5rem, 2vw, 1.5rem)' }}>
          <Tile value={timeLeft.days} label="päivää" />
          <Separator />
          <Tile value={timeLeft.hours} label="tuntia" />
          <Separator />
          <Tile value={timeLeft.minutes} label="min" />
          <Separator />
          <Tile value={timeLeft.seconds} label="sek" />
        </div>
      )}

      {/* Launch date line */}
      <div style={{
        marginTop: '2rem',
        fontFamily: 'var(--font-jetbrains), monospace',
        fontSize: '0.65rem',
        letterSpacing: '0.15em',
        color: 'rgba(255,255,255,0.15)',
      }}>
        31.3.2026 · 12:00 EEST
      </div>

      {/* Prompt */}
      {!showModal && (
        <div style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-jetbrains), monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.18)',
          animation: 'csPromptPulse 3s ease-in-out infinite',
          whiteSpace: 'nowrap',
        }}>
          Paina jatkaaksesi →
        </div>
      )}

      {/* ─── Modal ─── */}
      {showModal && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            zIndex: 50,
            opacity: entering ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div
            style={{
              background: 'rgba(13,21,32,0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '1.25rem',
              padding: '2.5rem 2rem',
              maxWidth: '360px',
              width: '100%',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(245,100,30,0.06)',
              animation: shake ? 'csShake 0.5s cubic-bezier(0.36,0.07,0.19,0.97)' : 'none',
            }}
          >
            {/* Modal header */}
            <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: 'rgba(255,255,255,0.9)',
              }}>
                SEEMOTO <span style={{ color: '#F5641E' }}>KUIVURIVAHTI</span>
              </div>
              <div style={{
                marginTop: '0.5rem',
                fontFamily: 'var(--font-jetbrains), monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
              }}>
                Anna tunnukset jatkaaksesi
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <input
                autoFocus
                type="text"
                placeholder="Käyttäjänimi"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(false); }}
                autoComplete="username"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${error ? 'rgba(230,57,70,0.6)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1rem',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-jetbrains), monospace',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
              />
              <input
                type="password"
                placeholder="Salasana"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                autoComplete="current-password"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${error ? 'rgba(230,57,70,0.6)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1rem',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-jetbrains), monospace',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
              />

              {/* Error message */}
              {error && (
                <div style={{
                  fontFamily: 'var(--font-jetbrains), monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  color: 'rgba(230,57,70,0.9)',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}>
                  Väärät tunnukset
                </div>
              )}

              <button
                type="submit"
                style={{
                  marginTop: '0.5rem',
                  width: '100%',
                  background: 'linear-gradient(135deg, #F5641E, rgba(232,197,71,0.8))',
                  border: 'none',
                  borderRadius: '0.75rem',
                  padding: '0.875rem 1.5rem',
                  color: '#fff',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                  transition: 'filter 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.12)')}
                onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
              >
                Jatka →
              </button>
            </form>

            {/* Cancel */}
            <button
              onClick={() => { setShowModal(false); setError(false); setUsername(''); setPassword(''); }}
              style={{
                display: 'block',
                width: '100%',
                marginTop: '0.875rem',
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.2)',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-jetbrains), monospace',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                textAlign: 'center',
                padding: '0.5rem',
              }}
            >
              Peruuta
            </button>
          </div>
        </div>
      )}

      {/* Keyframes injected via style tag */}
      <style>{`
        @keyframes csPromptPulse {
          0%, 100% { opacity: 0.18; }
          50% { opacity: 0.45; }
        }
        @keyframes csShake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-6px); }
          40%, 60% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
