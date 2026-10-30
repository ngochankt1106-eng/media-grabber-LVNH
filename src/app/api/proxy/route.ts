import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 45; // Vercel streaming max duration

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');
  let filename = searchParams.get('filename') || 'media-download';
  const ext = searchParams.get('ext') || 'mp4';

  if (!targetUrl) {
    return new NextResponse('URL query parameter is required', { status: 400 });
  }

  // Ensure filename has clean extension
  if (!filename.endsWith(`.${ext}`)) {
    filename = `${filename}.${ext}`;
  }
  // Sanitize filename for HTTP header
  const safeFilename = filename.replace(/[^a-zA-Z0-9_.-]/g, '_');

  try {
    const range = req.headers.get('range');
    const fetchHeaders: Record<string, string> = {
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)',
    };
    if (range) {
      fetchHeaders['Range'] = range;
    }

    const upstreamRes = await fetch(targetUrl, {
      headers: fetchHeaders,
      redirect: 'follow',
    });

    if (!upstreamRes.ok && upstreamRes.status !== 206) {
      return new NextResponse(`Upstream failed: ${upstreamRes.statusText}`, {
        status: upstreamRes.status,
      });
    }

    const contentType =
      upstreamRes.headers.get('content-type') ||
      (ext === 'mp3' ? 'audio/mpeg' : ext === 'mp4' ? 'video/mp4' : 'application/octet-stream');
    const contentLength = upstreamRes.headers.get('content-length');

    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Content-Disposition', `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(filename)}`);
    headers.set('Accept-Ranges', 'bytes');
    headers.set('Access-Control-Allow-Origin', '*');

    if (contentLength) {
      headers.set('Content-Length', contentLength);
    }
    const contentRange = upstreamRes.headers.get('content-range');
    if (contentRange) {
      headers.set('Content-Range', contentRange);
    }

    return new NextResponse(upstreamRes.body, {
      status: upstreamRes.status === 206 ? 206 : 200,
      headers,
    });
  } catch (error) {
    console.error('Proxy stream error:', error);
    return new NextResponse('Error streaming file from media server', { status: 502 });
  }
}
