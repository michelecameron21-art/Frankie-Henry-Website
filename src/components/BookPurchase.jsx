const STORES = {
    UK: { paperback: 'https://www.amazon.co.uk/dp/1067638504', kindle: 'https://www.amazon.co.uk/dp/B0GTVVPPH6' },
    US: { paperback: 'https://www.amazon.com/dp/1067638504', kindle: 'https://www.amazon.com/dp/B0GTVVPPH6' },
};

function trackPurchaseClick(country, format, placement) {
    // Count store visits, never purchases. Only record these events with consent.
    try {
        if (localStorage.getItem('fh-cookie-consent') === 'accepted' && typeof window.gtag === 'function') {
            window.gtag('event', 'amazon_click', { country, book_format: format, placement });
        }
    } catch {
        // Storage restrictions must never prevent a reader opening the book.
    }
}

export default function BookPurchase({ compact = false, placement = 'book' }) {
    function storeLink(country, format, label, primary = false) {
        return <a href={STORES[country][format]} target="_blank" rel="noopener noreferrer"
            className={primary ? 'book-buy-button' : 'book-format-link'}
            onClick={() => trackPurchaseClick(country, format, placement)}>{label}</a>;
    }

    if (compact) return (
        <div className="book-purchase-compact">
            <p>A picture book for ages 4–8</p>
            {storeLink('UK', 'paperback', 'UK paperback · £7.99', true)}
            <a className="book-other-options" href="/the-brave-river-rescue#buy">Kindle &amp; US buying options</a>
        </div>
    );

    return (
        <div id="buy" className="book-purchase" aria-label="Choose your book format and Amazon store">
            <h3>Bring the adventure home</h3>
            <p>40 illustrated pages · ages 4–8</p>
            {storeLink('UK', 'paperback', 'UK paperback · £7.99', true)}
            <div className="book-store-options">
                {storeLink('UK', 'kindle', 'UK Kindle edition')}
                <span>Shopping in the United States?</span>
                <div>{storeLink('US', 'paperback', 'US paperback')}<span aria-hidden="true"> · </span>{storeLink('US', 'kindle', 'US Kindle')}</div>
            </div>
            <p className="book-price-note">Opens Amazon. Price checked 6 September 2026; current price and delivery shown at checkout.</p>
        </div>
    );
}
