"use client";

import React, { useState } from 'react';
import { MatchRecommendation } from '@/types';

interface MatchmakerProps {
  onViewCompany: (name: string) => void;
}

export default function Matchmaker({ onViewCompany }: MatchmakerProps) {
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<MatchRecommendation[]>([]);

  const handleFindMatches = async () => {
    if (!skills.trim()) return;
    setLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const response = await fetch('/api/ai/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills }),
      });

      if (!response.ok) throw new Error('Failed to fetch recommendations');
      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-950/40 to-background border border-indigo-500/30 rounded-2xl p-6 mb-8 relative overflow-hidden shadow-lg shadow-indigo-900/10">
      <div className="absolute -right-10 -top-10 text-indigo-500/10 pointer-events-none">
        <i data-lucide="sparkles" className="w-40 h-40"></i>
      </div>
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-indigo-300 mb-2 flex items-center gap-2">
          <i data-lucide="bot" className="w-5 h-5 text-indigo-400"></i> AI Booth Matchmaker
        </h2>
        <p className="text-sm text-indigo-200/70 mb-5 max-w-2xl">
          Not sure who to talk to? Enter your skills, interests, or target roles, and our AI will recommend the top 3 companies for you to visit today.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i data-lucide="code-2" className="h-5 w-5 text-indigo-400/50"></i>
            </div>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFindMatches()}
              className="block w-full pl-10 pr-3 py-3 border border-indigo-500/40 rounded-xl leading-5 bg-background/50 placeholder-indigo-300/30 text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors sm:text-sm"
              placeholder="e.g., Python, React, Machine Learning, passionate about FinTech..."
            />
          </div>
          <button 
            onClick={handleFindMatches}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <i data-lucide="loader-2" className="w-4 h-4 animate-spin"></i>
            ) : "✨ Find Matches"}
          </button>
        </div>
        
        {/* Match Results */}
        {recommendations.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-background/80 backdrop-blur border border-indigo-500/20 rounded-xl p-4 flex flex-col hover:border-indigo-400/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-indigo-100">{rec.companyName}</h3>
                  <span className="text-[10px] font-bold bg-indigo-900/50 text-indigo-300 px-2 py-0.5 rounded border border-indigo-700/50">#{index + 1} Match</span>
                </div>
                <p className="text-xs text-indigo-200/80 leading-relaxed mb-3 flex-grow">{rec.reason}</p>
                <button 
                  onClick={() => onViewCompany(rec.companyName)}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 self-start flex items-center gap-1"
                >
                  View Details <i data-lucide="arrow-right" className="w-3 h-3"></i>
                </button>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="mt-4 text-sm text-red-400">{error}</div>
        )}
      </div>
    </div>
  );
}
