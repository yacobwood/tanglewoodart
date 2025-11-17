/**
 * Admin Artworks API
 * GET /api/admin/artworks - Get all artworks
 * POST /api/admin/artworks - Create new artwork
 */

import { NextRequest, NextResponse } from 'next/server';
import { isRequestAuthenticated } from '@/lib/admin-auth';
import { readArtworks, addArtwork } from '@/lib/db';

/**
 * GET - Get all artworks (admin view)
 */
export async function GET(request: NextRequest) {
  // Check authentication
  if (!isRequestAuthenticated(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const artworks = await readArtworks();

    return NextResponse.json({
      success: true,
      data: artworks,
    });
  } catch (error) {
    console.error('Error fetching artworks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch artworks' },
      { status: 500 }
    );
  }
}

/**
 * POST - Create new artwork
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
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['id', 'title', 'artist', 'year', 'medium', 'category', 'description', 'price'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create slug from ID if not provided
    if (!body.slug) {
      body.slug = body.id;
    }

    // Set defaults
    const artwork = {
      ...body,
      available: body.available !== undefined ? body.available : true,
      featured: body.featured !== undefined ? body.featured : false,
      images: body.images || {
        main: body.imageUrl || '/placeholder-art.jpg',
        detail: body.detailImageUrl || undefined,
      },
      dimensions: body.dimensions || {
        width: 0,
        height: 0,
        unit: 'cm',
      },
      prints: body.prints || [
        {
          size: 'A4',
          dimensions: '21 x 29.7 cm',
          price: 45,
          finishes: ['matte', 'glossy'],
        },
        {
          size: 'A3',
          dimensions: '29.7 x 42 cm',
          price: 85,
          finishes: ['matte', 'glossy'],
        },
        {
          size: 'A2',
          dimensions: '42 x 59.4 cm',
          price: 165,
          finishes: ['matte', 'glossy'],
        },
      ],
    };

    const newArtwork = await addArtwork(artwork);

    return NextResponse.json({
      success: true,
      data: newArtwork,
      message: 'Artwork created successfully',
    });
  } catch (error: any) {
    console.error('Error creating artwork:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create artwork' },
      { status: 500 }
    );
  }
}
