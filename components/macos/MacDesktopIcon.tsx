'use client';

import React, { useState } from 'react';

interface MacDesktopIconProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  onOpen: () => void;
  badge?: string;
}

export default function MacDesktopIcon({
  id,
  name,
  icon,
  onOpen,
  badge,
}: MacDesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      id={id}
      onClick={(e) => {
        e.stopPropagation();
        setIsSelected(true);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      onBlur={() => setIsSelected(false)}
      tabIndex={0}
      className={`group flex flex-col items-center justify-center w-24 p-2 rounded-xl transition-all cursor-pointer select-none outline-none ${
        isSelected
          ? 'bg-blue-600/30 border border-blue-400/50 shadow-lg'
          : 'hover:bg-white/10 border border-transparent'
      }`}
    >
      {/* Icon Graphic */}
      <div className="relative w-14 h-14 flex items-center justify-center transition-transform group-hover:scale-105 drop-shadow-xl">
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[9px] font-mono font-bold bg-emerald-500 text-black rounded-full shadow">
            {badge}
          </span>
        )}
      </div>

      {/* Label */}
      <span
        className={`mt-1.5 text-[11px] font-medium text-center leading-tight px-1.5 py-0.5 rounded max-w-full truncate ${
          isSelected
            ? 'bg-blue-600 text-white font-semibold'
            : 'text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]'
        }`}
      >
        {name}
      </span>
    </div>
  );
}
