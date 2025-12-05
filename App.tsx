import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import NewsCard from './components/NewsCard';
import Loader from './components/Loader';
import { VERTICALS } from './constants';
import { VerticalId, ArticleSuggestion } from './types';
import { fetchSuggestions } from './services/geminiService';
import { RefreshCw, Zap, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [currentVerticalId, setCurrentVerticalId] = useState<VerticalId>('napoli');
  const [suggestions, setSuggestions] = useState<ArticleSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentVertical = VERTICALS.find(v => v.id === currentVerticalId) || VERTICALS[0];

  const loadData = async (verticalId: string, teamName: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSuggestions(teamName, verticalId);
      setSuggestions(data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch suggestions. Ensure API Key is set and quota is available.");
      // If API fails, we could load mock data here for demo, but displaying error is safer.
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(currentVertical.id, currentVertical.teamName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVerticalId]);

  const handleRefresh = () => {
    loadData(currentVertical.id, currentVertical.teamName);
  };

  return (
    <div className="min-h-screen flex bg-slate-900 font-sans text-slate-100">
      <Sidebar 
        currentVertical={currentVerticalId} 
        onSelectVertical={setCurrentVerticalId} 
      />

      <main className="flex-1 md:ml-64 p-6 overflow-x-hidden">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                {currentVertical.name} <span className="font-light text-slate-500">Dashboard</span>
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 border border-slate-700 text-slate-400 font-mono">
                LIVE FEED
              </span>
            </div>
            <p className="text-slate-400 text-sm">
              Real-time editorial suggestions powered by Google Gemini & Search.
            </p>
          </div>

          <button 
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-blue-900/20 active:scale-95"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Analyzing...' : 'Refresh Feed'}
          </button>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-lg flex items-center gap-4">
             <div className="p-3 bg-red-500/10 rounded-full text-red-500">
                <Zap size={24} />
             </div>
             <div>
                <p className="text-slate-400 text-xs uppercase font-bold">Trending Now</p>
                <p className="text-2xl font-bold text-white">High Vol.</p>
             </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-lg flex items-center gap-4">
             <div className="p-3 bg-green-500/10 rounded-full text-green-500">
                <RefreshCw size={24} />
             </div>
             <div>
                <p className="text-slate-400 text-xs uppercase font-bold">Index Status</p>
                <p className="text-2xl font-bold text-white">Updated</p>
             </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-lg flex items-center gap-4">
             <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
                <AlertCircle size={24} />
             </div>
             <div>
                <p className="text-slate-400 text-xs uppercase font-bold">Network Alert</p>
                <p className="text-2xl font-bold text-white">Stable</p>
             </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-xl mb-8 text-center">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-2" />
            <h3 className="text-red-400 font-bold text-lg">Data Retrieval Failed</h3>
            <p className="text-slate-400 max-w-lg mx-auto mt-2">{error}</p>
            <button 
              onClick={handleRefresh}
              className="mt-4 text-sm text-red-300 underline hover:text-red-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? (
            <Loader />
          ) : (
            suggestions.map((item) => (
              <NewsCard 
                key={item.id} 
                suggestion={item} 
                accentColor={currentVertical.color}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default App;