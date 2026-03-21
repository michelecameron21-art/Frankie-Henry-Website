export default function BraveRiverRescue() {

    const galleryImages = [
        { src: '/assets/frankie.jpg', alt: 'Frankie in the Wild Place' },
        { src: '/assets/henry.jpg', alt: 'Henry in the Wild Place' },
        { src: '/assets/eagle.jpg', alt: 'The Eagle' },
        { src: '/assets/jackal-cub.jpg', alt: 'The Jackal Cub' },
        { src: '/assets/jackal-mum.jpg', alt: 'The Jackal Mother' },
        { src: '/assets/monitor.jpg', alt: 'The Monitor Lizard' },
    ];

    const perfectFor = [
        { emoji: '🌙', text: 'Bedtime stories and read-alouds' },
        { emoji: '🐕', text: 'Dog lovers and Yorkshire Terrier fans' },
        { emoji: '🤝', text: 'Teaching courage, friendship, and helping others' },
        { emoji: '🦁', text: 'Fans of safari and wildlife adventures' },
        { emoji: '🎁', text: 'Gift for children ages 4–8' },
    ];

    return (
        <section style={{ background: 'linear-gradient(to bottom, #C07848 0%, #F0D090 35%, #E8C070 65%, #D4906A 100%)', padding: '5rem 0' }}>
            <div className="container">

                {/* Section heading */}
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <p style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.1rem', color: '#78350f', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                        Book 1 in the series
                    </p>
                    <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '2.8rem', color: '#1e293b', marginBottom: '0' }}>
                        The Brave River Rescue
                    </h2>
                </div>

                {/* Book mockup + blurb */}
                <div style={{ display: 'flex', gap: '3.5rem', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '4rem', maxWidth: '1000px', margin: '0 auto 4rem' }}>

                    {/* Book mockup */}
                    <div style={{ flex: '0 0 auto', textAlign: 'center' }}>
                        <img
                            src="/assets/book-mockup.png"
                            alt="Frankie and Henry: The Brave River Rescue"
                            style={{
                                height: '380px', width: 'auto',
                                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                                transform: 'rotate(-2deg)',
                            }}
                        />
                    </div>

                    {/* Blurb */}
                    <div style={{ flex: '1', minWidth: '280px' }}>

                        {/* Tagline */}
                        <p style={{
                            fontFamily: 'Fredoka, sans-serif', fontSize: '1.4rem',
                            color: '#78350f', fontWeight: '700', fontStyle: 'italic',
                            marginBottom: '1.5rem', lineHeight: '1.4'
                        }}>
                            Small paws. Brave hearts. Big adventures.
                        </p>

                        <p style={{ fontSize: '1.05rem', color: '#1e293b', lineHeight: '1.85', marginBottom: '1rem' }}>
                            When Frankie and Henry, two Yorkshire Terrier brothers, discover a secret tunnel, they burst out into the Wild Place. But there's little time to explore.
                        </p>
                        <p style={{ fontSize: '1.05rem', color: '#1e293b', lineHeight: '1.85', marginBottom: '1rem' }}>
                            A jackal cub is stranded, a giant lizard has woken up, and Henry's tummy is already rumbling.
                        </p>
                        <p style={{ fontSize: '1.05rem', color: '#1e293b', lineHeight: '1.85', marginBottom: '1rem', fontWeight: '700' }}>
                            Can two Yorkies, and new friends, pull off the wildest rescue of their lives?
                        </p>
                        <p style={{ fontSize: '1.05rem', color: '#1e293b', lineHeight: '1.85', marginBottom: '1.75rem' }}>
                            A thrilling picture book adventure for children ages 4–8, full of courage, laughter, and the power of teamwork. Set against the breathtaking landscapes of an African savannah — the story that proves size has nothing to do with bravery.
                        </p>

                        {/* Buy button */}
                        <a
                            href="https://www.amazon.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                background: '#FFD200', color: '#78350f',
                                borderRadius: '9999px', padding: '0.8rem 2rem',
                                fontWeight: '800', fontSize: '1.05rem',
                                textDecoration: 'none', fontFamily: 'Fredoka, sans-serif',
                                boxShadow: '0 4px 0 #b8960a',
                                letterSpacing: '0.02em'
                            }}
                        >
                            🛒 Buy on Amazon
                        </a>
                    </div>
                </div>

                {/* Perfect for */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.6rem', color: '#1e293b', marginBottom: '1.5rem' }}>
                        Perfect for...
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', maxWidth: '750px', margin: '0 auto' }}>
                        {perfectFor.map((item, i) => (
                            <span key={i} style={{
                                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(4px)',
                                border: '2px solid rgba(255,255,255,0.8)',
                                borderRadius: '9999px', padding: '0.5rem 1.25rem',
                                fontSize: '0.95rem', fontWeight: '600', color: '#1e293b',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                            }}>
                                {item.emoji} {item.text}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Gallery */}
                <div style={{ marginBottom: '3.5rem' }}>
                    <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.6rem', color: '#1e293b', textAlign: 'center', marginBottom: '1.75rem' }}>
                        Meet the cast
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', maxWidth: '1000px', margin: '0 auto' }}>
                        {galleryImages.map((img, i) => (
                            <div key={i} style={{
                                borderRadius: '1.25rem', overflow: 'hidden',
                                aspectRatio: '4/3',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                border: '3px solid rgba(255,255,255,0.7)',
                                transition: 'transform 0.3s ease',
                            }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Series teaser */}
                <div style={{
                    textAlign: 'center', maxWidth: '600px', margin: '0 auto',
                    background: 'rgba(255,255,255,0.5)', borderRadius: '1.5rem',
                    padding: '1.75rem 2.5rem', border: '2px solid rgba(255,255,255,0.7)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.07)'
                }}>
                    <span style={{ fontSize: '1.5rem' }}>🌍</span>
                    <p style={{ fontSize: '1.05rem', color: '#1e293b', lineHeight: '1.7', marginTop: '0.5rem', fontStyle: 'italic' }}>
                        <strong>A series to grow with:</strong> Frankie and Henry's wild adventures are only just beginning. Watch out for their next escapade...
                    </p>
                </div>

            </div>
        </section>
    );
}
