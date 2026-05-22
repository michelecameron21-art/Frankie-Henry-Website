import { Moon, Heart, Users, Compass, Gift } from 'lucide-react';

export default function BraveRiverRescue() {

    const galleryImages = [
        { src: '/assets/scene-hole.jpg', alt: 'The secret tunnel', objectPosition: 'center 20%' },
        { src: '/assets/scene-cub.jpg', alt: 'The jackal cub jumping' },
        { src: '/assets/scene-mom.jpg', alt: 'Jackal Mom by the river' },
        { src: '/assets/scene-lizard-spot.jpg', alt: 'Frankie spots the lizard' },
        { src: '/assets/scene-lizard-awake.jpg', alt: 'The lizard wakes up' },
        { src: '/assets/scene-rumble.jpg', alt: 'The rumble' },
        { src: '/assets/scene-spot-cub.jpg', alt: 'Spotting the cub' },
        { src: '/assets/scene-lwazi.jpg', alt: 'Lwazi and the boys' },
    ];

    const rotations = ['-2deg', '1.5deg', '-1deg', '2deg', '1deg', '-1.5deg', '2.5deg', '-0.5deg'];

    const perfectFor = [
        { icon: <Moon size={24} strokeWidth={2} color="#78350f" />, text: 'Bedtime stories & read-alouds' },
        { icon: <Heart size={24} strokeWidth={2} color="#78350f" />, text: 'Dog lovers & Yorkie fans' },
        { icon: <Users size={24} strokeWidth={2} color="#78350f" />, text: 'Teaching courage & friendship' },
        { icon: <Compass size={24} strokeWidth={2} color="#78350f" />, text: 'Safari & wildlife adventures' },
        { icon: <Gift size={24} strokeWidth={2} color="#78350f" />, text: 'The perfect gift, ages 4–8' },
    ];

    return (
        <section id="gallery" style={{ background: 'linear-gradient(to bottom, #C07848 0%, #F0D090 35%, #E8C070 65%, #D4906A 100%)', padding: '2rem 0 4rem' }}>
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
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem', maxWidth: '1000px', margin: '0 auto 2rem' }}>

                    {/* Book mockup */}
                    <div style={{ flex: '0 1 auto', textAlign: 'center' }}>
                        <img
                            src="/assets/book-mockup.png"
                            alt="Frankie and Henry: The Brave River Rescue"
                            loading="lazy"
                            style={{
                                height: 'auto', width: '100%', maxWidth: '320px', maxHeight: '500px',
                                filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.35))',
                                transform: 'rotate(-2deg)',
                            }}
                        />
                        <div style={{ marginTop: '-2rem' }}>
                            <a
                                href="https://www.amazon.com/dp/B0GTVVPPH6"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-block',
                                    background: '#FFD200', color: '#78350F',
                                    fontFamily: 'Fredoka, sans-serif',
                                    fontWeight: '700', fontSize: '1.1rem',
                                    padding: '0.65rem 2rem',
                                    borderRadius: '9999px',
                                    textDecoration: 'none',
                                    boxShadow: '0 4px 0 #B8960A',
                                }}
                            >
                                Buy Now
                            </a>
                            <p style={{
                                marginTop: '0.5rem',
                                fontFamily: 'Fredoka, sans-serif',
                                fontSize: '0.8rem',
                                color: '#78350f',
                                fontWeight: '600',
                                letterSpacing: '0.03em',
                            }}>
                                Available in Kindle &amp; Paperback
                            </p>
                        </div>
                    </div>

                    {/* Blurb */}
                    <div style={{ flex: '1', minWidth: '280px' }}>

                        <p style={{ fontSize: '1.2rem', color: '#1e293b', lineHeight: '1.9', marginBottom: '1rem' }}>
                            When Frankie and Henry, two Yorkshire Terrier brothers, discover a secret tunnel, they burst out into the Wild Place. But there's little time to explore.
                        </p>
                        <p style={{ fontSize: '1.2rem', color: '#1e293b', lineHeight: '1.9', marginBottom: '1rem' }}>
                            A jackal cub is stranded, a giant lizard has woken up, and Henry's tummy is already rumbling.
                        </p>
                        <p style={{ fontSize: '1.2rem', color: '#1e293b', lineHeight: '1.9', marginBottom: '1rem', fontWeight: '700' }}>
                            Can two Yorkies, and new friends, pull off the wildest rescue of their lives?
                        </p>
                        <p style={{ fontSize: '1.2rem', color: '#1e293b', lineHeight: '1.9', marginBottom: '1.75rem' }}>
                            A thrilling picture book adventure for children ages 4–8, full of courage, laughter, and the power of teamwork. Set against the breathtaking landscapes of an African savannah — the story that proves size has nothing to do with bravery.
                        </p>

                    </div>
                </div>

                {/* Perfect for */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.8rem', color: '#78350f', marginBottom: '2rem' }}>
                        Perfect for...
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', maxWidth: '860px', margin: '0 auto' }}>
                        {perfectFor.map((item, i) => (
                            <div key={i} style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
                                background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(6px)',
                                border: '2px solid rgba(255,255,255,0.9)',
                                borderRadius: '1.25rem', padding: '1.25rem 1.5rem',
                                width: '150px',
                                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                                color: '#78350f',
                            }}>
                                <div style={{
                                    width: '52px', height: '52px', borderRadius: '50%',
                                    background: '#FDE047',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 3px 0 #D4B830',
                                }}>
                                    {item.icon}
                                </div>
                                <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1e293b', lineHeight: '1.3', textAlign: 'center' }}>
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gallery */}
                <div style={{ marginBottom: '3.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '2.4rem', color: '#78350f', marginBottom: '0.6rem' }}>
                            Inside the Wild Place
                        </h3>
                        <p style={{ color: '#5c2d0a', fontSize: '1.05rem', fontWeight: '600', maxWidth: '520px', margin: '0 auto', lineHeight: '1.6' }}>
                            These are the real scenes from the pages of the book — step inside the adventure
                        </p>
                    </div>
                    <div className="gallery-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1.5rem',
                        maxWidth: '1100px',
                        margin: '0 auto',
                    }}>
                        {galleryImages.map((img, i) => (
                            <div
                                key={i}
                                style={{
                                    borderRadius: '1rem',
                                    overflow: 'hidden',
                                    aspectRatio: '16/10',
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
                                <img src={img.src} alt={img.alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: img.objectPosition || 'center center', display: 'block' }} />
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </section>
    );
}
