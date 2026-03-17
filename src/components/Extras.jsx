import { Search, Palette, Music, Download, Sparkles } from 'lucide-react';

const extras = [
    {
        id: 1,
        title: 'Colour the Wild Place',
        type: 'Colouring pages',
        description: 'Bring Frankie, Henry and their Wild Place friends to life with your favourite colours.',
        icon: <Palette size={32} className="text-yellow-600" />,
        badge: null,
        color: 'bg-yellow-100',
        typeColor: 'bg-yellow-600',
        btnColor: 'bg-yellow-400'
    },
    {
        id: 2,
        title: 'Spot the Difference',
        type: 'Activity sheet',
        description: 'Can you find what\'s changed? Spot the differences with Frankie and Henry.',
        icon: <Search size={32} className="text-blue-500" />,
        badge: null,
        color: 'bg-blue-100',
        typeColor: 'bg-blue-600',
        btnColor: 'bg-yellow-400'
    },
    {
        id: 3,
        title: 'Sing Along',
        type: 'Sing along',
        description: 'Join Frankie and Henry and sing along to their Wild Place adventures.',
        icon: <Music size={32} className="text-teal-600" />,
        badge: null,
        color: 'bg-teal-100',
        typeColor: 'bg-teal-600',
        btnColor: 'bg-yellow-400'
    }
];

export default function Extras() {
    return (
        <section id="extras" className="section extras-section" style={{ paddingTop: '1rem' }}>
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="heading-lg">Colour, play, sing along</h2>
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

function getBgColor(id) {
    if (id === 1) return '#FFF0D0';
    if (id === 2) return '#E8F5D8';
    if (id === 3) return '#D0EAC8';
    return '#E8F5D8';
}

function getTypeColorClass(id) {
    if (id === 1) return 'type-yellow';
    if (id === 2) return 'type-blue';
    if (id === 3) return 'type-teal';
    return '';
}
