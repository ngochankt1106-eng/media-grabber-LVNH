'use client';

import React from 'react';
import { Sparkles, Crown, History, Heart, Smartphone } from 'lucide-react';

interface NavbarProps {
  onOpenHistory: () => void;
  historyCount: number;
}

export default function Navbar({ onOpenHistory, historyCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-bp-bg/85 border-b border-bp-cardBorder/60 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-bp-pink to-purple-600 p-[1.5px] shadow-neon-pink group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-bp-dark rounded-2xl flex items-center justify-center relative overflow-hidden">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-bp-pink-light group-hover:rotate-12 transition-transform duration-300" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bp-pink opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-bp-pink"></span>
                </span>
              </div>
            </div>
            {/* Tiny glitter star */}
            <span className="absolute -bottom-1 -right-1 text-bp-glitter-gold text-xs animate-twinkle">
              ✦
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">
                MEDIA<span className="text-bp-pink">.GRABBER</span>
              </span>
              <Sparkles className="w-4 h-4 text-bp-glitter-gold animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-bp-pink-soft bg-bp-pink/10 px-1.5 py-0.5 rounded-full border border-bp-pink/20">
                Born Pink Edition
              </span>
              <span className="hidden sm:inline-block text-[10px] text-zinc-400">
                • 100% Không Watermark
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* History Pill */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-bp-surface/80 hover:bg-bp-surface border border-bp-cardBorder hover:border-bp-pink/50 text-xs sm:text-sm font-medium text-zinc-200 hover:text-white transition-all shadow-sm active:scale-95"
            title="Lịch sử tải gần đây"
          >
            <History className="w-4 h-4 text-bp-pink" />
            <span className="hidden xs:inline">Lịch sử</span>
            {historyCount > 0 && (
              <span className="bg-bp-pink text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                {historyCount}
              </span>
            )}
          </button>

          {/* Vibe Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-bp-pink/15 to-purple-500/15 border border-bp-pink/30 text-xs text-bp-pink-soft">
            <Heart className="w-3.5 h-3.5 text-bp-pink fill-bp-pink animate-pulse" />
            <span className="font-semibold tracking-wide">BLACKPINK IN YOUR AREA</span>
          </div>
        </div>
      </div>
    </header>
  );
}
