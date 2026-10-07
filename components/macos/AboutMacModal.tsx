'use client';

import React from 'react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { X, Cpu, HardDrive, Layers, Sparkles, ExternalLink } from 'lucide-react';

interface AboutMacModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBio: () => void;
}

export default function AboutMacModal({ isOpen, onClose, onOpenBio }: AboutMacModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div
        className="w-full max-w-md bg-zinc-900/90 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden text-center p-6 space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center text-black/60 hover:text-black transition-colors cursor-pointer"
        >
          <X className="w-2.5 h-2.5 stroke-[3]" />
        </button>

        {/* Golden Gate Bridge Badge */}
        <div className="pt-2">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-500 via-rose-500 to-indigo-600 p-0.5 shadow-xl shadow-rose-500/20">
            <div className="w-full h-full bg-zinc-950 rounded-[22px] flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-amber-400" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-white mt-4 tracking-tight">
            Rex Darel Andig
          </h2>
          <p className="text-xs font-mono text-emerald-400 mt-0.5">
            macOS Golden Gate Edition (2026.1)
          </p>
        </div>

        {/* Specifications List */}
        <div className="space-y-2.5 text-xs text-left bg-zinc-950/60 p-4 rounded-xl border border-white/10 font-mono">
          <div className="flex justify-between items-center text-zinc-300">
            <span className="text-zinc-500 flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-emerald-400" /> Chip:
            </span>
            <span className="text-right text-zinc-200">Full Stack Engine (Next.js / Laravel)</span>
          </div>

          <div className="flex justify-between items-center text-zinc-300">
            <span className="text-zinc-500 flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-cyan-400" /> Memory:
            </span>
            <span className="text-right text-zinc-200">5+ Years Industry Experience</span>
          </div>

          <div className="flex justify-between items-center text-zinc-300">
            <span className="text-zinc-500 flex items-center gap-1.5">
              <HardDrive className="w-3 h-3 text-amber-400" /> Storage:
            </span>
            <span className="text-right text-zinc-200">PostgreSQL · MySQL · Redis</span>
          </div>

          <div className="flex justify-between items-center text-zinc-300">
            <span className="text-zinc-500">Location:</span>
            <span className="text-right text-zinc-200 truncate">{PERSONAL_INFO.location}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            onClick={() => {
              onClose();
              onOpenBio();
            }}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-white/10 transition-colors cursor-pointer"
          >
            System Report (Rex_Bio.txt)
          </button>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold transition-all shadow-md shadow-emerald-500/20"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
