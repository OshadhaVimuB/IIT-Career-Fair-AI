"use client";

import React from 'react';

export default function Navbar() {
  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Logo & Title */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 text-white">
            <i data-lucide="graduation-cap" className="w-6 h-6 sm:w-7 sm:h-7"></i>
            <div className="absolute inset-0 rounded-xl border border-white/20"></div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground leading-none mb-1">
              IIT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Career Fair</span>
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">CS Undergrad Portal</p>
            </div>
          </div>
        </div>

        {/* Right: Navigation & CTA */}
        <div className="flex items-center gap-2 sm:gap-6">
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1.5 group">
              <i data-lucide="building" className="w-4 h-4 group-hover:text-blue-400 transition-colors"></i> Companies
            </a>
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1.5 group">
              <i data-lucide="file-text" className="w-4 h-4 group-hover:text-blue-400 transition-colors"></i> CV Guide
            </a>
            <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1.5 group">
              <i data-lucide="help-circle" className="w-4 h-4 group-hover:text-blue-400 transition-colors"></i> FAQ
            </a>
          </nav>
          
          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-border"></div>

          {/* CTA Button */}
          <button className="group flex items-center gap-2 bg-foreground text-background hover:bg-neutral-200 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm font-semibold transition-all shadow-sm">
            <i data-lucide="sparkles" className="w-4 h-4 text-indigo-600 group-hover:text-indigo-700 transition-colors"></i>
            <span className="hidden sm:inline">Interactive Guide</span>
            <span className="sm:hidden">Guide</span>
          </button>
        </div>
      </div>
    </header>
  );
}
