'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  category: string;
  images: {
    main: string;
  };
}

interface HeroImagesManagerProps {
  artworks: Artwork[];
  initialHeroIds: string[];
}

export default function HeroImagesManager({ artworks, initialHeroIds }: HeroImagesManagerProps) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[]>(initialHeroIds);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const toggleArtwork = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((artId) => artId !== id)
        : [...prev, id]
    );
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/admin/hero-images', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ artworkIds: selectedIds }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        router.refresh();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error || 'Failed to update hero images');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-museum-dark">
      {/* Header */}
      <header className="bg-museum-charcoal border-b border-museum-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-serif text-3xl text-museum-gold">
                Hero Images
              </h1>
              <p className="text-museum-slate font-sans mt-1">
                Select artworks to display in the homepage hero section
              </p>
            </div>
            <Link href="/admin">
              <Button variant="secondary" size="md">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Instructions & Actions */}
        <div className="bg-museum-charcoal rounded-lg border border-museum-slate p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-serif text-museum-gold mb-2">
                How it works
              </h2>
              <p className="text-museum-slate font-sans mb-4">
                Select one or more artworks to use as hero images. A random image will be displayed each time the homepage loads.
              </p>
              <p className="text-museum-cream/80 font-sans text-sm">
                Currently selected: <span className="text-museum-gold font-semibold">{selectedIds.length}</span> artwork{selectedIds.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={handleSave}
              loading={loading}
              disabled={selectedIds.length === 0}
            >
              Save Changes
            </Button>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mt-4 bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded font-sans">
              Hero images updated successfully!
            </div>
          )}
          {error && (
            <div className="mt-4 bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded font-sans">
              {error}
            </div>
          )}
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artworks.map((artwork) => {
            const isSelected = selectedIds.includes(artwork.id);
            return (
              <button
                key={artwork.id}
                onClick={() => toggleArtwork(artwork.id)}
                className={`relative group bg-museum-charcoal rounded-lg border-2 overflow-hidden transition-all hover:scale-105 ${
                  isSelected
                    ? 'border-museum-gold shadow-lg shadow-museum-gold/20'
                    : 'border-museum-slate hover:border-museum-gold/50'
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={artwork.images.main}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Overlay */}
                  <div className={`absolute inset-0 transition-opacity ${
                    isSelected
                      ? 'bg-museum-gold/20'
                      : 'bg-museum-dark/0 group-hover:bg-museum-dark/30'
                  }`} />

                  {/* Checkmark */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-museum-gold rounded-full p-2">
                      <svg
                        className="w-5 h-5 text-museum-dark"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-serif text-lg text-museum-cream mb-1 text-left">
                    {artwork.title}
                  </h3>
                  <p className="text-sm text-museum-slate font-sans text-left">
                    {artwork.artist}, {artwork.year}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {artworks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-museum-cream/60 mb-4">
              No artworks found.
            </p>
            <Link href="/admin/new">
              <Button variant="primary" size="lg">
                Add Your First Artwork
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
