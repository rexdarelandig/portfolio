'use client';

import React, { useState } from 'react';
import MacDesktop from '@/components/macos/MacDesktop';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Monitor } from 'lucide-react';

export default function Home() {
  const [isClassicMode, setIsClassicMode] = useState(false);

  if (!isClassicMode) {
    return (
      <MacDesktop
        isClassicMode={isClassicMode}
        onToggleClassicMode={() => setIsClassicMode(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* Floating Return to macOS Desktop Switcher */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsClassicMode(false)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-white text-xs font-semibold backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/80 hover:scale-105 transition-all cursor-pointer group"
        >
          <span className="text-base leading-none"></span>
          <span>Switch to macOS Golden Gate View</span>
          <Monitor className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
