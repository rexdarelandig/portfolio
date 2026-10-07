'use client';

import React, { useState } from 'react';
import { PROJECTS } from '@/data/portfolioData';
import { WindowId } from './types';
import { 
  FileText, 
  Terminal, 
  Code2, 
  Mail, 
  Compass, 
  Boxes, 
  Trash2, 
  Car, 
  Video, 
  Sprout as PlantIcon, 
  BarChart3, 
  Layers 
} from 'lucide-react';

interface MacDockProps {
  openWindows: Record<WindowId, boolean>;
  onOpenWindow: (id: WindowId, projectId?: string) => void;
}

export default function MacDock({ openWindows, onOpenWindow }: MacDockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [bouncingId, setBouncingId] = useState<string | null>(null);

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'floor-planner':
        return <Layers className="w-6 h-6 text-indigo-300" />;
      case 'pov-reel-studio':
        return <Video className="w-6 h-6 text-rose-300" />;
      case 'autolog':
        return <Car className="w-6 h-6 text-amber-300" />;
      case 'flocktally':
        return <BarChart3 className="w-6 h-6 text-cyan-300" />;
      case 'sprout':
        return <PlantIcon className="w-6 h-6 text-emerald-300" />;
      default:
        return <Boxes className="w-6 h-6 text-zinc-300" />;
    }
  };

  const getProjectBgGradient = (id: string) => {
    switch (id) {
      case 'floor-planner':
        return 'from-blue-600 to-indigo-700 shadow-indigo-500/25';
      case 'pov-reel-studio':
        return 'from-purple-600 to-rose-600 shadow-rose-500/25';
      case 'autolog':
        return 'from-amber-600 to-orange-700 shadow-amber-500/25';
      case 'flocktally':
        return 'from-cyan-600 to-blue-700 shadow-cyan-500/25';
      case 'sprout':
        return 'from-emerald-600 to-teal-700 shadow-emerald-500/25';
      default:
        return 'from-zinc-700 to-zinc-900 shadow-zinc-500/25';
    }
  };

  const dockApps: {
    id: string;
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    windowId: WindowId;
    projectId?: string;
    gradient: string;
  }[] = [
    {
      id: 'finder',
      title: 'Finder',
      icon: <Compass className="w-6 h-6 text-sky-200" />,
      windowId: 'finder',
      gradient: 'from-sky-500 to-blue-700 shadow-blue-500/25',
    },
    {
      id: 'bio',
      title: 'Rex_Bio.txt',
      subtitle: 'Details & Experience',
      icon: <FileText className="w-6 h-6 text-amber-200" />,
      windowId: 'bio',
      gradient: 'from-amber-500 to-orange-600 shadow-amber-500/25',
    },
    // Projects in Dock!
    ...PROJECTS.map((proj) => ({
      id: `proj-${proj.id}`,
      title: proj.title,
      subtitle: proj.category,
      icon: getProjectIcon(proj.id),
      windowId: 'projects' as WindowId,
      projectId: proj.id,
      gradient: getProjectBgGradient(proj.id),
    })),
    {
      id: 'terminal',
      title: 'Terminal',
      icon: <Terminal className="w-6 h-6 text-zinc-100" />,
      windowId: 'terminal',
      gradient: 'from-zinc-900 to-black border border-white/20 shadow-black/50',
    },
    {
      id: 'skills',
      title: 'Skills & Architecture',
      icon: <Code2 className="w-6 h-6 text-cyan-200" />,
      windowId: 'skills',
      gradient: 'from-cyan-600 to-teal-700 shadow-cyan-500/25',
    },
    {
      id: 'contact',
      title: 'Mail (Contact)',
      icon: <Mail className="w-6 h-6 text-blue-200" />,
      windowId: 'contact',
      gradient: 'from-blue-500 to-indigo-600 shadow-blue-500/25',
    },
  ];

  const handleAppClick = (item: typeof dockApps[0]) => {
    setBouncingId(item.id);
    setTimeout(() => setBouncingId(null), 800);
    onOpenWindow(item.windowId, item.projectId);
  };

  // Magnification scale calculation
  const getScale = (index: number) => {
    if (hoveredIndex === null) return 'scale-100';
    const dist = Math.abs(hoveredIndex - index);
    if (dist === 0) return 'scale-125 -translate-y-2';
    if (dist === 1) return 'scale-110 -translate-y-1';
    return 'scale-100';
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[105] max-w-[96vw] overflow-x-auto py-2 px-1 scrollbar-none">
      <div
        onMouseLeave={() => setHoveredIndex(null)}
        className="flex items-end gap-2 sm:gap-2.5 px-3 py-2 bg-white/10 dark:bg-black/35 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl shadow-black/80 ring-1 ring-white/10"
      >
        {dockApps.map((app, index) => {
          const isOpen = openWindows[app.windowId];
          const isBouncing = bouncingId === app.id;

          return (
            <div
              key={app.id}
              className="relative flex flex-col items-center group"
              onMouseEnter={() => setHoveredIndex(index)}
            >
              {/* Tooltip on Hover */}
              <div
                className={`absolute -top-10 px-2.5 py-1 bg-zinc-900/90 backdrop-blur-md text-white text-[11px] font-sans font-medium rounded-lg border border-white/15 shadow-xl whitespace-nowrap pointer-events-none transition-all duration-150 ${
                  hoveredIndex === index
                    ? 'opacity-100 -translate-y-1'
                    : 'opacity-0 translate-y-0'
                }`}
              >
                <span>{app.title}</span>
                {app.subtitle && (
                  <span className="text-[9px] text-zinc-400 block font-mono">
                    {app.subtitle}
                  </span>
                )}
              </div>

              {/* App Icon Button */}
              <button
                onClick={() => handleAppClick(app)}
                aria-label={app.title}
                className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-b ${app.gradient} flex items-center justify-center shadow-lg transition-transform duration-200 cursor-pointer ${getScale(
                  index
                )} ${isBouncing ? 'animate-bounce' : ''}`}
              >
                {app.icon}
              </button>

              {/* Open Window Indicator Dot */}
              <div className="h-1.5 flex items-center justify-center mt-1">
                {isOpen && (
                  <span className="w-1 h-1 rounded-full bg-white/90 shadow-sm" />
                )}
              </div>
            </div>
          );
        })}

        {/* Separator */}
        <div className="w-px h-8 bg-white/20 mx-1 shrink-0 self-center" />

        {/* Trash */}
        <div
          className="relative flex flex-col items-center group"
          onMouseEnter={() => setHoveredIndex(dockApps.length + 1)}
        >
          <div
            className={`absolute -top-9 px-2.5 py-1 bg-zinc-900/90 backdrop-blur-md text-white text-[11px] font-sans font-medium rounded-lg border border-white/15 shadow-xl whitespace-nowrap pointer-events-none transition-all duration-150 ${
              hoveredIndex === dockApps.length + 1
                ? 'opacity-100 -translate-y-1'
                : 'opacity-0 translate-y-0'
            }`}
          >
            Trash
          </div>

          <button
            onClick={() => {}}
            aria-label="Trash"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <div className="h-1.5 mt-1" />
        </div>
      </div>
    </div>
  );
}
