'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: number;
  category: string;
  price: number;
  available: boolean;
  featured: boolean;
  images: {
    main: string;
  };
}

interface AdminDashboardProps {
  artworks: Artwork[];
}

export default function AdminDashboard({ artworks: initialArtworks }: AdminDashboardProps) {
  const router = useRouter();
  const [artworks, setArtworks] = useState(initialArtworks);
  const [loading, setLoading] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleToggleAvailability = async (id: string) => {
    setLoading(id);
    try {
      const artwork = artworks.find((art) => art.id === id);
      if (!artwork) return;

      const response = await fetch(`/api/admin/artworks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ available: !artwork.available }),
      });

      if (response.ok) {
        setArtworks((prev) =>
          prev.map((art) =>
            art.id === id ? { ...art, available: !art.available } : art
          )
        );
      }
    } catch (error) {
      console.error('Failed to toggle availability:', error);
      alert('Failed to update availability');
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    setLoading(id);
    try {
      const response = await fetch(`/api/admin/artworks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setArtworks((prev) => prev.filter((art) => art.id !== id));
      } else {
        alert('Failed to delete artwork');
      }
    } catch (error) {
      console.error('Failed to delete artwork:', error);
      alert('Failed to delete artwork');
    } finally {
      setLoading(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-museum-dark">
      {/* Header */}
      <header className="bg-museum-charcoal border-b border-museum-slate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-serif text-3xl text-museum-gold">
                Admin Dashboard
              </h1>
              <p className="text-museum-slate font-sans mt-1">
                Manage your gallery artworks
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/admin/hero-images">
                <Button variant="secondary" size="md">
                  Hero Images
                </Button>
              </Link>
              <Link href="/admin/new">
                <Button variant="primary" size="md">
                  Add New Artwork
                </Button>
              </Link>
              <Button variant="secondary" size="md" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-museum-charcoal rounded-lg border border-museum-slate overflow-hidden">
          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-museum-dark border-b border-museum-slate">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-sans font-semibold text-museum-gold">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-sans font-semibold text-museum-gold">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-sans font-semibold text-museum-gold">
                    Artist
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-sans font-semibold text-museum-gold">
                    Year
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-sans font-semibold text-museum-gold">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-sans font-semibold text-museum-gold">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-sans font-semibold text-museum-gold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-sans font-semibold text-museum-gold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-museum-slate">
                {artworks.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <p className="text-museum-slate font-sans">
                        No artworks found. Add your first artwork to get started.
                      </p>
                    </td>
                  </tr>
                ) : (
                  artworks.map((artwork) => (
                    <tr
                      key={artwork.id}
                      className="hover:bg-museum-dark transition-colors"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={artwork.images.main}
                          alt={artwork.title}
                          className="w-16 h-16 object-cover rounded border border-museum-slate"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-museum-cream font-sans font-medium">
                          {artwork.title}
                        </div>
                        {artwork.featured && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-sans bg-museum-gold text-museum-dark rounded">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-museum-slate font-sans">
                        {artwork.artist}
                      </td>
                      <td className="px-6 py-4 text-museum-slate font-sans">
                        {artwork.year}
                      </td>
                      <td className="px-6 py-4 text-museum-slate font-sans capitalize">
                        {artwork.category}
                      </td>
                      <td className="px-6 py-4 text-museum-cream font-sans font-medium">
                        {formatPrice(artwork.price)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-sans rounded ${
                            artwork.available
                              ? 'bg-green-900/30 text-green-400 border border-green-700'
                              : 'bg-red-900/30 text-red-400 border border-red-700'
                          }`}
                        >
                          {artwork.available ? 'Available' : 'Sold'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link href={`/admin/edit/${artwork.id}`}>
                            <button className="px-3 py-1 text-sm font-sans text-museum-gold hover:text-museum-gold-light transition-colors">
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={() => handleToggleAvailability(artwork.id)}
                            disabled={loading === artwork.id}
                            className="px-3 py-1 text-sm font-sans text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
                          >
                            {loading === artwork.id
                              ? '...'
                              : artwork.available
                              ? 'Mark Sold'
                              : 'Mark Available'}
                          </button>
                          <button
                            onClick={() => handleDelete(artwork.id, artwork.title)}
                            disabled={loading === artwork.id}
                            className="px-3 py-1 text-sm font-sans text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-museum-charcoal rounded-lg border border-museum-slate p-6">
            <div className="text-museum-slate font-sans text-sm mb-2">
              Total Artworks
            </div>
            <div className="text-museum-gold font-serif text-3xl">
              {artworks.length}
            </div>
          </div>
          <div className="bg-museum-charcoal rounded-lg border border-museum-slate p-6">
            <div className="text-museum-slate font-sans text-sm mb-2">
              Available
            </div>
            <div className="text-green-400 font-serif text-3xl">
              {artworks.filter((art) => art.available).length}
            </div>
          </div>
          <div className="bg-museum-charcoal rounded-lg border border-museum-slate p-6">
            <div className="text-museum-slate font-sans text-sm mb-2">Sold</div>
            <div className="text-red-400 font-serif text-3xl">
              {artworks.filter((art) => !art.available).length}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
