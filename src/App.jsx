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
        label: 'The Book',
        links: [
            { label: 'Meet the Brothers', href: '#meet-brothers' },
            { label: 'Book Gallery', href: '#gallery' },
            { label: 'Buy on Amazon', href: 'https://www.amazon.co.uk/dp/B0DYTWD2ZB', external: true },
        ],
    },
    {
        label: 'Characters',
        links: [
            { label: 'Frankie & Henry', href: '#characters' },
            { label: 'Lwazi the Crane', href: '#characters' },
            { label: 'Clawdius the Cat', href: '#characters' },
            { label: 'The Wild Place Cast', href: '#characters' },
        ],
    },
    {
        label: 'Freebies',
        links: [
            { label: 'Rescue Run Game', href: '#game' },
            { label: 'Colouring Pages', href: '#extras' },
            { label: 'Spot the Difference', href: '#extras' },
            { label: 'Sing Along', href: '#extras' },
            { label: 'Join the Newsletter', href: '#story' },
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
                    color: 'white', fontWeight: 700, fontSize: '1rem',
                    fontFamily: "'Fredoka', sans-serif", letterSpacing: '0.02em',
                    textShadow: '0 2px 6px rgba(0,0,0,0.55)',
                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                    padding: '0.4rem 0.2rem', whiteSpace: 'nowrap',
                }}
            >
                {item.label}
                <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>
            {open && (
                <div style={{
                    position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                    background: 'rgba(255,251,240,0.97)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '1rem',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(192,120,72,0.12)',
                    minWidth: '210px',
                    overflow: 'hidden',
                    zIndex: 100,
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
                                color: '#7C3D0A',
                                fontFamily: "'Nunito', sans-serif",
                                fontWeight: 700, fontSize: '0.95rem',
                                textDecoration: 'none',
                                borderBottom: '1px solid rgba(192,120,72,0.1)',
                                transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(192,120,72,0.1)'}
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

                {/* Hero image — edge to edge */}
                <img
                    src="/assets/hero-bros.jpg"
                    alt="Frankie and Henry"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }}
                />

                {/* Gradient — darkens top for nav, fades bottom into gold section */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 88%, #C07848 100%)' }} />

                {/* Tagline — matching the book cover title treatment exactly */}
                <div style={{
                    position: 'absolute',
                    bottom: '22%',
                    right: '2%',
                    zIndex: 20,
                    transform: 'rotate(2deg)',
                    textAlign: 'center',
                    display: 'inline-block',
                }}>
                    {/* Layer 1 — dark outline + 3D extrusion shadow (sits underneath) */}
                    <p style={{
                        fontFamily: "'Alfa Slab One', serif",
                        fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)',
                        lineHeight: 1.3,
                        letterSpacing: '0.02em',
                        margin: 0,
                        color: '#C87010',
                        WebkitTextStroke: '7px #1E0A00',
                        textShadow: `
                            3px 3px 0 #8B4500,
                            5px 5px 0 #6B3200,
                            7px 7px 0 #4E2000,
                            8px 8px 14px rgba(15,5,0,0.75)
                        `,
                        userSelect: 'none',
                    }}>
                        Small paws.<br />
                        Brave hearts.<br />
                        Big adventures.
                    </p>

                    {/* Layer 2 — gradient gold fill on top */}
                    <p style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        fontFamily: "'Alfa Slab One', serif",
                        fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)',
                        lineHeight: 1.3,
                        letterSpacing: '0.02em',
                        margin: 0,
                        background: 'linear-gradient(to bottom, #F8D460 0%, #F0A820 40%, #D47810 75%, #B86008 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textAlign: 'center',
                    }}>
                        Small paws.<br />
                        Brave hearts.<br />
                        Big adventures.
                    </p>
                </div>

                {/* Book mockup — floating left */}
                <img
                    src="/assets/book-mockup.png"
                    alt="Frankie and Henry book"
                    style={{
                        position: 'absolute',
                        bottom: '8%',
                        left: '5%',
                        height: '55%',
                        width: 'auto',
                        zIndex: 20,
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.45))',
                        transform: 'rotate(-4deg)',
                        transformOrigin: 'bottom left',
                    }}
                />

                {/* Nav floats over the image */}
                <nav style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50, padding: '1.25rem 2rem' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <img src="/assets/fh-logo.png" alt="Frankie & Henry" style={{ height: '500px', width: 'auto', marginTop: '-130px' }} />
                        </div>

                        {/* Desktop nav */}
                        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '0.25rem' }}>
                            {NAV_ITEMS.map(item => (
                                <DropdownMenu key={item.label} item={item} />
                            ))}
                            <a
                                href="https://www.amazon.co.uk/dp/B0DYTWD2ZB"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    marginLeft: '1rem',
                                    background: '#E11D48',
                                    color: 'white',
                                    fontFamily: "'Fredoka', sans-serif",
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    padding: '0.5rem 1.4rem',
                                    borderRadius: '9999px',
                                    textDecoration: 'none',
                                    boxShadow: '0 4px 0 #9f0a25',
                                    display: 'inline-block',
                                    transition: 'transform 0.15s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                Buy Now
                            </a>
                        </div>

                        {/* Mobile hamburger */}
                        <button className="md:hidden" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                                    background: '#E11D48', color: 'white',
                                    fontFamily: "'Fredoka', sans-serif", fontWeight: 700, fontSize: '1.1rem',
                                    padding: '0.75rem 2rem', borderRadius: '9999px', textDecoration: 'none',
                                    boxShadow: '0 4px 0 #9f0a25',
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
