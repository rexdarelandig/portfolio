'use client';

import React, { useState } from 'react';
import { PROJECTS } from '@/data/portfolioData';
import { ExternalLink, Layers, CheckCircle2, ChevronRight, Sparkles, FolderGit2 } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';

interface ProjectWindowProps {
  initialProjectId?: string;
}

export default function ProjectWindow({ initialProjectId }: ProjectWindowProps) {
  const [activeProjectId, setActiveProjectId] = useState<string>(
    initialProjectId || PROJECTS[0]?.id || 'floor-planner'
  );

  const currentProject = PROJECTS.find(p => p.id === activeProjectId) || PROJECTS[0];

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[500px] bg-zinc-950 text-zinc-100">
      
      {/* Sidebar: Projects Navigator */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-zinc-900/60 p-3 shrink-0 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto">
        <div className="hidden md:flex items-center gap-2 px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
          <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Projects ({PROJECTS.length})</span>
        </div>

        {PROJECTS.map((project) => {
          const isActive = project.id === activeProjectId;
          return (
            <button
              key={project.id}
              onClick={() => setActiveProjectId(project.id)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer shrink-0 md:shrink text-xs ${
                isActive
                  ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-medium shadow-sm'
                  : 'hover:bg-white/5 text-zinc-300 border border-transparent'
              }`}
            >
              <div className="truncate">
                <div className="truncate font-semibold">{project.title}</div>
                <div className="text-[10px] text-zinc-400 truncate">{project.category}</div>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 shrink-0 hidden md:block transition-transform ${isActive ? 'text-emerald-400 translate-x-0.5' : 'text-zinc-600'}`} />
            </button>
          );
        })}
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
        
        {/* Project Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                {currentProject.category}
              </span>
              {currentProject.featured && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Featured
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {currentProject.title}
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm font-mono mt-1">
              {currentProject.subtitle}
            </p>
          </div>

          {/* Quick External Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            {currentProject.githubUrl && (
              <a
                href={currentProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-white/10 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
            )}
            {currentProject.liveUrl && (
              <a
                href={currentProject.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02]"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
            Overview
          </div>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            {currentProject.description}
          </p>
        </div>

        {/* Metrics Banner */}
        {currentProject.metrics && currentProject.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {currentProject.metrics.map((m, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/5">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  {m.label}
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400 mt-0.5">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Architecture & Flow */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Architecture & System Design</span>
          </div>
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
            {currentProject.architectureOverview}
          </p>
        </div>

        {/* Key Features */}
        {currentProject.keyFeatures && (
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
              Key Capabilities
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentProject.keyFeatures.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/40 border border-white/5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400">
            Technologies & Tools
          </div>
          <div className="flex flex-wrap gap-2">
            {currentProject.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
