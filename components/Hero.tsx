'use client';

import React from 'react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { ArrowRight, Briefcase, Code2 } from 'lucide-react';

export default function Hero() {
  const stackBadges = [
    { label: 'Next.js', color: 'border-zinc-700 bg-zinc-800/50 text-zinc-200' },
    { label: 'Vue 2/3', color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' },
    { label: 'TypeScript', color: 'border-blue-500/30 bg-blue-500/10 text-blue-400' },
    { label: 'Flutter', color: 'border-sky-500/30 bg-sky-500/10 text-sky-400' },
    { label: 'Node.js', color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' },
    { label: 'PostgreSQL/MySQL', color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400' },
    { label: 'Supabase', color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' },
    { label: 'Redis', color: 'border-rose-500/30 bg-rose-500/10 text-rose-400' },
    { label: 'Docker & Vercel', color: 'border-amber-500/30 bg-amber-500/10 text-amber-400' },
  ];

  return (
    <section id="about" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/15 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start max-w-4xl">
          {/* Top Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 text-xs text-zinc-300 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-zinc-400">Full Stack Software Engineer</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-300">{PERSONAL_INFO.location}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
            Architecting{' '}
            <span className="text-accent-gradient">resilient backends</span>{' '}
            & fluid web experiences.
          </h1>

          {/* Subtitle / Bio */}
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 font-normal leading-relaxed max-w-3xl">
            Hi, I&apos;m <span className="text-white font-medium">{PERSONAL_INFO.name}</span>. I build modern, production-ready, enterprise-grade applications. With a strong foundation in software architecture and I specialize in developing scalable, high-performance systems that drive real business value.
          </p>

          {/* Core Tech Stack Pills */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider mr-2">
              Primary Stack:
            </span>
            {stackBadges.map((badge) => (
              <span
                key={badge.label}
                className={`px-3 py-1 rounded-md text-xs font-medium border ${badge.color}`}
              >
                {badge.label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#experience"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-zinc-200 text-sm font-medium transition-all hover:border-white/20"
            >
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span>Experience</span>
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-2 ml-auto sm:ml-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-zinc-900/60 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Impact Stats Grid */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PERSONAL_INFO.stats.map((stat, i) => (
            <div
              key={i}
              className="glass-card glass-card-hover p-6 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                {stat.value}
              </div>
              <div className="mt-1.5 text-xs text-zinc-400 font-medium tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
