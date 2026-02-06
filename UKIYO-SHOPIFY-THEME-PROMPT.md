# Ukiyo Productions → Shopify Theme: Full Implementation Prompt

**Reference site:** [https://ukiyo-prod.com/](https://ukiyo-prod.com/)  
**Source repo:** [https://github.com/tufailkhan215/ukiyoapp-emergent](https://github.com/tufailkhan215/ukiyoapp-emergent) (frontend folder)

You are an **expert Shopify theme developer and full-stack UI engineer.** Your task is to analyze the **entire frontend folder** and generate a **full Shopify 2.0 theme** that is a **pixel-perfect replica** of the Ukiyo Productions UI.

This document is the single source of truth: design tokens, structure, and implementation rules. Use it when building, auditing, or generating the theme.

---

## Task overview

1. **Folder analysis** — Read all HTML, CSS, SCSS, JS, and assets in `frontend`; extract colors, typography, spacings, breakpoints, animations, and JS stack.
2. **Theme output** — Generate complete Liquid templates, JSON templates, sections, blocks, snippets, and local assets.
3. **Page structure** — Homepage, collection, product, cart, search, static pages, 404; map Shopify routes to original routing.
4. **CSS & animations** — Reproduce styles exactly; same classes/effects/measurements where possible; replicate custom variables and animation timing. **Do not rewrite in different classes—keep the same feel, same effects, and same measurements.** If the original uses custom variables or animation timing, replicate those.
5. **JavaScript** — Theme-safe JS in `assets/` for filters, sort, carousels, modals, scroll effects.
6. **Fonts and icons** — Identify all fonts; host in `assets/` with `@font-face`; include icons/SVG sprites locally.
7. **Asset migration** — Export images/illustrations/logos; optimize (WebP + fallback); place under `assets/`.
8. **Native Shopify** — Use `collection.filters`, `collection.sort_options`, `product.metafields`, pagination, cart/checkout.
9. **Theme JSON & schema** — Section schema for every reusable area; default presets.
10. **Documentation** — README: folder structure, installation, theme settings, code decisions.

**Deliverables after generation:**  
- **A)** Full list of design tokens (colors, fonts, spaces, breakpoints).  
- **B)** List of JS features and their Shopify-safe implementations.  
- **C)** Table mapping **original UI component → Shopify section/block**.

---

## Phase 1: Folder analysis (do first)

Before writing theme code:

- **Read** all relevant files in `frontend/`: `src/**/*.{js,jsx,css,scss}`, `public/**/*`, `tailwind.config.js`, `postcss.config.js`, `components.json`, `package.json`.
- **Identify and list:**
  - **Colors** — hex/rgb/hsl and CSS variables (see §2 below for extracted values).
  - **Typography** — font families, weights, sizes, line-heights (see §1).
  - **Spacings** — padding/margin scale (Tailwind: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128; section padding 80–120px vertical).
  - **Breakpoints** — from Tailwind or media queries (typically `640px`, `768px`, `1024px`, `1280px`, `1536px`).
  - **Animations** — all keyframes, transition durations, easing (see §5).
  - **Interactions** — hovers, modals, drawers, scroll effects, carousels, form behaviors.
  - **JS stack** — GSAP, Framer Motion, Lenis, Locomotive-scroll, Embla Carousel, Lucide (see §6); plan vanilla or theme-safe equivalents.

Keep the same feel, same effects, and same measurements when porting to Liquid/CSS.

---

## 1. Typography (Fonts)

### Font stack (exact)

- **Body / UI:**  
  `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`

- **Headings (h1–h6):**  
  `'Space Grotesk', 'Inter', sans-serif`

- **Serif accent (e.g. pull quotes, elegant labels):**  
  `'Playfair Display', serif`

### Google Fonts import

Use this exact link in `theme.liquid` `<head>` (or in a base CSS asset):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

### Font usage by element

