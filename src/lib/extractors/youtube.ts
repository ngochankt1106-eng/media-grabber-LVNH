import { ExtractedMedia } from '@/types/media';
import { extractWithCobalt } from './universal';

export async function extractYouTube(url: string): Promise<ExtractedMedia | null> {
  // 1. Fetch metadata via YouTube oEmbed
  let oembedData: { title?: string; author_name?: string; thumbnail_url?: string } | null = null;
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const res = await fetch(oembedUrl, { next: { revalidate: 3600 } });
    if (res.ok) {
      oembedData = await res.json();
    }
  } catch {
    // ignore
  }

  // 2. Extract media streams with Cobalt universal engine
  const cobaltResult = await extractWithCobalt(url, 'youtube', 'YouTube');

  if (cobaltResult) {
    if (oembedData?.title) cobaltResult.title = oembedData.title;
    if (oembedData?.author_name) cobaltResult.author.name = oembedData.author_name;
    if (oembedData?.thumbnail_url) cobaltResult.thumbnail = oembedData.thumbnail_url;
    return cobaltResult;
  }

  // Fallback if Cobalt mirror is congested: generate preview with YouTube direct info
  if (oembedData?.title) {
    // Extract video ID
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([\w-]{11})/);
    const videoId = match ? match[1] : null;
    const thumbnail = videoId
      ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
      : oembedData.thumbnail_url || '';

    return {
      id: videoId || String(Date.now()),
      platform: 'youtube',
      platformName: 'YouTube',
      originalUrl: url,
      title: oembedData.title,
      author: {
        name: oembedData.author_name || 'YouTube Creator',
      },
      thumbnail,
      downloads: [
        {
          formatId: 'yt-thumb-hd',
          label: 'Tải Ảnh Bìa Video (HD Maxres)',
          type: 'image',
          quality: '1080p Poster',
          url: thumbnail,
          ext: 'jpg',
        },
      ],
    };
  }

  return null;
}
