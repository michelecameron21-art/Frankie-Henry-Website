export default function MeetTheBrothers() {
    return (
        <section id="meet-brothers" className="section" style={{ background: 'linear-gradient(to bottom, #D4906A 0%, #C07848 100%)', paddingBottom: '4rem' }}>
            <div className="container">
                <div className="text-center">
                    <h2 className="heading-lg" style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '3rem', color: '#FFD200', marginBottom: '3rem' }}>
                        Meet the Real Frankie and Henry
                    </h2>

                    {/* Real photo */}
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div style={{
                            width: '100%', maxWidth: '620px', aspectRatio: '620/460', borderRadius: '2rem', overflow: 'hidden',
                            margin: '0 auto 1.25rem', border: '6px solid rgba(255,255,255,0.6)',
                            boxShadow: '0 12px 32px rgba(0,0,0,0.25)'
                        }}>
                            <img src="/assets/real-frankie-henry.jpg" alt="The real Frankie and Henry" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                        </div>
                        <span style={{
                            display: 'inline-block', background: 'rgba(255,255,255,0.25)', color: 'white',
                            borderRadius: '9999px', padding: '0.4rem 1.25rem', fontSize: '0.95rem',
                            fontWeight: '700', letterSpacing: '0.03em', border: '2px solid rgba(255,255,255,0.5)'
                        }}>The inspiration behind it all</span>
                    </div>

                    {/* Blurb text */}
                    <div style={{ maxWidth: '760px', margin: '0 auto 2.5rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '1.2rem', color: 'white', lineHeight: '1.9', marginBottom: '1.25rem' }}>
                            Frankie and Henry are two Yorkshire Terrier brothers who couldn't be more different. Frankie loves adventure and charges in headfirst. Henry thinks it through (between snacks). Together, they make the <strong>perfect team.</strong>
                        </p>
                        <p style={{ fontSize: '1.2rem', color: 'white', lineHeight: '1.9', marginBottom: '1.25rem' }}>
                            Hidden in their garden is a secret tunnel — and on the other side lies the{' '}
                            <span style={{ fontFamily: 'Fredoka, sans-serif', fontSize: '1.3rem', color: '#FDE047', fontWeight: '700' }}>Wild Place</span>.
                            {' '}A vast, untamed African savannah where the creatures are wild, the friendships are unexpected, and every adventure is bigger than they are.
                        </p>
                        <p style={{ fontSize: '1.2rem', color: 'white', lineHeight: '1.9', marginBottom: '1.5rem' }}>
                            In every story, Frankie and Henry are led to a new corner of the Wild Place by animals who need their help, and discover that <strong>courage and kindness matter far more than size.</strong>
                        </p>
                        <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '2rem' }}>
                            Because the bravest hearts have always come in the smallest packages.
                        </p>

                        {/* Age badge */}
                        <div style={{
                            display: 'inline-block', background: '#FFD200', color: '#78350F',
                            borderRadius: '9999px', padding: '0.6rem 2rem',
                            fontSize: '1.1rem', fontWeight: '800', fontFamily: 'Fredoka, sans-serif',
                            letterSpacing: '0.05em', boxShadow: '0 4px 0 #B8960A'
                        }}>
                            The perfect adventure series for kids ages 4–8
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
