'use client';

import React from 'react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { Terminal, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 bg-[#08090d] border-t border-white/10 text-zinc-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="text-zinc-200 font-semibold text-sm tracking-tight">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">Full Stack Software Engineer</span>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-wrap items-center gap-4 text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Status Indicator & Copyright */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
            <span className="text-zinc-600">© {new Date().getFullYear()}</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
