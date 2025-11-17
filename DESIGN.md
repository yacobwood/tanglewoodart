# Tanglewood Art Gallery — Design System

## Visual Concept Options

### Concept 1: Museum in the Dark ⭐ IMPLEMENTED

A sophisticated, gallery-inspired experience with dramatic lighting that evokes walking through a premium art museum after hours. Artworks emerge from darkness with elegant spotlight effects, creating intimate moments between viewer and painting.

**Mood**: Prestigious, dramatic, contemplative
**Best for**: High-value original works, collectors, serious art enthusiasts

### Concept 2: Paint Strokes Come Alive

An expressive, tactile interface where UI elements themselves feel painted. Brush-stroke borders, textured buttons with visible bristle marks, and animated paint reveals on hover bring the medium into the digital space.

**Mood**: Artistic, playful, authentic
**Best for**: Vibrant abstract works, younger collectors, contemporary art

### Concept 3: Floating Gallery

A depth-layered experience with artworks suspended in subtle 3D space. Parallax scrolling creates the feeling of moving through a multi-dimensional exhibition, with pieces floating at different depths.

**Mood**: Modern, immersive, spatial
**Best for**: Large landscapes, immersive viewing, architectural collectors

---

## Implemented Theme: Museum in the Dark

### Color Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Museum Dark | `#1a1a1d` | Primary background, creates the "gallery wall" |
| Museum Charcoal | `#2d2d30` | Cards, elevated surfaces, secondary backgrounds |
| Museum Slate | `#4e4e50` | Borders, dividers, muted elements |
| Museum Gold | `#d4af37` | Accent color, CTAs, hover states, premium details |
| Museum Gold Light | `#f0d677` | Lighter gold for hover effects and highlights |
| Museum Cream | `#f5f5dc` | Primary text, high-contrast readable content |
| Spotlight (RGBA) | `rgba(255, 255, 255, 0.05)` | Hover spotlight effect on artworks |

**Design Principle**: 90% dark neutrals, 10% gold accents — let the artwork be the color.

### Typography

**Heading Font**: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
- Usage: H1, H2, artwork titles, section headings
- Weight: 400 (regular), 600 (semibold), 700 (bold)
- Features: Elegant serifs, high contrast, museum placard aesthetic
- Small-caps variant used for labels (ORIGINAL, SOLD, NEW)