| Element | Font | Weight | Notes |
|--------|------|--------|--------|
| Body | Inter | 400 | Default |
| Logo "UKIYO" | Space Grotesk | 700, uppercase | Bold, white |
| Hero headline (e.g. "WE BUILD BRANDS THAT PRINT MONEY") | Space Grotesk | 700–800, uppercase | Very large; optional metallic/gradient (see Colors) |
| Subtitle / overline (e.g. "CREATIVE BRANDING AGENCY") | Inter or Space Grotesk | 500, uppercase | Smaller, letter-spacing; flanked by thin lines |
| Paragraph / description | Inter | 400 | Muted grey (see Colors) |
| Buttons | Space Grotesk or Inter | 600–700, uppercase | Slightly letter-spaced |
| "SCROLL" indicator | Inter | 400, uppercase | Smallest, light grey |
| Section titles (e.g. "Brands That Trust Us") | Space Grotesk | 600–700 | White or split color (e.g. "Us" in lighter grey) |
| Card titles / service names | Space Grotesk | 600 | |
| Brand names in grid | Space Grotesk | 600–700, uppercase | Light grey in dark boxes |

---

## 2. Colors (exact)

### Base palette

| Role | Hex | Usage |
|------|-----|--------|
| Background (page) | `#000000` | Main page and hero |
| Background (header / dark UI) | `#0f0f10` | Header bar, dark blocks |
| Scrollbar track | `#0a0a0a` | |
| Scrollbar thumb | `#333333` | Border-radius 4px |
| Scrollbar thumb hover | `#555555` | |
| Card / elevated surface | HSL equivalent of ~5% white | `hsl(0, 0%, 5%)` |
| Primary text (logo, headings, buttons) | `#ffffff` | |
| Secondary / muted text | `#999999` – `#b0b0b0` (≈ 60% white in HSL) | Descriptions, subtitles |
| Subheading grey | `#a0a0a0` – `#cccccc` | "Brands That Trust Us" subtitle, etc. |
| Brand grid box bg | `#232323` – `#282828` | Slightly lighter than page |
| Border / divider | ~15% white | `rgba(255,255,255,0.08)` – `0.15` |
| Selection | Background `#ffffff`, text `#000000` | Or violet tint: `rgba(139,92,246,0.3)` / white (see App.css) |

### CSS custom properties (from source `index.css`)

Map these into your theme’s `:root` or base CSS so all sections stay consistent:

```css
:root {
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --card: 0 0% 5%;
  --card-foreground: 0 0% 100%;
  --primary: 0 0% 100%;
  --primary-foreground: 0 0% 0%;
  --secondary: 0 0% 10%;
  --secondary-foreground: 0 0% 100%;
  --muted: 0 0% 15%;
  --muted-foreground: 0 0% 60%;
  --accent: 0 0% 15%;
  --accent-foreground: 0 0% 100%;
  --border: 0 0% 15%;
  --input: 0 0% 15%;
  --ring: 0 0% 100%;
  --radius: 0.75rem;
}
```

Use as needed, e.g. `background: hsl(var(--background));`, `color: hsl(var(--foreground));`.

### Accent / gradient (optional, from App.css)

- **Gradient text (accent):**  
  `linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #ec4899 100%)`  
  Use for highlights, not primary hero headline unless design calls for it.

- **Glow (violet):** `0 0 40px rgba(139, 92, 246, 0.3)`  
- **Glow (fuchsia):** `0 0 40px rgba(217, 70, 239, 0.3)`

### Hero headline gradient (metallic / silver)

If the hero line uses a metallic look (white → silver-grey):

- `linear-gradient(to bottom, #ffffff 0%, #e0e0e0 50%, #b0b0b0 100%)` or similar, with `background-clip: text` and `-webkit-text-fill-color: transparent` (and `color: transparent` fallback).

---

## 3. Layout and structure

### Global

- **Background:** `#000000`, full viewport.
- **Text:** White and greys as above; `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`
- **Overflow:** `overflow-x: hidden` on body to avoid horizontal scroll from wide sections.
- **Smooth scroll:** `html { scroll-behavior: smooth; }`
- **Focus:** `*:focus-visible { outline: 2px solid hsl(0 0% 9%); outline-offset: 2px; }`
- **Tap highlight:** `* { -webkit-tap-highlight-color: transparent; }`

### Header

- Fixed or sticky; full width; background `#0f0f10` or transparent-over-black.
- **Logo:** Left, "UKIYO", white, Space Grotesk bold, uppercase.
- **Right:** Hamburger (three horizontal white lines); optional "Start Your Project" CTA.
- Height ~64–80px; content max-width and padding consistent with sections.

