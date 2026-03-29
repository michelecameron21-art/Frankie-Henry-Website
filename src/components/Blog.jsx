import blogPosts from '../data/blogPosts';

function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function Blog() {
    return (
        <section className="blog-section" style={{ background: '#C07848', minHeight: '100vh' }}>
            {/* SEO meta description is handled via document.head in the effect below */}
            <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>

                {/* Back to Home link */}
                <a
                    href="#"
                    style={{
                        display: 'inline-block',
                        marginBottom: '2rem',
                        color: '#FFD200',
                        fontFamily: "'Fredoka', sans-serif",
                        fontWeight: 600,
                        fontSize: '1rem',
                        textDecoration: 'none',
                    }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                >
                    &larr; Back to Home
                </a>

                <h1 style={{
                    fontFamily: "'Fredoka', sans-serif",
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: 700,
                    color: '#FFD200',
                    textAlign: 'center',
                    marginBottom: '0.75rem',
                }}>
                    Stories from the Wild Place
                </h1>
                <p style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontSize: '1.15rem',
                    color: 'rgba(255, 255, 255, 0.85)',
                    textAlign: 'center',
                    maxWidth: '600px',
                    margin: '0 auto 2.5rem',
                    lineHeight: 1.6,
                }}>
                    News, behind-the-scenes stories, and adventures from the world of Frankie &amp; Henry.
                </p>

                <div className="blog-grid">
                    {blogPosts.map(post => (
                        <a
                            key={post.id}
                            href={`#blog/${post.id}`}
                            className="blog-card"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className="blog-card-image">
                                <img
                                    src={post.image}
                                    alt={post.imageAlt}
                                    style={{
                                        width: '100%',
                                        height: '220px',
                                        objectFit: 'cover',
                                        objectPosition: 'center 30%',
                                        borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                                    }}
                                />
                            </div>
                            <div className="blog-card-body">
                                <time style={{
                                    fontFamily: "'Nunito', sans-serif",
                                    fontSize: '0.85rem',
                                    color: '#A85830',
                                    fontWeight: 600,
                                }}>
                                    {formatDate(post.date)}
                                </time>
                                <h2 style={{
                                    fontFamily: "'Fredoka', sans-serif",
                                    fontSize: '1.35rem',
                                    fontWeight: 700,
                                    color: '#78350F',
                                    margin: '0.5rem 0',
                                    lineHeight: 1.3,
                                }}>
                                    {post.title}
                                </h2>
                                <p style={{
                                    fontFamily: "'Nunito', sans-serif",
                                    fontSize: '0.95rem',
                                    color: '#5C4033',
                                    lineHeight: 1.6,
                                    marginBottom: '1rem',
                                }}>
                                    {post.excerpt}
                                </p>
                                <span style={{
                                    fontFamily: "'Fredoka', sans-serif",
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    color: '#A85830',
                                }}>
                                    Read More &rarr;
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Blog;
