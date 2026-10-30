import { ExtractedMedia, PlatformType } from '@/types/media';
import { detectPlatform } from './detector';
import { extractTikTok } from './tiktok';
import { extractInstagram } from './instagram';
import { extractYouTube } from './youtube';
import { extractWithCobalt } from './universal';
import { extractOpenGraph } from './opengraph';

export async function extractMedia(inputUrl: string): Promise<ExtractedMedia | null> {
  const { platform, platformName, cleanUrl } = detectPlatform(inputUrl);

  let result: ExtractedMedia | null = null;

  try {
    switch (platform) {
      case 'tiktok': {
        result = await extractTikTok(cleanUrl);
        if (!result) {
          result = await extractWithCobalt(cleanUrl, platform, platformName);
        }
        break;
      }

      case 'instagram': {
        result = await extractInstagram(cleanUrl);
        if (!result) {
          result = await extractWithCobalt(cleanUrl, platform, platformName);
        }
        break;
      }

      case 'youtube': {
        result = await extractYouTube(cleanUrl);
        break;
      }

      case 'facebook':
      case 'twitter':
      case 'threads':
      case 'pinterest':
      case 'reddit': {
        result = await extractWithCobalt(cleanUrl, platform, platformName);
        if (!result) {
          result = await extractOpenGraph(cleanUrl, platform, platformName);
        }
        break;
      }

      default: {
        result = await extractWithCobalt(cleanUrl, platform, platformName);
        if (!result) {
          result = await extractOpenGraph(cleanUrl, platform, platformName);
        }
        break;
      }
    }
  } catch (err) {
    console.error('Extraction master error:', err);
  }

  // Final OpenGraph safety net if still null
  if (!result) {
    result = await extractOpenGraph(cleanUrl, platform, platformName);
  }

  return result;
}
