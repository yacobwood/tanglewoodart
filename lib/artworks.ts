/**
 * Artwork Library
 * Helper functions to load and filter artworks from JSON data
 */

import artworksData from '@/data/artworks.json';
import type { Artwork as ArtworkType } from '@/types';

// Type for the raw JSON artwork structure
interface RawArtwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  medium: string;
  dimensions: {
    width: number;
    height: number;
    unit: string;
  };
  category: string;
  description: string;
  story?: string;
  price: number;
  available: boolean;
  featured: boolean;
  series?: string | null;
  images: {
    main: string;
    detail?: string;
  };
  prints?: Array<{
    size: string;
    dimensions: string;
    price: number;
    finishes: string[];
  }>;
}

// Re-export Artwork type from types and extend with prints
export type Artwork = ArtworkType & {
  prints?: Array<{
    size: string;
    dimensions: string;
    price: number;
    finishes: string[];
  }>;
};

/**
 * Convert title to URL-friendly slug
 */
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Normalize raw artwork data
 */
function normalizeArtwork(raw: RawArtwork): Artwork {
  return {
    id: raw.id,
    slug: raw.id, // Using id as slug since it's already formatted properly
    title: raw.title,
    artist: raw.artist,
    year: raw.year,
    medium: raw.medium,
    dimensions: {
      width: raw.dimensions.width,
      height: raw.dimensions.height,
      unit: raw.dimensions.unit as 'cm' | 'in',
    },
    category: raw.category as any, // Cast to Category enum
    description: raw.description,
    story: raw.story,
    price: raw.price,
    availability: raw.available ? 'available' : 'sold', // Map boolean to string
    featured: raw.featured,
    series: raw.series || undefined,
    images: [
      {
        url: raw.images.main,
        alt: raw.title,
      },
      ...(raw.images.detail ? [{
        url: raw.images.detail,
        alt: `${raw.title} - detail`,
      }] : []),
    ],
    prints: raw.prints, // Keep prints for now (not in base Artwork type but used in components)
  };
}

/**
 * Get all artworks
 */
export function getAllArtworks(): Artwork[] {
  return (artworksData as RawArtwork[]).map(normalizeArtwork);
}

/**
 * Get featured artworks (for homepage)
 * @param limit - Maximum number of artworks to return (default: 3)
 */
export function getFeaturedArtworks(limit: number = 3): Artwork[] {
  return getAllArtworks()
    .filter((artwork) => artwork.featured)
    .slice(0, limit);
}

/**
 * Get artwork by slug
 */
export function getArtworkBySlug(slug: string): Artwork | null {
  const artwork = getAllArtworks().find((art) => art.slug === slug);
  return artwork || null;
}

/**
 * Get artwork by ID
 */
export function getArtworkById(id: string): Artwork | null {
  const artwork = getAllArtworks().find((art) => art.id === id);
  return artwork || null;
}

/**
 * Filter artworks by category
 */
export function getArtworksByCategory(category: string): Artwork[] {
  return getAllArtworks().filter(
    (artwork) => artwork.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Filter artworks by availability
 */
export function getAvailableArtworks(): Artwork[] {
  return getAllArtworks().filter((artwork) => artwork.availability === 'available');
}

/**
 * Get artworks by series
 */
export function getArtworksBySeries(series: string): Artwork[] {
  return getAllArtworks().filter(
    (artwork) => artwork.series?.toLowerCase() === series.toLowerCase()
  );
}

/**
 * Search artworks by title, description, or artist
 */
export function searchArtworks(query: string): Artwork[] {
  const lowerQuery = query.toLowerCase();
  return getAllArtworks().filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(lowerQuery) ||
      artwork.description.toLowerCase().includes(lowerQuery) ||
      artwork.artist.toLowerCase().includes(lowerQuery) ||
      artwork.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get related artworks (same category or series)
 */
export function getRelatedArtworks(
  artworkId: string,
  limit: number = 3
): Artwork[] {
  const artwork = getArtworkById(artworkId);
  if (!artwork) return [];

  return getAllArtworks()
    .filter((art) => {
      if (art.id === artworkId) return false;

      // Match by series first, then category
      if (artwork.series && art.series === artwork.series) return true;
      if (art.category === artwork.category) return true;

      return false;
    })
    .slice(0, limit);
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const categories = getAllArtworks().map((artwork) => artwork.category);
  return [...new Set(categories)].sort();
}

/**
 * Get all unique series
 */
export function getAllSeries(): string[] {
  const series = getAllArtworks()
    .map((artwork) => artwork.series)
    .filter((s): s is string => !!s);
  return [...new Set(series)].sort();
}

/**
 * Format price for display
 */
export function formatPrice(price: number, currency: string = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format dimensions for display
 */
export function formatDimensions(dimensions: {
  width: number;
  height: number;
  unit: string;
}): string {
  return `${dimensions.width} × ${dimensions.height} ${dimensions.unit}`;
}
