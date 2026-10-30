'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Download } from 'lucide-react';

interface AudioPlayerProps {
  title?: string;
  author?: string;
  audioUrl: string;
  onDownload: () => void;
}

export default function AudioPlayer({ title, author, audioUrl, onDownload }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-bp-surface via-bp-dark to-bp-card border border-bp-pink/30 shadow-card-glow relative overflow-hidden">
      {/* Background glow & music wave decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-bp-pink/10 rounded-full blur-2xl pointer-events-none" />

      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-bp-pink to-purple-600 flex items-center justify-center text-white shadow-neon-pink hover:scale-105 active:scale-95 transition-all"
              title={isPlaying ? 'Tạm dừng' : 'Nghe thử'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
            </button>
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bp-glitter-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-bp-glitter-gold"></span>
              </span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-bp-pink/20 text-bp-pink-soft text-[10px] font-bold uppercase tracking-wider border border-bp-pink/30">
                MP3 Audio
              </span>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-1 bg-bp-pink animate-pulse h-full rounded-full" />
                  <span className="w-1 bg-pink-400 animate-pulse delay-75 h-2 rounded-full" />
                  <span className="w-1 bg-purple-400 animate-pulse delay-150 h-3 rounded-full" />
                </div>
              )}
            </div>
            <p className="text-white font-semibold text-sm sm:text-base truncate max-w-[200px] sm:max-w-xs mt-0.5">
              {title || 'Tách âm thanh gốc'}
            </p>
            <p className="text-zinc-400 text-xs truncate">
              {author || 'Studio Quality 320kbps'}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onDownload}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-bp-pink/15 hover:bg-bp-pink text-bp-pink-soft hover:text-white border border-bp-pink/40 hover:border-bp-pink transition-all text-xs sm:text-sm font-semibold active:scale-95 shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Tải file MP3 này</span>
        </button>
      </div>

      {/* Progress & Scrubbing Bar */}
      <div className="mt-4 flex items-center gap-3">
        <span className="text-[11px] font-mono text-zinc-400 w-8 text-right">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="flex-1 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-bp-pink"
        />
        <span className="text-[11px] font-mono text-zinc-400 w-8">
          {formatTime(duration)}
        </span>
        <button
          onClick={toggleMute}
          className="text-zinc-400 hover:text-zinc-200 transition-colors p-1"
          title={isMuted ? 'Bật âm' : 'Tắt âm'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
