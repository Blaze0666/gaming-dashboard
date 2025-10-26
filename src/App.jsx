import { useState, useEffect } from "react";

const API_URL = "/api/data.json";

function App() {
  const [data, setData] = useState({ steam: [], xbox: [], ps: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("steam");

  useEffect(() => {
    fetch(API_URL)
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const platforms = [
    { id: "steam", name: "Steam", games: data.steam, metric: "Live CCU", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/512px-Steam_icon_logo.svg.png" },
    { id: "xbox", name: "Xbox Live", games: data.xbox, metric: "Est. CCU (±10%)", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/512px-Xbox_one_logo.svg.png" },
    { id: "ps", name: "PlayStation", games: data.ps, metric: "30-Day Playtime", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/512px-PlayStation_logo.svg.png" },
  ];

  const current = platforms.find(p => p.id === tab);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#111827',
      color: 'white',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '3.75rem',
          fontWeight: '900',
          textAlign: 'center',
          marginBottom: '1rem',
          background: 'linear-gradient(to right, #06b6d4, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Gaming Dashboard
        </h1>
        <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '2rem' }}>
          Live Player Counts Across Platforms
        </p>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          borderRadius: '1.5rem',
          padding: '1.5rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          textAlign: 'center',
          marginBottom: '2.5rem'
        }}>
          <p style={{ color: '#9ca3af' }}>Est. Combined Concurrent</p>
          <p style={{ fontSize: '3.75rem', fontWeight: '700', color: '#06b6d4' }}>
            {loading ? "..." : data.total.toLocaleString()}
          </p>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Steam + Xbox Only
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '2rem' }}>
          {platforms.map(p => (
            <button
              key={p.id}
              onClick={() => setTab(p.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '9999px',
                fontWeight: '600',
                transition: 'all 0.2s',
                transform: tab === p.id ? 'scale(1.05)' : 'scale(1)',
                background: tab === p.id
                  ? 'linear-gradient(to right, #06b6d4, #a855f7)'
                  : 'rgba(255, 255, 255, 0.1)',
                color: tab === p.id ? 'white' : '#9ca3af',
                boxShadow: tab === p.id ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'
              }}
            >
              <img src={p.logo} alt={p.name} style={{ width: '1.5rem', height: '1.5rem' }} />
              {p.name}
            </button>
          ))}
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          borderRadius: '1.5rem',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>
              {current.name} — Top 25 by {current.metric}
            </h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <th style={{ textAlign: 'left', padding: '1rem', fontWeight: '600' }}>#</th>
                  <th style={{ textAlign: 'left', padding: '1rem', fontWeight: '600' }}>Name</th>
                  <th style={{ textAlign: 'right', padding: '1rem', fontWeight: '600' }}>Current</th>
                  <th style={{ textAlign: 'right', padding: '1rem', fontWeight: '600' }}>Peak / Players</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                      Loading live data...
                    </td>
                  </tr>
                ) : (
                  current.games.slice(0, 25).map((g, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '1rem', fontWeight: '700', color: '#06b6d4' }}>#{i + 1}</td>
                      <td style={{ padding: '1rem' }}>{g.name}</td>
                      <td style={{ padding: '1rem', textAlign: 'right', color: '#10b981' }}>
                        {g.current?.toLocaleString() ?? g.hours?.toLocaleString() ?? "—"}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right', color: '#9ca3af' }}>
                        {g.peak?.toLocaleString() ?? g.players?.toLocaleString() ?? "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p style={{
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '0.75rem',
          marginTop: '2rem'
        }}>
          Data updates every 10 minutes • Steam (Official) • Xbox (Gamstat) • PS (Proxy)
        </p>
      </div>
    </div>
  );
}

export default App;