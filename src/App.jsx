import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import SafariHeroes from './components/SafariHeroes'
import MeetTheBrothers from './components/MeetTheBrothers'
import BraveRiverRescue from './components/BraveRiverRescue'
import Extras from './components/Extras'

import Game from './components/Game'
import Story from './components/Story'
import Footer from './components/Footer'


function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

                {/* Tagline scroll — floating right of Henry */}
                <img
                    src="/assets/tagline-scroll.jpg"
                    alt="Small paws. Brave hearts. Big adventures."
                    style={{
                        position: 'absolute',
                        bottom: '12%',
                        right: '4%',
                        width: '28%',
                        height: 'auto',
                        zIndex: 20,
                        filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.35))',
                        transform: 'rotate(3deg)',
                    }}
                />

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
                        <div className="hidden md:flex" style={{ gap: '2rem' }}>
                            {['#story', '#characters', '#game', '#extras'].map((href, i) => (
                                <a key={href} href={href} style={{ color: 'white', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none', textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}>
                                    {['Story', 'Characters', 'Rescue Run', 'Freebies'][i]}
                                </a>
                            ))}
                        </div>
                        <button className="md:hidden" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                        </button>
                    </div>
                    {isMenuOpen && (
                        <div style={{ background: 'rgba(0,0,0,0.85)', borderRadius: '0 0 1rem 1rem', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {['#story', '#characters', '#game', '#extras'].map((href, i) => (
                                <a key={href} href={href} onClick={() => setIsMenuOpen(false)} style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none' }}>
                                    {['Story', 'Characters', 'Rescue Run', 'Freebies'][i]}
                                </a>
                            ))}
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
        </div>
    )
}

export default App
