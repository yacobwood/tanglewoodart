/**
 * Tanglewood Art Gallery - Custom 404 Page
 * Museum-styled not found page with helpful navigation
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Image as GalleryIcon, Mail, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="section min-h-[80vh] flex items-center justify-center">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Artistic Display */}
        <div className="mb-12">
          <div className="relative inline-block">
            {/* Large 404 Text */}
            <h1 className="font-serif text-[10rem] sm:text-[12rem] md:text-[14rem] lg:text-[16rem] leading-none text-museum-gold/10 select-none">
              404
            </h1>

            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-museum-gold text-sm uppercase tracking-widest mb-2">
                  Lost in the Gallery
                </p>
                <div className="w-16 h-px bg-museum-gold/50 mx-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-12 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-museum-cream">
            Page Not Found
          </h2>
          <p className="text-lg text-museum-cream/70 max-w-xl mx-auto leading-relaxed">
            Like a painting that exists only in memory, the page you're looking
            for seems to have disappeared into the mist.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
          <Link
            href="/"
            className="card card-hover flex items-center gap-4 p-6 text-left group"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-museum-gold/10 flex items-center justify-center group-hover:bg-museum-gold/20 transition-colors">
              <Home className="w-6 h-6 text-museum-gold" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-lg text-museum-cream mb-1">
                Return Home
              </h3>
              <p className="text-sm text-museum-cream/60">
                Back to the main gallery
              </p>
            </div>
          </Link>

          <Link
            href="/gallery"
            className="card card-hover flex items-center gap-4 p-6 text-left group"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-museum-gold/10 flex items-center justify-center group-hover:bg-museum-gold/20 transition-colors">
              <GalleryIcon className="w-6 h-6 text-museum-gold" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-lg text-museum-cream mb-1">
                Browse Gallery
              </h3>
              <p className="text-sm text-museum-cream/60">
                Explore all artworks
              </p>
            </div>
          </Link>

          <Link
            href="/about"
            className="card card-hover flex items-center gap-4 p-6 text-left group"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-museum-gold/10 flex items-center justify-center group-hover:bg-museum-gold/20 transition-colors">
              <Search className="w-6 h-6 text-museum-gold" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-lg text-museum-cream mb-1">
                About the Artist
              </h3>
              <p className="text-sm text-museum-cream/60">
                Learn more about Eleanor
              </p>
            </div>
          </Link>

          <a
            href="mailto:dennis@tanglewoodart.com"
            className="card card-hover flex items-center gap-4 p-6 text-left group"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-museum-gold/10 flex items-center justify-center group-hover:bg-museum-gold/20 transition-colors">
              <Mail className="w-6 h-6 text-museum-gold" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-lg text-museum-cream mb-1">
                Contact Us
              </h3>
              <p className="text-sm text-museum-cream/60">
                We're here to help
              </p>
            </div>
          </a>
        </div>

        {/* Additional Help */}
        <div className="text-museum-cream/50 text-sm">
          <p className="mb-4">
            If you believe this is an error, please{' '}
            <a
              href="mailto:dennis@tanglewoodart.com"
              className="text-museum-gold hover:text-museum-gold-light underline underline-offset-2 transition-colors"
            >
              let us know
            </a>
            .
          </p>
          <p>
            Error code: 404 - Page not found
          </p>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 flex items-center justify-center gap-2">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-museum-gold/30" />
          <div className="w-1 h-1 rounded-full bg-museum-gold/50" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-museum-gold/30" />
        </div>
      </div>
    </div>
  );
}
