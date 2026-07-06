import { useEffect, useState } from 'react';
import blogPosts from '../data/blogPosts';

// Blog thumbnail: wide images fill the card (cover); tall/portrait images
// (book cover, close-up faces, standing animals) show in full over a soft
// blurred fill of themselves, so nothing is ever cropped. The fit is chosen
// automatically from each image's real shape once it loads.
function BlogCardImage({ post }) {
    const [tall, setTall] = useState(false);
    return (
        <div className="blog-card-image" style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', overflow: 'hidden', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', background: '#FFF1F2' }}>
            {tall && (
                <div aria-hidden="true" style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${post.image})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'blur(16px)', transform: 'scale(1.15)', opacity: 0.5,
                }} />
            )}
            <img
                src={post.image}
                alt={post.imageAlt}
                loading="lazy"
                onLoad={(e) => { setTall((e.target.naturalWidth / e.target.naturalHeight) < 1.25); }}
                style={{
                    position: 'relative', zIndex: 1,
                    width: '100%', height: '100%',
                    objectFit: tall ? 'contain' : 'cover',
                    objectPosition: post.imagePosition || 'center center',
                    display: 'block',
                }}
            />
        </div>
    );
}

function formatDate(dateStr) {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function Blog() {
    useEffect(() => {
        document.title = 'Stories from the Wild Place | Frankie & Henry Adventures Blog';
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', 'Blog posts about Frankie and Henry, Yorkshire Terrier adventures, African safari stories, courage, read-aloud picture books, and free activities for children ages 4-8.');
        return () => {
            document.title = "Frankie & Henry | Yorkshire Terrier Safari Adventure Book for Kids Ages 4-8";
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', "A Yorkshire Terrier children's book with heart. Join Frankie and Henry, two brave little Yorkies, on a safari picture book adventure for ages 4-8. This dog adventure book for kids is on Amazon in Kindle and Paperback, plus free games and colouring pages here.");
        };
    }, []);

    return (
        <section className="blog-section" style={{ background: '#C07848', minHeight: '100vh' }}>
            {/* SEO meta description is handled via document.head in the effect below */}
            <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>

                {/* Back to Home link */}
                <a
                    href="/"
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
                    {[...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1)).map(post => (
                        <a
                            key={post.id}
                            href={`/blog/${post.id}`}
                            className="blog-card"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className="blog-card-image" style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', overflow: 'hidden', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', background: '#FFF1F2' }}>
                                {/* Blurred fill of the same image so nothing is ever cropped */}
                                <div aria-hidden="true" style={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundImage: `url(${post.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    filter: 'blur(20px)',
                                    transform: 'scale(1.15)',
                                    opacity: 0.55,
                                }} />
                                <img
                                    src={post.image}
                                    alt={post.imageAlt}
                                    loading="lazy"
                                    style={{
                                        position: 'relative',
                                        zIndex: 1,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        objectPosition: 'center',
                                        display: 'block',
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
