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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-black text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Gaming Dashboard
        </h1>
        <p className="text-center text-gray-300 mb-8">Live Player Counts Across Platforms</p>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 text-center mb-10 border border-white/20 shadow-2xl">
          <p className="text-lg text-gray-300">Est. Combined Concurrent</p>
          <p className="text-5xl md:text-6xl font-bold text-cyan-400">
            {loading ? "..." : data.total.toLocaleString()}
          </p>
          <p className="text-sm text-gray-400 mt-2">Steam + Xbox Only</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {platforms.map(p => (
            <button
              key={p.id}
              onClick={() => setTab(p.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                tab === p.id
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-xl"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              <img src={p.logo} alt={p.name} className="w-6 h-6" />
              {p.name}
            </button>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold">{current.name} — Top 25 by {current.metric}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 font-semibold">#</th>
                  <th className="text-left p-4 font-semibold">Name</th>
                  <th className="text-right p-4 font-semibold">Current</th>
                  <th className="text-right p-4 font-semibold">Peak / Players</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center p-8 text-gray-400">Loading live data...</td>
                  </tr>
                ) : (
                  current.games.slice(0, 25).map((g, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="p-4 font-bold text-cyan-400">#{i + 1}</td>
                      <td className="p-4 font-medium">{g.name}</td>
                      <td className="p-4 text-right font-mono text-green-400">
                        {g.current?.toLocaleString() ?? g.hours?.toLocaleString() ?? "—"}
                      </td>
                      <td className="p-4 text-right font-mono text-gray-400">
                        {g.peak?.toLocaleString() ?? g.players?.toLocaleString() ?? "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          Data updates every 10 minutes • Steam (Official) • Xbox (Gamstat) • PS (Proxy)
        </p>
      </div>
    </div>
  );
}

export default App;