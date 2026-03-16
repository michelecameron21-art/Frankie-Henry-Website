import { useState } from 'react';
import { Wand2 } from 'lucide-react';

const heroes = [
    {
        id: 'frankie',
        name: 'Frankie',
        tag: 'Brave & Loyal',
        role: 'THE BRAVE LEADER',
        description: 'Always first to leap into action! Frankie loves to run fast and help everyone find their way.',
        color: 'bg-blue-100', // Placeholder class
        accent: '#0EA5E9',
        image: '/assets/frankie.jpg',
        objectPosition: 'center 25%', // Slight adjustments to show ears but not too much sky
        funFact: "Frankie is a yorkshire terrier — yorkshire terriers were bred to chase rats into little tunnels. That’s why Frankie goes from “walkies” to “MISSION!” in two seconds."
    },
    {
        id: 'henry',
        name: 'Henry',
        tag: 'Sweet & Snack-loving',
        role: 'THE SNACK EXPERT',
        description: 'Henry might worry a little bit, but he has the biggest heart (and loves the biggest biscuits!).',
        color: 'bg-yellow-100',
        accent: '#FACC15',
        image: '/assets/henry.jpg',
        objectPosition: 'center 20%',
        scale: 1.25,
        funFact: "Dogs have super noses — they can smell things humans can’t even notice. Henry can basically smell a biscuit… in another postcode."
    },
    {
        id: 'lwazi',
        name: 'Lwazi',
        tag: 'Wise & Observant',
        role: 'THE WISE FLYER',
        description: 'A beautiful blue crane who watches over the Wild Place from high above the trees.',
        color: 'bg-green-100',
        accent: '#4ADE80',
        image: '/assets/lwazi.jpg',
        objectPosition: 'center 25%',
        scale: 1.2,
        funFact: "Blue cranes do happy little “dances” — lots of stepping, bobbing, and wing-flaps. Lwazi’s wings aren’t just for flying… they’re for showing off too!"
    },
    {
        id: 'clawdius',
        name: 'Clawdius',
        tag: 'Mischievous & Cunning',
        role: 'THE SNEAKY CAT',
        description: 'Watch out for Clawdius! He loves mischief, chaos, and hiding in the tallest grass.',
        color: 'bg-red-100',
        accent: '#F87171',
        image: '/assets/clawdius.jpg',
        objectPosition: 'center center',
        objectFit: 'contain',
        funFact: "A cat’s whiskers are like tiny feelers that help them “see” in the dark and squeeze through tight spaces. Perfect tools for a sneaky troublemaker."
    },
    {
        id: 'monitor-lizard',
        name: 'Monitor Lizard',
        tag: 'Stealthy & Strong',
        role: 'THE RIVER BULLY',
        description: 'A big, bossy swimmer who loves sunbathing and sneaking up on snacks. Frankie hopes it stays asleep… forever.',
        color: 'bg-emerald-100',
        accent: '#10B981',
        image: '/assets/monitor.jpg',
        objectPosition: 'center 80%',
        scale: 1.2,
        funFact: "Monitor lizards are brilliant swimmers and can stay underwater for quite a while. And that flicking tongue? It helps them taste the air to find things nearby."
    },
    {
        id: 'martial-eagle',
        name: 'Martial Eagle',
        tag: 'Sharp-eyed & Fearless',
        role: 'THE SKY HUNTER',
        description: 'A powerful eagle who spots everything from way up high. When it shows up, everyone freezes—because it never misses.',
        color: 'bg-slate-200',
        accent: '#475569',
        image: '/assets/eagle.jpg',
        objectPosition: '65% 30%',
        scale: 1.2,
        funFact: "Martial eagles have incredible eyesight — they can spot tiny movement from very far away. And their talons are super strong… strong enough for big grabs (like that branch!)."
    },
    {
        id: 'jackal-mum',
        name: 'Jackal (Mum)',
        tag: 'Gentle & Protective',
        role: 'THE LOVING MUM',
        description: 'Always watching, always worrying, always ready. She’d do anything to keep her little cub safe — and she never forgets a kindness.',
        color: 'bg-orange-100',
        accent: '#F97316',
        image: '/assets/jackal-mum.jpg',
        funFact: "Jackal families are real teams — mums and dads both help look after their pups. A jackal mum is brave, clever, and always watching."
    },
    {
        id: 'jackal-cub',
        name: 'Jackal’s Cub',
        tag: 'Small & Stuck',
        role: 'THE BRAVE LITTLE CUB',
        description: 'A frightened little one who’s in the wrong place at the wrong time. Frankie and Henry have to act fast—because this rescue won’t be easy.',
        color: 'bg-amber-50',
        accent: '#F59E0B',
        image: '/assets/jackal-cub.jpg',
        objectFit: 'contain',
        funFact: "A baby jackal is called a pup. Pups learn fast — how to listen, hide, and run — and Tumi just learned the most important thing: friends can show up when you need them most."
    }
];