### Hero

- Full viewport height; content vertically and horizontally centered.
- **Subtitle:** "CREATIVE BRANDING AGENCY" (or CMS equivalent) with short horizontal lines left/right (flexbox or pseudo-elements).
- **Headline:** Two lines (e.g. "WE BUILD BRANDS" / "THAT PRINT MONEY"); very large (e.g. clamp 2.5rem–6rem), Space Grotesk bold, uppercase; optional gradient.
- **Description:** One short paragraph, muted grey, max-width ~600px, centered.
- **CTAs:** Two buttons stacked with spacing:
  - **Primary:** Background `#ffffff`, text `#000000`, rounded pill (e.g. more rounded on one side as per reference).
  - **Secondary:** Background transparent, border 1–2px solid `#ffffff`, text `#ffffff`.
  - Both: arrow icon (e.g. top-right) next to label; hover transitions (e.g. opacity, background swap).
- **Scroll cue:** "SCROLL" at bottom center, small, grey, with optional down-arrow; animate (e.g. scrollPulse).

### Sections (general)

- Max-width ~1200–1400px, margin auto, padding vertical ~80–120px (adjust for mobile).
- Section titles: Space Grotesk, large, white (or split color); subtitles: Inter, muted, centered when applicable.

### “Brands That Trust Us”

- Title: "Brands That Trust Us" (optional: "Us" in lighter grey).
- Subtitle: one line, muted, centered.
- **Grid:** Cards in a responsive grid (e.g. 2–4 columns); each card:
  - Background `#232323`–`#282828`, border or soft shadow for separation.
  - Brand name centered, uppercase, Space Grotesk, light grey.
  - Hover: slight lift, border/glow or background lighten; optional shimmer (see Animations).
- **Marquee (optional):** One or two rows of repeating brand names, infinite scroll (CSS or JS); direction alternate for rows; `scrollbar-hide` so no scrollbar on marquee.

### Buttons (site-wide)

- **Primary:** White bg, black text, rounded, bold/uppercase, arrow icon; hover: slight scale or opacity.
- **Secondary:** Transparent, white border, white text; hover: fill white, text black.
- Transitions: `color, background-color, border-color, opacity` 0.3s ease (match source).

---

## 4. CSS effects and visuals (exact)

### Grain texture

```css
.grain-texture::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
}
```

### Marble / liquid background (hero or sections)

- **Marble radial overlays:**  
  `radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.03) 0%, transparent 50%)`, etc.; optional `marbleShift` animation (20s, scale 1–1.05, opacity 0.8–1).
- **Liquid blobs:** Use `.liquid-marble` with `::before`/`::after` radial gradients and `liquidFlow` (20–25s, translateY, rotate, scale, blur). See source `index.css` for full keyframes.

### Glass cards

```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.glass-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
}
```

### Shimmer (buttons or cards)

```css
.shimmer-btn::after {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
  transform: rotate(30deg);
  animation: shimmer 3s ease-in-out infinite;
}
@keyframes shimmer {
  0% { transform: translateX(-100%) rotate(30deg); }
  100% { transform: translateX(100%) rotate(30deg); }
}
```

### Text glow

```css
.text-glow {
  text-shadow: 0 0 40px rgba(255, 255, 255, 0.15);
}
```

### Scrollbar (custom)

```css
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: #0a0a0a; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #555; }
```

### Hide scrollbar (marquee)

```css
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar { display: none; }
```

---

## 5. Animations (keyframes and usage)

### Scroll indicator (hero)

```css
@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(8px); }
}
.scroll-indicator {
  animation: scrollPulse 2s ease-in-out infinite;
}
```

### Marble shift

```css
@keyframes marbleShift {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}
```

### Liquid flow (background blobs)

```css
@keyframes liquidFlow {
  0%, 100% { transform: translateY(0) rotate(0deg) scale(1); filter: blur(120px); }
  25% { transform: translateY(-20px) rotate(5deg) scale(1.1); filter: blur(140px); }
  50% { transform: translateY(-40px) rotate(-5deg) scale(0.95); filter: blur(100px); }
  75% { transform: translateY(-20px) rotate(3deg) scale(1.05); filter: blur(130px); }
}
```

