import { useState, useRef, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import SafariHeroes from './components/SafariHeroes'
import MeetTheBrothers from './components/MeetTheBrothers'
import BraveRiverRescue from './components/BraveRiverRescue'
import Extras from './components/Extras'
import FreeBook from './components/FreeBook'

import Game from './components/Game'
import Story from './components/Story'
import Reviews from './components/Reviews'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import Dashboard from './components/Dashboard'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost'


const NAV_ITEMS = [
    {
        label: 'About',
        links: [
            { label: 'The Brave River Rescue', href: '/the-brave-river-rescue' },
            { label: 'Meet Frankie & Henry', href: '/meet-frankie-and-henry' },
            { label: 'Safari Heroes', href: '/safari-heroes' },
            { label: 'Buy on Amazon', href: 'https://www.amazon.com/dp/B0GTVVPPH6', external: true },
        ],
    },
    {
        label: 'Play',
        links: [
            { label: 'Rescue Run Game', href: '#game' },
            { label: 'Free Activities', href: '/freebies' },
        ],
    },
    {
        label: 'Stories',
        links: [
            { label: 'Reviews', href: '/reviews' },
            { label: 'Blog', href: '/blog' },
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

// Client-side navigation using real URLs (History API)
function navigate(href) {
    const url = new URL(href, window.location.origin);
    const samePath = url.pathname === window.location.pathname;
    window.history.pushState({}, '', url.pathname + url.search + url.hash);
    window.dispatchEvent(new Event('locationchange'));
    if (url.hash) {
        const doScroll = () => {
            const el = document.getElementById(url.hash.slice(1));
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else window.scrollTo(0, 0);
        };
        setTimeout(doScroll, samePath ? 0 : 180);
    } else {
        window.scrollTo(0, 0);
    }
}

// Parse a pathname into a route
function getRoute(pathname) {
    if (pathname === '/blog' || pathname === '/blog/') {
        return { page: 'blog' };
    }
    if (pathname.startsWith('/blog/')) {
        return { page: 'blogPost', slug: pathname.replace('/blog/', '').replace(/\/$/, '') };
    }
    if (pathname === '/michele-hq' || pathname === '/michele-hq/') {
        return { page: 'dashboard', sub: 'home' };
    }
    if (pathname === '/michele-hq/seo') {
        return { page: 'dashboard', sub: 'seo' };
    }
    if (pathname === '/michele-hq/outreach') {
        return { page: 'dashboard', sub: 'outreach' };
    }
    if (pathname === '/michele-hq/content') {
        return { page: 'dashboard', sub: 'content' };
    }
    // Sub-pages (real URLs for Google sitelink targets)
    if (pathname === '/the-brave-river-rescue' || pathname === '/the-brave-river-rescue/') return { page: 'braveriver' };
    if (pathname === '/meet-frankie-and-henry' || pathname === '/meet-frankie-and-henry/') return { page: 'meet' };
    if (pathname === '/safari-heroes' || pathname === '/safari-heroes/') return { page: 'heroes' };
    if (pathname === '/freebies' || pathname === '/freebies/') return { page: 'freebies' };
    if (pathname === '/reviews' || pathname === '/reviews/') return { page: 'reviews' };
    return { page: 'home' };
}

// Per-page <title> and <meta description> for sub-pages
// Pipes ( | ) used instead of em-dashes per project style
const PAGE_META = {
    '/the-brave-river-rescue': {
        title: "The Brave River Rescue | Frankie & Henry's First Adventure",
        description: "Two Yorkshire Terrier brothers, a lost jackal cub, and a monitor lizard closing in. A safari picture book for kids aged 4 to 8.",
    },
    '/meet-frankie-and-henry': {
        title: "Meet Frankie & Henry | The Real Brothers Behind the Book",
        description: "The real Yorkshire Terrier brothers whose walks together inspired the Wild Place. Their story, their photos and how the book came to be.",
    },
    '/safari-heroes': {
        title: "Safari Heroes | The Cast of the Wild Place",
        description: "Meet the lion king, the rhino guardian, the giraffe lookout and every safari hero the brothers encounter in the Wild Place.",
    },
    '/freebies': {
        title: "Free Safari Colouring Pages and Activity Sheets",
        description: "Free downloadable safari colouring pages, activity sheets and bedtime printables for kids who love Frankie and Henry.",
    },
    '/reviews': {
        title: "Reviews | Frankie & Henry: The Brave River Rescue",
        description: "Reviews from parents, teachers and small readers of the Brave River Rescue. Honest takes on the picture book inspired by two real Yorkies.",
    },
};

// Update document.title, meta description and canonical link on client-side navigation.
// (The prerender bakes the initial HTML for first-load + Googlebot.)
function usePageHead(pathname) {
    useEffect(() => {
        const meta = PAGE_META[pathname.replace(/\/$/, '')];
        if (!meta) return;
        const prevTitle = document.title;
        document.title = meta.title;
        const desc = document.querySelector('meta[name="description"]');
        const prevDesc = desc ? desc.getAttribute('content') : null;
        if (desc) desc.setAttribute('content', meta.description);
        const can = document.querySelector('link[rel="canonical"]');
        const prevCan = can ? can.getAttribute('href') : null;
        if (can) can.setAttribute('href', `https://www.frankiehenryadventures.com${pathname.replace(/\/$/, '')}`);
        return () => {
            document.title = prevTitle;
            if (desc && prevDesc !== null) desc.setAttribute('content', prevDesc);
            if (can && prevCan !== null) can.setAttribute('href', prevCan);
        };
    }, [pathname]);
}

function usePathRoute() {
    const [pathname, setPathname] = useState(window.location.pathname);

    useEffect(() => {
        const onChange = () => setPathname(window.location.pathname);
        window.addEventListener('popstate', onChange);
        window.addEventListener('locationchange', onChange);
        return () => {
            window.removeEventListener('popstate', onChange);
            window.removeEventListener('locationchange', onChange);
        };
    }, []);

    return { route: getRoute(pathname), pathname };
}

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mobileOpenItem, setMobileOpenItem] = useState(null);
    const { route, pathname } = usePathRoute();
    usePageHead(pathname);
    const SUB_PAGES = ['braveriver', 'meet', 'heroes', 'freebies', 'reviews'];

    // Intercept internal link clicks for SPA navigation (real URLs, no page reload)
    useEffect(() => {
        const onClick = (e) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const a = e.target.closest && e.target.closest('a');
            if (!a) return;
            const href = a.getAttribute('href');
            const target = a.getAttribute('target');
            if (!href || target === '_blank') return;
            if (/^(https?:|mailto:|tel:)/.test(href)) return;
            // Let the browser handle links to real files (e.g. /privacy-policy.html, images)
            const lastSeg = href.split('#')[0].split('?')[0].split('/').pop();
            if (lastSeg && lastSeg.includes('.')) return;
            if (href.startsWith('/')) { e.preventDefault(); navigate(href); return; }
            if (href.startsWith('#')) { e.preventDefault(); navigate('/' + href); return; } // home-page section anchor
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    // Scroll to top when navigating to blog or sub-pages
    useEffect(() => {
        if (route.page === 'blog' || route.page === 'blogPost' || route.page === 'dashboard' || SUB_PAGES.includes(route.page)) {
            window.scrollTo(0, 0);
        }
    }, [route.page, route.slug]);

    return (
        <div className="app">
            {/* Full-bleed Hero — image only for now */}
            {route.page === 'home' ? (
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
                            href="https://www.amazon.com/dp/B0GTVVPPH6"
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
                        <p style={{
                            marginTop: '0.5rem',
                            fontFamily: "'Fredoka', sans-serif",
                            fontSize: '0.85rem',
                            color: 'rgba(255,220,140,0.9)',
                            fontWeight: 600,
                            letterSpacing: '0.03em',
                        }}>
                            Available in Kindle &amp; Paperback
                        </p>
                    </div>

                    {/* Tagline — angled to the right */}
                    <h1 style={{
                        margin: 0,
                        marginBottom: '2rem',
                        marginRight: '-1rem',
                        textAlign: 'right',
                        transform: 'rotate(2deg)',
                    }}>
                        <span style={{
                            display: 'inline-block',
                            fontFamily: "'Alfa Slab One', serif",
                            fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)',
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

                {/* Mobile: Tagline only (centred) — aria-hidden to avoid duplicate H1 */}
                <div className="hero-tagline-mobile" aria-hidden="true" style={{
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
                </div>

                {/* Logo — top left */}
                <div className="hero-logo" style={{ position: 'absolute', top: '-3rem', left: '6rem', zIndex: 50 }}>
                    <img src="/assets/fh-logo.png" alt="Frankie & Henry" style={{ height: 'clamp(240px, 40vw, 550px)', width: 'auto' }} />
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
                                href="https://www.amazon.com/dp/B0GTVVPPH6"
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
                            <p style={{
                                marginTop: '0.4rem',
                                textAlign: 'center',
                                fontFamily: "'Fredoka', sans-serif",
                                fontSize: '0.8rem',
                                color: 'rgba(255,220,140,0.9)',
                                fontWeight: 600,
                                letterSpacing: '0.03em',
                            }}>
                                Available in Kindle &amp; Paperback
                            </p>
                        </div>
                    )}
                </nav>
            </header>
            ) : route.page === 'dashboard' ? null : (
            <header className="blog-header" style={{
                background: 'linear-gradient(135deg, #A85830 0%, #C07848 100%)',
                padding: '0.5rem 2rem',
                position: 'relative',
                zIndex: 50,
                overflow: 'visible',
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
                    <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                        <img src="/assets/fh-logo.png" alt="Frankie & Henry" style={{ height: '160px', width: 'auto', marginTop: '20px' }} />
                    </a>
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <a href="/" style={{
                            fontFamily: "'Fredoka', sans-serif",
                            fontWeight: 600,
                            fontSize: '1rem',
                            color: 'rgba(255,255,255,0.9)',
                            textDecoration: 'none',
                        }}>Home</a>
                        <a href="/blog" style={{
                            fontFamily: "'Fredoka', sans-serif",
                            fontWeight: 600,
                            fontSize: '1rem',
                            color: '#FFD200',
                            textDecoration: 'none',
                        }}>Blog</a>
                        <a
                            href="https://www.amazon.com/dp/B0GTVVPPH6"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontFamily: "'Fredoka', sans-serif",
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                background: '#FFD200',
                                color: '#78350F',
                                padding: '0.5rem 1.25rem',
                                borderRadius: '9999px',
                                textDecoration: 'none',
                                boxShadow: '0 3px 0 #B8960A',
                            }}
                        >Buy the Book</a>
                    </nav>
                </div>
            </header>
            )}

            {route.page === 'dashboard' ? (
                <Dashboard page={route.sub} />
            ) : route.page === 'blog' ? (
                <main className="relative z-10">
                    <Blog />
                </main>
            ) : route.page === 'blogPost' ? (
                <main className="relative z-10">
                    <BlogPost slug={route.slug} />
                </main>
            ) : route.page === 'braveriver' ? (
                <main className="relative z-10">
                    <BraveRiverRescue />
                </main>
            ) : route.page === 'meet' ? (
                <main className="relative z-10">
                    <MeetTheBrothers />
                </main>
            ) : route.page === 'heroes' ? (
                <main className="relative z-10">
                    <SafariHeroes />
                </main>
            ) : route.page === 'freebies' ? (
                <main className="relative z-10">
                    <FreeBook />
                    <Extras />
                </main>
            ) : route.page === 'reviews' ? (
                <main className="relative z-10">
                    <Reviews />
                </main>
            ) : (
                <main className="relative z-10">
                    <SafariHeroes />
                    <MeetTheBrothers />
                    <BraveRiverRescue />
                    <Reviews />
                    <Game />
                    <Extras />
                    <Story />
                </main>
            )}

            {route.page !== 'dashboard' && <Footer />}
            {route.page !== 'dashboard' && <CookieBanner />}
        </div>
    )
}

export default App
