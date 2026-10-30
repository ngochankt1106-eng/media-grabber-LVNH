'use client';

import React, { useState, useEffect } from 'react';
import {
  Link2,
  Clipboard,
  Sparkles,
  XCircle,
  Loader2,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { detectPlatform } from '@/lib/extractors/detector';
import { PlatformType } from '@/types/media';

interface GrabberInputProps {
  onExtract: (url: string) => void;
  isLoading: boolean;
  error?: string | null;
}

const SAMPLE_LINKS = [
  {
    label: 'TikTok Video Dance',
    url: 'https://www.tiktok.com/@blackpinkofficial/video/7144211051515907330',
  },
  {
    label: 'TikTok Photo Slideshow',
    url: 'https://www.tiktok.com/@bp_tiktok/video/7258380302484393222',
  },
  {
    label: 'YouTube Shorts Clip',
    url: 'https://www.youtube.com/shorts/kJQP7kiw5Fk',
  },
  {
    label: 'Instagram Reel Fashion',
    url: 'https://www.instagram.com/reel/C321v_yL123/',
  },
];

export default function GrabberInput({ onExtract, isLoading, error }: GrabberInputProps) {
  const [url, setUrl] = useState('');
  const [detected, setDetected] = useState<{ platform: PlatformType; platformName: string }>({
    platform: 'generic',
    platformName: '',
  });
  const [copiedNotification, setCopiedNotification] = useState(false);

  useEffect(() => {
    if (url.trim().length > 5) {
      const { platform, platformName } = detectPlatform(url);
      setDetected({ platform, platformName });
    } else {
      setDetected({ platform: 'generic', platformName: '' });
    }
  }, [url]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setCopiedNotification(true);
        setTimeout(() => setCopiedNotification(false), 2000);
      }
    } catch {
      // Clipboard permission denied or fallback
      const inputEl = document.getElementById('media-url-input');
      inputEl?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || isLoading) return;
    onExtract(url.trim());
  };

  const handleSampleClick = (sampleUrl: string) => {
    setUrl(sampleUrl);
    onExtract(sampleUrl);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
      {/* Outer Card Glowing Container */}
      <div className="relative group">
        {/* Neon Glow Outer Background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-bp-pink via-purple-600 to-pink-500 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-pulse-glow" />

        <div className="relative bg-bp-dark/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 border border-bp-cardBorder/90 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative flex items-center">
              {/* Left Icon / Detected Platform Badge */}
              <div className="absolute left-3 sm:left-4 flex items-center pointer-events-none text-zinc-400">
                {detected.platformName ? (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-bp-pink/20 text-bp-pink-soft text-xs font-semibold border border-bp-pink/40 animate-fadeIn">
                    <span className="w-1.5 h-1.5 rounded-full bg-bp-pink animate-ping" />
                    {detected.platformName}
                  </span>
                ) : (
                  <Link2 className="w-5 h-5 text-bp-pink/70" />
                )}
              </div>

              {/* Input Field */}
              <input
                id="media-url-input"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Dán đường link TikTok, Instagram, YouTube, Facebook..."
                className={`w-full bg-bp-surface/90 text-white placeholder-zinc-500 text-sm sm:text-base rounded-xl sm:rounded-2xl py-3.5 sm:py-4 transition-all outline-none border focus:border-bp-pink focus:ring-2 focus:ring-bp-pink/30 ${
                  detected.platformName ? 'pl-28 sm:pl-32 pr-24 sm:pr-28' : 'pl-11 sm:pl-12 pr-24 sm:pr-28'
                } border-bp-cardBorder`}
                required
              />

              {/* Quick Actions Right Inside Input */}
              <div className="absolute right-2 sm:right-3 flex items-center gap-1 sm:gap-1.5">
                {url && (
                  <button
                    type="button"
                    onClick={() => setUrl('')}
                    className="p-1.5 text-zinc-400 hover:text-zinc-200 transition-colors rounded-lg hover:bg-zinc-800"
                    title="Xóa trắng"
                  >
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handlePaste}
                  className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-xs font-medium rounded-lg bg-bp-cardBorder/60 hover:bg-bp-cardBorder text-zinc-300 hover:text-white border border-zinc-700/50 transition-all active:scale-95"
                  title="Dán từ bộ nhớ tạm"
                >
                  <Clipboard className="w-3.5 h-3.5 text-bp-pink" />
                  <span className="hidden xs:inline">Dán</span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl py-3.5 sm:py-4 px-6 font-bold text-white text-sm sm:text-base tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed shadow-neon-pink bg-gradient-to-r from-bp-pink via-[#ff006e] to-pink-600 hover:brightness-110 active:scale-[0.99]"
            >
              {/* Shimmer animation on button */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />

              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>Đang bóc tách dữ liệu Serverless...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-bp-glitter-gold animate-bounce" />
                  <span>BẮT ĐẦU TRÍCH XUẤT MEDIA ✨</span>
                </>
              )}
            </button>
          </form>

          {/* Toast clipboard notification */}
          {copiedNotification && (
            <div className="mt-2 text-center text-xs text-bp-pink-soft flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-bp-pink" />
              <span>Đã dán link từ Clipboard!</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-3 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
              <span className="text-red-400 font-bold">⚠️</span>
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Test / Sample Links */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-400">
        <span className="flex items-center gap-1 text-zinc-500 font-medium">
          <Flame className="w-3.5 h-3.5 text-bp-pink" />
          Thử link mẫu:
        </span>
        {SAMPLE_LINKS.map((sample, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSampleClick(sample.url)}
            className="px-2.5 py-1 rounded-lg bg-bp-surface hover:bg-bp-card border border-bp-cardBorder hover:border-bp-pink/40 text-zinc-300 hover:text-bp-pink-light transition-all text-[11px] sm:text-xs"
          >
            {sample.label}
          </button>
        ))}
      </div>
    </div>
  );
}
