/**
 * Admin Artwork Detail API
 * PUT /api/admin/artworks/[id] - Update artwork
 * DELETE /api/admin/artworks/[id] - Delete artwork
 */

import { NextRequest, NextResponse } from 'next/server';
import { isRequestAuthenticated } from '@/lib/admin-auth';
import { updateArtwork, deleteArtwork, getArtworkById } from '@/lib/db';

/**
 * GET - Get single artwork
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authentication
  if (!isRequestAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const artwork = await getArtworkById(id);

    if (!artwork) {
      return NextResponse.json(
        { success: false, error: 'Artwork not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: artwork,
    });
  } catch (error) {
    console.error('Error fetching artwork:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch artwork' },
      { status: 500 }
    );
  }
}

/**
 * PUT - Update artwork
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authentication
  if (!isRequestAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();

    // If imageUrl or detailImageUrl are provided, update images object
    if (body.imageUrl || body.detailImageUrl) {
      const currentArtwork = await getArtworkById(id);
      body.images = {
        main: body.imageUrl || currentArtwork?.images?.main || '/placeholder-art.jpg',
        detail: body.detailImageUrl || currentArtwork?.images?.detail,
      };
      delete body.imageUrl;
      delete body.detailImageUrl;
    }

    const updatedArtwork = await updateArtwork(id, body);

    if (!updatedArtwork) {
      return NextResponse.json(
        { success: false, error: 'Artwork not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedArtwork,
      message: 'Artwork updated successfully',
    });
  } catch (error) {
    console.error('Error updating artwork:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update artwork' },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Delete artwork
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Check authentication
  if (!isRequestAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;
    const success = await deleteArtwork(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Artwork not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Artwork deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting artwork:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete artwork' },
      { status: 500 }
    );
  }
}
