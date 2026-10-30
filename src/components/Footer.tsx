'use client';

import React from 'react';
import { Heart, Crown, Sparkles, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-bp-cardBorder/80 bg-bp-bg/90 backdrop-blur-md py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Brand Sign */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Crown className="w-5 h-5 text-bp-pink" />
          <span className="text-lg font-black tracking-tight text-white font-mono">
            MEDIA<span className="text-bp-pink">.GRABBER</span>
          </span>
          <Sparkles className="w-4 h-4 text-bp-glitter-gold" />
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-4">
          Trình tải video & âm thanh phong cách Blackpink lấp lánh kim tuyến. Hoàn toàn miễn phí,
          stateless và không lưu trữ dữ liệu cá nhân.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-bp-pink-soft font-semibold mb-6">
          <span>BLACKPINK IN YOUR AREA</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-bp-pink fill-bp-pink animate-pulse" /> for BLINKs & Creators
          </span>
        </div>

        <div className="text-[11px] text-zinc-600 max-w-xl mx-auto leading-relaxed border-t border-zinc-900 pt-4">
          Tuyên bố miễn trừ: Công cụ này được thiết kế nhằm mục đích sao lưu, phục vụ học tập và
          sáng tạo cá nhân. Người dùng vui lòng tôn trọng bản quyền sở hữu trí tuệ của tác giả nội
          dung gốc trên các nền tảng mạng xã hội.
        </div>
      </div>
    </footer>
  );
}
