import { Youtube, Instagram } from 'lucide-react';

export default function Story() {
    return (
        <section id="story" className="section story-section">
            <div className="container">
                {/* About Frankie & Henry */}
                <div className="text-center mb-16">
                    <h2 className="heading-lg mb-10" style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '3rem' }}>
                        Meet the Brothers
                    </h2>

                    {/* Character cards side by side */}
                    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>

                        {/* Frankie */}
                        <div style={{ flex: '1', minWidth: '220px', maxWidth: '280px', textAlign: 'center' }}>
                            <div style={{
                                width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden',
                                margin: '0 auto 1rem', border: '5px solid #E11D48',
                                boxShadow: '0 8px 24px rgba(225,29,72,0.3)'
                            }}>
                                <img src="/assets/frankie.jpg" alt="Frankie" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
                            </div>
                            <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.8rem', color: '#E11D48', marginBottom: '0.5rem' }}>Frankie</h3>
                            <span style={{
                                display: 'inline-block', background: '#E11D48', color: 'white',
                                borderRadius: '9999px', padding: '0.35rem 1rem', fontSize: '0.85rem',
                                fontWeight: '700', letterSpacing: '0.03em'
                            }}>⚡ Charges in headfirst</span>
                        </div>

                        {/* Real dog photo placeholder — swap src when photo is ready */}
                        <div style={{ flex: '1', minWidth: '220px', maxWidth: '280px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{
                                width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden',
                                margin: '0 auto 1rem', border: '5px dashed #C07848',
                                boxShadow: '0 8px 24px rgba(192,120,72,0.2)',
                                background: 'rgba(255,255,255,0.4)',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <span style={{ fontSize: '2.5rem' }}>📸</span>
                                <p style={{ fontSize: '0.8rem', color: '#78350f', fontWeight: '600', padding: '0 1rem', marginTop: '0.5rem' }}>The Real Boys</p>
                                <p style={{ fontSize: '0.7rem', color: '#a16207', padding: '0 1rem' }}>Photo coming soon</p>
                            </div>
                            <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.8rem', color: '#C07848', marginBottom: '0.5rem' }}>The Real Frankie & Henry</h3>
                            <span style={{
                                display: 'inline-block', background: '#C07848', color: 'white',
                                borderRadius: '9999px', padding: '0.35rem 1rem', fontSize: '0.85rem',
                                fontWeight: '700', letterSpacing: '0.03em'
                            }}>🐾 The inspiration behind it all</span>
                        </div>

                        {/* Henry */}
                        <div style={{ flex: '1', minWidth: '220px', maxWidth: '280px', textAlign: 'center' }}>
                            <div style={{
                                width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden',
                                margin: '0 auto 1rem', border: '5px solid #0EA5E9',
                                boxShadow: '0 8px 24px rgba(14,165,233,0.3)'
                            }}>
                                <img src="/assets/henry.jpg" alt="Henry" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
                            </div>
                            <h3 style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.8rem', color: '#0EA5E9', marginBottom: '0.5rem' }}>Henry</h3>
                            <span style={{
                                display: 'inline-block', background: '#0EA5E9', color: 'white',
                                borderRadius: '9999px', padding: '0.35rem 1rem', fontSize: '0.85rem',
                                fontWeight: '700', letterSpacing: '0.03em'
                            }}>🍖 Thinks between snacks</span>
                        </div>
                    </div>

                    {/* Blurb text */}
                    <div style={{ maxWidth: '760px', margin: '0 auto 3rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '1.2rem', color: '#1e293b', lineHeight: '1.9', marginBottom: '1.25rem' }}>
                            Two Yorkshire Terrier brothers who couldn't be more different — together, they make the <strong>perfect team.</strong>
                        </p>
                        <p style={{ fontSize: '1.2rem', color: '#1e293b', lineHeight: '1.9', marginBottom: '1.25rem' }}>
                            Hidden in their garden is a secret tunnel — and on the other side lies the{' '}
                            <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.3rem', color: '#C07848', fontWeight: '700' }}>Wild Place</span>.
                            {' '}A vast, untamed African savannah where the creatures are wild, the friendships are unexpected, and every adventure is bigger than they are.
                        </p>
                        <p style={{ fontSize: '1.2rem', color: '#1e293b', lineHeight: '1.9' }}>
                            In every story, Frankie and Henry are led to a new corner of the Wild Place by animals who need their help, and discover that <strong>courage and kindness matter far more than size.</strong>
                        </p>
                    </div>

                    {/* Pull quote */}
                    <div style={{
                        maxWidth: '700px', margin: '0 auto 2.5rem',
                        padding: '2.5rem 3rem',
                        background: 'rgba(255,255,255,0.6)',
                        borderRadius: '2rem',
                        border: '2px solid rgba(255,255,255,0.8)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
                    }}>
                        <div style={{ fontSize: '5rem', lineHeight: '0.5', color: '#C07848', fontFamily: 'Georgia, serif', marginBottom: '1rem' }}>"</div>
                        <p style={{
                            fontFamily: 'Fredoka, sans-serif', fontSize: '1.7rem', fontWeight: '600',
                            color: '#1e293b', lineHeight: '1.4', fontStyle: 'italic', marginBottom: '1rem'
                        }}>
                            Because the bravest hearts have always come in the smallest packages.
                        </p>
                        <div style={{ fontSize: '5rem', lineHeight: '0.3', color: '#C07848', fontFamily: 'Georgia, serif', textAlign: 'right' }}>"</div>
                    </div>

                    {/* Age badge */}
                    <div style={{
                        display: 'inline-block', background: '#E11D48', color: 'white',
                        borderRadius: '9999px', padding: '0.6rem 2rem',
                        fontSize: '1.1rem', fontWeight: '800', fontFamily: 'Fredoka, sans-serif',
                        letterSpacing: '0.05em', boxShadow: '0 4px 0 #9f0a25'
                    }}>
                        🌍 The perfect adventure series for kids ages 4–8
                    </div>
                </div>

                {/* Bring the adventure home */}
                <div className="text-center mb-16">
                    <h2 className="heading-lg mb-8">Bring the adventure home</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {/* Amazon */}
                        <div className="card p-6 flex flex-col items-center text-center">
                            <h3 className="text-xl font-bold mb-2">Amazon</h3>
                            <p className="text-sm text-gray-500 mb-6">Order worldwide via Amazon (Paperback + Kindle).</p>
                            <button className="btn btn-primary w-full mt-auto">Buy on Amazon</button>
                        </div>

                        {/* Trailer */}
                        <div className="card p-6 flex flex-col items-center text-center">
                            <h3 className="text-xl font-bold mb-2">Watch the Trailer</h3>
                            <p className="text-sm text-gray-500 mb-6">See scenes from the book come to life in a short animated trailer.</p>
                            <a
                                href="https://youtube.com/shorts/ENIGcnIv3zA?si=VKswWHqP9PnqllKR"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline w-full mt-auto flex items-center justify-center gap-2"
                            >
                                <Youtube size={18} /> Watch on YouTube
                            </a>
                        </div>
                    </div>
                </div>

                {/* Socials & Newsletter */}
                <div className="bg-blue-100 rounded-3xl p-8 text-center mb-16 max-w-4xl mx-auto" style={{ background: 'rgba(255,255,255,0.55)', border: '2px solid rgba(255,255,255,0.7)' }}>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="text-left">
                            <h3 className="text-xl font-bold">Follow the magic</h3>
                            <p className="text-gray-600">See more fun clips and photos of Frankie & Henry!</p>
                        </div>
                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/frankieandhenrybooks?igsh=dDFtM3duc3BydnFt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn bg-pink-500 text-white hover:bg-pink-600 flex gap-2"
                                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                            >
                                <Instagram size={18} /> Instagram
                            </a>
                            <a
                                href="https://www.tiktok.com/@frankieandhenrybooks?_r=1&_t=ZP-93Yma6TrgfX"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn bg-black text-white hover:bg-gray-800 flex gap-2"
                                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                                </svg>
                                TikTok
                            </a>
                        </div>
                    </div>
                </div>

                <div id="newsletter" className="bg-gray-100 rounded-3xl p-12 text-center max-w-4xl mx-auto" style={{ background: 'rgba(255,255,255,0.55)', border: '2px solid rgba(255,255,255,0.7)' }}>
                    <h2 className="heading-lg mb-4">More adventures are coming...</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        We'll only email when there's something genuinely exciting to share - new books, printables, or fun extras your little readers will love. No spam, ever. Just paws, stories, and a bit of magic.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input type="email" placeholder="Email" className="flex-1 px-4 py-3 rounded-full border border-gray-300 outline-none focus:border-blue-500" />
                        <button className="btn btn-primary">Join the pack</button>
                    </div>
                    <p className="text-xs text-gray-400 mt-4">We respect your privacy. Unsubscribe at any time.</p>
                </div>
            </div>
        </section>
    );
}
