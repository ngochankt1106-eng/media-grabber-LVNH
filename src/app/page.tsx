'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroHeader from '@/components/HeroHeader';
import GrabberInput from '@/components/GrabberInput';
import ResultCard from '@/components/ResultCard';
import FeatureHighlights from '@/components/FeatureHighlights';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import HistoryDrawer from '@/components/HistoryDrawer';
import SparkleCanvas from '@/components/SparkleCanvas';
import { ExtractedMedia, ExtractionResponse } from '@/types/media';

const HISTORY_STORAGE_KEY = 'media_grabber_history_v1';

export default function Home() {
  const [extractedMedia, setExtractedMedia] = useState<ExtractedMedia | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<ExtractedMedia[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Load history from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveToHistory = (item: ExtractedMedia) => {
    try {
      setHistory((prev) => {
        // filter out duplicates by id
        const filtered = prev.filter((h) => h.id !== item.id && h.originalUrl !== item.originalUrl);
        const updated = [item, ...filtered].slice(0, 20); // keep last 20
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch {
      // ignore
    }
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      setHistory([]);
    } catch {
      // ignore
    }
  };

  const handleExtract = async (url: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data: ExtractionResponse = await res.json();

      if (!res.ok || !data.success || !data.data) {
        setErrorMessage(
          data.error || 'Không thể trích xuất link này. Hãy kiểm tra lại định dạng link chia sẻ!'
        );
        return;
      }

      setExtractedMedia(data.data);
      saveToHistory(data.data);

      // Scroll smoothly to result card
      setTimeout(() => {
        const resultElement = document.getElementById('media-result-section');
        if (resultElement) {
          resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Đã xảy ra lỗi kết nối tới máy chủ. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen min-h-[100dvh] bg-bp-bg text-white relative selection:bg-bp-pink selection:text-white flex flex-col justify-between">
      {/* Glittering Sparkles & Starlight Canvas Background */}
      <SparkleCanvas />

      <div className="relative z-10 flex-1">
        {/* Navigation Bar */}
        <Navbar
          onOpenHistory={() => setIsHistoryOpen(true)}
          historyCount={history.length}
        />

        {/* Hero Presentation */}
        <HeroHeader />

        {/* Dynamic Extraction Input */}
        <GrabberInput
          onExtract={handleExtract}
          isLoading={isLoading}
          error={errorMessage}
        />

        {/* Result Area */}
        <div id="media-result-section">
          {extractedMedia && (
            <ResultCard
              media={extractedMedia}
              onSaveToHistory={saveToHistory}
            />
          )}
        </div>

        {/* Feature Highlights Grid */}
        <FeatureHighlights />

        {/* Detailed FAQ & Guides */}
        <FaqSection />
      </div>

      {/* History Slideout Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={handleClearHistory}
        onSelectMedia={(item) => setExtractedMedia(item)}
      />

      {/* Footer */}
      <Footer />
    </main>
  );
}
