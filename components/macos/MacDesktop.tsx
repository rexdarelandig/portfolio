'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { WindowId, WindowState } from './types';
import MacMenuBar from './MacMenuBar';
import MacDock from './MacDock';
import MacWindow from './MacWindow';
import MacDesktopIcon from './MacDesktopIcon';
import TextEditWindow from './TextEditWindow';
import ProjectWindow from './ProjectWindow';
import TerminalWindow from './TerminalWindow';
import SkillsArchitectureWindow from './SkillsArchitectureWindow';
import ContactWindow from './ContactWindow';
import FinderWindow from './FinderWindow';
import AboutMacModal from './AboutMacModal';
import SpotlightModal from './SpotlightModal';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { 
  FileText,
  Terminal as TerminalIcon, 
  FolderGit2, 
  FileCode, 
  Sparkles
} from 'lucide-react';

interface MacDesktopProps {
  isClassicMode: boolean;
  onToggleClassicMode: () => void;
}

export default function MacDesktop({ isClassicMode, onToggleClassicMode }: MacDesktopProps) {
  // Initial window state: Rex_Bio.txt is open by default so the user immediately sees details!
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>({
    bio: {
      id: 'bio',
      title: 'Rex_Bio.txt — TextEdit',
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 20,
    },
    projects: {
      id: 'projects',
      title: 'Projects Showcase',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      selectedProjectId: 'floor-planner',
    },
    terminal: {
      id: 'terminal',
      title: 'Terminal — zsh',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
    },
    skills: {
      id: 'skills',
      title: 'Skills & Architecture',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
    },
    contact: {
      id: 'contact',
      title: 'New Message — Mail',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
    },
    finder: {
      id: 'finder',
      title: 'Finder — Portfolio HD',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
    },
    resume: {
      id: 'resume',
      title: 'Resume.pdf — Preview',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
    },
    'about-mac': {
      id: 'about-mac',
      title: 'About Rex Darel',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
    },
  });

  const [topZIndex, setTopZIndex] = useState(25);
  const [activeWindowId, setActiveWindowId] = useState<WindowId>('bio');
  const [isAboutMacOpen, setIsAboutMacOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);

  const focusWindow = (id: WindowId) => {
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setActiveWindowId(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
      },
    }));
  };

  const openWindow = (id: WindowId, projectId?: string) => {
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setActiveWindowId(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
        selectedProjectId: projectId || prev[id].selectedProjectId,
      },
    }));
  };

  const closeWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
      },
    }));
  };

  const minimizeWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
      },
    }));
  };

  const toggleMaximize = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized,
      },
    }));
  };

  const getActiveAppTitle = () => {
    switch (activeWindowId) {
      case 'bio':
        return 'TextEdit';
      case 'projects':
        return 'Projects';
      case 'terminal':
        return 'Terminal';
      case 'skills':
        return 'Xcode';
      case 'contact':
        return 'Mail';
      case 'finder':
        return 'Finder';
      default:
        return 'Finder';
    }
  };

  const openWindowsMap = {
    bio: windows.bio.isOpen && !windows.bio.isMinimized,
    projects: windows.projects.isOpen && !windows.projects.isMinimized,
    terminal: windows.terminal.isOpen && !windows.terminal.isMinimized,
    skills: windows.skills.isOpen && !windows.skills.isMinimized,
    contact: windows.contact.isOpen && !windows.contact.isMinimized,
    finder: windows.finder.isOpen && !windows.finder.isMinimized,
    resume: windows.resume.isOpen && !windows.resume.isMinimized,
    'about-mac': isAboutMacOpen,
  };

  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-black">
      
      {/* Golden Gate Bridge Background Wallpaper */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/golden-gate.jpg"
          alt="macOS Golden Gate Bridge Wallpaper"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none select-none scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Subtle Vignette & Gradient for readable text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
      </div>

      {/* Top macOS Menu Bar */}
      <MacMenuBar
        activeAppTitle={getActiveAppTitle()}
        onOpenWindow={openWindow}
        onOpenAboutMac={() => setIsAboutMacOpen(true)}
        onOpenSpotlight={() => setIsSpotlightOpen(true)}
        isClassicMode={isClassicMode}
        onToggleClassicMode={onToggleClassicMode}
      />

      {/* Desktop Surface Area */}
      <main
        onClick={() => setActiveWindowId('finder')}
        className="relative z-10 w-full h-[calc(100vh-28px)] mt-7 p-4 sm:p-6 flex flex-col justify-between"
      >
        {/* Desktop Icons Grid (Top Right or Left) */}
        <div className="flex flex-col flex-wrap gap-4 items-start w-fit max-h-[80vh]">
          {/* Rex_Bio.txt - Desktop Text File */}
          <MacDesktopIcon
            id="bio-txt"
            name="Rex_Bio.txt"
            badge="Profile"
            icon={
              <div className="w-12 h-14 bg-white/90 rounded-md shadow-2xl border border-white/40 p-2 flex flex-col justify-between group-hover:scale-105 transition-transform">
                <div className="space-y-1">
                  <div className="w-full h-1 bg-zinc-300 rounded" />
                  <div className="w-3/4 h-1 bg-zinc-300 rounded" />
                  <div className="w-full h-1 bg-zinc-300 rounded" />
                  <div className="w-1/2 h-1 bg-emerald-400 rounded" />
                </div>
                <div className="text-[8px] font-bold font-mono text-zinc-600 uppercase">
                  TXT
                </div>
              </div>
            }
            onOpen={() => openWindow('bio')}
          />

          {/* Projects Folder */}
          <MacDesktopIcon
            id="projects-folder"
            name="Projects"
            icon={
              <div className="w-13 h-11 bg-gradient-to-b from-sky-400 to-blue-600 rounded-lg shadow-2xl border border-white/20 p-2 flex items-center justify-center">
                <FolderGit2 className="w-6 h-6 text-white drop-shadow" />
              </div>
            }
            onOpen={() => openWindow('finder')}
          />

          {/* Terminal.app Icon */}
          <MacDesktopIcon
            id="terminal-app"
            name="Terminal.app"
            icon={
              <div className="w-12 h-12 bg-zinc-900 rounded-xl shadow-2xl border border-white/20 p-2 flex items-center justify-center">
                <TerminalIcon className="w-6 h-6 text-emerald-400" />
              </div>
            }
            onOpen={() => openWindow('terminal')}
          />

          {/* Resume PDF */}
          <MacDesktopIcon
            id="resume-pdf"
            name="Resume.pdf"
            icon={
              <div className="w-12 h-14 bg-rose-50/95 rounded-md shadow-2xl border border-rose-200 p-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="w-full h-1 bg-rose-200 rounded" />
                  <div className="w-2/3 h-1 bg-rose-200 rounded" />
                  <div className="w-full h-1 bg-rose-200 rounded" />
                </div>
                <div className="text-[8px] font-bold font-mono text-rose-600 uppercase">
                  PDF
                </div>
              </div>
            }
            onOpen={() => window.open(PERSONAL_INFO.resumeUrl, '_blank')}
          />
        </div>

        {/* Windows Rendering */}
        
        {/* 1. Rex_Bio.txt TextEdit Window */}
        <MacWindow
          id="bio"
          title={windows.bio.title}
          icon={<FileText className="w-3.5 h-3.5 text-amber-400" />}
          isOpen={windows.bio.isOpen}
          isMinimized={windows.bio.isMinimized}
          isMaximized={windows.bio.isMaximized}
          zIndex={windows.bio.zIndex}
          onClose={() => closeWindow('bio')}
          onMinimize={() => minimizeWindow('bio')}
          onMaximize={() => toggleMaximize('bio')}
          onFocus={() => focusWindow('bio')}
          defaultWidth="max-w-3xl"
        >
          <TextEditWindow />
        </MacWindow>

        {/* 2. Projects Showcase Window */}
        <MacWindow
          id="projects"
          title={windows.projects.title}
          icon={<FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />}
          isOpen={windows.projects.isOpen}
          isMinimized={windows.projects.isMinimized}
          isMaximized={windows.projects.isMaximized}
          zIndex={windows.projects.zIndex}
          onClose={() => closeWindow('projects')}
          onMinimize={() => minimizeWindow('projects')}
          onMaximize={() => toggleMaximize('projects')}
          onFocus={() => focusWindow('projects')}
          defaultWidth="max-w-5xl"
        >
          <ProjectWindow initialProjectId={windows.projects.selectedProjectId} />
        </MacWindow>

        {/* 3. Terminal Window */}
        <MacWindow
          id="terminal"
          title={windows.terminal.title}
          icon={<TerminalIcon className="w-3.5 h-3.5 text-zinc-300" />}
          isOpen={windows.terminal.isOpen}
          isMinimized={windows.terminal.isMinimized}
          isMaximized={windows.terminal.isMaximized}
          zIndex={windows.terminal.zIndex}
          onClose={() => closeWindow('terminal')}
          onMinimize={() => minimizeWindow('terminal')}
          onMaximize={() => toggleMaximize('terminal')}
          onFocus={() => focusWindow('terminal')}
          defaultWidth="max-w-2xl"
        >
          <TerminalWindow />
        </MacWindow>

        {/* 4. Skills & Architecture Window */}
        <MacWindow
          id="skills"
          title={windows.skills.title}
          icon={<FileCode className="w-3.5 h-3.5 text-cyan-400" />}
          isOpen={windows.skills.isOpen}
          isMinimized={windows.skills.isMinimized}
          isMaximized={windows.skills.isMaximized}
          zIndex={windows.skills.zIndex}
          onClose={() => closeWindow('skills')}
          onMinimize={() => minimizeWindow('skills')}
          onMaximize={() => toggleMaximize('skills')}
          onFocus={() => focusWindow('skills')}
          defaultWidth="max-w-4xl"
        >
          <SkillsArchitectureWindow />
        </MacWindow>

        {/* 5. Contact / Mail Window */}
        <MacWindow
          id="contact"
          title={windows.contact.title}
          icon={<Sparkles className="w-3.5 h-3.5 text-blue-400" />}
          isOpen={windows.contact.isOpen}
          isMinimized={windows.contact.isMinimized}
          isMaximized={windows.contact.isMaximized}
          zIndex={windows.contact.zIndex}
          onClose={() => closeWindow('contact')}
          onMinimize={() => minimizeWindow('contact')}
          onMaximize={() => toggleMaximize('contact')}
          onFocus={() => focusWindow('contact')}
          defaultWidth="max-w-2xl"
        >
          <ContactWindow />
        </MacWindow>

        {/* 6. Finder Window */}
        <MacWindow
          id="finder"
          title={windows.finder.title}
          icon={<FolderGit2 className="w-3.5 h-3.5 text-sky-400" />}
          isOpen={windows.finder.isOpen}
          isMinimized={windows.finder.isMinimized}
          isMaximized={windows.finder.isMaximized}
          zIndex={windows.finder.zIndex}
          onClose={() => closeWindow('finder')}
          onMinimize={() => minimizeWindow('finder')}
          onMaximize={() => toggleMaximize('finder')}
          onFocus={() => focusWindow('finder')}
          defaultWidth="max-w-4xl"
        >
          <FinderWindow onOpenWindow={openWindow} />
        </MacWindow>

        {/* Bottom macOS Dock */}
        <MacDock
          openWindows={openWindowsMap}
          onOpenWindow={openWindow}
        />
      </main>

      {/* About This Mac Modal */}
      <AboutMacModal
        isOpen={isAboutMacOpen}
        onClose={() => setIsAboutMacOpen(false)}
        onOpenBio={() => openWindow('bio')}
      />

      {/* Spotlight Command Palette (⌘K) */}
      <SpotlightModal
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
        onOpenWindow={openWindow}
      />
    </div>
  );
}
