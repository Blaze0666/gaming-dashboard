function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-black text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Gaming Dashboard
        </h1>
        <p className="text-center text-gray-300 mb-8">Live Player Counts Across Platforms</p>

        <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 text-center mb-10 border border-purple-500/20">
          <p className="text-lg text-gray-400">Est. Combined Concurrent</p>
          <p className="text-6xl font-bold text-cyan-400">20,000,000</p>
          <p className="text-sm text-gray-500 mt-2">Steam + Xbox Only</p>
        </div>

        <div className="flex gap-2 justify-center mb-8">
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow-lg">
            Steam
          </button>
          <button className="px-6 py-3 rounded-full bg-gray-700 text-gray-300 font-semibold hover:bg-gray-600">
            Xbox Live
          </button>
          <button className="px-6 py-3 rounded-full bg-gray-700 text-gray-300 font-semibold hover:bg-gray-600">
            PlayStation
          </button>
        </div>

        <div className="bg-gray-800/50 backdrop-blur rounded-2xl overflow-hidden border border-purple-500/20">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-bold">Steam — Top 25 by Live CCU</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 font-semibold">#</th>
                  <th className="text-left p-4 font-semibold">Name</th>
                  <th className="text-right p-4 font-semibold">Current</th>
                  <th className="text-right p-4 font-semibold">Peak</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="p-4 font-bold text-cyan-400">#1</td>
                  <td className="p-4 font-medium">Counter-Strike 2</td>
                  <td className="p-4 text-right font-mono text-green-400">1,267,945</td>
                  <td className="p-4 text-right font-mono text-gray-400">1,588,091</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="p-4 font-bold text-cyan-400">#2</td>
                  <td className="p-4 font-medium">Dota 2</td>
                  <td className="p-4 text-right font-mono text-green-400">710,038</td>
                  <td className="p-4 text-right font-mono text-gray-400">889,520</td>
                </tr>
                <tr className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="p-4 font-bold text-cyan-400">#3</td>
                  <td className="p-4 font-medium">PUBG</td>
                  <td className="p-4 text-right font-mono text-green-400">219,289</td>
                  <td className="p-4 text-right font-mono text-gray-400">750,442</td>
                </tr>
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