### Marquee (horizontal infinite)

```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 40s linear infinite;
}
```

Use duplicate content so `-50%` shows seamless loop. Reverse direction: `marquee-reverse` (translateX(-50%) → 0).

### Float (subtle)

```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
```

### Floating particles (optional)

```css
@keyframes floatParticle {
  0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
  10% { opacity: 1; }
  50% { transform: translateY(-200px) translateX(50px); opacity: 0.5; }
  90% { opacity: 0; }
}
```

### Global transitions (buttons, links, inputs)

```css
button, a, input, textarea, select {
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;
}
```

Do **not** add transition on `transform` if you use GSAP or other JS animations for transform to avoid conflicts.

---

## 6. JavaScript and interactions

### Source stack (for reference; Shopify uses vanilla or minimal JS)

The reference app uses:

- **GSAP** (gsap, @gsap/react) for timeline and tweens
- **Framer Motion** (framer-motion) for scroll-in and layout animations
- **Lenis** for smooth scroll (optional in Shopify)
- **Locomotive-scroll** (optional)
- **Embla Carousel** for carousels
- **Lucide React** for icons (e.g. ArrowUpRight, ArrowDown)

In Shopify, replicate behavior with **theme-safe JS** hosted locally under `assets/`; avoid breaking Shopify theme review rules (no eval, no remote script injection for core UI).

- **Vanilla JS** for: filter drawer open/close, sort dropdown, hover states, marquee (transform/requestAnimationFrame or CSS), mobile menu toggle, smooth scroll to anchor, carousels/sliders, modal handling.
- **CSS only** where possible: scroll-in (e.g. `@media (prefers-reduced-motion)` and simple opacity/translate).
- Optional: **GSAP (vanilla)** or a small animation lib for hero stagger, section reveal, and parallax if you need parity with the reference.

### Behaviors to implement

1. **Header:** Sticky; on scroll optionally change background opacity or add border; hamburger opens overlay/drawer (full-screen or side).
2. **Hero:** Optional canvas-based background (mouse-following glow + marble blobs + noise) — see HeroSection.jsx; if not possible, use CSS `.liquid-marble` + `.grain-texture`.
3. **Scroll cue:** "SCROLL" with scrollPulse animation; click scrolls to next section.
4. **Buttons:** Hover scale/opacity; primary/secondary swap colors as above.
5. **Brand grid:** Hover lift + border/glow; optional shimmer on card.
6. **Marquee:** Infinite horizontal scroll (two rows, opposite directions); no scrollbar.
7. **Section reveal:** On scroll into view, fade/translate up (e.g. `opacity` 0→1, `translateY(24px)`→0); respect `prefers-reduced-motion`.

---

## 7. Shopify theme mapping

### Files to create or adapt

- **Layout:** `theme.liquid` — fonts, CSS vars, base structure, header/footer includes.
- **CSS:**  
  - Base: fonts, :root, body, scrollbar, focus, tap-highlight, transitions.  
  - Sections: hero, trusted-by, services, stats, testimonials, CTA, footer.  
  - Components: buttons, cards, marquee, glass-card, shimmer.
- **Sections (Liquid):**  
  - `hero.liquid` (with optional schema for headline, subheadline, description, CTAs).  
  - `trusted-by.liquid` (title, subtitle, list of brand names or images).  
  - `marquee-logos.liquid` (two rows, configurable list).  
  - `services-preview.liquid`, `work-showcase.liquid`, `testimonials.liquid`, `stats.liquid`, `lead-magnet.liquid`, `urgency.liquid`, `guarantee.liquid`, `footer.liquid`, etc.
- **Snippets:** Header (logo + nav + CTA), Footer (columns + links), Button (primary/secondary), Card (glass style), Icon (arrow, scroll).
- **Assets:**  
  - `base.css` or `theme.css` (all base + section styles).  
  - `animations.css` (keyframes).  
  - `theme.js` (menu, smooth scroll, marquee, optional hero canvas).

### Original UI component to Shopify section/block mapping

