import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getArtworkBySlug, getAllArtworks, getRelatedArtworks, formatPrice, formatDimensions } from '@/lib/artworks';
import ImageViewer from '@/components/artwork/image-viewer';
import PrintOptions from '@/components/artwork/print-options';
import RelatedArtworks from '@/components/artwork/related-artworks';
import BuyOriginalButton from '@/components/artwork/buy-original-button';

interface ArtworkPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const artworks = getAllArtworks();
  return artworks.map((artwork) => ({
    slug: artwork.slug,
  }));
}

export async function generateMetadata({ params }: ArtworkPageProps): Promise<Metadata> {
  const artwork = getArtworkBySlug(params.slug);

  if (!artwork) {
    return {
      title: 'Artwork Not Found',
    };
  }

  const ogImage = artwork.images[0]?.url || '';
  const description = artwork.description.substring(0, 155);

  return {
    title: `${artwork.title} - ${artwork.artist} | Tanglewood Art Gallery`,
    description,
    openGraph: {
      title: `${artwork.title} by ${artwork.artist}`,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: artwork.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${artwork.title} by ${artwork.artist}`,
      description,
      images: [ogImage],
    },
  };
}

export default function ArtworkPage({ params }: ArtworkPageProps) {
  const artwork = getArtworkBySlug(params.slug);

  if (!artwork) {
    notFound();
  }

  const relatedArtworks = getRelatedArtworks(artwork.id, 4);
  const seriesArtworks = artwork.series
    ? getAllArtworks().filter(art => art.series === artwork.series && art.id !== artwork.id).slice(0, 4)
    : [];

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: artwork.title,
    artist: {
      '@type': 'Person',
      name: artwork.artist,
    },
    image: artwork.images[0]?.url || '',
    description: artwork.description,
    artMedium: artwork.medium,
    dateCreated: artwork.year.toString(),
    width: {
      '@type': 'Distance',
      name: `${artwork.dimensions.width} ${artwork.dimensions.unit}`,
    },
    height: {
      '@type': 'Distance',
      name: `${artwork.dimensions.height} ${artwork.dimensions.unit}`,
    },
    offers: {
      '@type': 'Offer',
      price: artwork.price,
      priceCurrency: 'GBP',
      availability: artwork.availability === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-museum-dark">
        {/* Breadcrumb Navigation */}
        <nav className="border-b border-museum-slate bg-museum-charcoal/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <ol className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
              <li>
                <Link
                  href="/"
                  className="text-museum-cream/70 transition-colors hover:text-museum-gold"
                >
                  Home
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-museum-slate" />
              <li>
                <Link
                  href="/gallery"
                  className="text-museum-cream/70 transition-colors hover:text-museum-gold"
                >
                  Gallery
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-museum-slate" />
              <li>
                <span className="text-museum-gold" aria-current="page">
                  {artwork.title}
                </span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Column - Image */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              <ImageViewer artwork={artwork} />
            </div>

            {/* Right Column - Details */}
            <div className="space-y-8">
              {/* Artwork Info */}
              <div className="space-y-4">
                <div>
                  {artwork.featured && (
                    <span className="inline-block rounded-full bg-museum-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-museum-gold">
                      Featured
                    </span>
                  )}
                </div>

                <h1 className="font-serif text-4xl font-bold text-museum-cream lg:text-5xl">
                  {artwork.title}
                </h1>

                <div className="flex items-center gap-2 text-museum-cream/70">
                  <p className="text-lg">{artwork.artist}</p>
                  <span>•</span>
                  <p className="text-lg">{artwork.year}</p>
                </div>

                {artwork.series && (
                  <Link
                    href={`/gallery?series=${encodeURIComponent(artwork.series)}`}
                    className="inline-flex items-center gap-2 text-museum-gold transition-colors hover:text-museum-gold-light"
                  >
                    <span className="text-sm font-medium">Part of: {artwork.series}</span>
                  </Link>
                )}
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 rounded-lg border border-museum-slate bg-museum-charcoal/50 p-6">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-museum-gold">
                    Medium
                  </dt>
                  <dd className="mt-1 text-museum-cream">{artwork.medium}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-museum-gold">
                    Dimensions
                  </dt>
                  <dd className="mt-1 text-museum-cream">{formatDimensions(artwork.dimensions)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-museum-gold">
                    Category
                  </dt>
                  <dd className="mt-1 capitalize text-museum-cream">{artwork.category}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-museum-gold">
                    Availability
                  </dt>
                  <dd className="mt-1">
                    <span
                      className={`inline-flex items-center gap-1 ${
                        artwork.availability === 'available' ? 'text-green-400' : 'text-museum-cream/50'
                      }`}
                    >
                      <span className={`h-2 w-2 rounded-full ${artwork.availability === 'available' ? 'bg-green-400' : 'bg-museum-slate'}`} />
                      {artwork.availability === 'available' ? 'Available' : artwork.availability === 'reserved' ? 'Reserved' : 'Sold'}
                    </span>
                  </dd>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-museum-cream">About This Work</h2>
                <p className="leading-relaxed text-museum-cream/80">{artwork.description}</p>
              </div>

              {/* Story */}
              {artwork.story && (
                <div className="space-y-4 rounded-lg border border-museum-slate bg-museum-charcoal/30 p-6">
                  <h3 className="font-serif text-xl font-bold text-museum-cream">Artist&apos;s Story</h3>
                  <p className="italic leading-relaxed text-museum-cream/70">{artwork.story}</p>
                </div>
              )}

              {/* Purchase Options */}
              <div className="space-y-6 rounded-lg border border-museum-gold/30 bg-museum-charcoal p-6">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-museum-cream">Purchase Options</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-museum-gold">
                      {formatPrice(artwork.price)}
                    </span>
                    <span className="text-sm text-museum-cream/70">(Original artwork)</span>
                  </div>
                </div>

                <BuyOriginalButton artwork={artwork} />

                {/* Print Options */}
                {artwork.prints && artwork.prints.length > 0 && (
                  <PrintOptions artwork={artwork} />
                )}
              </div>
            </div>
          </div>

          {/* More by this series */}
          {seriesArtworks.length > 0 && (
            <div className="mt-16">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-serif text-3xl font-bold text-museum-cream">
                  More from {artwork.series}
                </h2>
                <Link
                  href={`/gallery?series=${encodeURIComponent(artwork.series || '')}`}
                  className="text-museum-gold transition-colors hover:text-museum-gold-light"
                >
                  View all
                </Link>
              </div>
              <RelatedArtworks artworks={seriesArtworks} />
            </div>
          )}

          {/* Related Artworks */}
          {relatedArtworks.length > 0 && (
            <div className="mt-16">
              <div className="mb-8">
                <h2 className="font-serif text-3xl font-bold text-museum-cream">
                  You Might Also Like
                </h2>
              </div>
              <RelatedArtworks artworks={relatedArtworks} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
