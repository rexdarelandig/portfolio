'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '@/data/portfolioData';
import { Search, FileText, FolderGit2, Terminal, Code2, Mail, ArrowRight } from 'lucide-react';
import { WindowId } from './types';

interface SpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (id: WindowId, projectId?: string) => void;
}

export default function SpotlightModal({ isOpen, onClose, onOpenWindow }: SpotlightModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onOpenWindow('bio'); // or trigger spotlight
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onOpenWindow]);

  if (!isOpen) return null;

  const defaultItems = [
    {
      id: 'bio',
      title: 'Rex_Bio.txt',
      subtitle: 'Personal Details, Background & Career History',
      icon: <FileText className="w-4 h-4 text-amber-400" />,
      action: () => onOpenWindow('bio'),
    },
    ...PROJECTS.map((p) => ({
      id: `project-${p.id}`,
      title: p.title,
      subtitle: `${p.category} — ${p.subtitle}`,
      icon: <FolderGit2 className="w-4 h-4 text-emerald-400" />,
      action: () => onOpenWindow('projects', p.id),
    })),
    {
      id: 'terminal',
      title: 'Terminal.app',
      subtitle: 'Interactive Command Line Shell',
      icon: <Terminal className="w-4 h-4 text-zinc-300" />,
      action: () => onOpenWindow('terminal'),
    },
    {
      id: 'skills',
      title: 'Skills & Architecture',
      subtitle: 'Technical Stack & Redis/Prisma Code Samples',
      icon: <Code2 className="w-4 h-4 text-cyan-400" />,
      action: () => onOpenWindow('skills'),
    },
    {
      id: 'contact',
      title: 'Mail (Contact)',
      subtitle: 'Send message & copy direct email',
      icon: <Mail className="w-4 h-4 text-blue-400" />,
      action: () => onOpenWindow('contact'),
    },
  ];

  const filteredItems = query.trim()
    ? defaultItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : defaultItems;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-start justify-center pt-24 sm:pt-32 px-4 bg-black/60 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-zinc-900/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden ring-1 ring-black/50"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Spotlight Search (projects, bio, terminal, skills)..."
            className="w-full bg-transparent text-base text-white placeholder-zinc-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-800 rounded border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  item.action();
                  onClose();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-emerald-500/15 hover:border-emerald-500/30 border border-transparent text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-zinc-800/80 border border-white/5 shrink-0 group-hover:bg-emerald-500/20">
                    {item.icon}
                  </div>
                  <div className="truncate">
                    <div className="text-sm font-semibold text-white group-hover:text-emerald-300 truncate">
                      {item.title}
                    </div>
                    <div className="text-xs text-zinc-400 truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors shrink-0 ml-2" />
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-zinc-500">
              No matching applications or files found for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
