// Visible FAQ section: the questions and answers here mirror the FAQPage
// structured data in index.html exactly. If you change one, change the other.
const FAQS = [
    {
        q: 'What age is Frankie and Henry: The Brave River Rescue for?',
        a: 'It is a picture book written for children ages 4 to 8. It works beautifully as a read-aloud for younger children and as an early independent read for kids ages 6 to 8.',
    },
    {
        q: 'Where can I buy Frankie and Henry: The Brave River Rescue?',
        a: <>The book is available on Amazon in both Kindle and Paperback. You can find it at <a href="https://www.amazon.com/dp/B0GTVVPPH6" target="_blank" rel="noopener noreferrer" style={{ color: '#A85830', fontWeight: 700 }}>amazon.com/dp/B0GTVVPPH6</a>.</>,
    },
    {
        q: 'What is the book about?',
        a: 'It is an African safari adventure picture book about two Yorkshire Terrier brothers, Frankie and Henry, who discover a magical world called the Wild Place. They meet real African animals like blue cranes, monitor lizards, martial eagles and black-backed jackals, and must find the courage to rescue a lost jackal cub by the river. It is a story about friendship, bravery and brave hearts in small packages.',
    },
    {
        q: 'What does the book teach children?',
        a: 'The story shows children two kinds of courage. Frankie charges in headfirst, while Henry is scared but shows up anyway. Young readers learn that being brave does not mean being fearless, alongside gentle lessons about helping others, teamwork and never leaving family behind.',
    },
    {
        q: 'Is the book good for bedtime or reading aloud?',
        a: 'Yes. The book was written specifically to read well out loud. Each character has a distinct voice, the rhythm is paced for ten-minute reading sessions, and the story lands gently at the end so little readers can drift off peacefully.',
    },
    {
        q: 'Are Frankie and Henry real dogs?',
        a: 'Yes. Frankie and Henry are two real Yorkshire Terriers who inspired the book. The story grew out of the walks the author used to take with them, and their real personalities are at the heart of the book. Frankie is the fearless one and Henry is the thoughtful one.',
    },
    {
        q: 'Are there free activities to go with the book?',
        a: <>Yes! Right here on this website you will find free safari <a href="#extras" style={{ color: '#A85830', fontWeight: 700 }}>colouring pages</a>, <a href="#characters" style={{ color: '#A85830', fontWeight: 700 }}>character profiles</a>, a theme song sing-along, and the <a href="#game" style={{ color: '#A85830', fontWeight: 700 }}>Rescue Run browser game</a>, all free to enjoy alongside the book.</>,
    },
];

function Faq() {
    return (
        <section id="faq" style={{ background: '#FFF1F2', padding: '4rem 1.5rem' }}>
            <div style={{ maxWidth: '820px', margin: '0 auto' }}>
                <h2 style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                    fontWeight: 700,
                    color: '#78350F',
                    textAlign: 'center',
                    marginBottom: '0.75rem',
                }}>
                    Questions Parents Ask
                </h2>
                <p style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: '1.1rem',
                    color: '#5C4033',
                    textAlign: 'center',
                    maxWidth: '560px',
                    margin: '0 auto 2.5rem',
                    lineHeight: 1.6,
                }}>
                    Everything you might want to know about the book before you bring Frankie and Henry home.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {FAQS.map((item) => (
                        <details
                            key={item.q}
                            style={{
                                background: 'white',
                                borderRadius: 'var(--radius-lg, 32px)',
                                border: '3px solid #F4E4D4',
                                boxShadow: '8px 8px 16px rgba(136, 19, 55, 0.08), inset 2px 2px 4px rgba(255, 255, 255, 1)',
                                padding: '1.1rem 1.5rem',
                            }}
                        >
                            <summary style={{
                                fontFamily: "'Fredoka', sans-serif",
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                color: '#78350F',
                                cursor: 'pointer',
                                listStylePosition: 'inside',
                            }}>
                                {item.q}
                            </summary>
                            <p style={{
                                fontFamily: "'Nunito', sans-serif",
                                fontSize: '1rem',
                                color: '#5C4033',
                                lineHeight: 1.7,
                                marginTop: '0.75rem',
                                marginBottom: 0,
                            }}>
                                {item.a}
                            </p>
                        </details>
                    ))}
                </div>

                <p style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: '1rem',
                    color: '#5C4033',
                    textAlign: 'center',
                    marginTop: '2rem',
                }}>
                    Still curious? Say hello at{' '}
                    <a href="mailto:hello@frankiehenryadventures.com" style={{ color: '#A85830', fontWeight: 700 }}>
                        hello@frankiehenryadventures.com
                    </a>
                </p>
            </div>
        </section>
    );
}

export default Faq;
