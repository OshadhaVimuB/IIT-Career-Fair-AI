"use client";

import React from 'react';

interface FiltersProps {
  search: string;
  setSearch: (val: string) => void;
  tier: string;
  setTier: (val: string) => void;
  size: string;
  setSize: (val: string) => void;
  tiers: string[];
}

export default function Filters({ search, setSearch, tier, setTier, size, setSize, tiers }: FiltersProps) {
  const sizes = ['All', 'Small', 'Medium', 'Large'];

  return (
    <div className="bg-card p-4 sm:p-6 rounded-2xl border border-border shadow-sm mb-8 flex flex-col md:flex-row gap-4">
      {/* Search */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i data-lucide="search" className="h-5 w-5 text-muted-foreground"></i>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-input rounded-xl leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors sm:text-sm text-foreground"
          placeholder="Search companies, tech stack, or roles..."
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative">
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="block w-full sm:w-64 pl-4 pr-10 py-3 text-sm sm:text-base border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors appearance-none cursor-pointer"
          >
            {tiers.map(t => (
              <option key={t} value={t}>{t === 'All' ? 'All Ranking Tiers' : t}</option>
            ))}
          </select>
          <i data-lucide="chevron-down" className="absolute right-3 top-3.5 h-5 w-5 text-muted-foreground pointer-events-none"></i>
        </div>

        <div className="relative">
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="block w-full sm:w-40 pl-4 pr-10 py-3 text-sm sm:text-base border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors appearance-none cursor-pointer"
          >
            {sizes.map(s => (
              <option key={s} value={s}>{s === 'All' ? 'Any Size' : s + ' Size'}</option>
            ))}
          </select>
          <i data-lucide="chevron-down" className="absolute right-3 top-3.5 h-5 w-5 text-muted-foreground pointer-events-none"></i>
        </div>
      </div>
    </div>
  );
}
