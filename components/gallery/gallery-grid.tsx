"use client";

/**
 * Tanglewood Art Gallery - Gallery Grid Component
 * Masonry layout with filtering, lazy loading, and keyboard navigation
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import GallerySkeleton from "./gallery-skeleton";
import ArtworkCard from "./artwork-card";
import { type Artwork } from "@/lib/artworks";

interface GalleryGridProps {
  artworks: Artwork[];
}

export default function GalleryGrid({ artworks }: GalleryGridProps) {
  const searchParams = useSearchParams();
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>(artworks);
  const [isLoading, setIsLoading] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Filter artworks based on URL params
  useEffect(() => {
    const category = searchParams.get("category");
    const availability = searchParams.get("availability");

    let filtered = [...artworks];

    // Filter by category
    if (category && category !== "all") {
      filtered = filtered.filter((artwork) => artwork.category === category);
    }

    // Filter by availability
    if (availability && availability !== "all") {
      if (availability === "available") {
        filtered = filtered.filter((artwork) => artwork.availability === 'available');
      } else if (availability === "sold") {
        filtered = filtered.filter((artwork) => artwork.availability === 'sold');
      } else if (availability === "reserved") {
        filtered = filtered.filter((artwork) => artwork.availability === 'reserved');
      } else if (availability === "originals") {
        filtered = filtered.filter((artwork) => artwork.availability === 'available');
      } else if (availability === "prints") {
        filtered = filtered.filter(
          (artwork) => artwork.prints && artwork.prints.length > 0
        );
      }
    }

    setFilteredArtworks(filtered);
    setIsLoading(false);
    setFocusedIndex(-1); // Reset focus when filters change
  }, [searchParams, artworks]);

  // Intersection Observer for lazy loading images
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            if (src) {
              img.src = src;
              img.removeAttribute("data-src");
              observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.01,
      }
    );

    // Observe all images with data-src
    const images = gridRef.current?.querySelectorAll("img[data-src]");
    images?.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, [filteredArtworks]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!gridRef.current) return;

      const columns = window.innerWidth >= 1280 ? 4 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
      const totalItems = filteredArtworks.length;

      let newIndex = focusedIndex;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          newIndex = Math.min(focusedIndex + 1, totalItems - 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          newIndex = Math.max(focusedIndex - 1, 0);
          break;
        case "ArrowDown":
          e.preventDefault();
          newIndex = Math.min(focusedIndex + columns, totalItems - 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          newIndex = Math.max(focusedIndex - columns, 0);
          break;
        case "Home":
          e.preventDefault();
          newIndex = 0;
          break;
        case "End":
          e.preventDefault();
          newIndex = totalItems - 1;
          break;
        default:
          return;
      }

      if (newIndex !== focusedIndex && newIndex >= 0 && newIndex < totalItems) {
        setFocusedIndex(newIndex);
        cardRefs.current[newIndex]?.focus();
      }
    },
    [focusedIndex, filteredArtworks.length]
  );

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Determine card height and column span based on orientation setting or image dimensions
  const getCardHeight = (artwork: Artwork) => {
    // Check for manual orientation override
    const orientation = (artwork as any).orientation || 'auto';

    if (orientation === 'landscape') {
      return "aspect-[8/5]"; // 2 wide, 1 tall
    } else if (orientation === 'portrait') {
      return "aspect-[4/5]"; // 1 wide, 1 tall
    }

    // Auto: determine from dimensions
    const width = artwork.dimensions?.width || 1;
    const height = artwork.dimensions?.height || 1;
    const isLandscape = width > height;
    return isLandscape ? "aspect-[8/5]" : "aspect-[4/5]";
  };

  const getColumnSpan = (artwork: Artwork) => {
    // Check for manual orientation override
    const orientation = (artwork as any).orientation || 'auto';

    if (orientation === 'landscape') {
      return "sm:col-span-2";
    } else if (orientation === 'portrait') {
      return "";
    }

    // Auto: determine from dimensions
    const width = artwork.dimensions?.width || 1;
    const height = artwork.dimensions?.height || 1;
    const isLandscape = width > height;
    return isLandscape ? "sm:col-span-2" : "";
  };

  if (isLoading) {
    return <GallerySkeleton />;
  }

  if (filteredArtworks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <p className="text-xl text-museum-cream/60 mb-4">
          No artworks found matching your filters.
        </p>
        <p className="text-museum-cream/40">
          Try adjusting your filters to see more results.
        </p>
      </motion.div>
    );
  }

  return (
    <div
      ref={gridRef}
      role="region"
      aria-label="Gallery grid"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto"
    >
      <AnimatePresence mode="popLayout">
        {filteredArtworks.map((artwork, index) => (
          <motion.div
            key={artwork.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.4,
              delay: Math.min(index * 0.05, 0.3),
            }}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            tabIndex={focusedIndex === index ? 0 : -1}
            onFocus={() => setFocusedIndex(index)}
            className={`focus:outline-none focus:ring-2 focus:ring-museum-gold rounded-lg ${getColumnSpan(artwork)}`}
          >
            <ArtworkCard
              artwork={artwork}
              height={getCardHeight(artwork)}
              lazy={index > 8} // Lazy load images after first 8
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
