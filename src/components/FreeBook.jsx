import { useState } from 'react';
import { BookOpen, Loader2, CheckCircle2 } from 'lucide-react';

const BOOK_FILE = '/assets/frankie-and-henry-free-book.pdf';
const BOOK_FILENAME = 'Frankie-and-Henry-The-Brave-River-Rescue.pdf';

export default function FreeBook() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error

    function triggerDownload() {
        const a = document.createElement('a');
        a.href = BOOK_FILE;
        a.download = BOOK_FILENAME;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (status === 'loading') return;
        const value = email.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setStatus('error');
            return;
        }
        setStatus('loading');
        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: value }),
            });
            if (res.ok) {
                setStatus('success');
                triggerDownload();
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    }

    return (
        <section id="free-book" className="section" style={{ paddingTop: '2.5rem', paddingBottom: '1rem' }}>
            <div className="container">
                <div style={{
                    maxWidth: '760px', margin: '0 auto',
                    background: '#FFF8EC',
                    borderRadius: '2rem',
                    border: '3px solid #FFE3A3',
                    boxShadow: '0 12px 32px rgba(120, 53, 15, 0.12)',
                    padding: '2.5rem 2rem',
                    textAlign: 'center',
                }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '64px', height: '64px', borderRadius: '9999px',
                        background: '#FFD200', color: '#78350F', marginBottom: '1rem',
                        boxShadow: '0 4px 0 #B8960A',
                    }}>
                        <BookOpen size={32} />
                    </div>

                    <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '2rem', color: '#78350F', marginBottom: '0.5rem' }}>
                        Read the Whole Book, Free!
                    </h2>
                    <p style={{ color: '#7c5e3b', fontSize: '1.15rem', lineHeight: '1.8', maxWidth: '520px', margin: '0 auto 1.5rem' }}>
                        Pop in your email and we'll send Frankie &amp; Henry: The Brave River Rescue straight to your screen. The full picture book, yours to keep.
                    </p>

                    {status === 'success' ? (
                        <div style={{
                            background: '#E8F5D8', border: '2px solid #BBE3A0',
                            borderRadius: '1.25rem', padding: '1.5rem', maxWidth: '480px', margin: '0 auto',
                        }}>
                            <div style={{ color: '#3f7d20', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                                <CheckCircle2 size={36} />
                            </div>
                            <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.4rem', color: '#3f7d20', marginBottom: '0.4rem' }}>
                                Your book is downloading!
                            </h3>
                            <p style={{ color: '#4b6b35', fontSize: '1rem', lineHeight: '1.7' }}>
                                If it didn't start,{' '}
                                <a href={BOOK_FILE} download={BOOK_FILENAME} style={{ color: '#2f6b14', fontWeight: 700 }}>
                                    tap here to download it
                                </a>
                                . Enjoy the adventure!
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{
                            display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
                            justifyContent: 'center', maxWidth: '520px', margin: '0 auto',
                        }}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
                                placeholder="Your email address"
                                aria-label="Your email address"
                                required
                                style={{
                                    flex: '1 1 260px', minWidth: '220px',
                                    padding: '0.9rem 1.25rem', fontSize: '1rem',
                                    fontFamily: 'Nunito, sans-serif',
                                    borderRadius: '9999px', border: '2px solid #FFE3A3',
                                    outline: 'none', background: 'white', color: '#3f3f46',
                                }}
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    padding: '0.9rem 1.75rem', fontSize: '1.05rem',
                                    fontFamily: 'Fredoka, sans-serif', fontWeight: 700,
                                    color: '#78350F', background: '#FFD200',
                                    border: 'none', borderRadius: '9999px',
                                    boxShadow: '0 4px 0 #B8960A',
                                    cursor: status === 'loading' ? 'wait' : 'pointer',
                                    opacity: status === 'loading' ? 0.8 : 1,
                                }}
                            >
                                {status === 'loading' ? (<><Loader2 size={18} className="spin" /> Sending...</>) : 'Send Me the Book'}
                            </button>
                        </form>
                    )}

                    {status === 'error' && (
                        <p style={{ color: '#b91c1c', fontSize: '0.95rem', marginTop: '0.9rem' }}>
                            Hmm, that didn't work. Please check your email address and try again.
                        </p>
                    )}

                    {status !== 'success' && (
                        <p style={{ fontSize: '0.75rem', color: '#a8916b', marginTop: '1rem' }}>
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
