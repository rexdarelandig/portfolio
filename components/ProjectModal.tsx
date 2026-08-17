'use client';

import React, { useEffect } from 'react';
import { Project } from '@/data/portfolioData';
import { GithubIcon } from '@/components/Icons';
import { X, ExternalLink, CheckCircle2, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              {project.category}
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              {project.title} — Case Study
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-8">
          {/* Subtitle & Description */}
          <div>
            <h4 className="text-xl font-semibold text-white mb-2">
              {project.subtitle}
            </h4>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Metrics Banner */}
          <div className="hidden grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((m, i) => (
              <div key={i} className="bg-zinc-950/80 border border-white/10 rounded-xl p-4">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  {m.label}
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Deep Dive */}
          <div className="bg-zinc-950/40 border border-white/10 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>System Architecture & Data Flow</span>
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {project.architectureOverview}
            </p>
          </div>

          {/* Key Engineering Features */}
          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
              Key Engineering Highlights
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-zinc-800/40 border border-white/5 p-3 rounded-lg text-xs sm:text-sm text-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <h5 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Technologies Used
            </h5>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="px-3 py-1 bg-zinc-800 border border-white/10 rounded-md text-xs font-mono text-zinc-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium border border-white/10 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Repository</span>
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold transition-colors"
            >
              <span>Live Application</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={onClose}
            className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
