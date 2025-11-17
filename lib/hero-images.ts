/**
 * Hero Images Management
 * Handles configuration and selection of hero artwork images
 */

import fs from 'fs';
import path from 'path';
import { getAllArtworks, type Artwork } from './artworks';

const HERO_CONFIG_PATH = path.join(process.cwd(), 'data', 'hero-config.json');

interface HeroConfig {
  heroArtworkIds: string[];
}

/**
 * Get the list of artwork IDs configured for hero display
 */
export function getHeroArtworkIds(): string[] {
  try {
    const data = fs.readFileSync(HERO_CONFIG_PATH, 'utf-8');
    const config: HeroConfig = JSON.parse(data);
    return config.heroArtworkIds || [];
  } catch (error) {
    console.error('Error reading hero config:', error);
    return [];
  }
}

/**
 * Update the list of artwork IDs for hero display
 */
export function setHeroArtworkIds(artworkIds: string[]): boolean {
  try {
    const config: HeroConfig = {
      heroArtworkIds: artworkIds,
    };
    fs.writeFileSync(HERO_CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing hero config:', error);
    return false;
  }
}

/**
 * Get a random artwork from the configured hero artworks
 */
export function getRandomHeroArtwork(): Artwork | null {
  const heroIds = getHeroArtworkIds();

  if (heroIds.length === 0) {
    // Fallback to any featured artwork
    const allArtworks = getAllArtworks();
    const featuredArtworks = allArtworks.filter(artwork => artwork.featured);
    if (featuredArtworks.length > 0) {
      return featuredArtworks[Math.floor(Math.random() * featuredArtworks.length)];
    }
    // Last resort: return first artwork
    return allArtworks[0] || null;
  }

  // Get all artworks and filter to hero IDs
  const allArtworks = getAllArtworks();
  const heroArtworks = allArtworks.filter(artwork =>
    heroIds.includes(artwork.id)
  );

  if (heroArtworks.length === 0) {
    return null;
  }

  // Return random artwork from hero list
  return heroArtworks[Math.floor(Math.random() * heroArtworks.length)];
}

/**
 * Get all artworks configured for hero display
 */
export function getHeroArtworks(): Artwork[] {
  const heroIds = getHeroArtworkIds();
  const allArtworks = getAllArtworks();
  return allArtworks.filter(artwork => heroIds.includes(artwork.id));
}