**Body Font**: [Inter](https://fonts.google.com/specimen/Inter)
- Usage: Body text, navigation, metadata, descriptions
- Weight: 300 (light), 400 (regular), 500 (medium), 600 (semibold)
- Features: Excellent readability, clean sans-serif, professional

**Type Scale** (based on 16px base):
```
H1: 3.5rem (56px) — Hero headlines
H2: 2.5rem (40px) — Page titles
H3: 1.875rem (30px) — Section headings
H4: 1.5rem (24px) — Subsections
H5: 1.25rem (20px) — Card titles
Body: 1rem (16px) — Standard text
Small: 0.875rem (14px) — Metadata, captions
Tiny: 0.75rem (12px) — Labels, tags
```

### Spacing Scale

Following an 8px base grid for consistency:

```
0.5 = 4px   — Tight inline spacing
1 = 8px     — Minimal spacing
2 = 16px    — Default spacing between elements
3 = 24px    — Section breathing room
4 = 32px    — Component separation
6 = 48px    — Large gaps
8 = 64px    — Section dividers
12 = 96px   — Page-level spacing
16 = 128px  — Hero spacing
```

### Motion Design

**Philosophy**: Slow, deliberate, museum-worthy. Movements should feel like a curator revealing an artwork, not a snappy UI interaction.

**Transition Durations**:
- Quick feedback: `200ms` — Button states, small hovers
- Standard reveal: `400ms` — Card hovers, spotlight effect
- Dramatic entrance: `600ms` — Page transitions, hero animations
- Ambient motion: `3s` — Floating elements, subtle background movement

**Easing Functions**:
- Primary: `cubic-bezier(0.4, 0.0, 0.2, 1)` — "Museum easing" for most animations
- Entrance: `ease-out` — Elements arriving on screen
- Exit: `ease-in` — Elements leaving screen
- Elastic: Used sparingly for playful cart interactions

**Signature Animations**:

1. **Spotlight Hover** (Artworks)
   - Scale: `1.0` → `1.03` over 400ms
   - Shadow: Soft gold glow appears (`0 0 60px 30px rgba(212, 175, 55, 0.15)`)
   - Overlay: Dark gradient fades in revealing title
   - Effect: Artwork feels "chosen" by cursor

2. **Page Transitions** (Framer Motion)
   - Exit: Fade opacity `1` → `0.3`, scale `1` → `0.98` over 300ms
   - Enter: Fade opacity `0` → `1`, slide up `20px` → `0` over 600ms
   - Stagger: Child elements animate in sequence with 80ms delay

3. **Brush-Stroke Cursor Follow**
   - SVG brush stroke trails cursor with 150ms smooth lag
   - Gold color with 30% opacity
   - Appears on hover over interactive elements only
   - Draws/fades over 200ms

4. **Fade-In on Scroll**
   - Elements start `opacity: 0, translateY: 20px`
   - Trigger when 20% enters viewport
   - Animate to `opacity: 1, translateY: 0` over 600ms
   - Stagger multiple items by 100ms

### Component Specifications

#### Artwork Card
- **Background**: Museum charcoal with 1px slate border
- **Hover state**: Scale 1.03, spotlight shadow, gold border glow
- **Image aspect ratio**: Preserved from original, max-height 600px
- **Title overlay**: Gradient from transparent to black at bottom
- **Metadata**: Small-caps labels in gold, body text in cream

#### Buttons
- **Primary (CTA)**: Gold background, dark text, bold weight
  - Hover: Lighten to gold-light, subtle shadow
- **Secondary**: Transparent with gold border
  - Hover: Gold background fills in from center
- **Ghost**: Cream text, no background
  - Hover: Underline appears with 200ms slide-in

#### Navigation
- **Desktop**: Horizontal, sticky on scroll with blur background
- **Mobile**: Hamburger menu slides from right with stagger animation
- **Active state**: Gold underline 2px thick
- **Logo**: Serif font, letter-spaced, small gold accent line

#### Forms & Inputs
- **Background**: Museum charcoal with cream text
- **Border**: 1px slate, becomes gold on focus
- **Labels**: Small-caps in gold
- **Error states**: Red-tinted gold (`#d48937`)

### Accessibility Specifications

**Color Contrast**:
- Museum Cream on Museum Dark: 14.2:1 (AAA ✓)
- Museum Gold on Museum Dark: 7.8:1 (AA ✓)
- All text meets WCAG 2.1 AA minimum (4.5:1 for small, 3:1 for large)

**Focus Indicators**:
- 2px solid gold outline with 2px offset
- Visible on all interactive elements
- Never removed, only styled

**Keyboard Navigation**:
- Tab order follows visual hierarchy
- Skip-to-content link at top
- Arrow keys navigate gallery grid
- Escape closes modals and cart drawer

**Motion Preferences**:
- `@media (prefers-reduced-motion: reduce)` disables all animations
- Transitions become instant (0ms) but layout shifts remain

**Screen Reader Optimizations**:
- All images have descriptive alt text (artwork title, year, medium)
- ARIA labels on icon-only buttons
- Live regions announce cart updates
- Semantic HTML throughout (nav, main, article, aside)

### Visual Signature Element

**Brush-Stroke Cursor Trail** (chosen signature):

A single, elegant gold brush stroke that follows the cursor when hovering over interactive elements. The stroke has organic, slightly irregular edges like real oil paint. It lags behind cursor movement by 150ms creating a graceful trailing effect.

**Technical implementation**:
- SVG path with gold stroke (`#d4af37`)
- Opacity: 0.3
- Stroke width: 3px
- Smooth interpolation using Framer Motion's `spring` physics
- Only appears over: buttons, artwork cards, navigation links
- Fades in/out over 200ms

**Alternative considered**: Paint-dab loading spinner (not implemented, but available as Option B in `/components/ui/loading-spinner.tsx`)

---

## Responsive Breakpoints

```css
sm: 640px   — Large phones
md: 768px   — Tablets
lg: 1024px  — Laptop
xl: 1280px  — Desktop
2xl: 1536px — Large desktop
```

**Layout strategy**:
- Mobile-first design
- Gallery grid: 1 col → 2 col (md) → 3 col (lg) → 4 col (xl)
- Hero: Stacked → Side-by-side at lg
- Navigation: Hamburger → Horizontal at md

---

## SEO & Metadata Strategy

**Meta Tags** (per page):
- Title format: `{Page Title} | Tanglewood Art Gallery`
- Description: 140-160 characters, include keywords "original oil painting", "fine art prints"
- Open Graph image: 1200x630px artwork preview
- Twitter card: `summary_large_image`

**JSON-LD Structured Data**:
- Organization schema on homepage
- Product schema on artwork pages (includes price, availability, image)
- BreadcrumbList on all pages
- ImageObject for all artworks with creator, dateCreated, artMedium

**Image Optimization**:
- Next.js Image component with `priority` for above-fold
- Blur placeholders (base64) for all artwork images
- AVIF format first, WebP fallback, JPEG last resort
- Responsive srcset: 640w, 750w, 1080w, 1920w

---

## File Organization

```
tanglewood-art/
├── app/                    # Next.js app router pages
├── components/             # React components
│   ├── layout/            # Header, Footer, Nav
│   ├── gallery/           # Gallery grid, filters, artwork cards
│   ├── artwork/           # Detail view, lightbox, wall mockup
│   ├── cart/              # Cart drawer, line items
│   ├── admin/             # Admin dashboard components
│   └── ui/                # Buttons, inputs, loading states
├── lib/                   # Utilities and helpers
│   ├── stripe.ts         # Stripe client
│   ├── cart-store.ts     # Zustand cart state
│   └── utils.ts          # Helper functions
├── data/                  # Seed data and content
│   └── artworks.json     # Artwork database
├── public/
│   └── sample-art/       # Sample images
├── styles/               # Global CSS
└── types/                # TypeScript definitions
```

---

## Notes for Production

1. **Font Loading**: Fonts are loaded via `next/font/google` with `display: swap` to prevent FOIT
2. **Analytics Placeholder**: Add Google Analytics 4 or Plausible script tag in `app/layout.tsx` (line 24)
3. **Color Theme Swap**: Edit CSS variables in `tailwind.config.ts` colors section to rebrand
4. **Stripe Keys**: Replace test keys in `.env` before going live — see README
5. **CMS Migration**: Follow instructions in `docs/SANITY_MIGRATION.md` to swap JSON for Sanity CMS

---

**Design Version**: 1.0
**Last Updated**: November 2025
**Implemented By**: Claude Code
**Theme**: Museum in the Dark
