/**
 * Hero Section Component
 * Large featured artwork with artist tagline and CTA
 */

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Artwork } from '@/lib/artworks';

interface HeroProps {
  featuredArtwork: Artwork;
}

export default function Hero({ featuredArtwork }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.4, 0.0, 0.2, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src={featuredArtwork.images[0]?.url || ''}
            alt={featuredArtwork.images[0]?.alt || `${featuredArtwork.title} by ${featuredArtwork.artist}`}
            fill
            priority
            quality={90}
            className="object-cover"
            sizes="100vw"
          />
          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-museum-dark via-museum-dark/80 to-museum-dark/60" />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl">
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-museum-cream mb-6 leading-tight"
            >
              Original Oil Paintings
              <span className="block text-museum-gold mt-2">
                by Dennis Wood
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
              className="text-lg sm:text-xl text-museum-cream/90 mb-8 leading-relaxed max-w-xl"
            >
              Explore a curated collection of landscapes, portraits, and abstract works.
              Each piece tells a story of light, time, and contemplation.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" variant="primary">
                <Link href="/gallery">View Gallery</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href={`/art/${featuredArtwork.slug}`}>
                  View Featured Work
                </Link>
              </Button>
            </motion.div>

            {/* Featured Artwork Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
              className="mt-12 pt-8 border-t border-museum-gold/20"
            >
              <p className="text-sm text-museum-gold uppercase tracking-widest mb-2">
                Featured Artwork
              </p>
              <Link
                href={`/art/${featuredArtwork.slug}`}
                className="group inline-block"
              >
                <h2 className="font-serif text-2xl text-museum-cream group-hover:text-museum-gold transition-colors duration-300">
                  {featuredArtwork.title}
                </h2>
                <p className="text-museum-cream/70 mt-1">
                  {featuredArtwork.medium}, {featuredArtwork.year}
                </p>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-museum-gold/50 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-museum-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
