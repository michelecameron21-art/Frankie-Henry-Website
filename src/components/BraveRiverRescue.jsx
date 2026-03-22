export default function BraveRiverRescue() {

    const galleryImages = [
        { src: '/assets/scene-hole.jpg', alt: 'The secret tunnel', objectPosition: 'center 20%' },
        { src: '/assets/scene-cub.jpg', alt: 'The jackal cub jumping' },
        { src: '/assets/scene-clawdius.jpg', alt: 'Clawdius on the branch', objectPosition: 'center 30%' },
        { src: '/assets/scene-lizard-spot.jpg', alt: 'Frankie spots the lizard' },
        { src: '/assets/scene-lizard-awake.jpg', alt: 'The lizard wakes up' },
        { src: '/assets/scene-rumble.jpg', alt: 'The rumble' },
        { src: '/assets/scene-spot-cub.jpg', alt: 'Spotting the cub' },
        { src: '/assets/scene-lwazi.jpg', alt: 'Lwazi and the boys' },
    ];

    const rotations = ['-2deg', '1.5deg', '-1deg', '2deg', '1deg', '-1.5deg', '2.5deg', '-0.5deg'];

    const perfectFor = [
        { text: 'Bedtime stories and read-alouds' },
        { text: 'Dog lovers and Yorkshire Terrier fans' },
        { text: 'Teaching courage, friendship, and helping others' },
        { text: 'Fans of safari and wildlife adventures' },
        { text: 'Gift for children ages 4–8' },
    ];

    return (
        <section id="gallery" style={{ background: 'linear-gradient(to bottom, #C07848 0%, #F0D090 35%, #E8C070 65%, #D4906A 100%)', padding: '3rem 0 5rem' }}>
            <div className="container">

                {/* Section heading */}
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <p style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.1rem', color: '#78350f', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                        Book 1 in the series
                    </p>
                    <h2 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '2.8rem', color: '#78350f', marginBottom: '0' }}>
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
                                height: '500px', width: 'auto',
                                filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.35))',
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
                                display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                                background: 'linear-gradient(to bottom, #f7dfa5, #f0c14b)',
                                color: '#111', border: '1px solid #a88734',
                                borderRadius: '4px', padding: '0.7rem 1.75rem',
                                fontWeight: '700', fontSize: '0.95rem',
                                textDecoration: 'none',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                                letterSpacing: '0.01em'
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF9900">
                                <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.076-1.045-.868-1.233-1.271-1.808-2.099-1.731 1.765-2.958 2.293-5.203 2.293-2.659 0-4.733-1.641-4.733-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.095v-.41c0-.753.06-1.642-.383-2.294-.385-.579-1.124-.82-1.775-.82-1.205 0-2.277.618-2.54 1.897-.054.285-.261.567-.549.582l-3.061-.333c-.259-.056-.548-.266-.472-.66C5.57 2.6 8.645 1.5 11.39 1.5c1.399 0 3.228.372 4.33 1.432 1.401 1.307 1.268 3.051 1.268 4.949v4.484c0 1.349.56 1.941 1.087 2.67.184.259.225.569-.01.757-.589.492-1.636 1.404-2.211 1.917l-.71-.924z"/>
                                <path d="M20.556 18.615c-2.229 1.648-5.462 2.527-8.242 2.527-3.898 0-7.405-1.441-10.063-3.837-.208-.188-.022-.445.228-.299 2.865 1.667 6.408 2.667 10.068 2.667 2.468 0 5.183-.512 7.681-1.571.377-.16.693.247.328.513z"/>
                                <path d="M21.505 17.535c-.284-.364-1.876-.172-2.592-.087-.218.026-.251-.164-.055-.301 1.269-.893 3.353-.635 3.596-.336.243.301-.063 2.39-1.256 3.386-.183.153-.358.072-.277-.131.268-.669.87-2.167.584-2.531z"/>
                            </svg>
                            Buy on Amazon
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
                                {item.text}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Gallery */}
                <div style={{ marginBottom: '3.5rem' }}>
                    <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.6rem', color: '#1e293b', textAlign: 'center', marginBottom: '0.5rem' }}>
                        Inside the Wild Place
                    </h3>
                    <p style={{ textAlign: 'center', color: '#78350f', fontWeight: '600', fontSize: '0.95rem', marginBottom: '2rem' }}>
                        Scenes from the book
                    </p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1.25rem',
                        maxWidth: '1050px',
                        margin: '0 auto',
                    }}>
                        {galleryImages.map((img, i) => (
                            <div
                                key={i}
                                style={{
                                    borderRadius: '1rem',
                                    overflow: 'hidden',
                                    aspectRatio: '4/3',
                                    boxShadow: '0 8px 28px rgba(0,0,0,0.22)',
                                    border: '4px solid white',
                                    transform: `rotate(${rotations[i]})`,
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'rotate(0deg) scale(1.06)';
                                    e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.35)';
                                    e.currentTarget.style.zIndex = '10';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = `rotate(${rotations[i]})`;
                                    e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.22)';
                                    e.currentTarget.style.zIndex = '1';
                                }}
                            >
                                <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: img.objectPosition || 'center center', display: 'block' }} />
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
                    <p style={{ fontSize: '1.05rem', color: '#1e293b', lineHeight: '1.7', marginTop: 0, fontStyle: 'italic' }}>
                        <strong>A series to grow with:</strong> Frankie and Henry's wild adventures are only just beginning. Watch out for their next escapade...
                    </p>
                </div>

            </div>
        </section>
    );
}
