# Ukiyo Shopify Theme

Pixel-perfect replica of [Ukiyo Productions](https://ukiyo-prod.com/) as a **Shopify 2.0** theme. Built from the frontend at [ukiyoapp-emergent/frontend](https://github.com/tufailkhan215/ukiyoapp-emergent/tree/main/frontend).

## Folder structure

```
layout/
  theme.liquid          # Main layout, fonts, header/footer includes
config/
  settings_schema.json  # Theme settings (colors, typography, header)
  settings_data.json    # Current theme settings
locales/
  en.default.json       # Default English strings
sections/
  header.liquid         # Sticky header, logo, CTA, drawer menu
  footer.liquid         # Footer columns, copyright
  hero.liquid           # Full-viewport hero, CTAs, scroll indicator
  trusted-by.liquid     # Brand grid (blocks: brand)
  marquee-logos.liquid  # Two-row infinite marquee (blocks: logo)
  rich-text.liquid      # Heading + text + optional button
  main-collection.liquid# Collection grid, sort, pagination
  main-product.liquid   # Product detail, add to cart
  main-cart.liquid      # Cart items, update, checkout
  main-search.liquid   # Search form and results
  main-page.liquid     # Static page title + content
templates/
  index.json            # Homepage (hero, trusted-by, marquee, CTA)
  collection.json       # Collection listing
  product.json          # Product detail
  cart.json             # Cart
  search.json           # Search
  page.json             # Static pages
  404.json              # Not found
snippets/
  button.liquid         # Primary/secondary button with arrow
  icon-arrow.liquid     # Arrow icon (SVG)
  icon-scroll.liquid    # Scroll-down icon (SVG)
assets/
  theme.css             # Base, variables, animations, section styles
  theme.js              # Drawer menu, scroll indicator, section reveal
```

## Installation

1. **Upload via Shopify Admin**
   - Zip the theme folder (ensure `layout`, `config`, `sections`, `templates`, `snippets`, `assets`, `locales` are at the root of the zip).
   - In Shopify Admin: Online Store → Themes → Add theme → Upload zip.

2. **Shopify CLI**
   - From the theme directory: `shopify theme dev` or `shopify theme push`.

3. **Navigation**
   - Create a menu with handle `main-menu` (or change the header section setting) and assign it in Theme settings → Header → Menu.

## Theme settings

- **Colors:** Background, Text, Muted text (in Theme settings).
- **Header:** Logo text, menu (link list), CTA text and link.
- **Footer:** Logo text, contact email, copyright HTML; blocks for menu columns.

Sections are editable in the Theme Editor; each section has its own schema (headlines, buttons, blocks for brands/logos, etc.).

## Code decisions

- **CSS:** All styles are in `assets/theme.css` (no Tailwind). Design tokens and animations from the prompt (scrollPulse, liquidFlow, marquee, glass-card, grain texture) are included. `prefers-reduced-motion` disables scroll and marquee animations.
- **JavaScript:** Vanilla JS in `assets/theme.js` only. Implements: drawer open/close, scroll-to-next section, section reveal (Intersection Observer). No eval, no remote scripts; theme-review safe.
- **Fonts:** Loaded from Google Fonts (Inter, Space Grotesk, Playfair Display) in `layout/theme.liquid`. For self-hosted fonts, add woff2/woff to `assets/` and @font-face in `theme.css`.
- **Cart:** Uses standard cart form and redirect to Shopify checkout. Styled to match Ukiyo (dark background, white text, same button styles).
- **Collection:** Uses `collection.sort_options` and a simple sort dropdown; `paginate collection.products by 24`. Filter drawer can be added later with theme-safe JS and `collection.filters`.

## Limitations / recommendations

- **Hero background:** Original uses a canvas with mouse-following glow and marble blobs. Theme uses CSS `.liquid-marble` + `.grain-texture` for a similar feel without canvas. For exact parity, add optional canvas JS and a theme setting to toggle.
- **Images/logos:** No images are bundled. Add logo image in Theme settings when available; use WebP with fallback for performance.
- **Missing sections from reference:** Services preview (6 cards), Service bundle (pick-your-stack), Transformation (before/after), Work showcase, Stats, Testimonials, Guarantee, Lead magnet, Urgency can be added as new sections using the same design tokens and patterns (see `UKIYO-SHOPIFY-THEME-PROMPT.md`).

## Reference

- Live site: [ukiyo-prod.com](https://ukiyo-prod.com/)
- Repo: [tufailkhan215/ukiyoapp-emergent](https://github.com/tufailkhan215/ukiyoapp-emergent)
- Full spec: `UKIYO-SHOPIFY-THEME-PROMPT.md`
