'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from '@/data/portfolioData';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function TerminalWindow() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-zinc-300">
          <p className="text-emerald-400 font-bold">
            Welcome to RexOS Terminal (v2.6 Darwin/arm64)
          </p>
          <p className="text-zinc-400 text-xs">
            Type <span className="text-amber-300 font-semibold">&apos;help&apos;</span> to see available commands or <span className="text-amber-300 font-semibold">&apos;cat Rex_Bio.txt&apos;</span> to read details.
          </p>
        </div>
      ),
    },
  ]);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const lowerCmd = cmd.toLowerCase();
    let response: React.ReactNode = null;

    if (lowerCmd === 'help') {
      response = (
        <div className="space-y-1.5 text-xs text-zinc-300">
          <div className="text-emerald-400 font-bold">Available Commands:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-2">
            <div><span className="text-amber-300 font-semibold">help</span> — Display this help menu</div>
            <div><span className="text-amber-300 font-semibold">cat Rex_Bio.txt</span> — Read personal bio & details</div>
            <div><span className="text-amber-300 font-semibold">whoami</span> — Current user profile</div>
            <div><span className="text-amber-300 font-semibold">projects</span> — List all projects with status</div>
            <div><span className="text-amber-300 font-semibold">skills</span> — List technical skill categories</div>
            <div><span className="text-amber-300 font-semibold">contact</span> — Get direct contact links</div>
            <div><span className="text-amber-300 font-semibold">neofetch</span> — System specs & stats</div>
            <div><span className="text-amber-300 font-semibold">clear</span> — Clear terminal output</div>
          </div>
        </div>
      );
    } else if (lowerCmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (lowerCmd === 'whoami') {
      response = (
        <div className="text-xs text-zinc-300">
          <span className="text-emerald-400 font-bold">{PERSONAL_INFO.name}</span> — {PERSONAL_INFO.role} ({PERSONAL_INFO.location})
        </div>
      );
    } else if (lowerCmd === 'cat rex_bio.txt' || lowerCmd === 'bio') {
      response = (
        <div className="text-xs space-y-2 text-zinc-300 bg-zinc-900/60 p-3 rounded-lg border border-white/5">
          <p className="font-semibold text-white">{PERSONAL_INFO.name}</p>
          <p className="text-zinc-400 italic">&ldquo;{PERSONAL_INFO.tagline}&rdquo;</p>
          <p>{PERSONAL_INFO.bio}</p>
          <p className="text-emerald-400">Email: {PERSONAL_INFO.email}</p>
        </div>
      );
    } else if (lowerCmd === 'projects') {
      response = (
        <div className="space-y-2 text-xs">
          <div className="text-emerald-400 font-bold">Featured Projects:</div>
          {PROJECTS.map((p) => (
            <div key={p.id} className="pl-2 border-l border-white/10">
              <span className="text-white font-semibold">{p.title}</span> ({p.category})
              <p className="text-zinc-400">{p.subtitle}</p>
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
                  Live: {p.liveUrl}
                </a>
              )}
            </div>
          ))}
        </div>
      );
    } else if (lowerCmd === 'skills') {
      response = (
        <div className="space-y-3 text-xs">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.title}>
              <div className="text-emerald-400 font-semibold">{cat.title}</div>
              <div className="text-zinc-400 pl-2">
                {cat.skills.map(s => s.name).join(' • ')}
              </div>
            </div>
          ))}
        </div>
      );
    } else if (lowerCmd === 'contact') {
      response = (
        <div className="space-y-1 text-xs text-zinc-300">
          <p>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-emerald-400 underline">{PERSONAL_INFO.email}</a></p>
          <p>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-emerald-400 underline">{PERSONAL_INFO.github}</a></p>
          <p>Resume: <a href={PERSONAL_INFO.resumeUrl} target="_blank" rel="noreferrer" className="text-amber-300 underline">Google Docs</a></p>
        </div>
      );
    } else if (lowerCmd === 'neofetch') {
      response = (
        <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs">
          <pre className="text-amber-400 font-bold leading-tight select-none">
{`   .-''''''-.
 .'          '.
/   O      O   \\
:      __      :
\\    .'  '.    /
 '.          .'
   '-......-'`}
          </pre>
          <div className="space-y-1 text-zinc-300">
            <div><span className="text-emerald-400 font-bold">rex@golden-gate</span></div>
            <div className="text-zinc-500">----------------------</div>
            <div><span className="text-zinc-400">OS:</span> macOS Golden Gate (Portfolio Edition)</div>
            <div><span className="text-zinc-400">Host:</span> Rex Darel Andig</div>
            <div><span className="text-zinc-400">Role:</span> Full Stack Software Engineer</div>
            <div><span className="text-zinc-400">Uptime:</span> 5+ Years Industry Experience</div>
            <div><span className="text-zinc-400">Stack:</span> Next.js, TypeScript, Vue, Laravel, Postgres, Redis</div>
            <div><span className="text-zinc-400">Status:</span> Available for opportunities</div>
          </div>
        </div>
      );
    } else {
      response = (
        <div className="text-xs text-rose-400">
          zsh: command not found: {cmd}. Type &apos;help&apos; for available commands.
        </div>
      );
    }

    setHistory((prev) => [...prev, { command: cmd, output: response }]);
    setInputVal('');
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="p-4 sm:p-6 bg-black/90 text-zinc-200 font-mono text-xs sm:text-sm min-h-[380px] max-h-[70vh] flex flex-col cursor-text select-text"
    >
      <div className="space-y-4 flex-1">
        {history.map((item, index) => (
          <div key={index} className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">rex@golden-gate</span>
              <span className="text-zinc-500">~ %</span>
              <span className="text-white font-medium">{item.command}</span>
            </div>
            <div>{item.output}</div>
          </div>
        ))}

        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-bold">rex@golden-gate</span>
          <span className="text-zinc-500">~ %</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-transparent text-white focus:outline-none caret-emerald-400"
            autoFocus
            spellCheck={false}
          />
        </form>
        <div ref={endRef} />
      </div>
    </div>
  );
}
