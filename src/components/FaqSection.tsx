'use client';

import React, { useState } from 'react';
import { ChevronDown, Apple, Smartphone, Monitor, Sparkles, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  icon?: any;
}

const FAQS: FaqItem[] = [
  {
    icon: Apple,
    question: 'Làm thế nào để tải và lưu trực tiếp vào Cuộn Camera trên iPhone (iOS)?',
    answer:
      'Trên iOS (Safari), sau khi nhấn nút "Tải Ngay", thanh địa chỉ sẽ xuất hiện biểu tượng tải xuống (mũi tên xanh). Chạm vào biểu tượng đó > chọn file vừa tải > nhấn nút "Chia sẻ" (Share) ở góc dưới cùng bên trái > chọn "Lưu Video" (Save Video). Video sẽ lập tức xuất hiện trong ứng dụng Ảnh (Photos) của bạn!',
  },
  {
    icon: Smartphone,
    question: 'Cách tải về điện thoại Android (Samsung, Xiaomi, Oppo...)?',
    answer:
      'Trên thiết bị Android, chỉ cần nhấn nút "Tải Ngay". Trình duyệt Chrome sẽ tự động lưu file trực tiếp vào thư mục "Download" (Tải về) và video/ảnh sẽ tự động hiển thị trong ứng dụng Bộ Sưu Tập (Gallery/Google Photos).',
  },
  {
    icon: Monitor,
    question: 'Tải về máy tính (Windows PC, macOS) như thế nào?',
    answer:
      'Trên máy tính, bạn chỉ cần nhấn "Tải Ngay", trình duyệt sẽ mở hộp thoại lưu file hoặc lưu thẳng vào thư mục Downloads của máy tính với tên file sạch sẽ và định dạng chuẩn (.mp4 / .mp3 / .jpg).',
  },
  {
    icon: Sparkles,
    question: 'Tính năng tách âm thanh MP3 có giảm chất lượng không?',
    answer:
      'Hoàn toàn không! Hệ thống sẽ trích xuất trực tiếp luồng âm thanh nguyên bản (Original Audio Stream) với bitrate cao nhất lên tới 320kbps, giữ nguyên độ trong trẻo và âm bass sống động.',
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bp-surface border border-bp-cardBorder text-xs text-zinc-300 mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-bp-pink" />
          <span>HƯỚNG DẪN SỬ DỤNG CHI TIẾT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Câu Hỏi Thường Gặp & Hướng Dẫn Tải
        </h2>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          const Icon = faq.icon || Sparkles;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-bp-card border border-bp-cardBorder overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-white hover:text-bp-pink-light transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-bp-surface flex items-center justify-center text-bp-pink shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm sm:text-base">{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 text-bp-pink' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 mt-1 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
