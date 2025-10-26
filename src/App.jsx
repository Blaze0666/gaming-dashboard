import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import GameDetailModal from "./GameDetailModal";

const API_URL = "/api/data.json";

function App() {
  const [data, setData] = useState({ steam: [], xbox: [], ps: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("steam");
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // AUTO-REFRESH EVERY 5 MINUTES
  useEffect(() => {
    const fetchData = () => {
      fetch(API_URL)
        .then(r => r.json())
        .then(d => {
          setData(d);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    fetchData(); // Initial load
    const interval = setInterval(fetchData, 5 * 60 * 1000); // Every 5 min

    return () => clearInterval(interval);
  }, []);

  const platforms = [
    {
      id: "steam",
      name: "Steam",
      games: data.steam,
      metric: "Live CCU",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/512px-Steam_icon_logo.svg.png"
    },
    {
      id: "xbox",
      name: "Xbox Live",
      games: data.xbox,
      metric: "Est. CCU (±10%)",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/512px-Xbox_one_logo.svg.png"
    },
    {
      id: "ps",
      name: "PlayStation",
      games: data.ps,
      metric: "30-Day Playtime",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/512px-PlayStation_logo.svg.png"
    }
  ];

  const current = platforms.find(p => p.id === tab);

  const chartData = [
    { time: "1h ago", players: 1200000 },
    { time: "2h ago", players: 1150000 },
    { time: "3h ago", players: 1300000 },
    { time: "4h ago", players: 1250000 },
    { time: "5h ago", players: 1100000 }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#111827",
      color: "white",
      fontFamily: "system-ui, sans-serif",
      padding: "2rem"
    }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        {/* MOBILE MENU BUTTON */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: 900,
            background: "linear-gradient(to right, #06b6d4, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Gaming Dashboard
          </h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              "@media (max-width: 768px)": { display: "block" },
              background: "none",
              border: "none",
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer"
            }}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        <p style={{ textAlign: "center", color: "#9ca3af", marginBottom: "2rem" }}>
          Live Player Counts Across Platforms
        </p>

        {/* MOBILE MENU */}
        {(mobileMenuOpen || window.innerWidth > 768) && (
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            justifyContent: "center",
            marginBottom: "2rem",
            flexDirection: window.innerWidth <= 768 ? "column" : "row"
          }}>
            {platforms.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  setTab(p.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "9999px",
                  fontWeight: 600,
                  transition: "all 0.2s",
                  transform: tab === p.id ? "scale(1.05)" : "scale(1)",
                  background: tab === p.id
                    ? "linear-gradient(to right, #06b6d4, #a855f7)"
                    : "rgba(255, 255, 255, 0.1)",
                  color: tab === p.id ? "white" : "#9ca3af",
                  boxShadow: tab === p.id ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "none",
                  width: window.innerWidth <= 768 ? "100%" : "auto"
                }}
              >
                <img src={p.logo} alt={p.name} style={{ width: "1.5rem", height: "1.5rem" }} />
                {p.name}
              </button>
            ))}
          </div>
        )}

        {/* Rest of your dashboard */}
        <div style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          borderRadius: "1.5rem",
          padding: "1.5rem",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          textAlign: "center",
          marginBottom: "2.5rem"
        }}>
          <p style={{ color: "#9ca3af" }}>Est. Combined Concurrent</p>
          <p style={{ fontSize: "3.75rem", fontWeight: 700, color: "#06b6d4" }}>
            {loading ? "..." : data.total.toLocaleString()}
          </p>
          <p style={{ color: "#9ca3af", fontSize: "0.875rem", marginTop: "0.5rem" }}>
            Steam + Xbox Only
          </p>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
            Player Trends (Last 5 Hours)
          </h3>
          <div style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="players" stroke="#06b6d4" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          borderRadius: "1.5rem",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}>
          <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
              {current.name} — Top 25 by {current.metric}
            </h2>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                  <th style={{ textAlign: "left", padding: "1rem", fontWeight: 600 }}>#</th>
                  <th style={{ textAlign: "left", padding: "1rem", fontWeight: 600 }}>Name</th>
                  <th style={{ textAlign: "right", padding: "1rem", fontWeight: 600 }}>Current</th>
                  <th style={{ textAlign: "right", padding: "1rem", fontWeight: 600 }}>Peak / Players</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: "center", padding: "2rem", color: "#9ca3af" }}>
                      Loading live data...
                    </td>
                  </tr>
                ) : (
                  current.games.slice(0, 25).map((g, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                      <td style={{ padding: "1rem", fontWeight: 700, color: "#06b6d4" }}>#{i + 1}</td>
                      <td
                        style={{ padding: "1rem", cursor: "pointer" }}
                        onClick={() => {
                          setSelectedGame(g);
                          setShowModal(true);
                        }}
                      >
                        {g.name}
                      </td>
                      <td style={{ padding: "1rem", textAlign: "right", color: "#10b981" }}>
                        {g.current?.toLocaleString() ?? g.hours?.toLocaleString() ?? "—"}
                      </td>
                      <td style={{ padding: "1rem", textAlign: "right", color: "#9ca3af" }}>
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
          textAlign: "center",
          color: "#6b7280",
          fontSize: "0.75rem",
          marginTop: "2rem"
        }}>
          Data updates every 5 minutes • Steam (Official) • Xbox (Gamstat) • PS (Proxy)
        </p>
      </div>

      <GameDetailModal
        game={selectedGame}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default App;