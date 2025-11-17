/**
 * One-time Blob Initialization API
 * POST /api/admin/init-blob - Initialize Vercel Blob with artworks data
 */

import { NextRequest, NextResponse } from 'next/server';
import { isRequestAuthenticated } from '@/lib/admin-auth';
import { writeArtworks } from '@/lib/db';
import artworksData from '@/data/artworks.json';

/**
 * POST - Initialize blob with artworks data
 */
export async function POST(request: NextRequest) {
  // Check authentication
  if (!isRequestAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Write the artworks from JSON file to blob
    await writeArtworks(artworksData);

    return NextResponse.json({
      success: true,
      message: 'Blob initialized with artworks data',
      count: artworksData.length,
    });
  } catch (error) {
    console.error('Error initializing blob:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initialize blob' },
      { status: 500 }
    );
  }
}
