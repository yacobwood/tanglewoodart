# Migrating to Sanity CMS

This guide shows you how to migrate from the JSON-based content system to Sanity CMS for easier content management with a visual editor.

## Why Migrate to Sanity?

**Current System (JSON)**:
- ✅ Simple, no external dependencies
- ✅ Version controlled in Git
- ❌ No visual editor
- ❌ Requires redeploy for updates
- ❌ No built-in media management

**Sanity CMS**:
- ✅ Visual Studio editor
- ✅ Real-time content updates (no redeploys)
- ✅ Built-in image CDN with automatic optimization
- ✅ Collaborative editing
- ❌ External dependency
- ❌ Free tier then paid (generous free tier)

---

## Step 1: Create a Sanity Project

1. **Install Sanity CLI**:
   ```bash
   npm install -g @sanity/cli
   ```

2. **Initialize Sanity in your project**:
   ```bash
   cd tanglewood-art
   npx sanity init --project-plan free
   ```

   Follow prompts:
   - **Project name**: Tanglewood Art Gallery
   - **Dataset**: production
   - **Output path**: `./sanity`

3. **Note your Project ID** (shown after creation, or find at [sanity.io/manage](https://sanity.io/manage))

---

## Step 2: Define the Artwork Schema

Create `sanity/schemas/artwork.ts`:

```typescript
import { defineType, defineField } from 'sanity'

export const artwork = defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'string',
      initialValue: 'Dennis Wood',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.required().min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      options: {
        list: [
          { title: 'Oil on canvas', value: 'Oil on canvas' },
          { title: 'Oil on board', value: 'Oil on board' },
          { title: 'Acrylic on canvas', value: 'Acrylic on canvas' },
        ],
      },
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      fields: [
        { name: 'width', type: 'number', title: 'Width' },
        { name: 'height', type: 'number', title: 'Height' },
        { name: 'depth', type: 'number', title: 'Depth (optional)' },
        {
          name: 'unit',
          type: 'string',
          title: 'Unit',
          options: {
            list: ['cm', 'in'],
          },
          initialValue: 'cm',
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Landscape', value: 'landscape' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Abstract', value: 'abstract' },
          { title: 'Still Life', value: 'still-life' },
          { title: 'Seascape', value: 'seascape' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'story',
      title: 'Artist Story',
      type: 'text',
      description: 'The story behind this artwork',
      rows: 3,
    }),
    defineField({
      name: 'price',
      title: 'Price (in pence)',
      type: 'number',
      description: 'Price in pence/cents (e.g., £250 = 25000)',
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
          { title: 'Reserved', value: 'reserved' },
        ],
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'string',
      description: 'Optional series name',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
          ],
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'prints',
      title: 'Print Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'size', type: 'string', title: 'Size (e.g., A4, A3, A2)' },
            { name: 'dimensions', type: 'string', title: 'Dimensions (e.g., 21 × 29.7 cm)' },
            { name: 'price', type: 'number', title: 'Price (in pence)' },
            {
              name: 'finishes',
              type: 'array',
              title: 'Available Finishes',
              of: [{ type: 'string' }],
              options: {
                list: ['matte', 'glossy', 'canvas'],
              },
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'artist',
      media: 'images.0',
      availability: 'availability',
    },
    prepare(selection) {
      const { title, artist, media, availability } = selection
      return {
        title,
        subtitle: `${artist} — ${availability}`,
        media,
      }
    },
  },
})
```

Update `sanity/schemas/index.ts`:

```typescript
import { artwork } from './artwork'

export const schemaTypes = [artwork]
```

---

## Step 3: Deploy Sanity Studio

1. **Start Sanity Studio locally**:
   ```bash
   cd sanity
   npm run dev
   ```
   Open [http://localhost:3333](http://localhost:3333)

2. **Deploy to Sanity's cloud** (optional but recommended):
   ```bash
   npm run deploy
   ```
   Your Studio will be available at `https://your-project.sanity.studio`

---

## Step 4: Migrate Your Data

### Option A: Manual Migration

1. Open Sanity Studio
2. Click **"Artwork"** → **"Create new"**
3. Copy data from `data/artworks.json` manually
4. Upload images via Sanity's image uploader

### Option B: Automated Migration Script

Create `scripts/migrate-to-sanity.ts`:

```typescript
import { createClient } from '@sanity/client'
import artworksData from '../data/artworks.json'

const client = createClient({
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  useCdn: false,
  token: 'YOUR_WRITE_TOKEN', // Get from sanity.io/manage
  apiVersion: '2024-01-01',
})

async function migrateArtworks() {
  for (const artwork of artworksData) {
    const doc = {
      _type: 'artwork',
      title: artwork.title,
      slug: { _type: 'slug', current: artwork.slug },
      artist: artwork.artist,
      year: artwork.year,
      medium: artwork.medium,
      dimensions: artwork.dimensions,
      category: artwork.category,
      description: artwork.description,
      story: artwork.story,
      price: artwork.price,
      availability: artwork.available ? 'available' : 'sold',
      featured: artwork.featured,
      series: artwork.series,
      prints: artwork.prints,
      // Images need to be uploaded separately or referenced by URL
    }

    await client.create(doc)
    console.log(`Migrated: ${artwork.title}`)
  }
}

migrateArtworks().catch(console.error)
```

Run with: `npx tsx scripts/migrate-to-sanity.ts`

---

## Step 5: Update Next.js to Fetch from Sanity

### Install Sanity Client

```bash
npm install @sanity/client @sanity/image-url
```

### Update Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-read-token
```

### Update `lib/artworks.ts`

Replace the current file with:

```typescript
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { Artwork } from '@/types'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function getAllArtworks(): Promise<Artwork[]> {
  return client.fetch(`
    *[_type == "artwork"] | order(_createdAt desc) {
      "id": _id,
      title,
      "slug": slug.current,
      artist,
      year,
      medium,
      dimensions,
      category,
      description,
      story,
      price,
      availability,
      featured,
      series,
      "images": images[].{
        "url": asset->url,
        alt
      },
      prints
    }
  `)
}

export async function getFeaturedArtworks(limit: number = 3): Promise<Artwork[]> {
  return client.fetch(`
    *[_type == "artwork" && featured == true] | order(_createdAt desc) [0...${limit}] {
      "id": _id,
      title,
      "slug": slug.current,
      // ... same fields as above
    }
  `)
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  return client.fetch(`
    *[_type == "artwork" && slug.current == $slug][0] {
      "id": _id,
      title,
      "slug": slug.current,
      // ... same fields
    }
  `, { slug })
}

// Keep other helper functions (formatPrice, formatDimensions, etc.)
```

### Update Image URLs

When using Sanity images, use the `urlFor()` helper:

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/artworks'

<Image
  src={urlFor(artwork.images[0]).width(800).url()}
  alt={artwork.images[0].alt}
  width={800}
  height={600}
/>
```

---

## Step 6: Enable Live Preview (Optional)

For real-time content updates without refreshing:

```bash
npm install @sanity/preview-kit
```

Follow [Sanity's guide for Next.js 14 live previews](https://www.sanity.io/docs/nextjs-live-preview).

---

## Step 7: Remove JSON Dependency

Once Sanity is working:

1. Delete `data/artworks.json` (or keep as backup)
2. Remove admin panel pages (or adapt them to use Sanity's GROQ API)
3. Remove `lib/db.ts`

---

## Comparing API Calls

### Current (JSON)
```typescript
import artworksData from '@/data/artworks.json'
const artworks = artworksData // Instant, static
```

### With Sanity
```typescript
const artworks = await getAllArtworks() // Fetched, cacheable
```

**Performance note**: Use Next.js caching with `revalidate`:

```typescript
export const revalidate = 60 // Revalidate every 60 seconds
```

---

## Content Workflow with Sanity

1. Artist/Admin logs into Sanity Studio
2. Creates or edits artwork
3. Publishes changes
4. Next.js site fetches updated content (within revalidation window)
5. No Git commits or redeployments needed!

---

## Cost

**Sanity Free Tier** includes:
- 3 users
- 10GB bandwidth
- 5GB assets
- Unlimited documents

Perfect for a single-artist gallery. Paid plans start at $99/month for larger operations.

---

## Troubleshooting

### Images not loading from Sanity
- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Verify images are uploaded and published in Sanity Studio
- Use `urlFor()` helper to generate proper URLs

### CORS errors
- Add your domain to Sanity CORS origins: [Sanity → API → CORS Origins](https://www.sanity.io/manage)

### Content not updating
- Check `revalidate` value in page components
- For instant updates, use On-Demand Revalidation or Live Preview

---

## Further Reading

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Image CDN Hotspot & Crop](https://www.sanity.io/docs/presenting-images)

---

**Need help?** Check the [Sanity community Slack](https://slack.sanity.io/) or [GitHub discussions](https://github.com/sanity-io/sanity/discussions).
