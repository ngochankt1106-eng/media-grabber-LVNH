import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#ff2d75',
};

export const metadata: Metadata = {
  title: 'Media Grabber ✨ BORN PINK Edition | Tải Video & MP3 Không Watermark',
  description:
    'Trình tải đa phương tiện từ TikTok, Instagram, YouTube, Facebook, X không watermark, hỗ trợ xuất file MP3 chất lượng cao. Phong cách Blackpink ngầu ngầu & lấp lánh.',
  applicationName: 'MediaGrabber',
  authors: [{ name: 'Antigravity VIP' }],
  keywords: [
    'media grabber',
    'tai video tiktok khong logo',
    'tiktok no watermark',
    'download instagram reels',
    'youtube shorts download',
    'tach am thanh mp3',
    'blackpink theme',
  ],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Media Grabber ✨ BORN PINK Edition',
    description: 'Tải Video Không Logo, Tách MP3 & Ảnh HD Từ Mạng Xã Hội',
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Media Grabber',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-bp-bg text-zinc-100 font-sans antialiased overflow-x-hidden selection:bg-bp-pink selection:text-white">
        {children}
      </body>
    </html>
  );
}
