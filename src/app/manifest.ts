import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Media Grabber ✨ BORN PINK Edition',
    short_name: 'MediaGrabber',
    description: 'Trình tải video, hình ảnh & âm thanh MP3 không watermark phong cách Blackpink lấp lánh',
    start_url: '/',
    display: 'standalone',
    background_color: '#070709',
    theme_color: '#ff2d75',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
