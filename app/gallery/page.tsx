/**
 * Tanglewood Art Gallery - Gallery Page
 * Filterable masonry grid of artworks with lazy loading and keyboard navigation
 */

import { Metadata } from "next";
import GalleryGrid from "@/components/gallery/gallery-grid";
import Filters from "@/components/gallery/filters";
import { getAllArtworks } from "@/lib/artworks";

// SEO metadata for gallery page
export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse the complete collection of original oil paintings and fine art prints by Dennis Wood. Filter by category, availability, and more to find the perfect piece for your collection.",
  keywords: [
    "art gallery",
    "oil paintings",
    "fine art prints",
    "landscape paintings",
    "portrait paintings",
    "abstract art",
    "still life",
    "seascape paintings",
    "original artwork",
    "art for sale",
  ],
  openGraph: {
    title: "Gallery | Tanglewood Art",
    description:
      "Browse the complete collection of original oil paintings and fine art prints by Dennis Wood.",
    type: "website",
  },
};

export default function GalleryPage() {
  const artworks = getAllArtworks();

  return (
    <div className="section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-museum-cream mb-4">
            Gallery
          </h1>
          <p className="text-lg text-museum-cream/80 max-w-2xl mx-auto">
            Explore the complete collection of original oil paintings and fine
            art prints. Each piece is available for purchase as an original
            work or as a limited edition print.
          </p>
        </div>

        {/* Filter controls */}
        <Filters />

        {/* Gallery grid with masonry layout */}
        <GalleryGrid artworks={artworks} />
      </div>
    </div>
  );
}
