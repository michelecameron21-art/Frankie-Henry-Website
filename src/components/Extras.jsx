import { Search, Palette, Bookmark, Download, Sparkles } from 'lucide-react';

const extras = [
    {
        id: 1,
        title: 'Spot the Friends',
        type: 'Activity sheet',
        description: 'Find Frankie, Henry, and all their Wild Place friends.',
        icon: <Search size={32} className="text-blue-500" />,
        badge: 'New',
        color: 'bg-blue-100',
        typeColor: 'bg-blue-600',
        btnColor: 'bg-yellow-400'
    },
    {
        id: 2,
        title: 'Colour the Pups',
        type: 'Colouring pages',
        description: 'Bring Frankie & Henry to life with your favorite colors.',
        icon: <Palette size={32} className="text-yellow-600" />,
        badge: null,
        color: 'bg-yellow-100',
        typeColor: 'bg-yellow-600',
        btnColor: 'bg-yellow-400'
    },
    {
        id: 3,
        title: 'Little Paws Markers',
        type: 'Bookmarks',
        description: 'Printable bookmarks to keep your place in the adventure.',
        icon: <Bookmark size={32} className="text-teal-600" />,
        badge: null,
        color: 'bg-teal-100', // teal-100 isn't standard in my css vars but I'll use inline or class
        typeColor: 'bg-teal-600',
        btnColor: 'bg-yellow-400'
    }
];

export default function Extras() {
    return (
        <section id="extras" className="section extras-section" style={{ paddingTop: '1rem' }}>
            <div className="container">
                <div className="text-center mb-12">
                    <p style={{ color: '#5A7A3A', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Free Extras</p>
                    <h2 className="heading-lg">Print, colour, play</h2>
                </div>

                <div className="extras-grid">
                    {extras.map((item) => (
                        <ExtraCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ExtraCard({ item }) {
    return (
        <div className={`card extra-card ${item.color.replace('bg-', 'bg-light-')}`}>
            {/* Note: using inline styles for dynamic bg colors since we don't have full tailwind */}
            <div className="extra-card-content" style={{ backgroundColor: getBgColor(item.id) }}>
                <div className="extra-header">
                    <div className="extra-icon-circle">
                        {item.icon}
                    </div>
                    {item.badge && (
                        <span className="badge-new flex items-center gap-1">
                            <Sparkles size={12} fill="currentColor" /> {item.badge} <Sparkles size={12} fill="currentColor" />
                        </span>
                    )}
                </div>


                <span className={`extra-type-badge ${getTypeColorClass(item.id)}`}>{item.type}</span>

                <h3 className="extra-title">{item.title}</h3>
                <p className="extra-desc">{item.description}</p>

                <button className="btn btn-primary w-full mt-auto">
                    Download PDF
                </button>
            </div>
        </div>
    );
}

// Helper for inline styles/classes since we aren't using full Tailwind
function getBgColor(id) {
    if (id === 1) return '#E8F5D8'; // Light acacia
    if (id === 2) return '#FFF0D0'; // Warm sandy yellow
    if (id === 3) return '#D0EAC8'; // Deeper acacia
    return '#E8F5D8';
}

function getTypeColorClass(id) {
    if (id === 1) return 'type-blue';
    if (id === 2) return 'type-yellow';
    if (id === 3) return 'type-teal';
    return '';
}
