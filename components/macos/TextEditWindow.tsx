'use client';

import React, { useState } from 'react';
import { PERSONAL_INFO, EXPERIENCES } from '@/data/portfolioData';
import { Copy, Check, Download, FileText, ExternalLink, Mail, MapPin } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';

export default function TextEditWindow() {
  const [copied, setCopied] = useState(false);

  const rawTextContent = `========================================================================
REX DAREL ANDIG — CURRICULUM VITAE & BACKGROUND
Full Stack Software Engineer
Status: ${PERSONAL_INFO.status}
Location: ${PERSONAL_INFO.location}
Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.github}
Resume: ${PERSONAL_INFO.resumeUrl}
========================================================================

[TAGLINE]
${PERSONAL_INFO.tagline}

[SUMMARY & BIO]
${PERSONAL_INFO.bio}

[CORE IMPACT STATS]
- Professional Engineering Experience: 5+ Years
- In-Progress High-Impact Projects: 3+
- Primary Specialization: Distributed Microservices, Database Optimization & Fluid Web Apps

------------------------------------------------------------------------
PROFESSIONAL EXPERIENCE
------------------------------------------------------------------------
${EXPERIENCES.map((exp) => `
* Company: ${exp.company}
  Role: ${exp.role}
  Period: ${exp.period}
  Location: ${exp.location}
  Highlights:
${exp.highlights.map(h => `    - ${h}`).join('\n')}
  Technologies: ${exp.technologies.join(', ')}
`).join('\n')}

------------------------------------------------------------------------
PRIMARY TECHNICAL EXPERTISE
------------------------------------------------------------------------
- Frontend: React, Next.js 16, Vue 2 & 3, TypeScript, Tailwind CSS v4
- Backend & Systems: Laravel, Python, GraphQL, REST APIs, OAuth2, JWT
- Databases & Cache: PostgreSQL, MySQL, Redis, MongoDB, DynamoDB
- DevOps & Cloud: Docker, GitHub Actions CI/CD, Vercel
========================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawTextContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([rawTextContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Rex_Bio.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e24] text-zinc-200 font-mono select-text">
      
      {/* TextEdit Document Sub-Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/90 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2 text-zinc-400">
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-zinc-200 font-semibold">Rex_Bio.txt</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">Plain Text UTF-8</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 transition-colors cursor-pointer border border-white/10"
            title="Copy entire document text"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy Text</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition-colors cursor-pointer border border-emerald-500/30 text-xs"
            title="Download Rex_Bio.txt to your computer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .txt</span>
          </button>
        </div>
      </div>

      {/* Text Document Content Area */}
      <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm leading-relaxed overflow-y-auto">
        
        {/* Header Block */}
        <div className="p-5 rounded-xl bg-zinc-900/80 border border-white/10 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide font-sans">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-emerald-400 font-semibold mt-0.5">
                {PERSONAL_INFO.role}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {PERSONAL_INFO.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-emerald-400 hover:underline">
                {PERSONAL_INFO.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <GithubIcon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-white hover:underline flex items-center gap-1">
                <span>github.com/rexdarelandig</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <a href={PERSONAL_INFO.resumeUrl} target="_blank" rel="noreferrer" className="text-amber-300 hover:underline flex items-center gap-1">
                <span>Official Resume (Google Docs)</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Tagline & Bio */}
        <div className="space-y-3">
          <div className="text-[11px] uppercase tracking-widest text-emerald-400 font-bold">
            {'/// ENGINEERING PHILOSOPHY & SUMMARY'}
          </div>
          <blockquote className="p-4 rounded-lg bg-zinc-900/50 border-l-2 border-emerald-400 text-zinc-300 italic font-sans text-sm sm:text-base">
            &ldquo;{PERSONAL_INFO.tagline}&rdquo;
          </blockquote>
          <p className="text-zinc-300 text-sm leading-relaxed font-sans">
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
          {PERSONAL_INFO.stats.map((stat, i) => (
            <div key={i} className="p-3.5 rounded-lg bg-zinc-900/60 border border-white/5">
              <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
              <div className="text-xs text-zinc-400 uppercase tracking-wide mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <div className="space-y-4 pt-2">
          <div className="text-[11px] uppercase tracking-widest text-emerald-400 font-bold">
            {'/// CHRONOLOGICAL CAREER RECORD'}
          </div>

          <div className="space-y-4">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white font-sans">
                      {exp.role}
                    </h3>
                    <div className="text-xs text-emerald-400 font-medium">
                      {exp.company}
                    </div>
                  </div>
                  <div className="text-xs text-zinc-400 font-mono">
                    {exp.period} · {exp.location}
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-zinc-300 pl-4 list-disc marker:text-emerald-400">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.technologies.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* TextEdit Status Bar */}
      <div className="mt-auto px-4 py-2 bg-zinc-900/95 border-t border-white/10 text-[11px] text-zinc-400 flex items-center justify-between">
        <div>3,412 Characters · 482 Words · 48 Lines</div>
        <div className="text-zinc-500">Read / Write Mode</div>
      </div>
    </div>
  );
}
