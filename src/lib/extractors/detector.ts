import { PlatformType } from '@/types/media';

export function detectPlatform(rawUrl: string): { platform: PlatformType; platformName: string; cleanUrl: string } {
  let cleanUrl = rawUrl.trim();
  
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  let hostname = '';
  try {
    const parsed = new URL(cleanUrl);
    hostname = parsed.hostname.toLowerCase();
  } catch {
    return { platform: 'generic', platformName: 'Universal Web', cleanUrl };
  }

  if (hostname.includes('tiktok.com') || hostname.includes('douyin.com')) {
    return { platform: 'tiktok', platformName: 'TikTok', cleanUrl };
  }
  if (hostname.includes('instagram.com') || hostname.includes('instagr.am')) {
    return { platform: 'instagram', platformName: 'Instagram', cleanUrl };
  }
  if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
    return { platform: 'youtube', platformName: 'YouTube', cleanUrl };
  }
  if (hostname.includes('facebook.com') || hostname.includes('fb.watch') || hostname.includes('fb.com')) {
    return { platform: 'facebook', platformName: 'Facebook', cleanUrl };
  }
  if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
    return { platform: 'twitter', platformName: 'X / Twitter', cleanUrl };
  }
  if (hostname.includes('threads.net')) {
    return { platform: 'threads', platformName: 'Threads', cleanUrl };
  }
  if (hostname.includes('pinterest.com') || hostname.includes('pin.it')) {
    return { platform: 'pinterest', platformName: 'Pinterest', cleanUrl };
  }
  if (hostname.includes('reddit.com') || hostname.includes('redd.it')) {
    return { platform: 'reddit', platformName: 'Reddit', cleanUrl };
  }

  return { platform: 'generic', platformName: 'Mạng xã hội khác', cleanUrl };
}
