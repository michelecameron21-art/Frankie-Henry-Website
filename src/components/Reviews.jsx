import { Star } from 'lucide-react';

const reviews = [
    {
        text: "This looks just like a Disney or DreamWorks movie. It truly is a AAA quality picture book for children.",
        author: "Amazon Reader",
    },
    {
        text: "I absolutely loved reading about Frankie and Henry's adventures! The storytelling is warm and engaging, and the beautiful illustrations truly bring their journey to life. A perfect children's book and a fantastic addition to any family's bookshelf.",
        author: "Amazon Reader",
    },
    {
        text: "An excellent children's book that teaches great lessons about courage and helping others. My niece was glued to the pages!",
        author: "Amazon Reader",
    },
    {
        text: "The vibrantly coloured pictures and the expressions on Frankie and Henry's faces are brilliant. They are already asking for the next adventure!",
        author: "Amazon Reader",
    },
    {
        text: "A thrilling adventure with a great message. The setting is unique and well-described. We're looking forward to seeing where these two go next!",
        author: "Amazon Reader",
    },
    {
        text: "Wonderful pictures for the kids to see the animals adventures and a fun story that kept my grandchildren interested and engaged. I can highly recommend this book.",
        author: "Amazon Reader",
    },
    {
        text: "What a fabulous book with very cute characters and a wonderful underlying message of bravery. An excellent buy and can't wait for the next book.",
        author: "Amazon Reader",
    },
    {
        text: "My 4-year old absolutely loved this book! He loved the Frankie & Henry characters as well as their adventure. We hope there will be more adventures for these two!",
        author: "Amazon Reader",
    },
    {
        text: "Fab book, great story and wonderful illustrations. Really looking forward to the next adventure!",
        author: "Amazon Reader",
    },
];

function StarRow() {
    return (
        <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.75rem' }}>
            {[0, 1, 2, 3, 4].map(i => (
                <Star key={i} size={18} fill="#FFD200" color="#FFD200" />
            ))}
        </div>
    );
}

function Reviews() {
    return (
        <section
            id="reviews"
            style={{
                background: 'linear-gradient(180deg, #C07848 0%, #A85830 100%)',
                padding: 'clamp(3rem, 7vw, 6rem) 1.5rem',
                position: 'relative',
            }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
                    <p style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: '#FFD200',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        margin: 0,
                    }}>
                        Loved by Little Adventurers
                    </p>
                    <h2 style={{
                        fontFamily: "'Alfa Slab One', serif",
                        fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
                        color: '#FFF8E7',
                        margin: '0.5rem 0 1rem',
                        textShadow: '2px 2px 8px rgba(0,0,0,0.25)',
                    }}>
                        What Readers Are Saying
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
                        {[0, 1, 2, 3, 4].map(i => (
                            <Star key={i} size={26} fill="#FFD200" color="#FFD200" />
                        ))}
                    </div>
                    <p style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontSize: '1rem',
                        color: 'rgba(255,248,231,0.9)',
                        margin: 0,
                    }}>
                        5.0 average from {reviews.length} Amazon reviews
                    </p>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    {reviews.map((review, idx) => (
                        <div
                            key={idx}
                            style={{
                                background: '#FFF8E7',
                                borderRadius: '24px',
                                padding: '1.75rem 1.5rem',
                                boxShadow: '0 8px 0 rgba(120, 53, 15, 0.25), 0 12px 24px rgba(0,0,0,0.15)',
                                border: '3px solid #FFD200',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <StarRow />
                            <p style={{
                                fontFamily: "'Nunito', sans-serif",
                                fontSize: '1rem',
                                lineHeight: 1.6,
                                color: '#5C4033',
                                margin: '0 0 1.25rem',
                                flex: 1,
                            }}>
                                &ldquo;{review.text}&rdquo;
                            </p>
                            <p style={{
                                fontFamily: "'Fredoka', sans-serif",
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                color: '#A85830',
                                margin: 0,
                            }}>
                                — {review.author}
                            </p>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
                    <a
                        href="https://www.amazon.com/dp/B0GTVVPPH6"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            background: '#FFD200',
                            color: '#78350F',
                            fontFamily: "'Fredoka', sans-serif",
                            fontWeight: 700,
                            fontSize: '1.2rem',
                            padding: '0.85rem 2.5rem',
                            borderRadius: '9999px',
                            textDecoration: 'none',
                            boxShadow: '0 6px 0 #B8960A',
                            transition: 'transform 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        Read More Reviews on Amazon
                    </a>
                    <p style={{
                        marginTop: '0.75rem',
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '0.85rem',
                        color: 'rgba(255,248,231,0.85)',
                        fontWeight: 600,
                    }}>
                        Have you read it? We'd love your review too.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Reviews;
