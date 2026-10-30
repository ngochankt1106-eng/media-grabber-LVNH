'use client';

import React from 'react';
import { X, Smartphone, Sparkles, Check, Copy } from 'lucide-react';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl: string;
  title: string;
}

export default function QrModal({ isOpen, onClose, downloadUrl, title }: QrModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  // Use reliable lightweight QR code SVG service
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
    downloadUrl
  )}&bgcolor=111016&color=ff2d75&margin=10`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(downloadUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-3xl bg-bp-card border border-bp-pink/40 p-6 shadow-neon-pink-lg text-center overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-bp-pink/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Smartphone className="w-5 h-5 text-bp-pink" />
          <h3 className="text-base font-bold text-white">Quét mã bằng Điện Thoại</h3>
          <Sparkles className="w-4 h-4 text-bp-glitter-gold" />
        </div>
        <p className="text-xs text-zinc-400 mb-5">
          Mở Camera trên <span className="text-pink-400 font-semibold">iPhone</span> hoặc{' '}
          <span className="text-pink-400 font-semibold">Android</span> quét để tải ngay về máy!
        </p>

        {/* QR Code Frame */}
        <div className="mx-auto w-52 h-52 p-3 rounded-2xl bg-bp-dark border-2 border-bp-pink/60 shadow-neon-pink flex items-center justify-center mb-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrApiUrl}
            alt="QR Code Tải File"
            width={200}
            height={200}
            className="rounded-xl"
          />
        </div>

        <p className="text-xs font-medium text-zinc-300 truncate mb-4 px-2">
          {title}
        </p>

        {/* Copy Link Button */}
        <button
          onClick={handleCopy}
          className="w-full py-2.5 px-4 rounded-xl bg-bp-surface hover:bg-bp-card border border-bp-cardBorder hover:border-bp-pink/40 text-xs font-semibold text-zinc-200 flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Đã sao chép link tải!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-bp-pink" />
              <span>Sao chép Link tải trực tiếp</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
