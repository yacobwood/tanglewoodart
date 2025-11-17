/**
 * Tanglewood Art Gallery - Prints Page
 * Gallery page showing only artworks with prints available
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Package, Truck, Shield } from 'lucide-react';
import GalleryGrid from '@/components/gallery/gallery-grid';
import Filters from '@/components/gallery/filters';
import { getAllArtworks } from '@/lib/artworks';
import { Button } from '@/components/ui/button';

// SEO metadata for prints page
export const metadata: Metadata = {
  title: 'Fine Art Prints',
  description:
    'Browse museum-quality fine art prints of Dennis Wood\'s paintings. Giclée prints on archival paper and canvas, available in multiple sizes. Limited editions with certificates of authenticity.',
  keywords: [
    'fine art prints',
    'giclée prints',
    'art prints for sale',
    'limited edition prints',
    'museum quality prints',
    'archival prints',
    'canvas prints',
    'paper prints',
    'Dennis Wood prints',
    'contemporary art prints',
  ],
  openGraph: {
    title: 'Fine Art Prints | Tanglewood Art Gallery',
    description:
      'Museum-quality giclée prints of Dennis Wood\'s atmospheric landscape paintings. Available in multiple sizes on archival paper and canvas.',
    type: 'website',
    images: [
      {
        url: '/images/prints-collection.jpg',
        width: 1200,
        height: 630,
        alt: 'Tanglewood Art Gallery Fine Art Prints',
      },
    ],
  },
};

export default function PrintsPage() {
  // Get all artworks and filter to only those with prints available
  const allArtworks = getAllArtworks();
  const printsArtworks = allArtworks.filter(
    (artwork) => artwork.prints && artwork.prints.length > 0
  );

  return (
    <div className="section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-museum-cream mb-6">
            Fine Art Prints
          </h1>
          <p className="text-lg md:text-xl text-museum-cream/80 leading-relaxed mb-8">
            Museum-quality giclée prints of Dennis's most beloved works. Each
            print is produced using archival inks and materials, ensuring
            exceptional color accuracy and longevity.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-serif text-museum-gold mb-1">
                {printsArtworks.length}+
              </div>
              <div className="text-sm text-museum-cream/60">Available Prints</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-serif text-museum-gold mb-1">
                3
              </div>
              <div className="text-sm text-museum-cream/60">Size Options</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-serif text-museum-gold mb-1">
                100
              </div>
              <div className="text-sm text-museum-cream/60">Year Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-serif text-museum-gold mb-1">
                Free
              </div>
              <div className="text-sm text-museum-cream/60">UK Shipping</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="ghost">
              <Link href="/gallery">View All Artworks</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href="#print-info">Learn About Our Prints</a>
            </Button>
          </div>
        </div>

        {/* Filter controls */}
        <Filters />

        {/* Gallery grid with print-only artworks */}
        <GalleryGrid artworks={printsArtworks} />

        {/* Print Quality Information Section */}
        <section id="print-info" className="mt-20 pt-16 border-t border-museum-slate/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-museum-cream mb-12 text-center">
              About Our Prints
            </h2>

            {/* Quality Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-museum-gold/10 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-museum-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-museum-cream mb-2">
                      Museum Quality
                    </h3>
                    <p className="text-museum-cream/70 text-sm leading-relaxed">
                      Giclée prints produced using professional-grade Epson printers
                      with 12-color archival pigment inks. Each print undergoes
                      rigorous color matching to ensure it faithfully represents the
                      original painting.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-museum-gold/10 flex items-center justify-center">
                    <Package className="w-6 h-6 text-museum-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-museum-cream mb-2">
                      Premium Materials
                    </h3>
                    <p className="text-museum-cream/70 text-sm leading-relaxed">
                      Choice of heavyweight 308gsm Hahnemühle Photo Rag paper or
                      premium canvas. Both substrates are acid-free and designed to
                      last over 100 years without fading when properly displayed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-museum-gold/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-museum-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-museum-cream mb-2">
                      Limited Editions
                    </h3>
                    <p className="text-museum-cream/70 text-sm leading-relaxed">
                      Each print is numbered and signed by Eleanor, with edition
                      sizes limited to 100 per size. Includes a certificate of
                      authenticity detailing the edition number and print
                      specifications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-museum-gold/10 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-museum-gold" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-museum-cream mb-2">
                      Secure Shipping
                    </h3>
                    <p className="text-museum-cream/70 text-sm leading-relaxed">
                      Free tracked shipping within the UK. International shipping
                      available. All prints are carefully rolled and shipped in
                      sturdy tubes to ensure they arrive in perfect condition.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Sizes & Finishes */}
            <div className="bg-museum-charcoal/50 rounded-lg p-8 mb-12">
              <h3 className="font-serif text-2xl text-museum-cream mb-6">
                Available Sizes & Finishes
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-museum-gold text-sm uppercase tracking-wider mb-3">
                    Paper Prints
                  </h4>
                  <ul className="space-y-2 text-museum-cream/70">
                    <li className="flex items-start gap-2">
                      <span className="text-museum-gold mt-1">•</span>
                      <span>
                        <strong className="text-museum-cream">Small:</strong> 12 × 16
                        inches (30 × 40 cm) - from £75
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-museum-gold mt-1">•</span>
                      <span>
                        <strong className="text-museum-cream">Medium:</strong> 18 × 24
                        inches (45 × 60 cm) - from £150
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-museum-gold mt-1">•</span>
                      <span>
                        <strong className="text-museum-cream">Large:</strong> 24 × 32
                        inches (60 × 80 cm) - from £250
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-museum-gold text-sm uppercase tracking-wider mb-3">
                    Canvas Prints
                  </h4>
                  <ul className="space-y-2 text-museum-cream/70">
                    <li className="flex items-start gap-2">
                      <span className="text-museum-gold mt-1">•</span>
                      <span>
                        Stretched and gallery-wrapped on 1.5-inch deep stretcher bars
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-museum-gold mt-1">•</span>
                      <span>Ready to hang with hanging hardware included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-museum-gold mt-1">•</span>
                      <span>Add £50-£100 to paper print prices depending on size</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-museum-gold text-sm uppercase tracking-wider mb-3">
                    Framing Options
                  </h4>
                  <p className="text-museum-cream/70">
                    Custom framing available upon request. Contact us for a quote
                    based on your preferred frame style and matting options.
                  </p>
                </div>
              </div>
            </div>

            {/* Care Instructions */}
            <div className="border-t border-museum-slate/30 pt-8">
              <h3 className="font-serif text-2xl text-museum-cream mb-4">
                Care Instructions
              </h3>
              <div className="prose prose-invert prose-sm max-w-none">
                <ul className="text-museum-cream/70 space-y-2">
                  <li>
                    Display away from direct sunlight to prevent fading. While our
                    archival inks are highly lightfast, UV exposure over time will
                    affect any artwork.
                  </li>
                  <li>
                    Frame under UV-protective glass or acrylic for maximum
                    longevity.
                  </li>
                  <li>
                    Avoid displaying in high-humidity areas such as bathrooms.
                  </li>
                  <li>
                    Handle with clean, dry hands or cotton gloves to prevent oils
                    and dirt transfer.
                  </li>
                  <li>
                    If cleaning is needed, gently dust with a soft, dry cloth. Do
                    not use water or cleaning solutions.
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12 pt-8 border-t border-museum-slate/30">
              <h3 className="font-serif text-2xl text-museum-cream mb-4">
                Questions About Our Prints?
              </h3>
              <p className="text-museum-cream/70 mb-6">
                We're happy to help you choose the perfect print for your space.
              </p>
              <Button asChild size="lg" variant="primary">
                <a href="mailto:dennis@tanglewoodart.com?subject=Print Inquiry">
                  Get in Touch
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
