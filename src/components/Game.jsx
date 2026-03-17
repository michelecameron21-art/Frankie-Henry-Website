import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, ArrowRight } from 'lucide-react';

// --- ASSETS & CONFIG ---
const ASSETS = {
    frankie: { name: 'Frankie', color: '#3B82F6', emoji: '🐶', transform: 'scaleX(1)' },
    henry: { name: 'Henry', color: '#F97316', emoji: '🐕', transform: 'scaleX(-1)' }
};

const GRAVITY = 0.6;
const JUMP_FORCE = -10.5;
const BASE_SPEED_L1 = 6;
const BASE_SPEED_L2 = 8; // Faster start for Level 2
const SPEED_INC = 0.5;
const WIN_SCORE_L1 = 10;
const WIN_SCORE_L2 = 15;
const GAME_WIDTH = 900;

// --- AUDIO CONTROLLER ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const playSound = (type) => {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'jump') {
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    } else if (type === 'collect') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.15);
    } else if (type === 'hit') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    } else if (type === 'win') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.setValueAtTime(600, now + 0.1);
        osc.frequency.setValueAtTime(800, now + 0.2);
        osc.frequency.setValueAtTime(1000, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0, now + 1);
        osc.start(now);
        osc.stop(now + 1);
    }
};

export default function Game() {
    // State
    const [gameState, setGameState] = useState('SELECT'); // SELECT, START, PLAYING, WON_L1, WON_L2, GAME_OVER
    const [level, setLevel] = useState(1);
    const [character, setCharacter] = useState('frankie');
    const [score, setScore] = useState(0);
    const [frankieY, setFrankieY] = useState(0);
    const [isJumping, setIsJumping] = useState(false);
    const [gameObjects, setGameObjects] = useState([]);
    const [particles, setParticles] = useState([]);
    const [popups, setPopups] = useState([]);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [gameSpeed, setGameSpeed] = useState(BASE_SPEED_L1);

    // Refs
    const requestRef = useRef();
    const playerRef = useRef({ y: 0, velocity: 0, jumps: 0 });
    const gameObjectsRef = useRef([]);
    const particlesRef = useRef([]);
    const popupsRef = useRef([]);
    const scoreRef = useRef(0);
    const lastSpawnTimeRef = useRef(0);
    const lastDustTimeRef = useRef(0);
    const biscuitStreakRef = useRef(0);

    // Music
    const musicRef = useRef(null);

    useEffect(() => {
        musicRef.current = new Audio('/assets/theme-song.mp3');
        musicRef.current.loop = true;
        musicRef.current.volume = 0.4;
        return () => {
            if (musicRef.current) {
                musicRef.current.pause();
                musicRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!musicRef.current) return;

        const shouldPlay = soundEnabled && (gameState === 'START' || gameState === 'PLAYING' || gameState.startsWith('WON'));

        if (shouldPlay) {
            // Promise handling to avoid abort errors
            const playPromise = musicRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio play failed (user interaction needed?):", error);
                });
            }
        } else {
            musicRef.current.pause();
            if (gameState === 'SELECT') musicRef.current.currentTime = 0;
        }
    }, [gameState, soundEnabled]);

    // --- GAME LOGIC ---
    const startGame = (lvl = 1) => {
        setLevel(lvl);
        setGameState('PLAYING');
        setScore(0);
        scoreRef.current = 0;
        playerRef.current = { y: 0, velocity: 0, jumps: 0 };
        setFrankieY(0);
        setIsJumping(false);
        gameObjectsRef.current = [];
        setGameObjects([]);
        particlesRef.current = [];
        setParticles([]);
        popupsRef.current = [];
        setPopups([]);
        setGameSpeed(lvl === 1 ? BASE_SPEED_L1 : BASE_SPEED_L2);
        lastSpawnTimeRef.current = performance.now();
        biscuitStreakRef.current = 0;
    };

    const jump = () => {
        if (playerRef.current.y >= 0 || playerRef.current.jumps < 2) {
            playerRef.current.velocity = JUMP_FORCE;
            playerRef.current.jumps = (playerRef.current.y >= 0) ? 1 : 2;
            setIsJumping(true);
            if (soundEnabled) playSound('jump');
            spawnDust();
        }
    };

    const spawnDust = () => {
        const id = Math.random();
        particlesRef.current.push({ id, x: 100, y: 0, life: 1.0 });
    };

    const spawnPopup = (text, x, y) => {
        const id = Math.random();
        popupsRef.current.push({ id, text, x, y, life: 1.0 });
    };

    const updateGame = (time) => {
        if (gameState !== 'PLAYING') return;

        // 1. Difficulty Scaling
        const base = level === 1 ? BASE_SPEED_L1 : BASE_SPEED_L2;
        const currentSpeed = base + (Math.floor(scoreRef.current / 3) * SPEED_INC);
        setGameSpeed(currentSpeed);

        // 2. Physics
        let { y, velocity, jumps } = playerRef.current;
        velocity += GRAVITY;
        y += velocity;

        if (y > 0) {
            if (velocity > 2) spawnDust();
            y = 0;
            velocity = 0;
            jumps = 0;
            setIsJumping(false);
        }
        playerRef.current = { y, velocity, jumps };
        setFrankieY(y);

        // 3. Spawn Objects
        const spawnRate = 1400 * (base / currentSpeed);
        if (time - lastSpawnTimeRef.current > spawnRate) {
            let type = Math.random() > 0.4 ? 'biscuit' : 'rock';

            // Level 2: Chance to spawn Termite Mound (Tall Obstacle)
            if (level === 2 && type === 'rock' && Math.random() > 0.5) {
                type = 'mound';
            }

            // Streak Logic (for biscuits)
            let spawnY = 0;
            if (type === 'biscuit') {
                let isHigh = Math.random() > 0.5;
                if (biscuitStreakRef.current >= 2) isHigh = false;
                else if (biscuitStreakRef.current <= -2) isHigh = true;

                if (isHigh) {
                    biscuitStreakRef.current = biscuitStreakRef.current < 0 ? 1 : biscuitStreakRef.current + 1;
                    spawnY = -200;
                } else {
                    biscuitStreakRef.current = biscuitStreakRef.current > 0 ? -1 : biscuitStreakRef.current - 1;
                    spawnY = -70;
                }
            } else {
                biscuitStreakRef.current = 0; // Reset streak on obstacle
            }

            const newObj = {
                id: Math.random(),
                type,
                x: GAME_WIDTH + 100,
                y: spawnY,
                w: type === 'mound' ? 60 : 48,
                h: type === 'mound' ? 100 : 48, // Mound is tall!
                rotation: type === 'rock' ? Math.random() * 360 : 0
            };
            gameObjectsRef.current.push(newObj);
            lastSpawnTimeRef.current = time;
        }

        // 4. Update Entities
        const playerHitbox = {
            left: 80, right: 80 + 56,
            top: playerRef.current.y - 56, bottom: playerRef.current.y
        };

        const activeObjects = [];
        let hitObstacle = false;
        let collected = false;

        gameObjectsRef.current.forEach(obj => {
            let hasCollided = false;
            let objLeft = obj.x;
            let objRight = obj.x + obj.w;
            let objBottom = obj.y;
            let objTop = obj.y - obj.h;

            if (objLeft < playerHitbox.right && objRight > playerHitbox.left) {
                if (playerHitbox.top < objBottom && playerHitbox.bottom > objTop) {
                    hasCollided = true;
                    if (obj.type === 'biscuit') {
                        scoreRef.current += 1;
                        setScore(scoreRef.current);
                        collected = true;
                        spawnPopup("+1", 100, playerRef.current.y - 80);

                        // Check Win Condition
                        const target = level === 1 ? WIN_SCORE_L1 : WIN_SCORE_L2;
                        if (scoreRef.current >= target) {
                            setGameState(level === 1 ? 'WON_L1' : 'WON_L2');
                        }
                    } else {
                        hitObstacle = true;
                    }
                }
            }

            if (!hasCollided) {
                obj.x -= currentSpeed;
                if (obj.x > -100) activeObjects.push(obj);
            }
        });

        const activeParticles = [];
        particlesRef.current.forEach(p => {
            p.x -= currentSpeed * 0.8;
            p.life -= 0.05;
            if (p.life > 0) activeParticles.push(p);
        });
        particlesRef.current = activeParticles;
        setParticles([...activeParticles]);

        const activePopups = [];
        popupsRef.current.forEach(p => {
            p.y -= 1;
            p.life -= 0.02;
            if (p.life > 0) activePopups.push(p);
        });
        popupsRef.current = activePopups;
        setPopups([...activePopups]);

        if (collected && soundEnabled) playSound('collect');
        if (hitObstacle) {
            if (soundEnabled) playSound('hit');
            setGameState('GAME_OVER');
            return;
        }
        if ((gameState === 'WON_L1' || gameState === 'WON_L2') && soundEnabled) playSound('win');

        gameObjectsRef.current = activeObjects;
        setGameObjects([...activeObjects]);

        if (!gameState.startsWith('WON') && gameState !== 'GAME_OVER') {
            requestRef.current = requestAnimationFrame(updateGame);
        }
    };

    useEffect(() => {
        if (gameState === 'PLAYING') requestRef.current = requestAnimationFrame(updateGame);
        return () => cancelAnimationFrame(requestRef.current);
    }, [gameState]);

    // Input
    useEffect(() => {
        const handleKeys = (e) => {
            if ((e.code === 'Space' || e.code === 'ArrowUp') && gameState === 'PLAYING') {
                e.preventDefault(); jump();
            }
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, [gameState, soundEnabled]);


    // --- VISUALS ---
    const isNight = level === 2;
    const bgGradient = isNight
        ? 'linear-gradient(to bottom, #1e1b4b, #312e81, #4c1d95)' // Midnight
        : 'linear-gradient(to bottom, #6B21A8, #F97316, #FCD34D)'; // Sunset

    const Tree = ({ left, opacity }) => (
        <div style={{ position: 'absolute', bottom: '1rem', left, opacity: opacity, zIndex: 1, pointerEvents: 'none', filter: isNight ? 'brightness(0.6)' : 'none' }}>
            <svg width="140" height="180" viewBox="0 0 140 180" fill="#291b12">
                <path d="M65 180 L65 120 Q65 90 40 80 L35 78 L40 85 Q55 90 70 120 L75 180 Z" fill={isNight ? "#1a120b" : "#291b12"} />
                <path d="M70 180 L70 110 Q70 80 100 70 L105 68 L100 75 Q80 80 75 120 L75 180 Z" fill={isNight ? "#1a120b" : "#291b12"} />
                <path d="M10 80 Q70 40 130 80 Q140 85 130 90 Q110 100 70 95 Q30 100 10 90 Q0 85 10 80 Z" fill={isNight ? "#0f172a" : "#1e293b"} opacity="0.9" />
                <ellipse cx="40" cy="75" rx="35" ry="15" fill={isNight ? "#0f172a" : "#1e293b"} opacity="0.95" />
                <ellipse cx="100" cy="75" rx="35" ry="15" fill={isNight ? "#0f172a" : "#1e293b"} opacity="0.95" />
                <ellipse cx="70" cy="65" rx="40" ry="20" fill={isNight ? "#0f172a" : "#1e293b"} />
            </svg>
        </div>
    );

    const Mountain = ({ left, height }) => (
        <div style={{ position: 'absolute', bottom: 0, left, zIndex: 0, opacity: 0.5, pointerEvents: 'none' }}>
            <svg width="600" height={height} viewBox="0 0 600 300" preserveAspectRatio="none">
                <defs>
                    <linearGradient id={isNight ? "mtnNight" : "mtnDay"} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={isNight ? "#312e81" : "#4c1d95"} />
                        <stop offset="100%" stopColor={isNight ? "#4338ca" : "#818cf8"} />
                    </linearGradient>
                </defs>
                <path d="M0 300 L120 50 L200 120 L300 30 L450 180 L600 300 Z" fill={`url(#${isNight ? "mtnNight" : "mtnDay"})`} opacity="0.9" />
                <path d="M100 300 L220 150 L350 300 Z" fill={isNight ? "#1e1b4b" : "#5b21b6"} opacity="0.8" />
                <path d="M400 300 L500 200 L600 300 Z" fill={isNight ? "#1e1b4b" : "#5b21b6"} opacity="0.8" />
            </svg>
        </div>
    );

    const Bush = ({ left }) => (
        <div style={{ position: 'absolute', bottom: -20, left, zIndex: 40, pointerEvents: 'none', filter: 'blur(4px)' }}>
            <svg width="220" height="140" viewBox="0 0 220 140">
                <path d="M0 140 Q30 50 80 60 Q130 10 180 60 Q210 50 220 140 Z" fill={isNight ? "#064e3b" : "#064e3b"} />
                <path d="M20 140 Q50 70 90 80 Q130 40 170 80 Q200 70 200 140 Z" fill={isNight ? "#022c22" : "#14532d"} opacity="0.9" />
            </svg>
        </div>
    );

    // --- STYLES ---
    const containerStyle = {
        position: 'relative',
        width: '100%',
        maxWidth: '960px',
        margin: '0 auto',
        height: '400px',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '4px solid #F59E0B',
        background: bgGradient,
        userSelect: 'none',
        cursor: 'pointer',
        transition: 'background 1s ease'
    };

    const overlayStyle = {
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '1rem'
    };

    return (
        <section id="game" className="section" style={{
            padding: '3rem 1rem',
            background: isNight
                ? 'linear-gradient(to bottom, #0f172a calc(100% - 100px), #C5DEB0 100%)'
                : 'linear-gradient(to bottom, #F0A870 calc(100% - 100px), #C5DEB0 100%)',
            transition: 'background 1s',
            position: 'relative'
        }}>
            <div className="container" style={{ margin: '0 auto', maxWidth: '1200px', position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 className="heading-lg" style={{ marginBottom: '0.5rem', color: isNight ? '#FDE047' : '#fff' }}>
                        {isNight ? "The Midnight Dash!" : "Frankie & Henry Rescue the Jackal Cub!"}
                    </h2>
                    <p className="subheading" style={{ color: isNight ? '#cbd5e1' : 'rgba(255,255,255,0.9)', maxWidth: 'none', whiteSpace: 'nowrap' }}>
                        {isNight ? "Race home under the stars! Watch out for Termite Mounds!" : "Help Frankie and Henry rescue the Jackal Cub. Jump over rocks and collect snacks!"}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isNight ? '#e2e8f0' : 'rgba(255,255,255,0.9)' }}>
                            <span style={{ fontWeight: 'bold', background: isNight ? '#312e81' : 'rgba(255,255,255,0.25)', color: isNight ? '#fde047' : '#fff', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: `1px solid ${isNight ? '#4f46e5' : 'rgba(255,255,255,0.5)'}` }}>Tap Space</span>
                            <span>to Jump</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: isNight ? '#e2e8f0' : 'rgba(255,255,255,0.9)' }}>
                            <span style={{ fontWeight: 'bold', background: isNight ? '#4338ca' : 'rgba(255,255,255,0.25)', color: isNight ? '#fff' : '#fff', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: `1px solid ${isNight ? '#6366f1' : 'rgba(255,255,255,0.5)'}` }}>Tap Twice</span>
                            <span>to Double Jump!</span>
                        </div>
                    </div>
                </div>

                {/* GAME CONTAINER */}
                <div style={containerStyle} onClick={jump}>

                    {/* --- BACKGROUND --- */}
                    {isNight ? (
                        /* Moon & Stars */
                        <>
                            <div style={{ position: 'absolute', top: '2rem', right: '4rem', width: '6rem', height: '6rem', background: '#FDE047', borderRadius: '50%', boxShadow: '0 0 40px rgba(253, 224, 71, 0.5)' }}></div>
                            {[...Array(30)].map((_, i) => (
                                <div key={i} style={{ position: 'absolute', width: Math.random() * 3 + 'px', height: Math.random() * 3 + 'px', background: 'white', top: Math.random() * 200 + 'px', left: Math.random() * 100 + '%', borderRadius: '50%', opacity: Math.random() }}></div>
                            ))}
                        </>
                    ) : (
                        /* Sun */
                        <div style={{ position: 'absolute', top: '2.5rem', right: '5rem', width: '8rem', height: '8rem', background: '#FDE047', borderRadius: '9999px', filter: 'blur(24px)', opacity: 0.6 }}></div>
                    )}

                    <div className={gameState === 'PLAYING' ? 'animate-scroll-slow' : ''} style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%', display: 'flex' }}>
                        <Mountain left="0%" height="250" />
                        <Mountain left="50%" height="300" />
                    </div>

                    <div className={gameState === 'PLAYING' ? 'animate-scroll-medium' : ''} style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%', display: 'flex' }}>
                        <Tree left="10%" opacity={0.6} />
                        <Tree left="40%" opacity={0.7} />
                        <Tree left="70%" opacity={0.5} />
                        <Tree left="120%" opacity={0.6} />
                        <Tree left="160%" opacity={0.7} />
                    </div>

                    {/* Ground */}
                    <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '3rem', background: isNight ? '#451a03' : '#92400e', borderTop: `8px solid ${isNight ? '#3f1506' : '#78350f'}`, zIndex: 10, overflow: 'hidden' }}>
                        <div className={gameState === 'PLAYING' ? 'animate-scroll-fast' : ''} style={{ position: 'absolute', width: '200%', height: '100%', display: 'flex', alignItems: 'center', animationDuration: '2s' }}>
                            {[...Array(20)].map((_, i) => (
                                <div key={i} style={{ width: '1rem', height: '1rem', borderRadius: '50%', background: isNight ? '#5d2508' : '#b45309', margin: '0 3rem', opacity: 0.5 }}></div>
                            ))}
                        </div>
                    </div>


                    {/* --- GAMEPLAY ENTITIES --- */}

                    {/* Score */}
                    {gameState !== 'SELECT' && (
                        <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 40, background: 'rgba(255,255,255,0.9)', borderRadius: '9999px', padding: '0.5rem 1.5rem', border: '2px solid #F59E0B', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                            <div style={{ fontSize: '1.5rem' }}>{level === 2 ? '🌙' : '🦴'}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#D97706' }}>{score} / {level === 1 ? WIN_SCORE_L1 : WIN_SCORE_L2}</div>
                        </div>
                    )}

                    {/* Sound */}
                    <button
                        onClick={(e) => { e.stopPropagation(); setSoundEnabled(!soundEnabled); }}
                        style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 40, width: '2.5rem', height: '2.5rem', background: 'rgba(255,255,255,0.5)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none', color: '#1E293B' }}
                    >
                        {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    </button>

                    {/* Particles */}
                    {particles.map(p => (
                        <div key={p.id} style={{
                            position: 'absolute', left: '5rem', bottom: '60px',
                            width: '12px', height: '12px', borderRadius: '50%',
                            background: '#FDE68A', opacity: p.life,
                            transform: `translate(${-(100 - p.x)}px, 0) scale(${p.life})`,
                            zIndex: 25
                        }}></div>
                    ))}

                    {/* Player */}
                    {gameState !== 'SELECT' && (
                        <div
                            style={{
                                position: 'absolute', left: '5rem', bottom: '60px', zIndex: 30,
                                transform: `translateY(${frankieY}px) rotate(${isJumping ? -15 : 0}deg)`,
                                transition: 'transform 0.075s'
                            }}
                        >
                            <div className={!isJumping ? 'animate-bounce-run' : ''} style={{ width: '3.5rem', height: '3.5rem', background: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '2px solid #0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.875rem' }}>
                                <span style={{ transform: ASSETS[character].transform, display: 'inline-block' }}>
                                    {ASSETS[character].emoji}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Objects */}
                    {gameObjects.map(obj => (
                        <div
                            key={obj.id}
                            style={{
                                position: 'absolute', zIndex: 20,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '2.25rem',
                                left: obj.x,
                                bottom: `calc(3rem + ${-obj.y}px)`,
                                transform: `rotate(${obj.rotation}deg)`
                            }}
                        >
                            {obj.type === 'biscuit' ? (level === 2 ? '🌙' : '🦴') :
                                obj.type === 'mound' ? (
                                    <svg width="60" height="100" viewBox="0 0 60 100">
                                        <path d="M10 100 L20 20 Q30 0 40 20 L50 100 Z" fill="#7c2d12" stroke="#431407" strokeWidth="2" />
                                    </svg>
                                ) : (
                                    <svg width="50" height="40" viewBox="0 0 50 40">
                                        <path d="M0 40 L10 10 L30 0 L50 20 L40 40 Z" fill="#57534e" />
                                    </svg>
                                )
                            }
                        </div>
                    ))}

                    {/* Popups */}
                    {popups.map(p => (
                        <div key={p.id} style={{
                            position: 'absolute', left: '5rem', bottom: `calc(60px + ${60 + (100 - p.x)}px)`, zIndex: 45,
                            fontSize: '1.5rem', fontWeight: 'bold', color: '#F59E0B', opacity: p.life,
                            transform: `translateY(${-100 + (p.life * 100)}px)`
                        }}>
                            {p.text}
                        </div>
                    ))}

                    {/* Foreground Bushes */}
                    <div className={gameState === 'PLAYING' ? 'animate-scroll-fast' : ''} style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%', display: 'flex', animationDuration: '1.5s', zIndex: 40, pointerEvents: 'none' }}>
                        <Bush left="15%" />
                        <Bush left="65%" />
                        <Bush left="115%" />
                        <Bush left="165%" />
                    </div>


                    {/* --- SCREENS --- */}

                    {/* Character Select */}
                    {gameState === 'SELECT' && (
                        <div style={{ ...overlayStyle, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)' }}>
                            <h3 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#FBBF24', marginBottom: '2rem', textShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>Pick Your Adventurer!</h3>
                            <div style={{ display: 'flex', gap: '3rem' }}>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setCharacter('frankie'); startGame(1); }}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: 'none', border: 'none', cursor: 'pointer', transition: 'transform 0.2s' }}
                                    className="hover:scale-110"
                                >
                                    <div style={{ width: '8rem', height: '8rem', background: '#3B82F6', borderRadius: '50%', border: '4px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                                        🐶
                                    </div>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Frankie</span>
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setCharacter('henry'); startGame(1); }}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', background: 'none', border: 'none', cursor: 'pointer', transition: 'transform 0.2s' }}
                                >
                                    <div style={{ width: '8rem', height: '8rem', background: '#F97316', borderRadius: '50%', border: '4px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                                        🐕
                                    </div>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Henry</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Level 1 Win */}
                    {gameState === 'WON_L1' && (
                        <div style={{ ...overlayStyle, background: 'rgba(34, 197, 94, 0.95)' }}>
                            <div style={{ fontSize: '5rem', marginBottom: '1rem' }} className="animate-bounce">🎉🐶🎉</div>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Level 1 Complete!</h3>
                            <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>You rescued Tumi! Now race him home!</p>
                            <button
                                onClick={(e) => { e.stopPropagation(); startGame(2); }}
                                style={{ background: 'white', color: '#16A34A', fontSize: '1.5rem', fontWeight: 'bold', padding: '1rem 3rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                Next Level <ArrowRight />
                            </button>
                        </div>
                    )}

                    {/* Level 2 Win */}
                    {gameState === 'WON_L2' && (
                        <div style={{ ...overlayStyle, background: 'rgba(79, 70, 229, 0.95)' }}>
                            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} style={{
                                        position: 'absolute', width: '1rem', height: '1rem', background: '#FDE047', borderRadius: '50%',
                                        top: '-10%', left: `${Math.random() * 100}%`,
                                        animation: `bounceRun ${1 + Math.random()}s infinite`,
                                        animationDelay: `${Math.random()}s`
                                    }}></div>
                                ))}
                            </div>
                            <div style={{ fontSize: '5rem', marginBottom: '1rem' }} className="animate-bounce">👑🏆👑</div>
                            <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>The Ultimate Safari Hero!</h3>
                            <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>You beat the Midnight Dash!</p>
                            <button
                                onClick={(e) => { e.stopPropagation(); setGameState('SELECT'); }}
                                style={{ background: 'white', color: '#4338ca', fontSize: '1.25rem', fontWeight: 'bold', padding: '1rem 3rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                            >
                                Play Again
                            </button>
                        </div>
                    )}

                    {/* Game Over */}
                    {gameState === 'GAME_OVER' && (
                        <div style={{ ...overlayStyle, background: 'rgba(220, 38, 38, 0.9)' }}>
                            <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>💥</div>
                            <h3 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem' }}>OUCH!</h3>
                            {level === 2 && <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Back to the start!</p>}
                            <button
                                onClick={(e) => { e.stopPropagation(); startGame(1); }}
                                style={{ background: 'white', color: '#DC2626', fontSize: '1.25rem', fontWeight: 900, padding: '1rem 2.5rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                            >
                                {level === 2 ? "Restart Game" : "Try Again"}
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
