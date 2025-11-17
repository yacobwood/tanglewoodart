/**
 * Tanglewood Art Gallery - About Page
 * Complete artist biography, statement, studio process, and contact
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ArtistBio from '@/components/about/artist-bio';
import StudioProcess from '@/components/about/studio-process';

// SEO metadata for about page
export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Dennis Wood, a contemporary oil painter based in Northumberland. Discover his artistic journey, creative process, and the inspiration behind his atmospheric landscape paintings.',
  keywords: [
    'Dennis Wood',
    'artist biography',
    'contemporary painter',
    'oil painting artist',
    'Northumberland artist',
    'landscape painter',
    'British artist',
    'art studio',
  ],
  openGraph: {
    title: 'About Dennis Wood | Tanglewood Art Gallery',
    description:
      'Learn about Dennis Wood, a contemporary oil painter whose work explores the delicate interplay between memory, landscape, and the passage of time.',
    type: 'profile',
    images: [
      {
        url: '/artist-photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Dennis Wood in his studio',
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <div className="section">
      {/* Hero Section with Artist Portrait */}
      <section className="relative mb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-museum-charcoal/50 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Side */}
            <div className="relative aspect-[3/4] lg:aspect-[4/5] rounded-sm overflow-hidden group">
              <Image
                src="/artist-photo.jpg"
                alt="Dennis Wood in his studio"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                priority
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-museum-gold/20" />
            </div>

            {/* Content Side */}
            <div className="max-w-xl">
              <p className="text-sm text-museum-gold uppercase tracking-widest mb-4">
                About the Artist
              </p>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-museum-cream mb-6">
                Dennis Wood
              </h1>

              <p className="text-xl text-museum-cream/80 leading-relaxed mb-8">
                A contemporary oil painter exploring the delicate interplay between
                memory, landscape, and the passage of time from her coastal studio in
                Northumberland.
              </p>

              {/* Quick Facts */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-museum-gold text-sm font-medium uppercase tracking-wider min-w-[100px]">
                    Born
                  </span>
                  <span className="text-museum-cream/70">1954, Staffordshire, UK</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-museum-gold text-sm font-medium uppercase tracking-wider min-w-[100px]">
                    Education
                  </span>
                  <span className="text-museum-cream/70">
                    Aelfgar school of Art, 1979
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-museum-gold text-sm font-medium uppercase tracking-wider min-w-[100px]">
                    Studio
                  </span>
                  <span className="text-museum-cream/70">Colwich, UK</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-museum-gold text-sm font-medium uppercase tracking-wider min-w-[100px]">
                    Medium
                  </span>
                  <span className="text-museum-cream/70">Oil on Canvas</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/tanglewoodart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-museum-charcoal border border-museum-slate hover:border-museum-gold transition-colors flex items-center justify-center"
                  aria-label="Follow on Instagram"
                >
                  <Instagram className="w-5 h-5 text-museum-cream" />
                </a>
                <a
                  href="https://facebook.com/tanglewoodart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-museum-charcoal border border-museum-slate hover:border-museum-gold transition-colors flex items-center justify-center"
                  aria-label="Follow on Facebook"
                >
                  <Facebook className="w-5 h-5 text-museum-cream" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Statement */}
      <section className="mb-20 bg-museum-charcoal/30 py-16 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-museum-cream mb-8">
            Artist Statement
          </h2>
          <blockquote className="space-y-6 text-lg text-museum-cream/80 leading-relaxed">
            <p>
              &ldquo;I paint the spaces where the tangible world softens into
              something more ephemeral—the mist over water, the last light of day,
              the weight of memory made visible.&rdquo;
            </p>
            <p>
              My work is an attempt to capture not just what the landscape looks
              like, but how it feels. Growing up among the Yorkshire moors and now
              living on the Northumberland coast, I've always been drawn to places
              where earth meets sky, where boundaries dissolve, and where time seems
              to move differently.
            </p>
            <p>
              Each painting is built through many thin layers of oil paint,
              applied over weeks or months. This slow process mirrors the way
              memory works—accumulating, shifting, fading, and clarifying. The
              resulting images have a depth and luminosity that suggests something
              beyond the surface, something that exists in the liminal space
              between seeing and remembering.
            </p>
            <p>
              I'm interested in moments of transition: dawn and dusk, incoming
              tides, clearing storms. These are times when the world is in flux,
              when light is at its most magical, and when we're reminded of the
              constant change that underlies all things.
            </p>
            <p className="text-museum-cream italic">
              &mdash; Dennis Wood
            </p>
          </blockquote>
        </div>
      </section>

      {/* Biography Section */}
      <section className="mb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl text-museum-cream mb-12">
            Biography
          </h2>
          <ArtistBio />
        </div>
      </section>

      {/* Studio Process Section */}
      <section className="mb-20 relative overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/images/studio-background.jpg"
            alt="Studio background"
            fill
            className="object-cover"
            quality={50}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-museum-cream mb-4">
              Studio Process
            </h2>
            <p className="text-lg text-museum-cream/70 max-w-2xl mx-auto">
              From observation to finished painting, each work follows a
              contemplative process of layering and refinement.
            </p>
          </div>
          <StudioProcess />
        </div>
      </section>

      {/* Video Section */}
      <section className="mb-20 bg-museum-charcoal/50 py-16 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-museum-cream mb-4">
              Studio Visit
            </h2>
            <p className="text-lg text-museum-cream/70">
              Take a visual journey through the creative process
            </p>
          </div>

          {/* Video Placeholder - Ready for Vimeo/YouTube embed */}
          <div className="relative aspect-video rounded-lg overflow-hidden bg-museum-dark border border-museum-slate">
            {/* Replace with actual video embed */}
            {/* Example Vimeo:
            <iframe
              src="https://player.vimeo.com/video/YOUR_VIDEO_ID"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
            */}
            {/* Example YouTube:
            <iframe
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            */}

            {/* Placeholder content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-museum-gold/10 border-2 border-museum-gold/30 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-museum-gold"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-museum-cream/50 text-sm">
                  Studio video coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-museum-cream mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-museum-cream/70 mb-8 max-w-2xl mx-auto">
              Interested in commissioning a work or have questions about available
              paintings? I'd love to hear from you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" variant="primary">
                <a href="mailto:dennis@tanglewoodart.com">
                  <Mail className="w-5 h-5 mr-2" />
                  dennis@tanglewoodart.com
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/gallery">View Available Works</Link>
              </Button>
            </div>

            {/* Commission Information */}
            <div className="mt-12 p-8 border border-museum-slate/30 rounded-lg bg-museum-charcoal/30">
              <h3 className="font-serif text-2xl text-museum-cream mb-4">
                Commissions
              </h3>
              <p className="text-museum-cream/70 mb-6 max-w-2xl mx-auto">
                I accept a limited number of commissions each year. Commission work
                typically involves an initial consultation to discuss your vision,
                location studies if needed, and then the creation of a unique work
                tailored to your specifications. The process takes 3-6 months from
                initial consultation to completion.
              </p>
              <Button asChild variant="secondary">
                <a href="mailto:dennis@tanglewoodart.com?subject=Commission Inquiry">
                  Inquire About Commissions
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
