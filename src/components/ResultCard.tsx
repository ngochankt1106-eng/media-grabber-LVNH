'use client';

import React, { useState } from 'react';
import {
  ExtractedMedia,
  MediaDownloadOption,
} from '@/types/media';
import {
  Download,
  Music,
  Video,
  Image as ImageIcon,
  CheckCircle,
  QrCode,
  Share2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Heart,
  Eye,
  MessageCircle,
  Repeat,
} from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import QrModal from './QrModal';
import { triggerPinkSparkleConfetti } from '@/lib/confetti';

interface ResultCardProps {
  media: ExtractedMedia;
  onSaveToHistory?: (media: ExtractedMedia) => void;
}

export default function ResultCard({ media, onSaveToHistory }: ResultCardProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'images' | 'audio'>(
    media.rawPreviewVideo || media.downloads.some((d) => d.type === 'video')
      ? 'video'
      : media.images?.length
      ? 'images'
      : 'audio'
  );

  const [selectedDownloadForQr, setSelectedDownloadForQr] = useState<MediaDownloadOption | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Separate download options by category
  const videoDownloads = media.downloads.filter((d) => d.type === 'video');
  const audioDownloads = media.downloads.filter((d) => d.type === 'audio');
  const imageDownloads = media.downloads.filter((d) => d.type === 'image');

  // Build direct proxy URL to force download on iOS & Android
  const getDownloadHref = (opt: MediaDownloadOption) => {
    const filename = `${media.platform}-${opt.formatId}-${media.id || 'download'}.${opt.ext}`;
    return `/api/proxy?url=${encodeURIComponent(opt.url)}&filename=${encodeURIComponent(
      filename
    )}&ext=${opt.ext}`;
  };

  const handleDownloadClick = (opt: MediaDownloadOption) => {
    triggerPinkSparkleConfetti();
    if (onSaveToHistory) {
      onSaveToHistory(media);
    }
  };

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-8 animate-fadeIn">
      <div className="relative rounded-3xl bg-bp-card border-2 border-bp-pink/40 shadow-neon-pink-lg overflow-hidden backdrop-blur-xl">
        {/* Top Decorative Banner */}
        <div className="h-2 bg-gradient-to-r from-bp-pink via-purple-500 to-pink-500" />

        {/* Card Header: Creator & Platform Details */}
        <div className="p-4 sm:p-6 pb-4 border-b border-bp-cardBorder/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {media.author.avatar ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={media.author.avatar}
                  alt={media.author.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-bp-pink p-0.5 shadow-neon-pink"
                />
                <span className="absolute -bottom-1 -right-1 text-xs">✨</span>
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-bp-pink to-purple-600 flex items-center justify-center font-bold text-white shadow-neon-pink">
                BP
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-base sm:text-lg">
                  {media.author.name}
                </h3>
                {media.author.username && (
                  <span className="text-zinc-400 text-xs sm:text-sm">
                    {media.author.username}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="px-2 py-0.5 rounded-full bg-bp-pink/15 text-bp-pink-soft text-xs font-semibold border border-bp-pink/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-bp-pink" />
                  {media.platformName}
                </span>
                {media.duration && (
                  <span className="text-xs text-zinc-400">
                    Thời lượng: {media.duration}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Social Stats if available */}
          {media.stats && (
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              {media.stats.likes !== undefined && (
                <div className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-bp-pink fill-bp-pink" />
                  <span>{media.stats.likes.toLocaleString()}</span>
                </div>
              )}
              {media.stats.comments !== undefined && (
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{media.stats.comments.toLocaleString()}</span>
                </div>
              )}
              {media.stats.shares !== undefined && (
                <div className="flex items-center gap-1">
                  <Repeat className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{media.stats.shares.toLocaleString()}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content Title / Caption */}
        {media.title && (
          <div className="px-4 sm:px-6 pt-4">
            <p className="text-zinc-200 text-sm sm:text-base leading-relaxed line-clamp-3 font-normal">
              {media.title}
            </p>
          </div>
        )}

        {/* Preview Tabs (Video / Images / Audio) */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4 border-b border-bp-cardBorder pb-2">
            {(media.rawPreviewVideo || videoDownloads.length > 0) && (
              <button
                onClick={() => setActiveTab('video')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'video'
                    ? 'bg-bp-pink text-white shadow-neon-pink'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Xem Video</span>
              </button>
            )}

            {(media.images && media.images.length > 0) && (
              <button
                onClick={() => setActiveTab('images')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'images'
                    ? 'bg-bp-pink text-white shadow-neon-pink'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Bộ Ảnh ({media.images.length})</span>
              </button>
            )}

            {(media.audio || audioDownloads.length > 0) && (
              <button
                onClick={() => setActiveTab('audio')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'audio'
                    ? 'bg-bp-pink text-white shadow-neon-pink'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Music className="w-4 h-4" />
                <span>Âm Thanh MP3</span>
              </button>
            )}
          </div>

          {/* Tab 1: Video Preview Player */}
          {activeTab === 'video' && (media.rawPreviewVideo || videoDownloads[0]?.url) && (
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video max-h-[480px] flex items-center justify-center border border-zinc-800 mb-6">
              <video
                src={media.rawPreviewVideo || videoDownloads[0]?.url}
                poster={media.thumbnail}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Tab 2: Images Carousel / Grid */}
          {activeTab === 'images' && media.images && (
            <div className="mb-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {media.images.map((imgUrl, index) => (
                  <div
                    key={index}
                    className="relative group rounded-xl overflow-hidden aspect-square bg-bp-dark border border-zinc-800 hover:border-bp-pink transition-all shadow-md"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgUrl}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <a
                      href={`/api/proxy?url=${encodeURIComponent(
                        imgUrl
                      )}&filename=photo-${index + 1}.jpg&ext=jpg`}
                      onClick={() =>
                        handleDownloadClick({
                          formatId: `photo-${index + 1}`,
                          label: `Ảnh #${index + 1}`,
                          type: 'image',
                          url: imgUrl,
                          ext: 'jpg',
                        })
                      }
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 text-white font-medium text-xs transition-opacity"
                    >
                      <Download className="w-4 h-4 text-bp-pink" />
                      <span>Tải ảnh {index + 1}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Audio MP3 Section */}
          {activeTab === 'audio' && (media.audio?.url || audioDownloads[0]?.url) && (
            <div className="mb-6">
              <AudioPlayer
                title={media.audio?.title || media.title}
                author={media.audio?.author || media.author.name}
                audioUrl={media.audio?.url || audioDownloads[0]?.url}
                onDownload={() => {
                  const targetOpt = audioDownloads[0] || {
                    formatId: 'extracted-audio',
                    label: 'Tải File MP3',
                    type: 'audio',
                    url: media.audio?.url || '',
                    ext: 'mp3',
                  };
                  handleDownloadClick(targetOpt);
                  window.location.href = getDownloadHref(targetOpt);
                }}
              />
            </div>
          )}

          {/* DOWNLOAD ACTION BUTTONS MATRIX */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-bp-glitter-gold" />
              Chọn định dạng tải về máy:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Primary Video (No Watermark) */}
              {videoDownloads.map((opt) => (
                <div
                  key={opt.formatId}
                  className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-bp-surface to-bp-card border border-bp-pink/40 hover:border-bp-pink transition-all flex items-center justify-between gap-3 shadow-card-glow"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-bp-pink/20 flex items-center justify-center text-bp-pink shrink-0">
                      <Video className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-white font-bold text-xs sm:text-sm truncate">
                          {opt.label}
                        </span>
                        {opt.isNoWatermark && (
                          <span className="px-1.5 py-0.2 rounded bg-green-500/20 text-green-400 text-[10px] font-semibold border border-green-500/30 shrink-0">
                            No Logo
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        {opt.quality || 'Full HD'} {opt.size ? `• ${opt.size}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={getDownloadHref(opt)}
                      onClick={() => handleDownloadClick(opt)}
                      className="px-3 py-2 rounded-xl bg-gradient-to-r from-bp-pink to-[#ff006e] hover:brightness-110 text-white font-bold text-xs flex items-center gap-1 shadow-neon-pink active:scale-95 transition-all"
                      title="Tải về máy tính / điện thoại"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải Ngay</span>
                    </a>

                    <button
                      onClick={() => setSelectedDownloadForQr(opt)}
                      className="p-2 rounded-xl bg-bp-surface hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700 transition-colors"
                      title="Quét QR trên điện thoại"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Audio MP3 Options */}
              {audioDownloads.map((opt) => (
                <div
                  key={opt.formatId}
                  className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-bp-surface to-bp-card border border-purple-500/30 hover:border-purple-500 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                      <Music className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-white font-bold text-xs sm:text-sm truncate block">
                        {opt.label}
                      </span>
                      <p className="text-[11px] text-zinc-400">
                        Định dạng MP3 • {opt.quality || '320kbps'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={getDownloadHref(opt)}
                      onClick={() => handleDownloadClick(opt)}
                      className="px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 active:scale-95 transition-all"
                      title="Tải file âm thanh MP3"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải MP3</span>
                    </a>

                    <button
                      onClick={() => setSelectedDownloadForQr(opt)}
                      className="p-2 rounded-xl bg-bp-surface hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700 transition-colors"
                      title="Quét QR trên điện thoại"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Share / Direct Link Bar */}
            <div className="pt-3 border-t border-bp-cardBorder/60 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="text-bp-pink">💖</span>
                <span>Tải xong rồi? Đừng quên chia sẻ cho bạn bè nhé!</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyLink(media.originalUrl)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bp-surface hover:bg-bp-card border border-bp-cardBorder text-zinc-300 hover:text-white transition-all"
                >
                  <Share2 className="w-3.5 h-3.5 text-bp-pink" />
                  <span>{copiedLink ? 'Đã copy link!' : 'Copy link gốc'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Scan Modal */}
      {selectedDownloadForQr && (
        <QrModal
          isOpen={!!selectedDownloadForQr}
          onClose={() => setSelectedDownloadForQr(null)}
          downloadUrl={
            typeof window !== 'undefined'
              ? `${window.location.origin}${getDownloadHref(selectedDownloadForQr)}`
              : getDownloadHref(selectedDownloadForQr)
          }
          title={selectedDownloadForQr.label}
        />
      )}
    </div>
  );
}
