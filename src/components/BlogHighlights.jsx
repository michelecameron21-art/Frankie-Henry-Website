import blogPosts from '../data/blogPosts';

// Homepage "From the Blog" section. Its whole job is SEO: it puts DIRECT links
// from the homepage (the most-crawled, highest-authority page) to individual
// blog posts, so Google has a strong path to crawl and index them, rather than
// relying only on the /blog index page. Shows the 6 most recent posts.
function BlogHighlights() {
    const posts = [...blogPosts]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);

    return (
        <section
            aria-labelledby="blog-highlights-heading"
            style={{ background: '#FFF1F2', padding: 'clamp(3rem, 6vw, 5rem) 0' }}
        >
            <div className="container">
                <h2
                    id="blog-highlights-heading"
                    style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                        fontWeight: 700,
                        color: '#78350F',
                        textAlign: 'center',
                        marginBottom: '0.5rem',
                    }}
                >
                    Stories from the Wild Place
                </h2>
                <p
                    style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontSize: '1.05rem',
                        color: '#A85830',
                        textAlign: 'center',
                        maxWidth: '46ch',
                        margin: '0 auto 2.5rem',
                        lineHeight: 1.6,
                    }}
                >
                    Reading tips, safari facts, and adventures for little book-lovers,
                    from the world of Frankie &amp; Henry.
                </p>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    {posts.map(post => (
                        <a
                            key={post.id}
                            href={`/blog/${post.id}`}
                            style={{
                                display: 'block',
                                background: '#FFFFFF',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                border: '3px solid #FBCFE8',
                                textDecoration: 'none',
                                color: 'inherit',
                                boxShadow: '0 6px 0 rgba(251, 207, 232, 0.6)',
                                transition: 'transform 0.18s, box-shadow 0.18s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 10px 0 rgba(251, 207, 232, 0.6)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 6px 0 rgba(251, 207, 232, 0.6)';
                            }}
                        >
                            <img
                                src={post.image}
                                alt={post.imageAlt}
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: '170px',
                                    objectFit: 'cover',
                                    objectPosition: post.imagePosition || 'center 30%',
                                    display: 'block',
                                }}
                            />
                            <div style={{ padding: '1.1rem 1.35rem 1.4rem' }}>
                                <h3
                                    style={{
                                        fontFamily: "'Fredoka', sans-serif",
                                        fontSize: '1.15rem',
                                        fontWeight: 700,
                                        color: '#78350F',
                                        lineHeight: 1.3,
                                        margin: '0 0 0.5rem',
                                    }}
                                >
                                    {post.title}
                                </h3>
                                <p
                                    style={{
                                        fontFamily: "'Nunito', sans-serif",
                                        fontSize: '0.92rem',
                                        color: '#5C4033',
                                        lineHeight: 1.55,
                                        margin: 0,
                                    }}
                                >
                                    {post.excerpt.length > 115
                                        ? post.excerpt.slice(0, 115).trim() + '…'
                                        : post.excerpt}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                    <a
                        href="/blog"
                        style={{
                            display: 'inline-block',
                            fontFamily: "'Fredoka', sans-serif",
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            background: '#FFD200',
                            color: '#78350F',
                            padding: '0.75rem 2.25rem',
                            borderRadius: '9999px',
                            textDecoration: 'none',
                            boxShadow: '0 4px 0 #B8960A',
                        }}
                    >
                        Read all our stories
                    </a>
                </div>
            </div>
        </section>
    );
}

export default BlogHighlights;
