'use client';

import React, { useState, useEffect } from 'react';
import { Search, Wifi, BatteryCharging, Sliders, Monitor, FileText, FolderGit2, Terminal, Sparkles, Moon } from 'lucide-react';
import { WindowId } from './types';

interface MacMenuBarProps {
  activeAppTitle: string;
  onOpenWindow: (id: WindowId, projectId?: string) => void;
  onOpenAboutMac: () => void;
  onOpenSpotlight: () => void;
  isClassicMode: boolean;
  onToggleClassicMode: () => void;
}

export default function MacMenuBar({
  activeAppTitle,
  onOpenWindow,
  onOpenAboutMac,
  onOpenSpotlight,
  isClassicMode,
  onToggleClassicMode,
}: MacMenuBarProps) {
  const [timeStr, setTimeStr] = useState<string>('');
  const [isAppleMenuOpen, setIsAppleMenuOpen] = useState(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      setTimeStr(now.toLocaleString('en-US', options).replace(/,/g, ''));
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-7 z-[110] bg-black/40 backdrop-blur-2xl border-b border-white/10 text-white flex items-center justify-between px-3 text-[13px] font-sans select-none">
      
      {/* Left Menu Items */}
      <div className="flex items-center gap-4">
        {/* Apple Logo Dropdown Trigger */}
        <div className="relative">
          <button
            onClick={() => {
              setIsAppleMenuOpen(!isAppleMenuOpen);
              setIsControlCenterOpen(false);
            }}
            className="flex items-center px-1.5 py-0.5 rounded hover:bg-white/15 transition-colors cursor-pointer text-white/90"
            aria-label="Apple Menu"
          >
            <span className="text-base leading-none"></span>
          </button>

          {isAppleMenuOpen && (
            <div
              onClick={() => setIsAppleMenuOpen(false)}
              className="absolute left-0 top-7 w-56 bg-zinc-900/95 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl shadow-black/80 p-1 space-y-0.5 text-xs text-zinc-200 z-[120]"
            >
              <button
                onClick={onOpenAboutMac}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-emerald-500 hover:text-black transition-colors text-left cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>About Rex Darel...</span>
              </button>

              <div className="h-px bg-white/10 my-1" />

              <button
                onClick={() => onOpenWindow('bio')}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-emerald-500 hover:text-black transition-colors text-left cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Open Rex_Bio.txt</span>
              </button>

              <button
                onClick={() => onOpenWindow('projects')}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-emerald-500 hover:text-black transition-colors text-left cursor-pointer"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>View Projects</span>
              </button>

              <button
                onClick={() => onOpenWindow('terminal')}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-emerald-500 hover:text-black transition-colors text-left cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Launch Terminal</span>
              </button>

              <div className="h-px bg-white/10 my-1" />

              <button
                onClick={onToggleClassicMode}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-emerald-500 hover:text-black transition-colors text-left cursor-pointer"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>{isClassicMode ? 'Switch to macOS View' : 'Switch to Web Page View'}</span>
              </button>

              <div className="h-px bg-white/10 my-1" />

              <div className="px-3 py-1 text-[11px] text-zinc-500 flex items-center gap-2">
                <Moon className="w-3 h-3" />
                <span>macOS Golden Gate 2026</span>
              </div>
            </div>
          )}
        </div>

        {/* Current App Name */}
        <span className="font-bold text-white tracking-tight">
          {activeAppTitle || 'Portfolio'}
        </span>

        {/* Navigation Menus */}
        <div className="hidden sm:flex items-center gap-3 text-zinc-300 text-xs">
          <button
            onClick={() => onOpenWindow('bio')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => onOpenWindow('projects')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Projects
          </button>
          <button
            onClick={() => onOpenWindow('skills')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Skills
          </button>
          <button
            onClick={() => onOpenWindow('contact')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Right Status Tray */}
      <div className="flex items-center gap-3 text-xs text-zinc-300">
        
        {/* Toggle Classic / macOS Mode Button */}
        <button
          onClick={onToggleClassicMode}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-medium text-emerald-300 transition-colors cursor-pointer border border-white/10"
          title="Switch view presentation"
        >
          <Monitor className="w-3 h-3" />
          <span>{isClassicMode ? 'macOS View' : 'Web View'}</span>
        </button>

        {/* Battery */}
        <div className="flex items-center gap-1 text-[11px] text-zinc-300">
          <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-mono">100%</span>
        </div>

        {/* WiFi */}
        <Wifi className="w-3.5 h-3.5 text-zinc-300" />

        {/* Spotlight Trigger */}
        <button
          onClick={onOpenSpotlight}
          className="p-1 rounded hover:bg-white/15 transition-colors cursor-pointer text-zinc-200"
          title="Spotlight Search (⌘K)"
        >
          <Search className="w-3.5 h-3.5" />
        </button>

        {/* Control Center Toggle */}
        <button
          onClick={() => {
            setIsControlCenterOpen(!isControlCenterOpen);
            setIsAppleMenuOpen(false);
          }}
          className="p-1 rounded hover:bg-white/15 transition-colors cursor-pointer text-zinc-200"
          title="Control Center"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>

        {/* Live Clock */}
        <div className="font-medium text-white/90 pl-1 text-[12px]">
          {timeStr || 'Wed Oct 7 3:00 PM'}
        </div>
      </div>

      {/* Control Center Popover */}
      {isControlCenterOpen && (
        <div
          onClick={() => setIsControlCenterOpen(false)}
          className="absolute right-3 top-8 w-72 bg-zinc-900/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl p-4 text-xs space-y-3 z-[120]"
        >
          <div className="p-3 bg-zinc-950/70 rounded-xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Wifi className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">GoldenGate_5G</div>
                <div className="text-[10px] text-zinc-400">Connected · Ultra High Speed</div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-zinc-950/70 rounded-xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Monitor className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">Display Wallpaper</div>
                <div className="text-[10px] text-zinc-400">Golden Gate Dusk 4K</div>
              </div>
            </div>
          </div>

          <div className="pt-1 flex justify-between text-[11px] text-zinc-400 font-mono">
            <span>Battery Health: 100%</span>
            <span>Uptime: 5+ Years</span>
          </div>
        </div>
      )}
    </header>
  );
}
