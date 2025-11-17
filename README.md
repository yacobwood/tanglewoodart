# Tanglewood Art Gallery

A polished, modern ecommerce website for an oil-on-canvas artist, featuring original paintings and fine art prints. Built with Next.js 14, TypeScript, Tailwind CSS, and Stripe for payments.

**Live Site**: [www.tanglewoodart.co.uk](https://www.tanglewoodart.co.uk)

**Design Theme**: Museum in the Dark — A sophisticated gallery experience with dramatic lighting, gold accents, and elegant typography.

![Version](https://img.shields.io/badge/version-1.0.0-gold) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue) ![License](https://img.shields.io/badge/license-MIT-green)

---

## Features

### Gallery & Ecommerce
- **Dynamic Art Gallery** with masonry layout, filters, and lazy loading
- **Artwork Detail Pages** with lightbox zoom, wall mockup viewer, and purchase options
- **Shopping Cart** with localStorage persistence and Stripe checkout integration
- **Print Variants** — Multiple sizes (A4, A3, A2) and finishes (matte, glossy, canvas)
- **Original Artworks** — One-of-a-kind pieces with availability tracking
- **Admin Dashboard** — Password-protected panel to manage artworks

### Design & UX
- **Museum in the Dark Theme** — Deep charcoal backgrounds with gold accents
- **Responsive Design** — Mobile-first, fully responsive across all breakpoints
- **Framer Motion Animations** — Smooth page transitions, hover effects, parallax
- **Brush-Stroke Cursor** — Signature interactive element on hover
- **Accessibility** — WCAG 2.1 AA compliant with keyboard navigation

### Technical
- **Next.js 14 App Router** — Server and client components, static generation
- **TypeScript** — Full type safety throughout the application
- **Tailwind CSS** — Utility-first styling with custom design tokens
- **Stripe Payments** — Secure checkout with webhooks
- **SEO Optimized** — Meta tags, Open Graph, JSON-LD structured data
- **Lightweight CMS** — JSON-based with optional migration path to Sanity

---

## Quick Start

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9+ or yarn/pnpm
- **Stripe account** (for payments)

### Installation

1. **Clone or download** this repository:
   ```bash
   cd tanglewood-art
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables)):
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your keys.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** to [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# App Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Stripe (get these from https://dashboard.stripe.com/test/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# Admin Access (change this password!)
ADMIN_PASSWORD=change-this-secure-password

# Tax Configuration
VAT_PERCENT=20

# Shipping Costs (in pence/cents)
SHIPPING_UK=500
SHIPPING_EU=1200
SHIPPING_REST=2000
```

### Getting Stripe Keys

1. Create a free account at [stripe.com](https://stripe.com)
2. Navigate to **Developers → API Keys**
3. Copy your **Publishable key** (`pk_test_...`) and **Secret key** (`sk_test_...`)
4. For webhooks:
   - Go to **Developers → Webhooks**
   - Add endpoint: `http://localhost:3000/api/stripe/webhook` (for local testing use Stripe CLI)
   - Select events: `checkout.session.completed`
   - Copy the **Signing secret** (`whsec_...`)

---

## Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm test         # Run Jest tests
npm run preview  # Build and start production server
```

---

## Project Structure

```
tanglewood-art/
├── app/                      # Next.js 14 app router pages
│   ├── layout.tsx           # Root layout with fonts and metadata
│   ├── page.tsx             # Home page
│   ├── gallery/             # Gallery page
│   ├── art/[slug]/          # Artwork detail pages (dynamic)
│   ├── prints/              # Prints-only gallery
│   ├── about/               # About the artist
│   ├── cart/                # Shopping cart page
│   ├── checkout/            # Checkout flow
│   ├── admin/               # Admin dashboard
│   ├── order/success/       # Order confirmation
│   ├── not-found.tsx        # Custom 404 page
│   └── api/                 # API routes
│       ├── checkout/        # Stripe checkout session
│       ├── stripe/webhook/  # Stripe webhook handler
│       └── admin/           # Admin CRUD operations
├── components/              # React components
│   ├── layout/             # Header, Footer, Nav
│   ├── gallery/            # Gallery grid, filters, artwork cards
│   ├── artwork/            # Detail view, lightbox, print options
│   ├── cart/               # Cart drawer, line items
│   ├── home/               # Hero, featured section
│   ├── about/              # Biography, studio process
│   ├── checkout/           # Order summary
│   ├── admin/              # Admin components
│   ├── ui/                 # Reusable UI (buttons, inputs, badges, cursor trail)
│   └── providers/          # Client-side providers
├── lib/                     # Utilities and helpers
│   ├── artworks.ts         # Artwork data helpers
│   ├── cart-store.ts       # Zustand cart state
│   ├── stripe.ts           # Stripe client
│   ├── utils.ts            # Utility functions
│   ├── admin-auth.ts       # Admin authentication
│   └── db.ts               # JSON database helpers
├── data/                    # Seed data
│   └── artworks.json       # Artwork database
├── public/                  # Static assets
│   ├── sample-art/         # Artwork images
│   └── room-mockups/       # Wall viewer backgrounds
├── types/                   # TypeScript definitions
│   └── index.ts            # All type definitions
├── styles/                  # Global styles
│   └── globals.css         # Tailwind imports + custom CSS
├── DESIGN.md               # Design system documentation
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind customization
└── next.config.js          # Next.js configuration
```

---

## Adding Your Real Content

### 1. Replace Sample Artworks

Edit `data/artworks.json` with your real artwork data. Each artwork needs:

```json
{
  "id": "unique-id",
  "title": "Artwork Title",
  "slug": "url-friendly-slug",
  "artist": "Dennis Wood",
  "year": 2024,
  "medium": "Oil on canvas",
  "dimensions": { "width": 60, "height": 80, "unit": "cm" },
  "category": "landscape",
  "description": "Description of the artwork...",
  "story": "Artist's story about creation...",
  "price": 250000,
  "availability": "available",
  "featured": false,
  "series": "Series Name",
  "images": [
    { "url": "/sample-art/slug.jpg", "alt": "Alt text" },
    { "url": "/sample-art/slug-detail.jpg", "alt": "Detail view" }
  ],
  "prints": [
    {
      "size": "A4",
      "dimensions": "21 × 29.7 cm",
      "price": 4500,
      "finishes": ["matte", "glossy"]
    }
  ]
}
```

**Note**: Prices are in pence/cents (e.g., £2500 = 250000)

### 2. Add Your Images

Place optimized images in `public/sample-art/`:
- **Recommended format**: JPEG or WebP
- **Size**: Max 2000px on longest side
- **Optimize**: Use tools like ImageOptim, Squoosh.app, or Sharp
- **Naming**: Match the artwork slug (e.g., `my-painting.jpg`)

### 3. Update Artist Information

- **About page**: Edit `app/about/page.tsx`
- **Biography**: Edit `components/about/artist-bio.tsx`
- **Site metadata**: Edit `app/layout.tsx` (lines 30-93)

### 4. Configure Stripe for Production

1. Switch to **Live mode** in your Stripe dashboard
2. Get your **live keys** (they start with `pk_live_` and `sk_live_`)
3. Update `.env.local` (or `.env.production` on Vercel)
4. Set up a **production webhook** pointing to `https://yourdomain.com/api/stripe/webhook`

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Push your code** to GitHub, GitLab, or Bitbucket

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Vercel will auto-detect Next.js

3. **Add environment variables** in Vercel dashboard:
   - Go to **Settings → Environment Variables**
   - Add all variables from `.env.local`
   - Set `NEXT_PUBLIC_BASE_URL` to your live domain

4. **Deploy**:
   ```bash
   git push origin main
   ```
   Vercel will automatically build and deploy.

### Custom Server Deployment

```bash
npm run build
npm run start
```

Or use Docker, PM2, or your preferred Node.js hosting solution.

---

## Admin Panel

Access the admin dashboard at `/admin`:

1. Enter the password you set in `ADMIN_PASSWORD`
2. **Add, edit, or delete artworks**
3. **Toggle availability** (mark as sold/available/reserved)

### Security Notes

- **Change the default password** in `.env.local`
- For production, consider using **NextAuth.js** or **Clerk** for proper authentication
- Admin uses simple cookie-based sessions (fine for single-user, not multi-admin)

---

## Testing Checkout Flow

### With Stripe Test Mode

1. Ensure you're using **test keys** (`pk_test_...`)
2. Add items to cart and proceed to checkout
3. Use Stripe's test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - Any future expiry date, any CVC, any ZIP

4. Complete checkout — you'll be redirected to `/order/success`

### Test Webhooks Locally

Install Stripe CLI:
```bash
brew install stripe/stripe-cli/stripe
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret to `.env.local` as `STRIPE_WEBHOOK_SECRET`.

---

## Customization

### Change Color Theme

Edit `tailwind.config.ts` (lines 15-25) to swap colors:

```ts
colors: {
  'museum-dark': '#1a1a1d',        // Main background
  'museum-gold': '#d4af37',        // Accent color
  'museum-cream': '#f5f5dc',       // Text color
  // ... etc
}
```

All components use these CSS variables, so updates are instant.

### Change Fonts

Edit `app/layout.tsx` (lines 15-27):

```ts
import { Playfair_Display, Inter } from 'next/font/google';
```

Replace with any [Google Font](https://fonts.google.com/). Update `--font-playfair` and `--font-inter` variables.

### Modify VAT and Shipping

Edit `.env.local`:

```env
VAT_PERCENT=20              # UK VAT (20%)
SHIPPING_UK=500             # £5.00 in pence
SHIPPING_EU=1200            # €12.00
SHIPPING_REST=2000          # $20.00
```

Logic is in `lib/utils.ts` (calculateVAT, calculateShipping).

---

## Migrating to a CMS

### Option 1: Keep JSON (Simple)

The current setup uses `data/artworks.json` as a flat-file database. You can:
- Edit JSON manually or via the admin panel
- Commit changes to Git
- Redeploy to update content

**Pros**: No external dependencies, fast, version-controlled
**Cons**: No media management, requires redeploy for updates

### Option 2: Migrate to Sanity CMS

See `docs/SANITY_MIGRATION.md` for step-by-step instructions to:
1. Create a Sanity project
2. Define an `artwork` schema
3. Update `lib/artworks.ts` to fetch from Sanity API
4. Use Sanity Studio for content editing

**Pros**: Visual editor, media CDN, real-time updates
**Cons**: External dependency, requires Sanity account

### Option 3: Use Contentful, Strapi, or Others

Similar process:
1. Define content models matching the `Artwork` type in `types/index.ts`
2. Replace `lib/artworks.ts` data fetching logic
3. Map CMS fields to TypeScript interfaces

---

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari 14+, Chrome Mobile
- **JavaScript required**: Yes (React/Next.js application)

---

## Accessibility

This site follows **WCAG 2.1 Level AA** standards:

- ✅ Semantic HTML (`<nav>`, `<main>`, `<article>`)
- ✅ ARIA labels on all interactive elements
- ✅ Keyboard navigation (Tab, Arrow keys, Enter, Escape)
- ✅ Focus indicators (gold outline on focused elements)
- ✅ Color contrast ratios meet minimum thresholds
- ✅ Alt text on all images
- ✅ Skip-to-content link (hidden until focused)
- ✅ Reduced motion support (`prefers-reduced-motion`)

Test with:
- **Lighthouse** (built into Chrome DevTools)
- **axe DevTools** (browser extension)
- **Screen readers** (VoiceOver on macOS, NVDA on Windows)

---

## Performance

Lighthouse scores (target):
- **Performance**: 90+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

Optimizations included:
- Next.js Image component with responsive srcsets
- Lazy loading for below-the-fold content
- Code splitting and tree shaking
- AVIF/WebP image formats
- Prefetching for route transitions
- Minimal third-party scripts (only Stripe)

---

## SEO

Each page includes:
- **Title tags** with templates
- **Meta descriptions** (140-160 characters)
- **Open Graph tags** for social sharing
- **Twitter Cards**
- **JSON-LD structured data** (Organization, Product, Breadcrumbs, VisualArtwork)
- **Canonical URLs**
- **Sitemap** (auto-generated by Next.js)

Artworks use `schema.org/VisualArtwork` for rich search results.

---

## Testing

### Run Tests

```bash
npm test              # Run Jest tests once
npm run test:watch    # Run tests in watch mode
```

### Test Coverage

Basic tests included for:
- Gallery component rendering
- Artwork card interactions
- Cart functionality (add, remove, update quantity)
- Price calculations (subtotal, VAT, shipping, total)

**Expand tests** by adding files to `__tests__/` directory.

---

## Troubleshooting

### Build Fails with "Static page generation timeout"

This can happen if:
- Artwork images are very large (optimize images to <500KB)
- Complex animations on artwork pages
- **Solution**: Disable static generation for artwork pages by setting `export const dynamic = 'force-dynamic'` in `app/art/[slug]/page.tsx`

### Stripe checkout doesn't redirect

- Check `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is correct
- Verify webhook endpoint is set up
- Test with Stripe CLI locally

### Admin login doesn't work

- Check `ADMIN_PASSWORD` is set in `.env.local`
- Clear browser cookies and try again
- For production, implement proper auth (see NextAuth.js)

### Images not loading

- Ensure images are in `public/sample-art/`
- Check file paths in `data/artworks.json` start with `/`
- Verify Next.js Image component `src` prop is correct

---

## Next Steps (Optional Enhancements)

1. **Analytics** — Add Google Analytics 4 or Plausible (placeholder in `app/layout.tsx`)
2. **Real Auth** — Replace admin password with NextAuth.js or Clerk
3. **CMS Migration** — Follow `docs/SANITY_MIGRATION.md` to use Sanity Studio
4. **Email Notifications** — Send order confirmations with Resend or SendGrid
5. **Inventory Management** — Track print stock levels (extend `prints` schema)
6. **Wishlist** — Let users save favorite artworks (use localStorage or DB)
7. **AR Wall Viewer** — Integrate AR.js or 8th Wall for live room previews
8. **Multi-currency** — Add currency selector (USD, EUR, GBP)
9. **Search** — Add Algolia or local search with Fuse.js
10. **Blog** — Add MDX-based blog for artist updates

---

## Tech Stack Summary

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 14.2 | React framework with app router |
| TypeScript | 5.4 | Type safety |
| Tailwind CSS | 3.4 | Utility-first styling |
| Framer Motion | 11.0 | Animations and transitions |
| Zustand | 4.5 | Cart state management |
| Stripe | 14.0 | Payment processing |
| React | 18.3 | UI library |
| Zod | 3.22 | Schema validation |
| Jest | 29.7 | Testing framework |
| Lucide React | - | Icon library |

---

## Support & Feedback

- **Bugs**: Open an issue on GitHub (if applicable)
- **Questions**: Check `DESIGN.md` for design specs
- **CMS Migration**: See `docs/SANITY_MIGRATION.md`

---

## License

MIT License — feel free to use this project as a template for your own art gallery or portfolio site.

---

## Credits

- **Design**: Museum in the Dark theme by Claude Code
- **Artist**: Dennis Wood (fictional sample data)
- **Fonts**: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) and [Inter](https://fonts.google.com/specimen/Inter) by Google Fonts
- **Icons**: [Lucide React](https://lucide.dev/)

---

**Built with ❤️ using Next.js and TypeScript**
