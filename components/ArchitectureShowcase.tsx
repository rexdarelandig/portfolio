'use client';

import React, { useState } from 'react';
import { ARCHITECTURE_SAMPLES } from '@/data/portfolioData';
import { Terminal, Copy, Check, FileCode2, Layers, Cpu, ShieldCheck } from 'lucide-react';

export default function ArchitectureShowcase() {
  const [activeTab, setActiveTab] = useState<string>(ARCHITECTURE_SAMPLES[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  const sample = ARCHITECTURE_SAMPLES.find((s) => s.id === activeTab) || ARCHITECTURE_SAMPLES[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sample.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="architecture" className="py-24 relative bg-[#0b0c12] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive Code & System Design</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Backend & Architecture Showcase
          </h2>
          <p className="mt-2 text-zinc-400 text-sm sm:text-base max-w-2xl">
            A look under the hood at production-ready engineering patterns: rate limiters, database index optimization, and automated CI/CD pipelines.
          </p>
        </div>

        {/* Tab Switcher & Code Box */}
        <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 bg-zinc-900/60 px-4 py-3 gap-3">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {ARCHITECTURE_SAMPLES.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-medium'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>{item.filename}</span>
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                Language: {sample.language}
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono border border-white/10 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Description Banner */}
          <div className="px-6 py-3 bg-emerald-500/5 border-b border-white/5 flex items-center justify-between text-xs font-mono text-zinc-300">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{sample.description}</span>
            </span>
          </div>

          {/* Code Viewer Container */}
          <div className="p-6 overflow-x-auto max-h-[500px] bg-[#07080c] font-mono text-xs leading-relaxed text-zinc-300">
            <pre className="selection:bg-emerald-500 selection:text-black">
              <code>{sample.code}</code>
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
}
