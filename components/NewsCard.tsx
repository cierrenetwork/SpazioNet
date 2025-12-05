import React, { useState } from 'react';
import { ArticleSuggestion } from '../types';
import { Copy, Check, Flame, BookOpen, TrendingUp, Search } from 'lucide-react';

interface NewsCardProps {
  suggestion: ArticleSuggestion;
  accentColor: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ suggestion, accentColor }) => {
  const [copiedSeo, setCopiedSeo] = useState(false);
  const [copiedDiscover, setCopiedDiscover] = useState(false);

  const handleCopy = (text: string, type: 'seo' | 'discover') => {
    navigator.clipboard.writeText(text);
    if (type === 'seo') {
      setCopiedSeo(true);
      setTimeout(() => setCopiedSeo(false), 2000);
    } else {
      setCopiedDiscover(true);
      setTimeout(() => setCopiedDiscover(false), 2000);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 border-green-400';
    if (score >= 50) return 'text-yellow-400 border-yellow-400';
    return 'text-red-400 border-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200 overflow-hidden flex flex-col h-full shadow-lg group">
      {/* Header Badge & Score */}
      <div className="p-4 flex justify-between items-start border-b border-slate-700/50">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border 
          ${suggestion.category === 'Trending' 
            ? 'bg-red-500/10 text-red-400 border-red-500/20' 
            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}
        >
          {suggestion.category === 'Trending' ? <Flame size={14} /> : <BookOpen size={14} />}
          {suggestion.category}
        </div>

        <div className="flex flex-col items-end">
          <div className={`flex items-center gap-1 font-mono font-bold text-lg ${getScoreColor(suggestion.score)}`}>
             <TrendingUp size={16} />
             {suggestion.score}
          </div>
          <span className="text-[10px] text-slate-500 uppercase">Viral Score</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
            {suggestion.topic}
        </h3>
        <p className="text-sm text-slate-400 mb-4 line-clamp-3 leading-relaxed">
            {suggestion.description}
        </p>
        
        {/* Reasoning / Context - Mini pill */}
        <div className="mt-auto mb-4">
            <div className="inline-flex items-center gap-2 text-xs text-slate-500 bg-slate-900/50 px-2 py-1 rounded border border-slate-700">
                <Search size={12} />
                <span className="truncate max-w-[200px]">{suggestion.reasoning}</span>
            </div>
        </div>
      </div>

      {/* Action Area: Titles */}
      <div className="bg-slate-900/50 p-4 space-y-4 border-t border-slate-700">
        
        {/* SEO Title */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">SEO Title</label>
            <span className="text-[10px] text-slate-600">Search Optimized</span>
          </div>
          <div className="relative flex items-center">
            <input 
              readOnly 
              value={suggestion.seoTitle} 
              className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500 pr-10 font-mono"
            />
            <button 
              onClick={() => handleCopy(suggestion.seoTitle, 'seo')}
              className="absolute right-2 text-slate-400 hover:text-white transition-colors"
            >
              {copiedSeo ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* Discover Title */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Discover Title</label>
            <span className="text-[10px] text-slate-600">High CTR</span>
          </div>
          <div className="relative flex items-center">
            <input 
              readOnly 
              value={suggestion.discoverTitle} 
              className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:outline-none focus:border-purple-500 pr-10 font-medium italic"
            />
            <button 
              onClick={() => handleCopy(suggestion.discoverTitle, 'discover')}
              className="absolute right-2 text-slate-400 hover:text-white transition-colors"
            >
              {copiedDiscover ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

      </div>
      
      {/* Footer Traffic Indicator */}
      <div className="h-1 w-full bg-slate-700">
        <div 
          className={`h-full ${getScoreBg(suggestion.score)}`} 
          style={{ width: `${suggestion.score}%` }}
        />
      </div>
    </div>
  );
};

export default NewsCard;