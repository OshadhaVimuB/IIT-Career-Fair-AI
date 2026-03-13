"use client";

import React, { useEffect, useState } from 'react';
import { Company } from '@/types';

interface InterviewPrepModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InterviewPrepModal({ company, isOpen, onClose }: InterviewPrepModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prepData, setPrepData] = useState<string>('');

  useEffect(() => {
    if (isOpen && company) {
      generatePrep();
    } else {
      setPrepData('');
      setError(null);
    }
  }, [isOpen, company]);

  const generatePrep = async () => {
    if (!company) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ai/prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company }),
      });
      
      if (!response.ok) throw new Error('Failed to generate prep');
      
      const data = await response.json();
      setPrepData(data.html);
    } catch (err: any) {
      setError(err.message || 'Failed to generate prep content.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col mx-4 shadow-2xl overflow-hidden transform transition-transform duration-300">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-border flex justify-between items-center bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400">
              <i data-lucide="brain-circuit" className="w-5 h-5"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{company?.name || 'Company Name'}</h3>
              <p className="text-xs text-muted-foreground">✨ AI Generated Interview Prep</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted">
            <i data-lucide="x" className="w-5 h-5"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 relative min-h-[300px]">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-card z-10">
              <i data-lucide="loader-2" className="w-8 h-8 text-indigo-500 animate-spin mb-4"></i>
              <p className="text-sm font-medium text-foreground">Analyzing company profile...</p>
              <p className="text-xs text-muted-foreground mt-1">Generating tailored questions</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <i data-lucide="alert-circle" className="w-8 h-8 text-red-500 mx-auto mb-3"></i>
              <p className="text-red-400 text-sm">{error}</p>
              <button 
                onClick={generatePrep}
                className="mt-4 text-xs text-indigo-400 hover:underline"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && prepData && (
            <div 
              className="text-sm text-foreground/90 space-y-5"
              dangerouslySetInnerHTML={{ __html: prepData }}
            />
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="p-4 border-t border-border bg-muted/20 flex justify-end">
          <button onClick={onClose} className="bg-foreground text-background px-4 py-2 rounded-lg text-sm font-semibold hover:bg-neutral-200 transition-colors">
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
