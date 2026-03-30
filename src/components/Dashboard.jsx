import { seoDashboard, outreachDashboard } from '../data/dashboardData';

const statusColour = (status) => {
    if (status === 'DONE') return '#22c55e';
    if (status === 'NEXT') return '#f59e0b';
    return '#94a3b8';
};

const statusLabel = (status) => {
    if (status === 'DONE') return 'Done';
    if (status === 'NEXT') return 'Up Next';
    return 'Pending';
};

function SEODashboard() {
    const done = seoDashboard.tasks.filter(t => t.status === 'DONE').length;
    const total = seoDashboard.tasks.length;

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
            <a href="#michele-hq" style={{ color: 'rgba(255,220,140,0.9)', textDecoration: 'none', fontFamily: "'Fredoka', sans-serif", fontSize: '0.9rem' }}>&larr; Back to HQ</a>

            <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '2.2rem', color: '#FFD200', margin: '1.5rem 0 0.5rem' }}>
                SEO Roadmap
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: "'Nunito', sans-serif", fontSize: '1rem', marginBottom: '0.5rem' }}>
                Last updated: {seoDashboard.lastUpdated}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontFamily: "'Nunito', sans-serif", fontSize: '1.1rem', marginBottom: '2rem' }}>
                {seoDashboard.summary}
            </p>

            {/* Progress bar */}
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '12px', height: '24px', marginBottom: '2rem', overflow: 'hidden' }}>
                <div style={{ background: '#22c55e', height: '100%', width: `${(done / total) * 100}%`, borderRadius: '12px', transition: 'width 0.5s', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Fredoka', sans-serif", fontSize: '0.75rem', color: 'white', fontWeight: 700 }}>
                    {done}/{total}
                </div>
            </div>

            {/* Task list */}
            <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.4rem', color: '#FFD200', marginBottom: '1rem' }}>Content & SEO Tasks</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2.5rem' }}>
                {seoDashboard.tasks.map(task => (
                    <div key={task.id} style={{
                        background: task.status === 'NEXT' ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.08)',
                        borderRadius: '12px',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        border: task.status === 'NEXT' ? '2px solid rgba(245,158,11,0.4)' : '1px solid rgba(255,255,255,0.1)',
                    }}>
                        <span style={{
                            background: statusColour(task.status),
                            color: 'white',
                            fontFamily: "'Fredoka', sans-serif",
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '0.2rem 0.6rem',
                            borderRadius: '6px',
                            minWidth: '60px',
                            textAlign: 'center',
                        }}>
                            {statusLabel(task.status)}
                        </span>
                        <span style={{
                            flex: 1,
                            fontFamily: "'Nunito', sans-serif",
                            fontSize: '0.95rem',
                            color: task.status === 'DONE' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.9)',
                            textDecoration: task.status === 'DONE' ? 'line-through' : 'none',
                        }}>
                            {task.task}
                        </span>
                        {task.date && (
                            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                                {task.date}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* Completed technical work */}
            <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.4rem', color: '#FFD200', marginBottom: '1rem' }}>Technical SEO (Completed)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {seoDashboard.completedTechnical.map((item, i) => (
                    <div key={i} style={{
                        background: 'rgba(34,197,94,0.1)',
                        borderRadius: '8px',
                        padding: '0.5rem 1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                            {item.task}
                        </span>
                        <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>
                            {item.date}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function OutreachDashboard() {
    const o = outreachDashboard;

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem' }}>
            <a href="#michele-hq" style={{ color: 'rgba(255,220,140,0.9)', textDecoration: 'none', fontFamily: "'Fredoka', sans-serif", fontSize: '0.9rem' }}>&larr; Back to HQ</a>

            <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '2.2rem', color: '#FFD200', margin: '1.5rem 0 0.5rem' }}>
                PR &amp; Outreach
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: "'Nunito', sans-serif", fontSize: '1rem', marginBottom: '0.5rem' }}>
                Last updated: {o.lastUpdated}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontFamily: "'Nunito', sans-serif", fontSize: '1.1rem', marginBottom: '2rem' }}>
                {o.summary}
            </p>

            {o.todaysPlan.length > 0 && (
                <>
                    <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.4rem', color: '#FFD200', marginBottom: '1rem' }}>Today's Email Drafts</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                        {o.todaysPlan.map((item, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1rem', color: '#FFD200', marginBottom: '0.25rem' }}>{item.name}</div>
                                <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.25rem' }}>{item.type}</div>
                                <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>{item.description}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {o.manualTasks.length > 0 && (
                <>
                    <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.4rem', color: '#FFD200', marginBottom: '1rem' }}>Things To Do Today</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                        {o.manualTasks.map((item, i) => (
                            <div key={i} style={{ background: 'rgba(245,158,11,0.15)', borderRadius: '12px', padding: '1rem', border: '2px solid rgba(245,158,11,0.3)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1rem', color: '#FFD200' }}>{item.platform}</span>
                                    <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{item.time}</span>
                                </div>
                                <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.5rem' }}>{item.action}</div>
                                {item.message && (
                                    <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '0.75rem', fontFamily: "'Nunito', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
                                        "{item.message}"
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}

            {o.contacted.length > 0 && (
                <>
                    <h2 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.4rem', color: '#FFD200', marginBottom: '1rem' }}>Contact History</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {o.contacted.map((item, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '8px', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>{item.name} — {item.type}</span>
                                <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '0.75rem', padding: '0.15rem 0.5rem', borderRadius: '6px', background: item.status === 'REPLIED' ? '#22c55e' : item.status === 'SENT' ? '#3b82f6' : '#94a3b8', color: 'white' }}>{item.status}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {o.todaysPlan.length === 0 && o.manualTasks.length === 0 && (
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '16px', padding: '2rem', textAlign: 'center' }}>
                    <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)' }}>
                        The outreach agent is getting started. Check back after the first run.
                    </p>
                </div>
            )}
        </div>
    );
}

export default function Dashboard({ page }) {
    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #1e293b 100%)' }}>
            {/* Minimal header */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1rem', color: '#FFD200' }}>Michele's HQ</span>
                <a href="#" style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Back to site</a>
            </div>

            {page === 'seo' ? (
                <SEODashboard />
            ) : page === 'outreach' ? (
                <OutreachDashboard />
            ) : (
                /* HQ landing page */
                <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 1.5rem', textAlign: 'center' }}>
                    <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '2.5rem', color: '#FFD200', marginBottom: '0.5rem' }}>
                        Michele's HQ
                    </h1>
                    <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', marginBottom: '3rem' }}>
                        Your secret command centre. Only you know this page exists.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <a href="#michele-hq/seo" style={{
                            display: 'block',
                            background: 'rgba(255,255,255,0.1)',
                            border: '2px solid rgba(255,210,0,0.3)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            textDecoration: 'none',
                            transition: 'transform 0.2s, border-color 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(255,210,0,0.6)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,210,0,0.3)'; }}
                        >
                            <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.4rem', color: '#FFD200', marginBottom: '0.25rem' }}>SEO Roadmap</div>
                            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Blog posts, keywords, technical improvements</div>
                        </a>

                        <a href="#michele-hq/outreach" style={{
                            display: 'block',
                            background: 'rgba(255,255,255,0.1)',
                            border: '2px solid rgba(255,210,0,0.3)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            textDecoration: 'none',
                            transition: 'transform 0.2s, border-color 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(255,210,0,0.6)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,210,0,0.3)'; }}
                        >
                            <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.4rem', color: '#FFD200', marginBottom: '0.25rem' }}>PR &amp; Outreach</div>
                            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Email drafts, influencers, communities, daily to-dos</div>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
