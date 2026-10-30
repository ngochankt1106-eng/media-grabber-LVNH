'use client';

import React from 'react';
import { Sparkles, Video, Music2, Image as ImageIcon, ShieldCheck, Zap } from 'lucide-react';

export default function HeroHeader() {
  return (
    <div className="text-center pt-8 sm:pt-14 pb-6 sm:pb-8 relative">
      {/* Glow background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[200px] sm:h-[300px] bg-bp-pink/15 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Floating Sparkles Badges */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bp-surface/90 border border-bp-pink/40 shadow-neon-pink mb-4 sm:mb-6 animate-float">
        <span className="text-bp-glitter-gold text-sm animate-twinkle">✦</span>
        <span className="text-xs sm:text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-bp-pink-light to-purple-300">
          Vip Media Grabber • Born Pink Edition
        </span>
        <Sparkles className="w-3.5 h-3.5 text-bp-pink-light" />
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-3 sm:mb-4">
        TẢI ĐA PHƯƠNG TIỆN{' '}
        <span className="relative inline-block">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-bp-pink via-pink-400 to-purple-400 drop-shadow-[0_0_25px_rgba(255,45,117,0.6)]">
            SIÊU NGẦU & LẤP LÁNH
          </span>
          <span className="absolute -top-3 -right-4 sm:-right-6 text-bp-glitter-gold text-lg sm:text-2xl animate-spin-slow">
            ✧
          </span>
        </span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-300 font-normal px-4 mb-6 leading-relaxed">
        Trích xuất link từ <span className="text-pink-400 font-semibold">TikTok</span>,{' '}
        <span className="text-pink-400 font-semibold">Instagram</span>,{' '}
        <span className="text-pink-400 font-semibold">YouTube Shorts</span>,{' '}
        <span className="text-pink-400 font-semibold">Facebook</span>,{' '}
        <span className="text-pink-400 font-semibold">X / Twitter</span>. Loại bỏ 100% Watermark & Tách MP3 tốc độ cao!
      </p>

      {/* Feature Badges */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 px-2 text-xs text-zinc-300">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bp-card/80 border border-bp-cardBorder text-zinc-200">
          <ShieldCheck className="w-3.5 h-3.5 text-bp-pink" />
          <span>Sạch Watermark</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bp-card/80 border border-bp-cardBorder text-zinc-200">
          <Music2 className="w-3.5 h-3.5 text-bp-pink" />
          <span>Tách MP3 320kbps</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bp-card/80 border border-bp-cardBorder text-zinc-200">
          <ImageIcon className="w-3.5 h-3.5 text-bp-pink" />
          <span>Tải Cả Bộ Ảnh</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bp-card/80 border border-bp-cardBorder text-zinc-200">
          <Zap className="w-3.5 h-3.5 text-bp-glitter-gold" />
          <span>Serverless Siêu Tốc</span>
        </div>
      </div>
    </div>
  );
}
