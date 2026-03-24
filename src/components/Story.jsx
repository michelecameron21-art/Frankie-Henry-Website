import { Instagram, Film, Mail } from 'lucide-react';
import { useEffect } from 'react';

export default function Story() {
    useEffect(() => {
        if (!document.getElementById('ml-webforms-script')) {
            const script = document.createElement('script');
            script.id = 'ml-webforms-script';
            script.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v95037e5bac78f29ed026832ca21a7c7b';
            script.type = 'text/javascript';
            document.body.appendChild(script);
        }
        window.ml_webform_success_38818852 = function() {
            document.querySelector('.ml-subscribe-form-38818852 .row-success').style.display = 'block';
            document.querySelector('.ml-subscribe-form-38818852 .row-form').style.display = 'none';
        };
    }, []);

    return (
        <section id="story" className="section story-section">
            <div className="container">
                {/* Section heading — outside the box */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '2.4rem', color: 'white', marginBottom: '0.5rem' }}>Never Miss an Update!</h2>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.05rem', fontWeight: '600' }}>Follow along or join the pack.</p>
                </div>

                {/* Content box */}
                <div id="newsletter" style={{
                    maxWidth: '900px', margin: '0 auto',
                    background: 'rgba(255,255,255,0.6)',
                    borderRadius: '2rem',
                    border: '2px solid rgba(255,255,255,0.8)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    overflow: 'hidden'
                }}>
                    {/* Two panels */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0' }}>

                        {/* Left — Social */}
                        <div style={{
                            flex: '1', minWidth: '280px',
                            padding: '2rem 2.5rem 2.5rem',
                            textAlign: 'center',
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                        }}>
                            <div style={{ marginBottom: '0.75rem', color: '#C07848' }}><Film size={36} strokeWidth={1.5} /></div>
                            <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>Behind the scenes</h3>
                            <p style={{ color: '#475569', fontSize: '1.2rem', lineHeight: '1.9', marginBottom: '1.75rem' }}>
                                Follow us on Instagram and TikTok for behind-the-scenes videos, clips of the real Frankie & Henry, and sneak peeks at what's coming next.
                            </p>
                            <div className="social-buttons" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: 'auto', alignItems: 'center' }}>
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
                        }}><span style={{ fontSize: '1.5rem', color: '#C07848', opacity: 0.35 }}>—</span></div>

                        {/* Right — Newsletter */}
                        <div style={{
                            flex: '1', minWidth: '280px',
                            padding: '2rem 2.5rem 2.5rem',
                            textAlign: 'center',
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                        }}>
                            <div style={{ marginBottom: '0.75rem', color: '#C07848' }}><Mail size={36} strokeWidth={1.5} /></div>
                            <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.5rem', marginBottom: '0.75rem', color: '#1e293b' }}>Stay Close to Frankie &amp; Henry!</h3>
                            <p style={{ color: '#475569', fontSize: '1.2rem', lineHeight: '1.9', marginBottom: '1.25rem' }}>Win prizes, grab freebies, and get the latest news from Frankie &amp; Henry and their friends in the Wild Place.</p>
                            <div id="mlb2-38818852" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-38818852">
                                <div className="ml-form-align-center">
                                    <div className="ml-form-embedWrapper embedForm">
                                        <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
                                            <div className="ml-form-embedContent">
                                            </div>
                                            <form className="ml-block-form" action="https://assets.mailerlite.com/jsonp/2212478/forms/182653587718931572/subscribe" data-code="" method="post" target="_blank">
                                                <div className="ml-form-formContent">
                                                    <div className="ml-form-fieldRow ml-last-item">
                                                        <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                                                            <input aria-label="email" aria-required="true" type="email" className="form-control" name="fields[email]" placeholder="Email" autoComplete="email" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <input type="hidden" name="ml-submit" value="1" />
                                                <div className="ml-form-embedSubmit">
                                                    <button type="submit" className="primary">Join the Pack</button>
                                                    <button disabled style={{ display: 'none' }} type="button" className="loading">
                                                        <div className="ml-form-embedSubmitLoad"></div>
                                                        <span className="sr-only">Loading...</span>
                                                    </button>
                                                </div>
                                                <input type="hidden" name="anticsrf" value="true" />
                                            </form>
                                        </div>
                                        <div className="ml-form-successBody row-success" style={{ display: 'none' }}>
                                            <div className="ml-form-successContent">
                                                <h4>Thank you!</h4>
                                                <p>You have successfully joined our subscriber list.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.75rem' }}>We respect your privacy. Unsubscribe at any time.</p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