| Original component (frontend) | Shopify section | Blocks (if any) |
|------------------------------|-----------------|------------------|
| HeroSection.jsx | `sections/hero.liquid` | — |
| TrustedBySection.jsx | `sections/trusted-by.liquid` | brand (name or image) |
| MarqueeLogos.jsx | `sections/marquee-logos.liquid` | logo/brand name |
| ServicesSection / ServicesPreview.jsx | `sections/services-preview.liquid` | service (title, tagline, link) |
| ServiceBundleSection.jsx | `sections/service-bundle.liquid` | service card (price, ROI, checkbox) |
| TransformationSection.jsx | `sections/transformation.liquid` | — |
| WorkSection / WorkShowcase.jsx | `sections/work-showcase.liquid` | case study |
| StatsSection.jsx | `sections/stats.liquid` | stat (number, label) |
| TestimonialsSection.jsx | `sections/testimonials.liquid` | testimonial |
| GuaranteeSection.jsx | `sections/guarantee.liquid` | guarantee item |
| LeadMagnetSection.jsx | `sections/lead-magnet.liquid` | — |
| UrgencySection.jsx | `sections/urgency.liquid` | — |
| Navbar | `snippets/header.liquid` (in layout) | — |
| Footer | `snippets/footer.liquid` or `sections/footer.liquid` | — |

Expand this table when generating the theme so every frontend component has a section or block.

### Section content (from reference)

- **Hero:** Headline, subheadline, description, primary CTA (text + link), secondary CTA (text + link), scroll indicator.
- **Trusted by:** Title, subtitle, list of brands (text or logo images).
- **Services:** 6 services with icon/title/tagline/description and “Explore” link.
- **Pick Your Power Stack / Bundle:** Service cards with price, ROI, checkbox; “Your Bundle” summary; optional discount (e.g. 70% OFF).
- **Before/After (Transformation):** “BEFORE UKIYO” / “AFTER UKIYO” columns; stats (e.g. 0 hrs, +$340%, 100% sanity, 1000+ hrs saved).
- **Case studies / Work:** Grid or carousel; category filter; card with image, title, subtitle, metrics, link.
- **Stats:** 4 metrics (e.g. Revenue Generated, Projects Delivered, Client Satisfaction, Response Time).
- **Testimonials:** Quote, author, role, optional avatar.
- **Guarantees:** 4 items (e.g. 100% Money-Back, Unlimited Revisions, On-Time Delivery, Results or We Work Free).
- **Lead magnet:** Headline, resource list, email form, “Get Free Access” / “Claim Your Spot”.
- **Urgency:** “Only 3 Spots Left”, countdown (if desired), CTA.
- **Footer:** Logo, Services, Company, Shop, Contact columns; email; social links; legal (Privacy, Terms); copyright.

### Page structure and Shopify templates

Create templates so Shopify routes match the original frontend:

| Original route | Shopify template |
|---------------|------------------|
| `/` | `index.json` |
| `/services` | `page.services.json` |
| `/work` | `page.work.json` or collection |
| `/about` | `page.about.json` |
| `/contact` | `page.contact.json` |
| `/gallery` | `page.gallery.json` |
| `/membership` | `page.membership.json` |
| `/collections/*` | `collection.json` (use collection.filters, sort_options) |
| Product | `product.json` (use product.metafields) |
| Cart | `cart.json` |
| Search | `search.json` |
| Blog | `blog.json` / `article.json` |
| Legal | `page` with handle (e.g. privacy-policy, terms) |
| Not found | `404.json` |

Use JSON templates to compose sections and blocks; define default section order and presets.

---

## 8. Native Shopify features

- **Filtering and sorting:** Use `collection.filters` and `collection.sort_options`; filter drawer and sort dropdown via theme-safe JS in `assets/`.
- **Product metafields:** Use for ROI, extra copy, or custom fields on product/sections.
- **Pagination:** Liquid `paginate` for collection, blog, search.
- **Cart and checkout:** Theme works with Shopify cart and checkout; style cart (dark bg, white text, same buttons).

---

## 9. Theme JSON and schema

- **Section schema:** Every section has `schema` with `name`, `tag`, `settings`, `blocks` (if needed), and `presets` (at least one default).
- **Default presets:** Sensible defaults so new install shows full homepage; document preset names in README.

---

## 10. Documentation (README)

