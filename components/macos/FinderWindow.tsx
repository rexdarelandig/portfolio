'use client';

import React, { useState } from 'react';
import { PROJECTS, ARCHITECTURE_SAMPLES } from '@/data/portfolioData';
import { FileText, Code2, FolderGit2, HardDrive, ExternalLink } from 'lucide-react';
import { WindowId } from './types';

interface FinderWindowProps {
  onOpenWindow: (id: WindowId, projectId?: string) => void;
}

export default function FinderWindow({ onOpenWindow }: FinderWindowProps) {
  const [selectedFolder, setSelectedFolder] = useState<'all' | 'projects' | 'docs' | 'architecture'>('projects');

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[460px] bg-zinc-950 text-zinc-100">
      
      {/* Finder Left Sidebar */}
      <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-white/10 bg-zinc-900/50 p-3 shrink-0 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto text-xs">
        <div className="hidden md:block px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
          Favorites
        </div>

        <button
          onClick={() => setSelectedFolder('projects')}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left cursor-pointer transition-colors ${
            selectedFolder === 'projects'
              ? 'bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30'
              : 'hover:bg-white/5 text-zinc-300'
          }`}
        >
          <FolderGit2 className="w-4 h-4 text-emerald-400" />
          <span>Projects</span>
        </button>

        <button
          onClick={() => setSelectedFolder('docs')}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left cursor-pointer transition-colors ${
            selectedFolder === 'docs'
              ? 'bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30'
              : 'hover:bg-white/5 text-zinc-300'
          }`}
        >
          <FileText className="w-4 h-4 text-amber-400" />
          <span>Documents</span>
        </button>

        <button
          onClick={() => setSelectedFolder('architecture')}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left cursor-pointer transition-colors ${
            selectedFolder === 'architecture'
              ? 'bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/30'
              : 'hover:bg-white/5 text-zinc-300'
          }`}
        >
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span>Architecture</span>
        </button>
      </div>

      {/* Main Files Grid */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        
        {/* Finder Subheader */}
        <div className="flex items-center justify-between text-xs text-zinc-400 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2 font-mono">
            <HardDrive className="w-3.5 h-3.5 text-zinc-500" />
            <span>Macintosh HD &gt; {selectedFolder.toUpperCase()}</span>
          </div>
          <div className="text-[11px] text-zinc-500">
            Click any file to launch
          </div>
        </div>

        {/* Content based on folder */}
        {selectedFolder === 'projects' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onOpenWindow('projects', proj.id)}
                className="p-4 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <FolderGit2 className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {proj.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm group-hover:text-emerald-300 transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                    {proj.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
                  <span>Open App</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedFolder === 'docs' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => onOpenWindow('bio')}
              className="p-4 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm group-hover:text-amber-300">
                Rex_Bio.txt
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                Personal background, career history, stats & contact info.
              </p>
            </div>

            <div
              onClick={() => onOpenWindow('terminal')}
              className="p-4 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
                <Code2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm group-hover:text-cyan-300">
                Terminal.app
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                Interactive shell session with custom CLI utilities.
              </p>
            </div>
          </div>
        )}

        {selectedFolder === 'architecture' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ARCHITECTURE_SAMPLES.map((sample) => (
              <div
                key={sample.id}
                onClick={() => onOpenWindow('skills')}
                className="p-4 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
                  <Code2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm group-hover:text-cyan-300">
                  {sample.filename}
                </h4>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                  {sample.description}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
