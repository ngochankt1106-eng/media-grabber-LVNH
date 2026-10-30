import { NextRequest, NextResponse } from 'next/server';
import { extractMedia } from '@/lib/extractors';

export const dynamic = 'force-dynamic';
export const maxDuration = 30; // 30 seconds for Vercel Serverless Functions

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Vui lòng cung cấp đường dẫn (URL) hợp lệ!' },
        { status: 400 }
      );
    }

    const trimmed = url.trim();
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      return NextResponse.json(
        { success: false, error: 'Đường dẫn phải bắt đầu bằng https:// hoặc http://' },
        { status: 400 }
      );
    }

    const media = await extractMedia(trimmed);

    if (!media || (!media.downloads.length && !media.images?.length && !media.rawPreviewVideo)) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Không thể trích xuất nội dung từ link này. Link có thể là bài viết riêng tư hoặc nền tảng đã thay đổi cấu trúc.',
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: media,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      }
    );
  } catch (error) {
    console.error('API /api/extract error:', error);
    return NextResponse.json(
      { success: false, error: 'Có lỗi xảy ra trong quá trình xử lý serverless. Vui lòng thử lại!' },
      { status: 500 }
    );
  }
}
