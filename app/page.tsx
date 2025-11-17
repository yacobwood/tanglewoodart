/**
 * Tanglewood Art Gallery - Home Page
 * Hero, featured artworks, about preview, and newsletter CTA
 */

import type { Metadata } from 'next';
import Hero from '@/components/home/hero';
import FeaturedSection from '@/components/home/featured-section';
import AboutPreview from '@/components/home/about-preview';
import NewsletterCTA from '@/components/home/newsletter-cta';
import { getFeaturedArtworks, getAllArtworks } from '@/lib/artworks';
import { getRandomHeroArtwork } from '@/lib/hero-images';

// Force dynamic rendering to enable random hero selection on each page load
export const dynamic = 'force-dynamic';

// SEO metadata for home page
export const metadata: Metadata = {
  title: 'Home',
  description:
    'Discover original oil paintings by Dennis Wood. Explore contemplative landscapes, portraits, and abstract works inspired by the Northumberland coast. Available for purchase.',
  openGraph: {
    title: 'Tanglewood Art Gallery | Original Oil Paintings',
    description:
      'Discover original oil paintings by Dennis Wood. Explore contemplative landscapes, portraits, and abstract works inspired by the Northumberland coast.',
    images: [
      {
        url: '/sample-art/mist-over-borrowed-light.jpg',
        width: 1200,
        height: 630,
        alt: 'Featured artwork from Tanglewood Art Gallery',
      },
    ],
  },
};

export default function HomePage() {
  // Get featured artworks for display
  const featuredArtworks = getFeaturedArtworks(3);

  // Get a random hero artwork from configured hero images
  const heroArtwork = getRandomHeroArtwork();

  // Get 3 featured artworks for the featured section
  const sectionArtworks = featuredArtworks.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      {heroArtwork && <Hero featuredArtwork={heroArtwork} />}

      {/* Featured Artworks Section */}
      {sectionArtworks.length > 0 && (
        <FeaturedSection artworks={sectionArtworks} />
      )}

      {/* About Preview Section */}
      <AboutPreview />

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </>
  );
}
