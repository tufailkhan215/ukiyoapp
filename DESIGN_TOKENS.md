# Design tokens (extracted from frontend)

Used to keep the Shopify theme consistent with the Ukiyo reference.

## Colors

| Token | Value | Usage |
|-------|--------|--------|
| Background (page) | `#000000` | Body, hero |
| Background (header/dark) | `#0f0f10` | Header, footer |
| Scrollbar track | `#0a0a0a` | Custom scrollbar |
| Scrollbar thumb | `#333333` | Custom scrollbar |
| Scrollbar thumb hover | `#555555` | Custom scrollbar |
| Card / elevated | `hsl(0, 0%, 5%)` | Cards, inputs |
| Primary text | `#ffffff` | Headings, logo, buttons |
| Muted text | `#999999` – `#b0b0b0` | Descriptions, subtitles |
| Subheading grey | `#a0a0a0` – `#cccccc` | Section subtitles |
| Brand grid box | `#232323` – `#282828` | Trusted-by cards |
| Border | `rgba(255,255,255,0.08)` – `0.15` | Dividers, cards |
| Selection bg | `#ffffff` | ::selection |
| Selection text | `#000000` | ::selection |

### CSS variables (HSL, no "hsl()")

- `--background`: 0 0% 0%
- `--foreground`: 0 0% 100%
- `--card`: 0 0% 5%
- `--primary`: 0 0% 100%
- `--primary-foreground`: 0 0% 0%
- `--muted`: 0 0% 15%
- `--muted-foreground`: 0 0% 60%
- `--border`: 0 0% 15%
- `--radius`: 0.75rem

### Accent (optional)

- Gradient text: `linear-gradient(135deg, #8b5cf6 0%, #d946ef 50%, #ec4899 100%)`
- Glow violet: `0 0 40px rgba(139, 92, 246, 0.3)`
- Glow fuchsia: `0 0 40px rgba(217, 70, 239, 0.3)`

## Typography

| Role | Font | Weights | Notes |
|------|------|--------|--------|
| Body / UI | Inter | 300–900 | Default 400 |
| Headings | Space Grotesk | 400, 500, 600, 700 | h1–h6 |
| Serif accent | Playfair Display | 400–900 | Optional |
| Logo | Space Grotesk | 700, uppercase | |
| Buttons | Space Grotesk / Inter | 600–700, uppercase | |

### Sizes (reference)

- Hero headline: `clamp(2rem, 6vw, 4rem)`
- Section title: `clamp(1.75rem, 4vw, 2.5rem)`
- Body: 1rem
- Small / captions: 0.75rem – 0.875rem

## Spacing

- Section padding vertical: 5rem (80px) – 7.5rem (120px) via `--section-padding-y`
- Section max-width: 1280px (`--section-max-width`)
- Section horizontal padding: 1.5rem (mobile), 2rem (768px+)
- Header height: 72px (`--header-height`)
- Button padding: 1rem 1.75rem
- Card padding: 1rem – 1.5rem
- Gap between elements: 0.5rem – 2rem scale

## Breakpoints

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## Animation timing

- Transitions (buttons, links, inputs): 0.3s ease
- scrollPulse: 2s ease-in-out infinite
- liquidFlow: 20s / 25s ease-in-out infinite
- marquee: 40s linear infinite
- shimmer: 3s ease-in-out infinite
- float: 6s ease-in-out infinite

All motion respects `prefers-reduced-motion: reduce` (animations disabled).
