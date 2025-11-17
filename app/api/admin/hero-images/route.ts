/**
 * API Route: Hero Images Configuration
 * Handles GET and PUT requests for hero image selection
 */

import { NextRequest, NextResponse } from 'next/server';
import { getHeroArtworkIds, setHeroArtworkIds, getHeroArtworks } from '@/lib/hero-images';

/**
 * GET /api/admin/hero-images
 * Returns the current hero images configuration
 */
export async function GET() {
  try {
    const heroIds = getHeroArtworkIds();
    const heroArtworks = getHeroArtworks();

    return NextResponse.json({
      success: true,
      heroArtworkIds: heroIds,
      heroArtworks: heroArtworks,
    });
  } catch (error) {
    console.error('Error fetching hero images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hero images' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/hero-images
 * Updates the hero images configuration
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { artworkIds } = body;

    if (!Array.isArray(artworkIds)) {
      return NextResponse.json(
        { success: false, error: 'artworkIds must be an array' },
        { status: 400 }
      );
    }

    const success = setHeroArtworkIds(artworkIds);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Failed to update hero images' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Hero images updated successfully',
      heroArtworkIds: artworkIds,
    });
  } catch (error) {
    console.error('Error updating hero images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update hero images' },
      { status: 500 }
    );
  }
}
