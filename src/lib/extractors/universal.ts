import { ExtractedMedia, MediaDownloadOption, PlatformType } from '@/types/media';

interface CobaltSuccessResponse {
  status: 'tunnel' | 'redirect' | 'stream' | 'picker' | 'success';
  url?: string;
  pickerType?: 'various' | 'images';
  picker?: Array<{
    type?: 'photo' | 'video';
    url: string;
    thumb?: string;
  }>;
  audio?: string;
}

const COBALT_SERVERS = [
  'https://cobalt-api.kwiatekm.me',
  'https://cobalt.api.scav.top',
  'https://capi.wuk.sh',
  'https://api.cobalt.tools',
];

export async function extractWithCobalt(
  url: string,
  platform: PlatformType,
  platformName: string
): Promise<ExtractedMedia | null> {
  // Try Cobalt mirrors
  for (const server of COBALT_SERVERS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6500);

      const resp = await fetch(server, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        },
        body: JSON.stringify({
          url,
          videoQuality: '1080',
          audioFormat: 'mp3',
          downloadMode: 'auto',
          youtubeVideoCodec: 'h264',
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!resp.ok) continue;

      const data: CobaltSuccessResponse = await resp.json();

      const downloads: MediaDownloadOption[] = [];
      const images: string[] = [];

      // If Cobalt returned a picker (multiple items like Instagram carousel / photos)
      if (data.status === 'picker' && Array.isArray(data.picker)) {
        data.picker.forEach((item, index) => {
          if (item.type === 'video') {
            downloads.push({
              formatId: `item-video-${index + 1}`,
              label: `Video #${index + 1} (Chất lượng cao)`,
              type: 'video',
              quality: 'HD',
              url: item.url,
              ext: 'mp4',
              isNoWatermark: true,
            });
          } else {
            images.push(item.url);
            downloads.push({
              formatId: `item-photo-${index + 1}`,
              label: `Ảnh #${index + 1} (Độ phân giải gốc)`,
              type: 'image',
              quality: 'Original',
              url: item.url,
              ext: 'jpg',
            });
          }
        });
      } else if (data.url) {
        // Single video or photo
        downloads.push({
          formatId: `${platform}-media-main`,
          label: `Tải Video Không Logo (${platformName})`,
          type: 'video',
          quality: 'HD 1080p',
          url: data.url,
          ext: 'mp4',
          isNoWatermark: true,
        });
      }

      // If we got media, also attempt audio extraction if supported
      let audioDownloadUrl = data.audio;
      if (!audioDownloadUrl && data.url) {
        // Try fetching audio-only MP3 format
        try {
          const audioController = new AbortController();
          const audioTimeout = setTimeout(() => audioController.abort(), 4500);
          const audioResp = await fetch(server, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url,
              downloadMode: 'audio',
              audioFormat: 'mp3',
            }),
            signal: audioController.signal,
          });
          clearTimeout(audioTimeout);
          if (audioResp.ok) {
            const audioData = await audioResp.json();
            if (audioData.url) {
              audioDownloadUrl = audioData.url;
            }
          }
        } catch {
          // ignore audio failure
        }
      }

      if (audioDownloadUrl) {
        downloads.push({
          formatId: `${platform}-audio-mp3`,
          label: 'Tải File Âm Thanh MP3 Riêng Biệt',
          type: 'audio',
          quality: '320 kbps MP3',
          url: audioDownloadUrl,
          ext: 'mp3',
        });
      }

      if (downloads.length > 0) {
        return {
          id: String(Date.now()),
          platform,
          platformName,
          originalUrl: url,
          title: `Nội dung từ ${platformName}`,
          author: {
            name: `${platformName} User`,
          },
          thumbnail: images[0] || (data.picker && data.picker[0]?.thumb) || '',
          downloads,
          images: images.length > 0 ? images : undefined,
          rawPreviewVideo: data.url,
          audio: audioDownloadUrl
            ? {
                title: `Âm thanh trích xuất từ ${platformName}`,
                url: audioDownloadUrl,
              }
            : undefined,
        };
      }
    } catch {
      // Continue to next mirror
      continue;
    }
  }

  return null;
}
