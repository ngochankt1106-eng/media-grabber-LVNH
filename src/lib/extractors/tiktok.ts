import { ExtractedMedia, MediaDownloadOption } from '@/types/media';

interface TikWMResponse {
  code: number;
  msg: string;
  data?: {
    id: string;
    title: string;
    cover: string;
    origin_cover: string;
    duration: number;
    play: string;
    wmplay?: string;
    hdplay?: string;
    size?: number;
    wm_size?: number;
    hd_size?: number;
    music: string;
    music_info?: {
      id: string;
      title: string;
      author: string;
      album?: string;
      play: string;
      cover?: string;
      duration: number;
    };
    author: {
      id: string;
      unique_id: string;
      nickname: string;
      avatar: string;
    };
    images?: string[];
    digg_count?: number;
    comment_count?: number;
    share_count?: number;
    play_count?: number;
  };
}

export async function extractTikTok(url: string): Promise<ExtractedMedia | null> {
  try {
    const endpoint = `https://api.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
        Accept: 'application/json',
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) return null;

    const json: TikWMResponse = await response.json();
    if (json.code !== 0 || !json.data) {
      return null;
    }

    const d = json.data;
    const downloads: MediaDownloadOption[] = [];

    // Format helper for MB
    const formatBytes = (bytes?: number) => {
      if (!bytes) return undefined;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    // 1. Video options (if not pure photo mode)
    if (d.hdplay) {
      downloads.push({
        formatId: 'tiktok-video-hd-nowm',
        label: 'Video Siêu Nét HD (Không Logo / Watermark)',
        type: 'video',
        quality: 'HD 1080p',
        url: d.hdplay.startsWith('http') ? d.hdplay : `https://www.tikwm.com${d.hdplay}`,
        size: formatBytes(d.hd_size),
        isNoWatermark: true,
        ext: 'mp4',
      });
    }

    if (d.play) {
      downloads.push({
        formatId: 'tiktok-video-nowm',
        label: 'Video Tiêu Chuẩn (Không Logo / Watermark)',
        type: 'video',
        quality: 'SD 720p',
        url: d.play.startsWith('http') ? d.play : `https://www.tikwm.com${d.play}`,
        size: formatBytes(d.size),
        isNoWatermark: true,
        ext: 'mp4',
      });
    }

    // 2. Audio MP3 option
    const musicUrl = d.music || d.music_info?.play;
    if (musicUrl) {
      const fullMusicUrl = musicUrl.startsWith('http') ? musicUrl : `https://www.tikwm.com${musicUrl}`;
      downloads.push({
        formatId: 'tiktok-audio-mp3',
        label: `Tách File Âm Thanh MP3 (${d.music_info?.title || 'Original Sound'})`,
        type: 'audio',
        quality: '320 kbps',
        url: fullMusicUrl,
        ext: 'mp3',
      });
    }

    // 3. Image slides if photo mode
    const images = d.images || [];
    if (images.length > 0) {
      images.forEach((imgUrl, idx) => {
        downloads.push({
          formatId: `tiktok-photo-${idx + 1}`,
          label: `Ảnh HD #${idx + 1} / ${images.length}`,
          type: 'image',
          quality: 'Original HD',
          url: imgUrl,
          ext: 'jpg',
        });
      });
    }

    // Thumbnail download
    if (d.origin_cover || d.cover) {
      const coverUrl = d.origin_cover || d.cover;
      downloads.push({
        formatId: 'tiktok-cover',
        label: 'Tải Ảnh Bìa (Thumbnail)',
        type: 'image',
        quality: 'HD Poster',
        url: coverUrl.startsWith('http') ? coverUrl : `https://www.tikwm.com${coverUrl}`,
        ext: 'jpg',
      });
    }

    // Prepare preview video
    const previewVideo = d.play
      ? (d.play.startsWith('http') ? d.play : `https://www.tikwm.com${d.play}`)
      : undefined;

    return {
      id: d.id || String(Date.now()),
      platform: 'tiktok',
      platformName: 'TikTok',
      originalUrl: url,
      title: d.title || 'Video TikTok không tên',
      author: {
        name: d.author?.nickname || 'TikTok Creator',
        username: d.author?.unique_id ? `@${d.author.unique_id}` : undefined,
        avatar: d.author?.avatar,
      },
      thumbnail: d.origin_cover || d.cover,
      duration: d.duration ? `${d.duration}s` : undefined,
      stats: {
        likes: d.digg_count,
        comments: d.comment_count,
        shares: d.share_count,
        views: d.play_count,
      },
      downloads,
      images: images.length > 0 ? images : undefined,
      audio: musicUrl
        ? {
            title: d.music_info?.title || 'TikTok Audio',
            author: d.music_info?.author || d.author?.nickname,
            url: musicUrl.startsWith('http') ? musicUrl : `https://www.tikwm.com${musicUrl}`,
            cover: d.music_info?.cover,
            duration: d.music_info?.duration,
          }
        : undefined,
      rawPreviewVideo: previewVideo,
    };
  } catch (error) {
    console.error('TikTok extraction error:', error);
    return null;
  }
}
