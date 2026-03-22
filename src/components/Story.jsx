import { Instagram } from 'lucide-react';
import { useEffect } from 'react';

export default function Story() {
    useEffect(() => {
        if (window.ml) {
            window.ml('show', 'EqnRnp', true);
        }
    }, []);

    return (
        <section id="story" className="section story-section">
            <div className="container">
                {/* Stay Close to the Wild Place — combined social + newsletter */}
                <div id="newsletter" style={{
                    maxWidth: '900px', margin: '0 auto',
                    background: 'rgba(255,255,255,0.6)',
                    borderRadius: '2rem',
                    border: '2px solid rgba(255,255,255,0.8)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    overflow: 'hidden'
                }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', padding: '2.5rem 2rem 1.5rem' }}>
                        <h2 className="heading-lg" style={{ marginBottom: '0.5rem' }}>Stay close to the Wild Place</h2>
                        <p style={{ color: '#475569', fontSize: '1.05rem' }}>Never miss a wild moment — follow along or join the pack.</p>
                    </div>

                    {/* Two panels */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0' }}>

                        {/* Left — Social */}
                        <div style={{
                            flex: '1', minWidth: '280px',
                            padding: '2rem 2.5rem 2.5rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎬</div>
                            <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>Behind the Scenes</h3>
                            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.75rem' }}>
                                Follow us on Instagram and TikTok for behind-the-scenes videos, clips of the real Frankie & Henry, and sneak peeks at what's coming next.
                            </p>
                            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <a
                                    href="https://www.instagram.com/frankieandhenrybooks?igsh=dDFtM3duc3BydnFt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                        background: 'linear-gradient(135deg, #f58529, #dd2a7b, #8134af)',
                                        color: 'white', borderRadius: '9999px',
                                        padding: '0.6rem 1.4rem', fontWeight: '700',
                                        textDecoration: 'none', fontSize: '0.95rem',
                                        boxShadow: '0 4px 12px rgba(221,42,123,0.35)'
                                    }}
                                >
                                    <Instagram size={18} /> Instagram
                                </a>
                                <a
                                    href="https://www.tiktok.com/@frankieandhenrybooks?_r=1&_t=ZP-93Yma6TrgfX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                        background: '#000', color: 'white', borderRadius: '9999px',
                                        padding: '0.6rem 1.4rem', fontWeight: '700',
                                        textDecoration: 'none', fontSize: '0.95rem',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
                                    }}
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                                    </svg>
                                    TikTok
                                </a>
                            </div>
                        </div>

                        {/* Divider */}
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '0 0.5rem', color: '#C07848', fontSize: '1.75rem',
                            opacity: 0.4, alignSelf: 'center'
                        }}>🐾</div>

                        {/* Right — Newsletter */}
                        <div style={{
                            flex: '1', minWidth: '280px',
                            padding: '2rem 2.5rem 2.5rem',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🐾</div>
                            <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>Stay Close to Frankie & Henry!</h3>
                            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                                Win prizes, grab freebies, and get the latest news from Frankie & Henry's adventures.
                            </p>
                            <div className="ml-embedded" data-form="EqnRnp"></div>
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.75rem' }}>We respect your privacy. Unsubscribe at any time.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
