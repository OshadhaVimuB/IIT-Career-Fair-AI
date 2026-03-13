"use client";

import React from 'react';
import { Company } from '@/types';

interface CompanyCardProps {
  company: Company;
  onOpenPrep: (companyName: string) => void;
}

export default function CompanyCard({ company, onOpenPrep }: CompanyCardProps) {
  const getTierStyle = (tier: string) => {
    if (tier.includes('Tier 1')) return 'bg-blue-900/40 text-blue-300 border-blue-800';
    if (tier.includes('Tier 2')) return 'bg-emerald-900/40 text-emerald-300 border-emerald-800';
    if (tier.includes('Tier 3')) return 'bg-purple-900/40 text-purple-300 border-purple-800';
    if (tier.includes('Tier 4')) return 'bg-amber-900/40 text-amber-300 border-amber-800';
    return 'bg-muted text-muted-foreground border-border';
  };

  return (
    <div className="bg-card rounded-2xl border border-border hover:border-muted-foreground/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group cursor-default">
      <div className="p-6 pb-4 border-b border-border flex-1">
        <div className="flex justify-between items-start mb-4 gap-2">
          <h2 className="text-xl font-bold text-foreground group-hover:text-blue-400 transition-colors">
            {company.name}
          </h2>
          <span className={`text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${getTierStyle(company.tier)}`}>
            {company.tier.split(':')[0]}
          </span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <i data-lucide="building-2" className="w-4 h-4 mr-2 flex-shrink-0"></i>
          <span className="truncate" title={company.industry}>{company.industry}</span>
          <span className="mx-2 text-border">•</span>
          <span>{company.size}</span>
        </div>
      </div>

      <div className="p-6 pt-4 bg-muted/20 flex-col gap-4 flex md:h-[200px] justify-between">
        <div>
          <div className="flex items-center text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            <i data-lucide="briefcase" className="w-3.5 h-3.5 mr-1.5"></i> Predicted Roles
          </div>
          <p className="text-sm text-foreground/90 leading-snug font-medium line-clamp-2" title={company.positions}>
            {company.positions}
          </p>
        </div>
        <div>
          <div className="flex items-center text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            <i data-lucide="code" className="w-3.5 h-3.5 mr-1.5"></i> Tech Stack
          </div>
          <p className="text-sm text-foreground/80 leading-snug line-clamp-2 font-mono bg-background border border-border px-2 py-1 rounded shadow-sm" title={company.techStack}>
            {company.techStack}
          </p>
        </div>
        
        {/* ✨ AI Action Button */}
        <button 
          onClick={() => onOpenPrep(company.name)} 
          className="mt-2 w-full flex items-center justify-center gap-2 bg-indigo-950/30 hover:bg-indigo-900/50 text-indigo-300 py-2 rounded-lg text-xs font-bold transition-colors border border-indigo-500/20 group/btn"
        >
          <i data-lucide="sparkles" className="w-3.5 h-3.5 text-indigo-400 group-hover/btn:text-indigo-300"></i>
          Generate Interview Prep
        </button>
      </div>
    </div>
  );
}
