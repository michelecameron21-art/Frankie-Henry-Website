import blogPosts from '../data/blogPosts';

function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function BlogPost({ slug }) {
    const post = blogPosts.find(p => p.id === slug);
    const relatedPosts = post
        ? blogPosts.filter(p => p.id !== post.id).slice(0, 3)
        : [];

    if (!post) {
        return (
            <section style={{ background: '#C07848', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <h1 style={{
                        fontFamily: "'Fredoka', sans-serif",
                        fontSize: '2rem',
                        color: '#FFD200',
                        marginBottom: '1rem',
                    }}>
                        Post Not Found
                    </h1>
                    <p style={{
                        fontFamily: "'Nunito', sans-serif",
                        color: 'rgba(255,255,255,0.85)',
                        marginBottom: '2rem',
                    }}>
                        Sorry, we couldn't find that story. It might have wandered off into the Wild Place!
                    </p>
                    <a
                        href="#blog"
                        style={{
                            fontFamily: "'Fredoka', sans-serif",
                            fontWeight: 600,
                            color: '#FFD200',
                            textDecoration: 'none',
                        }}
                    >
                        &larr; Back to Blog
                    </a>
                </div>
            </section>
        );
    }

    return (
        <section className="blog-post-section" style={{ background: '#C07848', minHeight: '100vh' }}>
            <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>

                {/* Back to Blog link */}
                <a
                    href="#blog"
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
                    &larr; Back to Blog
                </a>

                <article className="blog-post">
                    {/* Hero image */}
                    <img
                        src={post.image}
                        alt={post.imageAlt}
                        style={{
                            width: '100%',
                            height: '350px',
                            objectFit: 'cover',
                            objectPosition: post.imagePosition || 'center 30%',
                            borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                        }}
                    />

                    <div className="blog-post-body">
                        {/* Meta */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginBottom: '1rem',
                            flexWrap: 'wrap',
                        }}>
                            <time style={{
                                fontFamily: "'Nunito', sans-serif",
                                fontSize: '0.9rem',
                                color: '#A85830',
                                fontWeight: 600,
                            }}>
                                {formatDate(post.date)}
                            </time>
                            <span style={{
                                fontFamily: "'Nunito', sans-serif",
                                fontSize: '0.9rem',
                                color: '#A85830',
                                fontWeight: 600,
                            }}>
                                by {post.author}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 style={{
                            fontFamily: "'Fredoka', sans-serif",
                            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                            fontWeight: 700,
                            color: '#78350F',
                            lineHeight: 1.25,
                            marginBottom: '1.5rem',
                        }}>
                            {post.title}
                        </h1>

                        {/* Content */}
                        <div
                            className="blog-post-content"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Buy the Book CTA */}
                        <div style={{
                            marginTop: '3rem',
                            padding: '2rem',
                            background: 'rgba(192, 120, 72, 0.15)',
                            borderRadius: 'var(--radius-lg)',
                            textAlign: 'center',
                            border: '2px solid rgba(192, 120, 72, 0.2)',
                        }}>
                            <p style={{
                                fontFamily: "'Fredoka', sans-serif",
                                fontSize: '1.3rem',
                                fontWeight: 700,
                                color: '#78350F',
                                marginBottom: '0.5rem',
                            }}>
                                Ready for an adventure?
                            </p>
                            <p style={{
                                fontFamily: "'Nunito', sans-serif",
                                fontSize: '1rem',
                                color: '#5C4033',
                                marginBottom: '1.25rem',
                                lineHeight: 1.6,
                            }}>
                                Join Frankie and Henry on their brave river rescue — available now in Kindle and paperback.
                            </p>
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
                                    padding: '0.75rem 2.5rem',
                                    borderRadius: '9999px',
                                    textDecoration: 'none',
                                    boxShadow: '0 4px 0 #B8960A',
                                    transition: 'transform 0.15s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                Buy the Book
                            </a>
                        </div>

                        {/* Related Posts — internal linking for SEO */}
                        {relatedPosts.length > 0 && (
                            <div style={{ marginTop: '3rem' }}>
                                <h2 style={{
                                    fontFamily: "'Fredoka', sans-serif",
                                    fontSize: '1.6rem',
                                    fontWeight: 700,
                                    color: '#78350F',
                                    marginBottom: '1.5rem',
                                    textAlign: 'center',
                                }}>
                                    More from the Wild Place
                                </h2>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                                    gap: '1.25rem',
                                }}>
                                    {relatedPosts.map(rp => (
                                        <a
                                            key={rp.id}
                                            href={`#blog/${rp.id}`}
                                            style={{
                                                display: 'block',
                                                background: 'rgba(255, 255, 255, 0.6)',
                                                borderRadius: 'var(--radius-lg)',
                                                overflow: 'hidden',
                                                border: '2px solid rgba(192, 120, 72, 0.25)',
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                transition: 'transform 0.2s, box-shadow 0.2s',
                                            }}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.transform = 'translateY(-3px)';
                                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(120, 53, 15, 0.15)';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        >
                                            <img
                                                src={rp.image}
                                                alt={rp.imageAlt}
                                                loading="lazy"
                                                style={{
                                                    width: '100%',
                                                    height: '140px',
                                                    objectFit: 'cover',
                                                    objectPosition: rp.imagePosition || 'center 30%',
                                                }}
                                            />
                                            <div style={{ padding: '1rem 1.25rem 1.25rem' }}>
                                                <h3 style={{
                                                    fontFamily: "'Fredoka', sans-serif",
                                                    fontSize: '1.05rem',
                                                    fontWeight: 700,
                                                    color: '#78350F',
                                                    lineHeight: 1.3,
                                                    marginBottom: '0.5rem',
                                                }}>
                                                    {rp.title}
                                                </h3>
                                                <p style={{
                                                    fontFamily: "'Nunito', sans-serif",
                                                    fontSize: '0.9rem',
                                                    color: '#5C4033',
                                                    lineHeight: 1.5,
                                                    margin: 0,
                                                }}>
                                                    {rp.excerpt.length > 110 ? rp.excerpt.slice(0, 110).trim() + '…' : rp.excerpt}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </section>
    );
}

export default BlogPost;
