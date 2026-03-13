"use client";

import React, { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Matchmaker from "@/components/Matchmaker";
import Filters from "@/components/Filters";
import CompanyCard from "@/components/CompanyCard";
import InterviewPrepModal from "@/components/InterviewPrepModal";
import LucideInit from "@/components/LucideInit";
import { companiesData } from "@/data/companies";
import { Company } from "@/types";

export default function Home() {
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("All");
  const [size, setSize] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tiers = useMemo(() => ["All", ...new Set(companiesData.map(c => c.tier))], []);

  const filteredCompanies = useMemo(() => {
    return companiesData.filter(company => {
      const searchLower = search.toLowerCase();
      const matchesSearch = 
        company.name.toLowerCase().includes(searchLower) ||
        company.techStack.toLowerCase().includes(searchLower) ||
        company.positions.toLowerCase().includes(searchLower) ||
        company.industry.toLowerCase().includes(searchLower);
      const matchesTier = tier === 'All' || company.tier === tier;
      const matchesSize = size === 'All' || company.size === size;
      return matchesSearch && matchesTier && matchesSize;
    });
  }, [search, tier, size]);

  const handleOpenPrep = (companyName: string) => {
    const company = companiesData.find(c => c.name === companyName);
    if (company) {
      setSelectedCompany(company);
      setIsModalOpen(true);
    }
  };

  const handleViewCompanyFromMatch = (name: string) => {
    setSearch(name);
    // Smooth scroll to results
    const grid = document.getElementById('companyGrid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const clearFilters = () => {
    setSearch("");
    setTier("All");
    setSize("All");
  };

  return (
    <>
      <LucideInit />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        
        <Matchmaker onViewCompany={handleViewCompanyFromMatch} />

        <Filters 
          search={search} 
          setSearch={setSearch} 
          tier={tier} 
          setTier={setTier} 
          size={size} 
          setSize={setSize} 
          tiers={tiers}
        />

        {/* Meta info */}
        <div className="mb-6 flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredCompanies.length}</span> companies
          </p>
        </div>

        {/* Grid */}
        <div id="companyGrid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCompanies.map(company => (
            <CompanyCard 
              key={company.name} 
              company={company} 
              onOpenPrep={handleOpenPrep} 
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-20 bg-card rounded-2xl border border-border border-dashed">
            <i data-lucide="filter" className="mx-auto h-10 w-10 text-muted-foreground mb-4"></i>
            <h3 className="text-lg font-medium text-foreground mb-1">No companies found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            <button 
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-foreground text-background rounded-lg font-medium hover:bg-neutral-200 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

      </main>

      <InterviewPrepModal 
        company={selectedCompany} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
