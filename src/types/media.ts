export type PlatformType =
  | 'tiktok'
  | 'instagram'
  | 'youtube'
  | 'facebook'
  | 'twitter'
  | 'threads'
  | 'pinterest'
  | 'reddit'
  | 'generic';

export interface MediaDownloadOption {
  formatId: string;
  label: string;
  type: 'video' | 'audio' | 'image';
  quality?: string;
  url: string;
  size?: string;
  isNoWatermark?: boolean;
  ext: 'mp4' | 'mp3' | 'jpg' | 'png' | 'webp';
}

export interface ExtractedMedia {
  id: string;
  platform: PlatformType;
  platformName: string;
  originalUrl: string;
  title: string;
  author: {
    name: string;
    username?: string;
    avatar?: string;
  };
  thumbnail: string;
  duration?: string | number;
  stats?: {
    likes?: number | string;
    shares?: number | string;
    views?: number | string;
    comments?: number | string;
  };
  downloads: MediaDownloadOption[];
  images?: string[];
  audio?: {
    title?: string;
    author?: string;
    url: string;
    cover?: string;
    duration?: number;
  };
  rawPreviewVideo?: string;
}

export interface ExtractionResponse {
  success: boolean;
  data?: ExtractedMedia;
  error?: string;
}
