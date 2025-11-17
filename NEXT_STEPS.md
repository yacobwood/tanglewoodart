# Next Steps — Tanglewood Art Gallery

Your art gallery ecommerce website is now complete and ready for customization! This document provides a video-safe checklist of next steps for adding your real content and deploying to production.

---

## ✅ Immediate Next Steps (Before Recording Demo)

### 1. Start the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to explore your site.

### 2. Add Your Real Artwork Content

**Edit `data/artworks.json`**:
1. Open the file in your code editor
2. Replace sample artworks with your real paintings
3. Update fields: title, description, story, price (in pence), category
4. Ensure slugs are URL-friendly (use lowercase, hyphens, no spaces)

**Add Your Images**:
1. Export high-quality JPEGs of your paintings (max 2000px on longest side)
2. Optimize them using [Squoosh.app](https://squoosh.app) or ImageOptim
3. Place in `public/sample-art/` with filenames matching the slugs in JSON
4. Name convention: `slug.jpg` and `slug-detail.jpg`

### 3. Update Artist Information

**About Page** (`app/about/page.tsx`):
- Replace placeholder bio with your real artist statement
- Update education, exhibitions, awards
- Add your real studio location

**Site Metadata** (`app/layout.tsx`, lines 30-93):
- Change artist name from "Dennis Wood" to your real name
- Update site description and keywords
- Add your social media links

**Footer** (`components/layout/footer.tsx`):
- Update copyright year and artist name
- Add real Instagram, Facebook, email links

### 4. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add:
- **Stripe keys** (get from [dashboard.stripe.com](https://dashboard.stripe.com/test/apikeys))
- **Admin password** (change from default!)
- **Base URL** (keep as localhost:3000 for now)

### 5. Test the Checkout Flow

1. Add artworks to cart
2. Proceed to checkout
3. Use Stripe test card: `4242 4242 4242 4242`
4. Verify redirect to success page

---

## 📹 Recording Your Demo Video/Screenshots

Capture these flows for your demo:

### Homepage Flow
1. Load homepage → show hero with featured artwork
2. Scroll to featured works section
3. Click on an artwork card

### Gallery Flow
1. Navigate to Gallery page
2. Show filter controls (category, availability)
3. Hover over artwork cards (spotlight effect)
4. Use keyboard navigation (Tab, Arrow keys)

### Artwork Detail Flow
1. Click on artwork from gallery
2. Show large image viewer
3. Click "View Full Size" → lightbox with zoom
4. Toggle "View on Wall" mockup viewer
5. Select print options (size, finish)
6. Click "Add to Cart"

### Cart & Checkout Flow
1. Click cart icon in header (shows item count)
2. Review cart items
3. Click "Checkout"
4. Fill in customer details
5. Complete Stripe payment
6. Show order success page

### Admin Dashboard Flow
1. Navigate to `/admin`
2. Login with admin password
3. Show artwork management table
4. Click "Edit" on an artwork
5. Toggle availability status
6. Save changes

---

## 🚀 Deployment to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Tanglewood Art Gallery"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tanglewood-art.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your GitHub repo
4. Vercel will auto-detect Next.js settings

### Step 3: Add Environment Variables

In Vercel project settings → Environment Variables, add:

```
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
ADMIN_PASSWORD=your-secure-password
VAT_PERCENT=20
```

**Important**: Use **live Stripe keys** for production (start with `pk_live_` and `sk_live_`)

### Step 4: Configure Stripe Webhook

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://your-domain.vercel.app/api/stripe/webhook`
3. Select event: `checkout.session.completed`
4. Copy webhook signing secret → add to Vercel env vars

### Step 5: Deploy

Push to GitHub — Vercel will automatically build and deploy:

```bash
git add .
git commit -m "Add production content"
git push
```

Visit your live site at `https://your-project.vercel.app`

---

## 🎨 Optional Enhancements

These are optional improvements you can add later:

### 1. Custom Domain

**In Vercel**:
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `tanglewoodart.com`)
3. Follow DNS configuration steps

### 2. Google Analytics

**In `app/layout.tsx` (line 107)**:
1. Uncomment Google Analytics script
2. Replace `GA_MEASUREMENT_ID` with your tracking ID
3. Get tracking ID from [analytics.google.com](https://analytics.google.com)

### 3. Email Order Confirmations

**Using Resend** (recommended):
1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Add to `.env.local`: `RESEND_API_KEY=re_...`
4. Create email template
5. Add send logic to `/api/stripe/webhook/route.ts`

### 4. Migrate to Sanity CMS

See `docs/SANITY_MIGRATION.md` for full guide:
- Visual content editor
- No redeploys for content updates
- Built-in image CDN
- Collaborative editing

### 5. Add Blog/News Section

1. Create `app/blog/page.tsx`
2. Use MDX for blog posts or integrate Sanity
3. Add "Latest News" section to homepage

### 6. Implement Real Authentication

Replace simple password auth with:
- **NextAuth.js** for email/OAuth login
- **Clerk** for user management
- **Supabase Auth** for magic links

### 7. Inventory Management for Prints

Track stock levels:
1. Add `stock` field to prints in JSON/Sanity
2. Decrement on successful order
3. Show "Only X left!" badge

### 8. Multi-Currency Support

1. Add currency selector to header
2. Use exchange rate API (exchangerate-api.io)
3. Convert prices dynamically

### 9. AR Wall Viewer

Integrate augmented reality:
- **8th Wall** for web-based AR
- Let users see art on their actual walls via phone camera

### 10. SEO Improvements

- Generate XML sitemap (Next.js auto-generates at `/sitemap.xml`)
- Add structured data for breadcrumbs
- Submit to Google Search Console
- Create robots.txt (already included)

---

## 🐛 Troubleshooting

### Dev server won't start
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Build fails
- Check all images exist in `public/sample-art/`
- Verify `data/artworks.json` is valid JSON
- Ensure environment variables are set

### Stripe checkout fails
- Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is correct
- Check browser console for errors
- Test with Stripe test keys first

### Images not loading
- Ensure file paths in JSON start with `/`
- Check image files are actually in `public/` directory
- Clear browser cache

---

## 📦 What's Included

Your project includes:

### Pages
- ✅ Home (hero, featured works, newsletter)
- ✅ Gallery (masonry grid, filters, search)
- ✅ Artwork Detail (lightbox, wall viewer, purchase options)
- ✅ Prints (filtered gallery view)
- ✅ About (artist bio, process, contact)
- ✅ Cart (item management)
- ✅ Checkout (Stripe integration)
- ✅ Order Success (confirmation)
- ✅ Admin Dashboard (password-protected CRUD)
- ✅ Custom 404 page

### Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode Museum theme
- ✅ Framer Motion animations
- ✅ Brush-stroke cursor effect
- ✅ Keyboard navigation
- ✅ WCAG AA accessibility
- ✅ SEO optimized (meta tags, JSON-LD)
- ✅ Stripe payments with webhooks
- ✅ Shopping cart with localStorage
- ✅ Print variants (sizes, finishes)
- ✅ VAT calculation
- ✅ Shipping costs by region

### Technical
- ✅ Next.js 14 with App Router
- ✅ TypeScript throughout
- ✅ Tailwind CSS
- ✅ Jest + React Testing Library
- ✅ GitHub Actions CI
- ✅ ESLint configured
- ✅ JSON-based CMS (easily migrated to Sanity)

---

## 📖 Documentation

- **README.md** — Complete setup and deployment guide
- **DESIGN.md** — Museum in the Dark design system specs
- **docs/SANITY_MIGRATION.md** — Guide for migrating to Sanity CMS
- **.env.example** — All environment variables explained

---

## 🎯 Acceptance Criteria Checklist

Before considering the project complete, verify:

- [ ] Dev server runs without errors (`npm run dev`)
- [ ] All pages load correctly (Home, Gallery, Artwork, About, Cart, Checkout, Admin)
- [ ] Sample artworks display with images
- [ ] Cart functionality works (add, remove, update quantity)
- [ ] Stripe test checkout completes successfully
- [ ] Admin login works with password
- [ ] Admin can edit/delete artworks
- [ ] Mobile responsive on phone and tablet
- [ ] Keyboard navigation works (Tab, Arrow keys)
- [ ] Lighthouse scores: Performance 80+, Accessibility 95+
- [ ] Build completes without errors (`npm run build`)
- [ ] Tests pass (`npm test`)

---

## 💡 Tips for Your First Deploy

1. **Start with test mode** — Use Stripe test keys first, switch to live later
2. **Test on mobile** — Most art buyers browse on phones
3. **Optimize images** — Use WebP/AVIF formats for faster loading
4. **Set up analytics early** — Track visitor behavior from day one
5. **Collect emails** — The newsletter signup is valuable for marketing
6. **Price in whole numbers** — £500 looks cleaner than £497.50 for art
7. **Write compelling stories** — The "Artist's Story" field sells paintings
8. **Use high-quality photos** — Bad photos = no sales
9. **Set up social sharing** — Open Graph tags make beautiful previews
10. **Monitor webhooks** — Check Stripe webhook logs for payment issues

---

## 📧 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the README.md for detailed docs
3. Check Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
4. Check Stripe docs: [stripe.com/docs](https://stripe.com/docs)

---

## 🎉 You're Ready!

Your professional art gallery website is production-ready. Here's what to do next:

1. ✅ Add your real artwork and images
2. ✅ Configure Stripe with test keys
3. ✅ Test the full checkout flow
4. ✅ Record demo screenshots/video
5. ✅ Deploy to Vercel
6. ✅ Switch to live Stripe keys
7. ✅ Add custom domain
8. ✅ Share with the world!

**Good luck with your art sales! 🎨✨**