README in theme root must include: **folder structure** (layout, sections, templates, snippets, assets, config, locales), **installation** (upload/CLI), **theme settings overview**, **code decisions** (e.g. CSS vs JS animations, filter/cart implementation, undetermined assets).

---

## 11. Deliverables after theme generation

- **A) Design tokens:** Full list of colors (hex/CSS vars), fonts (families, weights, sizes), spaces (padding/margin scale, section spacing), breakpoints (px and names).
- **B) JS features and Shopify-safe implementation:** Filter drawer, sort dropdown, carousels, modals, scroll effects, marquee—each with file/location and approach (vanilla, no eval, theme assets only).
- **C) Component mapping table:** Original UI component (e.g. HeroSection.jsx) to Shopify section/block; expand so every frontend component is mapped (HeroSection → sections/hero.liquid, TrustedBySection → sections/trusted-by.liquid, etc.).

---

## 12. Output format: generate complete theme files

Generate **complete theme files, one by one**, with full code:

- **Layout:** `layout/theme.liquid` (fonts, CSS/JS includes, header/footer, body).
- **Sections:** hero, trusted-by, marquee-logos, services-preview, service-bundle, transformation, work-showcase, stats, testimonials, guarantee, lead-magnet, urgency, footer, header (if section-based), plus collection/product/cart as needed.
- **Templates:** index, collection, product, cart, search, page and page.*, 404, blog, article.
- **Snippets:** header, footer, button, card, icon-arrow, icon-scroll, etc.
- **Assets:** theme.css, theme.js, animations.css (optional), font files (woff2/woff with @font-face), SVG icons.

**Fonts:** Host Inter, Space Grotesk, Playfair Display in `assets/`; add @font-face in base CSS. **Icons:** SVG in assets or inline in snippets. **Images:** Export from frontend; optimize (WebP + fallback); reference via `asset_url`. **If something cannot be derived:** List it and give a recommendation (e.g. CSS fallback for hero canvas, text logo until SVG provided).

---

## 13. Checklist for “exact” parity

- [ ] Fonts: Inter, Space Grotesk, Playfair Display loaded and applied as above.
- [ ] Colors: #000000, #0f0f10, #ffffff, muted greys, CSS variables matching source.
- [ ] Hero: Full viewport; subtitle with lines; two-line headline; description; two CTAs; scroll indicator with scrollPulse.
- [ ] Buttons: Primary (white/black), secondary (outline); arrow icon; 0.3s transitions.
- [ ] Header: Logo “UKIYO”, hamburger, optional CTA; sticky; scroll behavior.
- [ ] Trusted by: Grid of brand cards (dark box, light grey text); hover state; optional marquee rows.
- [ ] Marquee: Two rows, infinite scroll, opposite directions, scrollbar hidden.
- [ ] Effects: Grain overlay, glass cards, shimmer (where used), text glow (if used).
- [ ] Animations: scrollPulse, marbleShift, liquidFlow, marquee, float; reduced motion respected.
- [ ] Scrollbar: Dark track/thumb; scrollbar-hide on marquee.
- [ ] Selection: White bg / black text (or violet tint as in App.css).
- [ ] Responsive: All sections and typography scale; hamburger menu on small screens; touch-friendly CTAs.

---

## 14. Reference links

- **Live site:** [https://ukiyo-prod.com/](https://ukiyo-prod.com/)
- **Repo (frontend):** [https://github.com/tufailkhan215/ukiyoapp-emergent/tree/main/frontend](https://github.com/tufailkhan215/ukiyoapp-emergent/tree/main/frontend)
- **Key source files:**  
  - `frontend/src/index.css` (fonts, vars, grain, marble, liquid, glass, shimmer, keyframes)  
  - `frontend/src/App.css` (scrollbar, marquee, gradient-text, glass, noise, float, pulse-glow)  
  - `frontend/src/pages/Home/HeroSection.jsx` (hero layout, canvas background logic)  
  - `frontend/src/pages/Home/TrustedBySection.jsx` (grid + marquee)  
  - `frontend/src/pages/Home/MarqueeLogos.jsx` (two-row marquee)

Use this prompt when building or refining the Shopify theme so that the theme matches the reference site’s look, motion, and structure as closely as possible within Shopify’s Liquid and theme architecture.
