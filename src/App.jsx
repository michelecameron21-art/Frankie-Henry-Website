import { useState, useRef, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import SafariHeroes from './components/SafariHeroes'
import MeetTheBrothers from './components/MeetTheBrothers'
import BraveRiverRescue from './components/BraveRiverRescue'
import Extras from './components/Extras'

import Game from './components/Game'
import Story from './components/Story'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'


const NAV_ITEMS = [
    {
        label: 'About',
        links: [
            { label: 'Meet the Characters', href: '#characters' },
            { label: 'Meet the Real Frankie & Henry', href: '#meet-brothers' },
            { label: 'The Brave River Rescue', href: '#gallery' },
            { label: 'Buy on Amazon', href: 'https://www.amazon.co.uk/dp/B0DYTWD2ZB', external: true },
        ],
    },
    {
        label: 'Play',
        links: [
            { label: 'Rescue Run Game', href: '#game' },
            { label: 'Colouring Pages', href: '#extras' },
            { label: 'Spot the Difference', href: '#extras' },
            { label: 'Sing Along', href: '#extras' },
        ],
    },
    {
        label: 'Follow',
        links: [
            { label: 'Newsletter', href: '#newsletter' },
            { label: 'Instagram', href: 'https://www.instagram.com/frankieandhenrybooks', external: true },
            { label: 'TikTok', href: 'https://www.tiktok.com/@frankieandhenrybooks', external: true },
        ],
    },
];

function DropdownMenu({ item, closeAll }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div ref={ref} style={{ position: 'relative' }}>
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontWeight: 700, fontSize: 'clamp(1rem, 1.4vw, 1.3rem)',
                    fontFamily: "'Alfa Slab One', serif", letterSpacing: '0.02em',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                    padding: '0.4rem 0.5rem', whiteSpace: 'nowrap',
                }}
            >
                <span style={{
                    color: '#FFD200',
                    WebkitTextFillColor: '#FFD200',
                }}>{item.label}</span>
                <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: '#FFD200' }} />
            </button>
            {open && (
                <div style={{
                    position: 'absolute', top: 'calc(100% + 8px)', left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(180, 120, 0, 0.85)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '1rem',
                    boxShadow: '0 12px 36px rgba(0,0,0,0.3)',
                    minWidth: '230px',
                    overflow: 'hidden',
                    zIndex: 100,
                    border: '1px solid rgba(255,220,0,0.3)',
                }}>
                    {item.links.map(link => (
                        <a
                            key={link.label}
                            href={link.href}
                            target={link.external ? '_blank' : undefined}
                            rel={link.external ? 'noopener noreferrer' : undefined}
                            onClick={() => setOpen(false)}
                            style={{
                                display: 'block',
                                padding: '0.75rem 1.25rem',
                                color: 'rgba(255,255,255,0.9)',
                                fontFamily: "'Fredoka', sans-serif",
                                fontWeight: 600, fontSize: '0.95rem',
                                textDecoration: 'none',
                                borderBottom: '1px solid rgba(255,255,255,0.15)',
                                transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mobileOpenItem, setMobileOpenItem] = useState(null);

    return (
        <div className="app">
            {/* Full-bleed Hero — image only for now */}
            <header style={{ height: '100vh', minHeight: '650px', position: 'relative', overflow: 'hidden', width: '100%' }}>

                {/* Hero image — desktop (wide) */}
                <img
                    src="/assets/hero-bros.jpg"
                    alt="Frankie and Henry, two Yorkshire Terriers, on a magical safari adventure in Africa"
                    className="hero-image hero-image-desktop"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
                />
                {/* Hero image — mobile (portrait, more space around dogs) */}
                <img
                    src="/assets/hero-bros-mobile.jpg"
                    alt="Frankie and Henry, two Yorkshire Terriers, on a magical safari adventure in Africa"
                    className="hero-image hero-image-mobile"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '55% 40%' }}
                />

                {/* Gradient — darkens top for nav, fades bottom into gold section */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 20%, transparent 88%, #C07848 100%)' }} />

                {/* Desktop: Book left + Tagline right */}
                <div className="hero-book-tagline" style={{
                    position: 'absolute',
                    bottom: '8%',
                    left: '5%',
                    right: '2%',
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                }}>
                    {/* Book mockup + Buy Now */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img
                            src="/assets/book-mockup.png"
                            alt="Frankie and Henry: The Brave River Rescue — children's picture book"
                            style={{
                                height: '50vh',
                                maxHeight: '450px',
                                width: 'auto',
                                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.45))',
                                transform: 'rotate(-4deg)',
                            }}
                        />
                        <a
                            href="https://www.amazon.co.uk/dp/B0DYTWD2ZB"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                marginTop: '0.75rem',
                                background: '#FFD200',
                                color: '#78350F',
                                fontFamily: "'Fredoka', sans-serif",
                                fontWeight: 700,
                                fontSize: '1.4rem',
                                padding: '0.75rem 3rem',
                                borderRadius: '9999px',
                                textDecoration: 'none',
                                boxShadow: '0 6px 0 #B8960A',
                                display: 'inline-block',
                                transition: 'transform 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Buy Now
                        </a>
                    </div>

                    {/* Tagline — angled to the right */}
                    <h1 style={{
                        margin: 0,
                        marginBottom: '2rem',
                        textAlign: 'right',
                        transform: 'rotate(2deg)',
                    }}>
                        <span style={{
                            display: 'inline-block',
                            fontFamily: "'Alfa Slab One', serif",
                            fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
                            lineHeight: 1.25,
                            letterSpacing: '0.03em',
                            color: '#FFD200',
                            textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                        }}>
                            Small paws.<br />
                            Brave hearts.<br />
                            Big adventures.
                        </span>
                    </h1>
                </div>

                {/* Mobile: Tagline only (centred) */}
                <h1 className="hero-tagline-mobile" style={{
                    position: 'absolute',
                    bottom: '12%',
                    left: 0,
                    right: 0,
                    zIndex: 20,
                    textAlign: 'center',
                    margin: 0,
                }}>
                    <span style={{
                        display: 'inline-block',
                        fontFamily: "'Alfa Slab One', serif",
                        fontSize: 'clamp(1.3rem, 5vw, 1.8rem)',
                        lineHeight: 1.3,
                        letterSpacing: '0.03em',
                        color: '#FFD200',
                        textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                    }}>
                        Small paws. Brave hearts.<br />
                        Big adventures.
                    </span>
                </h1>

                {/* Logo — top left */}
                <div className="hero-logo" style={{ position: 'absolute', top: '0.75rem', left: '1.5rem', zIndex: 50 }}>
                    <img src="/assets/fh-logo.png" alt="Frankie & Henry" style={{ height: 'clamp(200px, 35vw, 480px)', width: 'auto' }} />
                </div>

                {/* Nav */}
                <nav style={{ position: 'absolute', top: '22%', left: 0, right: 0, zIndex: 50, padding: '0 2rem' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>

                        {/* Desktop nav */}
                        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
                            {NAV_ITEMS.map(item => (
                                <DropdownMenu key={item.label} item={item} />
                            ))}
                        </div>

                        {/* Mobile hamburger */}
                        <button className="md:hidden" style={{ background: 'none', border: 'none', color: '#FFD200', cursor: 'pointer', filter: 'drop-shadow(1px 1px 3px rgba(0,0,0,0.5))' }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <div style={{ background: 'rgba(30,10,0,0.92)', backdropFilter: 'blur(12px)', borderRadius: '0 0 1.25rem 1.25rem', padding: '1rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0' }}>
                            {NAV_ITEMS.map((item, idx) => (
                                <div key={item.label}>
                                    <button
                                        onClick={() => setMobileOpenItem(mobileOpenItem === idx ? null : idx)}
                                        style={{
                                            width: '100%', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)',
                                            color: 'white', fontFamily: "'Fredoka', sans-serif", fontWeight: 700,
                                            fontSize: '1.1rem', padding: '0.9rem 0', cursor: 'pointer',
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        }}
                                    >
                                        {item.label}
                                        <ChevronDown size={18} style={{ transition: 'transform 0.2s', transform: mobileOpenItem === idx ? 'rotate(180deg)' : 'rotate(0deg)', opacity: 0.7 }} />
                                    </button>
                                    {mobileOpenItem === idx && (
                                        <div style={{ paddingLeft: '1rem', paddingBottom: '0.5rem' }}>
                                            {item.links.map(link => (
                                                <a
                                                    key={link.label}
                                                    href={link.href}
                                                    target={link.external ? '_blank' : undefined}
                                                    rel={link.external ? 'noopener noreferrer' : undefined}
                                                    onClick={() => { setIsMenuOpen(false); setMobileOpenItem(null); }}
                                                    style={{ display: 'block', padding: '0.6rem 0', color: 'rgba(255,220,140,0.9)', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}
                                                >
                                                    {link.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <a
                                href="https://www.amazon.co.uk/dp/B0DYTWD2ZB"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsMenuOpen(false)}
                                style={{
                                    marginTop: '1rem', display: 'block', textAlign: 'center',
                                    background: '#FFD200', color: '#78350F',
                                    fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: '1.1rem',
                                    padding: '0.75rem 2rem', borderRadius: '9999px', textDecoration: 'none',
                                    boxShadow: '0 4px 0 #B8960A',
                                }}
                            >
                                Buy Now on Amazon
                            </a>
                        </div>
                    )}
                </nav>
            </header>

            <main className="relative z-10">
                <SafariHeroes />
                <MeetTheBrothers />
                <BraveRiverRescue />
                <Game />
                <Extras />
                <Story />
            </main>

            <Footer />
            <CookieBanner />
        </div>
    )
}

export default App
