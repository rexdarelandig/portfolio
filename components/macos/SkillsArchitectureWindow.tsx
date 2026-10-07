'use client';

import React, { useState } from 'react';
import { SKILL_CATEGORIES, ARCHITECTURE_SAMPLES } from '@/data/portfolioData';
import { Code2, Server, Database, Cloud, FileCode, Copy, Check } from 'lucide-react';

export default function SkillsArchitectureWindow() {
  const [activeTab, setActiveTab] = useState<'skills' | 'architecture'>('skills');
  const [selectedSampleId, setSelectedSampleId] = useState<string>(ARCHITECTURE_SAMPLES[0]?.id || 'rate-limiter');
  const [copied, setCopied] = useState(false);

  const selectedSample = ARCHITECTURE_SAMPLES.find(s => s.id === selectedSampleId) || ARCHITECTURE_SAMPLES[0];

  const handleCopyCode = () => {
    if (selectedSample?.code) {
      navigator.clipboard.writeText(selectedSample.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0: return <Code2 className="w-4 h-4 text-emerald-400" />;
      case 1: return <Server className="w-4 h-4 text-blue-400" />;
      case 2: return <Database className="w-4 h-4 text-cyan-400" />;
      default: return <Cloud className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100">
      
      {/* Top Segmented Controls */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-zinc-900/60 shrink-0">
        <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-white/10 rounded-xl">
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'skills'
                ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Technical Stack & Skills
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Architecture Code Samples
          </button>
        </div>

        {activeTab === 'architecture' && (
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 border border-white/10 transition-colors cursor-pointer"
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
        )}
      </div>

      {/* Tab Content */}
      <div className="p-6 sm:p-8 overflow-y-auto flex-1">
        {activeTab === 'skills' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div
                key={cat.title}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-zinc-800 border border-white/5">
                    {getCategoryIcon(idx)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{cat.title}</h3>
                    <p className="text-xs text-zinc-400">{cat.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-xl bg-zinc-950/70 border border-white/5 flex items-center justify-between"
                    >
                      <span className="text-xs font-medium text-zinc-200">{skill.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 border border-emerald-500/20">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 h-full">
            {/* Sample Selector */}
            <div className="w-full lg:w-72 flex lg:flex-col gap-2 shrink-0 overflow-x-auto lg:overflow-x-visible">
              {ARCHITECTURE_SAMPLES.map((sample) => {
                const isSelected = sample.id === selectedSampleId;
                return (
                  <button
                    key={sample.id}
                    onClick={() => setSelectedSampleId(sample.id)}
                    className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border shrink-0 lg:shrink w-64 lg:w-full ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-white'
                        : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs font-mono font-semibold text-zinc-200 truncate">
                        {sample.filename}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-white truncate">
                      {sample.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Code Display */}
            <div className="flex-1 flex flex-col rounded-2xl bg-zinc-950 border border-white/10 overflow-hidden shadow-inner">
              <div className="px-4 py-2.5 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400">{selectedSample?.filename}</span>
                <span className="text-zinc-500 uppercase">{selectedSample?.language}</span>
              </div>
              <div className="p-4 bg-zinc-900/30 border-b border-white/5 text-xs text-zinc-300">
                {selectedSample?.description}
              </div>
              <pre className="p-5 overflow-auto text-xs font-mono text-zinc-200 leading-relaxed bg-[#0d0e15] flex-1 select-text">
                <code>{selectedSample?.code}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
