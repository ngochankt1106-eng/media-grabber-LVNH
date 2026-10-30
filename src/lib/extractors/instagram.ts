import { ExtractedMedia, MediaDownloadOption } from '@/types/media';
import { extractWithCobalt } from './universal';

export async function extractInstagram(url: string): Promise<ExtractedMedia | null> {
  // Try Cobalt first
  const cobaltResult = await extractWithCobalt(url, 'instagram', 'Instagram');
  if (cobaltResult) {
    return cobaltResult;
  }

  // Fallback: Direct Instagram embed parser
  try {
    let clean = url.split('?')[0];
    if (!clean.endsWith('/')) clean += '/';
    const embedUrl = `${clean}embed/captioned/`;

    const res = await fetch(embedUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
      },
    });

    if (res.ok) {
      const html = await res.text();

      // Look for video URL
      const videoMatch = html.match(/"video_url":"([^"]+)"/);
      // Look for display image URL
      const imgMatch = html.match(/"display_url":"([^"]+)"/);
      // Look for caption / title
      const titleMatch = html.match(/<div class="Caption"[^>]*>([\s\S]*?)<\/div>/);

      const downloads: MediaDownloadOption[] = [];
      let previewVideo: string | undefined = undefined;

      if (videoMatch) {
        const decodedVideoUrl = JSON.parse(`"${videoMatch[1]}"`);
        previewVideo = decodedVideoUrl;
        downloads.push({
          formatId: 'ig-video-hd',
          label: 'Tải Video Instagram Reel / Post (HD Không Logo)',
          type: 'video',
          quality: 'HD 1080p',
          url: decodedVideoUrl,
          ext: 'mp4',
          isNoWatermark: true,
        });
      }

      if (imgMatch) {
        const decodedImgUrl = JSON.parse(`"${imgMatch[1]}"`);
        downloads.push({
          formatId: 'ig-photo-hd',
          label: 'Tải Ảnh Gốc Instagram (Full HD)',
          type: 'image',
          quality: 'Original HD',
          url: decodedImgUrl,
          ext: 'jpg',
        });
      }

      if (downloads.length > 0) {
        const rawTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'Instagram Post';
        return {
          id: String(Date.now()),
          platform: 'instagram',
          platformName: 'Instagram',
          originalUrl: url,
          title: rawTitle.slice(0, 150) || 'Instagram Media',
          author: {
            name: 'Instagram Creator',
          },
          thumbnail: imgMatch ? JSON.parse(`"${imgMatch[1]}"`) : '',
          downloads,
          rawPreviewVideo: previewVideo,
        };
      }
    }
  } catch (err) {
    console.error('Instagram embed fallback error:', err);
  }

  return null;
}
