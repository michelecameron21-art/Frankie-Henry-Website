// Playful "sticker" badge that sits on the hero beside Henry.
// Tapping it scrolls down to the #free-book email-capture section.
export default function FreeBookBadge() {
    return (
        <a
            href="#free-book"
            className="free-book-badge"
            aria-label="Read the whole picture book for free. Get your free copy."
        >
            <span className="free-book-badge-inner">
                <span className="fb-small">READ THE</span>
                <span className="fb-small">WHOLE BOOK</span>
                <span className="fb-big">FREE</span>
                <span className="fb-tap">tap to read &rarr;</span>
            </span>
        </a>
    );
}
