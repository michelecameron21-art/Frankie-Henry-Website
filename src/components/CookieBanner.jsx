import { useState, useEffect } from 'react';

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('fh-cookie-consent');
        if (!consent) setVisible(true);
    }, []);

    const accept = () => {
        localStorage.setItem('fh-cookie-consent', 'accepted');
        setVisible(false);
    };

    const decline = () => {
        localStorage.setItem('fh-cookie-consent', 'essential-only');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
            background: '#1e293b',
            borderTop: '3px solid #C07848',
            padding: '1.25rem 2rem',
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'space-between', gap: '1rem',
            boxShadow: '0 -4px 24px rgba(0,0,0,0.25)'
        }}>
            {/* Text */}
            <div style={{ flex: '1', minWidth: '260px' }}>
                <p style={{ color: 'white', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                    We use cookies to keep the Wild Place running smoothly and to understand how visitors use our site. Read our{' '}
                    <a href="/privacy-policy.html" style={{ color: '#C07848', fontWeight: '700' }}>
                        Privacy Policy
                    </a>{' '}
                    to find out more.
                </p>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
                <button
                    onClick={decline}
                    style={{
                        background: 'transparent', color: '#94a3b8',
                        border: '1px solid #475569', borderRadius: '9999px',
                        padding: '0.5rem 1.25rem', fontSize: '0.9rem',
                        fontWeight: '600', cursor: 'pointer', fontFamily: 'Nunito, sans-serif'
                    }}
                >
                    Essential only
                </button>
                <button
                    onClick={accept}
                    style={{
                        background: 'linear-gradient(to bottom, #C07848, #A85830)',
                        color: 'white', border: 'none', borderRadius: '9999px',
                        padding: '0.5rem 1.5rem', fontSize: '0.9rem',
                        fontWeight: '700', cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
                        boxShadow: '0 3px 8px rgba(192,120,72,0.4)'
                    }}
                >
                    Accept all
                </button>
            </div>
        </div>
    );
}
