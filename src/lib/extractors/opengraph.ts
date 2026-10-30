import { ExtractedMedia, MediaDownloadOption, PlatformType } from '@/types/media';

export async function extractOpenGraph(
  url: string,
  platform: PlatformType,
  platformName: string
): Promise<ExtractedMedia | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html) AppleWebKit/537.36',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) return null;
    const html = await res.text();

    const getMeta = (prop: string) => {
      const match =
        html.match(new RegExp(`<meta\\s+property=["']${prop}["']\\s+content=["']([^"']+)["']`, 'i')) ||
        html.match(new RegExp(`<meta\\s+content=["']([^"']+)["']\\s+property=["']${prop}["']`, 'i')) ||
        html.match(new RegExp(`<meta\\s+name=["']${prop}["']\\s+content=["']([^"']+)["']`, 'i')) ||
        html.match(new RegExp(`<meta\\s+content=["']([^"']+)["']\\s+name=["']${prop}["']`, 'i'));
      return match ? match[1] : null;
    };

    const ogTitle = getMeta('og:title') || getMeta('twitter:title') || 'Nội dung chia sẻ';
    const ogImage = getMeta('og:image') || getMeta('twitter:image:src') || getMeta('twitter:image');
    const ogVideo = getMeta('og:video') || getMeta('og:video:secure_url');

    const downloads: MediaDownloadOption[] = [];

    if (ogVideo) {
      downloads.push({
        formatId: 'generic-video',
        label: 'Tải Video (Chất lượng gốc)',
        type: 'video',
        quality: 'Original',
        url: ogVideo,
        ext: 'mp4',
      });
    }

    if (ogImage) {
      downloads.push({
        formatId: 'generic-image',
        label: 'Tải Ảnh Bìa / Hình Ảnh (Chất lượng gốc)',
        type: 'image',
        quality: 'Original',
        url: ogImage,
        ext: 'jpg',
      });
    }

    if (downloads.length > 0) {
      return {
        id: String(Date.now()),
        platform,
        platformName,
        originalUrl: url,
        title: ogTitle,
        author: {
          name: platformName,
        },
        thumbnail: ogImage || '',
        downloads,
        rawPreviewVideo: ogVideo || undefined,
      };
    }
  } catch (err) {
    console.error('OpenGraph fallback error:', err);
  }

  return null;
}
