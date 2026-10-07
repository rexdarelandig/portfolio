'use client';

import React, { useState } from 'react';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { WindowId } from './types';

interface MacWindowProps {
  id: WindowId;
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
  className?: string;
  defaultWidth?: string;
  defaultHeight?: string;
}

export default function MacWindow({
  title,
  icon,
  isOpen,
  isMinimized,
  isMaximized,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
  className = '',
  defaultWidth = 'max-w-4xl',
  defaultHeight = 'max-h-[82vh]',
}: MacWindowProps) {
  const [isTrafficHovered, setIsTrafficHovered] = useState(false);

  if (!isOpen || isMinimized) return null;

  return (
    <div
      onClick={onFocus}
      style={{ zIndex }}
      className={`fixed transition-all duration-200 select-none ${
        isMaximized
          ? 'top-8 left-0 right-0 bottom-20 m-2 rounded-2xl'
          : `top-14 left-1/2 -translate-x-1/2 w-[95vw] sm:w-[90vw] ${defaultWidth} rounded-2xl`
      } ${className}`}
    >
      {/* Window Container */}
      <div className="w-full flex flex-col bg-zinc-950/85 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden ring-1 ring-black/50">
        
        {/* Title Bar */}
        <div
          onDoubleClick={onMaximize}
          className="h-10 px-4 bg-gradient-to-b from-white/10 to-white/5 border-b border-white/10 flex items-center justify-between cursor-default shrink-0 backdrop-blur-xl"
        >
          {/* Traffic Light Buttons */}
          <div
            className="flex items-center gap-2"
            onMouseEnter={() => setIsTrafficHovered(true)}
            onMouseLeave={() => setIsTrafficHovered(false)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close window"
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center text-black/70 hover:opacity-100 transition-opacity cursor-pointer group"
            >
              {isTrafficHovered && <X className="w-2.5 h-2.5 text-black" strokeWidth={3} />}
            </button>

            {/* Minimize Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              aria-label="Minimize window"
              className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center text-black/70 hover:opacity-100 transition-opacity cursor-pointer group"
            >
              {isTrafficHovered && <Minus className="w-2.5 h-2.5 text-black" strokeWidth={3} />}
            </button>

            {/* Maximize Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMaximize();
              }}
              aria-label="Toggle maximize"
              className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center text-black/70 hover:opacity-100 transition-opacity cursor-pointer group"
            >
              {isTrafficHovered && (
                isMaximized ? (
                  <Minimize2 className="w-2.5 h-2.5 text-black" strokeWidth={3} />
                ) : (
                  <Maximize2 className="w-2.5 h-2.5 text-black" strokeWidth={3} />
                )
              )}
            </button>
          </div>

          {/* Centered Title with Icon */}
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-300 truncate max-w-[60%] pointer-events-none">
            {icon && <span className="opacity-80 shrink-0">{icon}</span>}
            <span className="truncate">{title}</span>
          </div>

          {/* Right Spacer for balance */}
          <div className="w-14" />
        </div>

        {/* Window Content */}
        <div className={`overflow-y-auto overflow-x-hidden ${isMaximized ? 'h-[calc(100vh-140px)]' : defaultHeight} scrollbar-thin`}>
          {children}
        </div>
      </div>
    </div>
  );
}
