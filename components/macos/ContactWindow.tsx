'use client';

import React, { useState } from 'react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { Mail, Send, Check, Copy, MapPin } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';

export default function ContactWindow() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Inquiry / Opportunity',
    message: ''
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', subject: 'Project Inquiry / Opportunity', message: '' });
    }, 4000);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100 select-text">
      
      {/* Mail Window Header Bar */}
      <div className="px-6 py-3 border-b border-white/10 bg-zinc-900/80 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-zinc-300">
          <Mail className="w-4 h-4 text-emerald-400" />
          <span>New Message — Rex Mail</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer border border-white/10 text-xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied Email</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
              <span>Copy {PERSONAL_INFO.email}</span>
            </>
          )}
        </button>
      </div>

      <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
        
        {/* Recipient Details Pill */}
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 font-mono w-16">To:</span>
            <span className="text-emerald-400 font-semibold">{PERSONAL_INFO.name} &lt;{PERSONAL_INFO.email}&gt;</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 font-mono w-16">Location:</span>
            <span className="text-zinc-300 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-zinc-500" /> {PERSONAL_INFO.location}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 font-mono w-16">GitHub:</span>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-white underline flex items-center gap-1">
              <GithubIcon className="w-3 h-3" /> {PERSONAL_INFO.github}
            </a>
          </div>
        </div>

        {/* Message Form or Sent Feedback */}
        {sent ? (
          <div className="py-12 text-center space-y-3 bg-zinc-900/40 rounded-2xl border border-white/5">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Message Sent Successfully!</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Your note has been queued. Rex will get back to you promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                  From (Your Name)
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Steve Jobs"
                  className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="steve@apple.com"
                  className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5 uppercase">
                Message Content
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Let's build an amazing project together..."
                className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
