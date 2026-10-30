'use client';

import React from 'react';
import { X, Trash2, ExternalLink, Download, Clock, Sparkles } from 'lucide-react';
import { ExtractedMedia } from '@/types/media';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: ExtractedMedia[];
  onClearHistory: () => void;
  onSelectMedia: (item: ExtractedMedia) => void;
}

export default function HistoryDrawer({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onSelectMedia,
}: HistoryDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-bp-dark border-l border-bp-pink/30 p-6 flex flex-col justify-between shadow-2xl relative">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-bp-cardBorder">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-bp-pink" />
                <h3 className="text-lg font-bold text-white">Lịch sử tải gần đây</h3>
                <Sparkles className="w-4 h-4 text-bp-glitter-gold" />
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-400 mt-2 mb-4">
              Lưu trữ hoàn toàn trên trình duyệt của bạn (Stateless & Bảo mật 100%).
            </p>

            {/* List */}
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
              {history.length === 0 ? (
                <div className="py-12 text-center text-zinc-500">
                  <p className="text-sm">Chưa có nội dung nào được tải về ✨</p>
                  <p className="text-xs mt-1">Hãy dán link để bắt đầu ngay!</p>
                </div>
              ) : (
                history.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="p-3 rounded-2xl bg-bp-surface border border-bp-cardBorder hover:border-bp-pink/40 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div
                      className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                      onClick={() => {
                        onSelectMedia(item);
                        onClose();
                      }}
                    >
                      {item.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-12 h-12 rounded-xl object-cover border border-bp-cardBorder group-hover:scale-105 transition-transform shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-bp-card flex items-center justify-center text-bp-pink shrink-0">
                          ✨
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-white font-semibold text-xs truncate group-hover:text-bp-pink-light transition-colors">
                          {item.title || 'Media không tên'}
                        </p>
                        <p className="text-[11px] text-zinc-400 truncate">
                          {item.platformName} • {item.author.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer Actions */}
          {history.length > 0 && (
            <div className="pt-4 border-t border-bp-cardBorder">
              <button
                onClick={onClearHistory}
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-red-950/40 border border-zinc-800 hover:border-red-500/40 text-xs font-semibold text-zinc-300 hover:text-red-400 flex items-center justify-center gap-2 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>Xóa sạch lịch sử</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
