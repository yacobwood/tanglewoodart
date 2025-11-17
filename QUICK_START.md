# Quick Start Guide — Tanglewood Art Gallery

Your art gallery website is **READY and RUNNING**! 🎨

## 🌐 View Your Site

**Development server is live at:**
### **http://localhost:3000**

Open that URL in your browser right now to see your 6 paintings!

---

## ✅ What's Already Done

Your 6 real paintings from `/example` are now displayed:
- **artwork1.jpeg** → Mist Over Borrowed Light (Featured, £3,200)
- **artwork2.jpeg** → The Weight of Amber Hours (SOLD, £4,500)
- **artwork3.jpeg** → Remnants of Tide (£1,200)
- **artwork4.jpeg** → Convergence in Viridian (Featured, £3,800)
- **artwork5.jpeg** → Veiled Crossing at Dusk (£2,800)
- **artwork6.jpeg** → Still Life with Winter Branches (£1,950)

---

## 🎯 Test the Site (5 Minutes)

1. **Home Page** — See your featured paintings in the hero and curated section
2. **Gallery** — Click "Gallery" to see all 6 paintings with filters
3. **Artwork Detail** — Click any painting to see:
   - Large image viewer with zoom
   - Wall mockup viewer (see it on a wall!)
   - Print options (different sizes and finishes)
   - Add to Cart button
4. **Cart** — Add items, then click cart icon (top right)
5. **Checkout** — Test with Stripe card: `4242 4242 4242 4242`
   - Use any future expiry, any CVC, any ZIP
6. **Admin** — Go to `/admin` (password: see `.env.local`)

---

## 📝 Customize Your Content

### 1. Update Artwork Details

Edit `data/artworks.json` to change:
- Titles, descriptions, and artist stories
- Prices (in pence: £100 = 10000)
- Categories, mediums, dimensions
- Which ones are featured
- Print options and pricing

### 2. Add More Paintings

Copy more images to `public/sample-art/` then add entries to `artworks.json`:

```json
{
  "id": "my-new-painting",
  "title": "My New Painting",
  "artist": "Dennis Wood",
  "year": 2024,
  "medium": "Oil on canvas",
  "dimensions": { "width": 60, "height": 80, "unit": "cm" },
  "category": "landscape",
  "description": "Description here...",
  "story": "Story behind the work...",
  "price": 250000,
  "available": true,
  "featured": false,
  "series": null,
  "images": {
    "main": "/sample-art/my-new-painting.jpeg",
    "detail": "/sample-art/my-new-painting.jpeg"
  },
  "prints": [
    { "size": "A4", "dimensions": "21 x 29.7 cm", "price": 4500, "finishes": ["matte", "glossy"] }
  ]
}
```

### 3. Update About Page

Edit `app/about/page.tsx` with your real:
- Artist bio
- Education and exhibitions
- Studio location
- Contact email

### 4. Change Site Colors

Edit `tailwind.config.ts` (lines 15-25) to change theme colors:
```ts
'museum-dark': '#1a1a1d',    // Background
'museum-gold': '#d4af37',    // Accent color
'museum-cream': '#f5f5dc',   // Text color
```

---

## 🔧 Configure Stripe

To enable real payments:

1. **Get Stripe keys:**
   - Go to [dashboard.stripe.com](https://dashboard.stripe.com/test/apikeys)
   - Copy "Publishable key" (pk_test_...)
   - Copy "Secret key" (sk_test_...)

2. **Add to environment:**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
   STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_HERE
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
   ADMIN_PASSWORD=your-secure-password
   ```

3. **Test checkout:**
   - Card: `4242 4242 4242 4242`
   - Any future date, any CVC

---

## 🚀 Deploy to Vercel (10 Minutes)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Tanglewood Art Gallery"
   git remote add origin https://github.com/YOUR_USERNAME/tanglewood-art.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repo
   - Add environment variables (same as `.env.local`)
   - Click "Deploy"

3. **Your site will be live at:**
   `https://your-project.vercel.app`

---

## 📚 Full Documentation

- **[README.md](README.md)** — Complete guide with all features
- **[DESIGN.md](DESIGN.md)** — Design system and theme options
- **[NEXT_STEPS.md](NEXT_STEPS.md)** — Detailed customization steps
- **[docs/SANITY_MIGRATION.md](docs/SANITY_MIGRATION.md)** — Migrate to Sanity CMS

---

## 🎨 Current Theme: Museum in the Dark

- Deep charcoal backgrounds (#1a1a1d)
- Gold accents (#d4af37)
- Elegant serif typography
- Dramatic spotlight hover effects
- Brush-stroke cursor trail

**Want to switch themes?** See [DESIGN.md](DESIGN.md) for 2 other visual concepts.

---

## 💡 Quick Tips

1. **Prices are in pence** — £25.00 = 2500 (multiply by 100)
2. **Test cards don't charge real money** — Use Stripe test mode
3. **Admin password** — Change it in `.env.local` before deploying
4. **Image sizes** — Optimize images to <500KB for best performance
5. **Dev server** — Restart with `npm run dev` if needed

---

## ✅ Everything Works!

✅ 6 paintings displayed
✅ Gallery with filters
✅ Shopping cart
✅ Stripe checkout (test mode)
✅ Admin dashboard
✅ Responsive design
✅ SEO optimized
✅ Accessible

**You're ready to sell art online! 🎉**

---

Need help? Check the README.md or visit http://localhost:3000 to explore!