export default function SafariHeroes() {
    return (
        <section id="characters" className="section heroes-world-section" style={{ paddingBottom: '3rem' }}>
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="heading-lg">Meet the Characters</h2>
                    <p className="subheading">Meet the team — and the trouble. Tap the magic wands to learn something interesting about each character</p>
                </div>

                <div className="heroes-grid">
                    {heroes.map((hero) => (
                        <HeroCard key={hero.id} hero={hero} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function HeroCard({ hero }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className={`flip-card-container ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlipped(!flipped)}
            style={{ '--hero-accent': hero.accent }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setFlipped(!flipped);
                }
            }}
        >
            <div className="flip-card-inner">
                {/* Front Side */}
                <div className="flip-card-front">
                    <div className="hero-image-placeholder relative overflow-hidden group">
                        {hero.image ? (
                            <img
                                src={hero.image}
                                alt={hero.name}
                                className="character-png"
                                style={{ objectFit: hero.objectFit || 'cover', objectPosition: hero.objectPosition || 'center center', transform: `scale(${hero.scale || 1})`, transformOrigin: 'center center' }}
                            />
                        ) : (
                            <div className="paw-prints" style={{ aspectRatio: '4/3' }}></div>
                        )}

                        <button
                            className="absolute rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:rotate-12 transition-all duration-300 z-20 group-hover:animate-pulse"
                            style={{
                                top: '12px',
                                right: '12px',
                                width: '48px',
                                height: '48px',
                                background: 'linear-gradient(135deg, #FDBA74 0%, #F59E0B 100%)',
                                border: '3px solid white',
                                boxShadow: '0 4px 6px rgba(245, 158, 11, 0.4)'
                            }}
                            aria-label="Reveal secret"
                            onClick={(e) => {
                                // Optional: prevent bubble if needed, but clicking card handles it too
                            }}
                        >
                            <Wand2 size={24} className="text-white drop-shadow-sm" />
                        </button>
                    </div>

                    <div className="hero-content p-6 flex-1 flex flex-col items-center">
                        <h3 className="hero-name text-2xl font-black text-slate-800 mb-2">{hero.name}</h3>
                        <span className="hero-tag inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 mb-4">{hero.tag}</span>

                        <h4 className="hero-role text-xs font-black tracking-widest text-amber-500 uppercase mb-2">{hero.role}</h4>
                        <p className="hero-desc text-slate-600 leading-relaxed text-sm flex-1">{hero.description}</p>
                    </div>
                </div>

                {/* Back Side */}
                <div className="flip-card-back">
                    <Wand2 size={48} className="text-amber-400 mb-4 opacity-50" />
                    <h4 className="fun-fact-heading">Fun Fact</h4>
                    <p className="fun-fact-text">
                        {hero.funFact || "The creator hasn't whispered this secret to me yet! Check back soon."}
                    </p>
                    <button
                        className="mt-6 text-sm text-amber-600 font-bold hover:text-amber-800 transition-colors flex items-center gap-2"
                        onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
                    >
                        ↩ FLIP BACK
                    </button>
                </div>
            </div>
        </div>
    );
}
