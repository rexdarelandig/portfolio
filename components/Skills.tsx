'use client';

import React, { useState } from 'react';
import { SKILL_CATEGORIES, SkillCategory } from '@/data/portfolioData';
import { 
  Layout, Code2, Palette, Database, Zap, Gauge, 
  Server, Cpu, Share2, Layers, Activity, ShieldCheck, 
  Flame, HardDrive, Search, Box, Cloud, GitBranch, 
  FileCode, LineChart, Wrench
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Layout: <Layout className="w-4 h-4" />,
  Code2: <Code2 className="w-4 h-4" />,
  Palette: <Palette className="w-4 h-4" />,
  Database: <Database className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  Gauge: <Gauge className="w-4 h-4" />,
  Server: <Server className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
  Share2: <Share2 className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4" />,
  HardDrive: <HardDrive className="w-4 h-4" />,
  Search: <Search className="w-4 h-4" />,
  Box: <Box className="w-4 h-4" />,
  Cloud: <Cloud className="w-4 h-4" />,
  GitBranch: <GitBranch className="w-4 h-4" />,
  FileCode: <FileCode className="w-4 h-4" />,
  LineChart: <LineChart className="w-4 h-4" />,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...SKILL_CATEGORIES.map((cat) => cat.title)];

  const filteredCategories = activeCategory === 'All'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((cat) => cat.title === activeCategory);

  return (
    <section id="skills" className="py-24 relative border-t border-white/5 bg-[#0b0c12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
              <Wrench className="w-3.5 h-3.5" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Engineering Stack & Skills
            </h2>
            <p className="mt-2 text-zinc-400 text-sm sm:text-base max-w-xl">
              Proven expertise across the full software lifecycle, from intuitive frontend components to high-scale backend architectures.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-zinc-900/80 border border-white/10 rounded-xl backdrop-blur-md w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="space-y-10">
          {filteredCategories.map((cat) => (
            <div key={cat.title} className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  {cat.title}
                </h3>
                <span className="text-xs font-mono text-zinc-500">
                  {cat.skills.length} competencies
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="glass-card glass-card-hover p-4 rounded-xl flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-zinc-800/80 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-colors">
                        {ICON_MAP[skill.iconName] || <Code2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                          {skill.name}
                        </h4>
                        <span className="text-[11px] text-zinc-500 font-mono">
                          {skill.tag}
                        </span>
                      </div>
                    </div>

                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                      skill.level === 'Expert'
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                        : skill.level === 'Advanced'
                        ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
                        : 'border-zinc-700 bg-zinc-800 text-zinc-400'
                    }`}>
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
