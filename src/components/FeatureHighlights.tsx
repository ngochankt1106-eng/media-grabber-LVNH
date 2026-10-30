'use client';

import React from 'react';
import { ShieldCheck, Music2, Smartphone, Cpu, Sparkles, Heart } from 'lucide-react';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: '100% Sạch Watermark',
    description:
      'Tự động bóc tách và xóa sạch logo, watermark mờ trên video TikTok, Instagram Reels mà không làm giảm độ phân giải gốc.',
    badge: 'HD 1080p',
    accent: 'from-pink-500 to-rose-600',
  },
  {
    icon: Music2,
    title: 'Tách Âm Thanh MP3 Studio',
    description:
      'Chỉ cần 1 chạm để tách riêng bản nhạc nền, sound viral với định dạng MP3 320kbps tương thích mọi thiết bị.',
    badge: 'Audio Hi-Fi',
    accent: 'from-purple-500 to-indigo-600',
  },
  {
    icon: Cpu,
    title: 'Stateless Serverless Siêu Tốc',
    description:
      'Xử lý trực tiếp trên Vercel Edge Serverless, không lưu cache dữ liệu cá nhân, tải tức thì trong vòng 1-2 giây.',
    badge: 'Zero Log',
    accent: 'from-yellow-400 to-pink-500',
  },
  {
    icon: Smartphone,
    title: 'Tối Ưu iPhone & Android',
    description:
      'Hỗ trợ tải trực tiếp về Cuộn Camera trên iOS Safari hoặc Thư viện Android với Proxy Content-Disposition chuyên dụng.',
    badge: 'PWA Ready',
    accent: 'from-bp-pink to-pink-400',
  },
];

export default function FeatureHighlights() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bp-surface border border-bp-pink/30 text-xs font-semibold text-bp-pink-soft mb-3">
          <Sparkles className="w-3.5 h-3.5 text-bp-glitter-gold" />
          <span>TẠI SAO CHỌN MEDIA GRABBER?</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Sức Mạnh Đỉnh Cao • Phong Cách{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-bp-pink to-purple-400">
            Blackpink
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {FEATURES.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-3xl bg-bp-card border border-bp-cardBorder hover:border-bp-pink/50 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden shadow-card-glow"
            >
              {/* Subtle top gradient */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.accent}`}
              />

              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-bp-surface border border-bp-cardBorder flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md">
                  <Icon className="w-6 h-6 text-bp-pink" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-bp-surface text-zinc-300 border border-zinc-800">
                  {item.badge}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2 group-hover:text-bp-pink-light transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
