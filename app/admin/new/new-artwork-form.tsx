'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NewArtworkForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    artist: 'Dennis Wood',
    year: new Date().getFullYear(),
    medium: '',
    category: 'landscape',
    description: '',
    story: '',
    price: 0,
    available: true,
    featured: false,
    series: '',
    imageUrl: '',
    detailImageUrl: '',
    width: 0,
    height: 0,
    unit: 'cm',
    orientation: 'auto',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Auto-generate ID from title
      if (name === 'title' && value) {
        const generatedId = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        setFormData((prev) => ({ ...prev, id: generatedId }));
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/artworks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: formData.id,
          title: formData.title,
          artist: formData.artist,
          year: formData.year,
          medium: formData.medium,
          category: formData.category,
          description: formData.description,
          story: formData.story,
          price: formData.price,
          available: formData.available,
          featured: formData.featured,
          series: formData.series || null,
          imageUrl: formData.imageUrl,
          detailImageUrl: formData.detailImageUrl || undefined,
          orientation: formData.orientation,
          dimensions: {
            width: formData.width,
            height: formData.height,
            unit: formData.unit,
          },
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Failed to create artwork');
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-serif text-3xl text-museum-gold">
                Add New Artwork
              </h1>
              <p className="text-museum-slate font-sans mt-1">
                Create a new artwork entry
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

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-museum-charcoal rounded-lg border border-museum-slate p-8 space-y-6"
        >
          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded font-sans">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-museum-gold">
              Basic Information
            </h2>

            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <Input
              label="ID (auto-generated from title)"
              name="id"
              value={formData.id}
              onChange={handleChange}
              helperText="URL-friendly identifier (lowercase, hyphens)"
              required
            />

            <Input
              label="Artist"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                required
              />

              <div>
                <label className="block text-sm font-medium text-museum-cream mb-2 font-sans">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-museum-charcoal border-2 border-museum-slate rounded-md text-museum-cream font-sans focus:outline-none focus:border-museum-gold focus:ring-2 focus:ring-museum-gold focus:ring-opacity-20 transition-all"
                  required
                >
                  <option value="landscape">Landscape</option>
                  <option value="portrait">Portrait</option>
                  <option value="abstract">Abstract</option>
                  <option value="still-life">Still Life</option>
                  <option value="seascape">Seascape</option>
                </select>
              </div>
            </div>

            <Input
              label="Medium"
              name="medium"
              value={formData.medium}
              onChange={handleChange}
              placeholder="e.g., Oil on canvas"
              required
            />
          </div>

          {/* Dimensions */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-museum-gold">Dimensions</h2>

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Width"
                name="width"
                type="number"
                value={formData.width}
                onChange={handleChange}
                required
              />

              <Input
                label="Height"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
                required
              />

              <div>
                <label className="block text-sm font-medium text-museum-cream mb-2 font-sans">
                  Unit
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-museum-charcoal border-2 border-museum-slate rounded-md text-museum-cream font-sans focus:outline-none focus:border-museum-gold focus:ring-2 focus:ring-museum-gold focus:ring-opacity-20 transition-all"
                >
                  <option value="cm">cm</option>
                  <option value="in">in</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-museum-gold">Description</h2>

            <div>
              <label className="block text-sm font-medium text-museum-cream mb-2 font-sans">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-museum-charcoal border-2 border-museum-slate rounded-md text-museum-cream font-sans placeholder:text-museum-slate focus:outline-none focus:border-museum-gold focus:ring-2 focus:ring-museum-gold focus:ring-opacity-20 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-museum-cream mb-2 font-sans">
                Story (Optional)
              </label>
              <textarea
                name="story"
                value={formData.story}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-museum-charcoal border-2 border-museum-slate rounded-md text-museum-cream font-sans placeholder:text-museum-slate focus:outline-none focus:border-museum-gold focus:ring-2 focus:ring-museum-gold focus:ring-opacity-20 transition-all"
              />
            </div>
          </div>

          {/* Pricing & Images */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-museum-gold">
              Pricing & Images
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price (GBP)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />

              <Input
                label="Series (Optional)"
                name="series"
                value={formData.series}
                onChange={handleChange}
                placeholder="e.g., Coastal Meditations"
              />
            </div>

            <Input
              label="Main Image URL"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="/images/artwork.jpg"
              required
            />

            <Input
              label="Detail Image URL (Optional)"
              name="detailImageUrl"
              value={formData.detailImageUrl}
              onChange={handleChange}
              placeholder="/images/artwork-detail.jpg"
            />
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-museum-gold">Status & Display</h2>

            <div className="flex gap-6 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  className="w-5 h-5 bg-museum-charcoal border-2 border-museum-slate rounded text-museum-gold focus:ring-2 focus:ring-museum-gold focus:ring-opacity-20"
                />
                <span className="text-museum-cream font-sans">Available for Sale</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 bg-museum-charcoal border-2 border-museum-slate rounded text-museum-gold focus:ring-2 focus:ring-museum-gold focus:ring-opacity-20"
                />
                <span className="text-museum-cream font-sans">Featured Artwork</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-museum-cream mb-2 font-sans">
                Gallery Display Orientation
              </label>
              <select
                name="orientation"
                value={formData.orientation}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-museum-charcoal border-2 border-museum-slate rounded-md text-museum-cream font-sans focus:outline-none focus:border-museum-gold focus:ring-2 focus:ring-museum-gold focus:ring-opacity-20 transition-all"
              >
                <option value="auto">Auto (based on dimensions)</option>
                <option value="portrait">Portrait (1 tile wide)</option>
                <option value="landscape">Landscape (2 tiles wide)</option>
              </select>
              <p className="mt-2 text-sm text-museum-cream/60 font-sans">
                Controls how this artwork appears in the gallery grid
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" variant="primary" size="lg" loading={loading}>
              Create Artwork
            </Button>
            <Link href="/admin">
              <Button type="button" variant="secondary" size="lg">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
