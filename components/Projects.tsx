'use client';

import React, { useState } from 'react';
import { PROJECTS, Project } from '@/data/portfolioData';
import ProjectModal from './ProjectModal';
import { GithubIcon } from '@/components/Icons';
import { ExternalLink, Layers, ArrowUpRight, FolderGit2 } from 'lucide-react';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Full Stack', 'Backend & System', 'AI & Analytics'];

  const filteredProjects = filterCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filterCategory);

  return (
    <section id="projects" className="py-24 relative bg-[#090a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Production Work & Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Full Stack Projects
            </h2>
            <p className="mt-2 text-zinc-400 text-sm sm:text-base max-w-xl">
              Architected for real-world reliability, sub-second latency, and scalable maintainability. This section is in progress. More coming soon.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-zinc-900/80 border border-white/10 rounded-xl backdrop-blur-md w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${filterCategory === cat
                  ? 'bg-emerald-500 text-black font-semibold shadow-md shadow-emerald-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle Ambient Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />

              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-zinc-800 border border-white/10 text-emerald-400">
                    {project.category}
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 hidden rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1 mb-3">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3 mb-6">
                  {project.description}
                </p>

                {/* Key Metrics Chips */}
                <div className="hidden grid-cols-3 gap-2 mb-6 bg-zinc-950/60 p-3 rounded-xl border border-white/5">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-tighter truncate">
                        {m.label}
                      </div>
                      <div className="text-xs font-bold font-mono text-emerald-400 truncate mt-0.5">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-zinc-900 text-[11px] font-mono text-zinc-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 5 && (
                    <span className="px-2 py-0.5 rounded bg-zinc-900 text-[11px] font-mono text-zinc-500">
                      +{project.tags.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              {/* View Deep Dive Action */}
              <button
                onClick={() => setSelectedProject(project)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-emerald-500/40 text-xs font-medium text-zinc-200 hover:text-white transition-all cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Architecture Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
}
