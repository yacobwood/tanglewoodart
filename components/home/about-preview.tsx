/**
 * About Preview Component
 * Short about section for homepage with artist introduction
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function AboutPreview() {
  return (
    <section className="section py-16 md:py-24 bg-museum-charcoal/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
            className="relative aspect-[4/5] rounded-sm overflow-hidden"
          >
            <Image
              src="/artist-photo.jpg"
              alt="Dennis Wood in his studio"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={85}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-museum-gold/10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <div className="max-w-xl">
              <p className="text-sm text-museum-gold uppercase tracking-widest mb-4">
                About the Artist
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-museum-cream mb-6">
                Dennis Wood
              </h2>

              <div className="space-y-4 text-museum-cream/80 leading-relaxed">
                <p>
                  Dennis Wood creates contemplative oil paintings that explore
                  the intersection of light, time, and memory. Working primarily from
                  her coastal studio in Northumberland, she draws inspiration from the
                  ever-changing landscape and the quiet moments between sea and shore.
                </p>

                <p>
                  Her works are held in private collections across the UK and Europe,
                  and she has exhibited at galleries including the Royal Academy Summer
                  Exhibition and the Royal Society of British Artists.
                </p>

                <p className="text-museum-cream/60 text-sm italic border-l-2 border-museum-gold/30 pl-4">
                  &ldquo;I paint the spaces where the tangible world softens into something
                  more ephemeral—the mist over water, the last light of day, the weight
                  of memory made visible.&rdquo;
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" variant="primary">
                  <Link href="/about">Read Full Biography</Link>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <Link href="/contact">Commission a Work</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
