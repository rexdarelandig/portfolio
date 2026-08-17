'use client';

import React from 'react';
import { EXPERIENCES } from '@/data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-[#090a0f] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Career Progression & Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Engineering Work Experience
          </h2>
          <p className="mt-2 text-zinc-400 text-sm sm:text-base max-w-xl">
            Track record of shipping production code, optimizing performance, and leading technical initiatives.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {EXPERIENCES.map((exp, index) => (
            <div key={index} className="relative group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-zinc-900 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <Briefcase className="w-3 h-3" />
              </div>

              {/* Card Container */}
              <div className="glass-card glass-card-hover p-6 rounded-2xl space-y-4">
                
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-emerald-400">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1 bg-zinc-800/80 px-3 py-1 rounded-full border border-white/5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {exp.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
                    Key Contributions & Impact:
                  </h4>
                  <ul className="space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technology Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded bg-zinc-900 text-[11px] font-mono text-zinc-400 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
