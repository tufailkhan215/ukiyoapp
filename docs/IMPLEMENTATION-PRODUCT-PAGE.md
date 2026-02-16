# Single Product Page: Color Theme + Dynamic Tabs

## Summary

- **Color theme per collection/product:** Product metafield → collection metafield → section default. Values: `blue` | `purple` | `emerald` | `amber`. Applied to blurs, image glow, badge, Buy Now button, bottom CTA.
- **Tabs (Overview, Benefits, Features, FAQ) per product only:** Content from product metafields; tabs only show when content exists. No snippets.

---

## 1. Color theme

**Resolution order:**  
`product.metafields.custom.color_theme` → `product.collections.first.metafields.custom.color_theme` → `section.settings.default_color_theme`

**Shopify:** Product and/or Collection metafield, namespace `custom`, key `color_theme`, type Single line text, value one of: `blue`, `purple`, `emerald`, `amber`.

---

## 2. Tabs (per product)

| Tab       | Source (product metafields)   | Fallback              |
|----------|-------------------------------|------------------------|
| Overview | `custom.overview`             | `product.description`  |
| Benefits | `custom.benefits`            | — (hide tab if blank)  |
| Features | `custom.features`            | — (hide tab if blank)  |
| FAQs     | `custom.faqs`                | — (hide tab if blank)  |

Overview also uses **What's Included** from `custom.whats_included` (pipe-separated) or section default.  
**Product Details** (Category, Version, Last updated, License): `custom.category`, `custom.version`, `custom.last_updated`, `custom.license` with section defaults.

**Recommended metafields (Products, namespace `custom`):**

| Key               | Type      | Notes                          |
|-------------------|-----------|--------------------------------|
| `color_theme`     | Single line | Optional; overrides collection |
| `badge_label`     | Single line | e.g. Course, Section           |
| `overview`        | Rich text | Optional; else use description  |
| `benefits`        | Rich text |                                |
| `features`        | Rich text |                                |
| `faqs`            | Rich text |                                |
| `whats_included`  | Single line | Pipe-separated list            |
| `category`        | Single line |                                |
| `version`         | Single line |                                |
| `last_updated`    | Single line |                                |
| `license`         | Single line |                                |
| `downloads_count` | Single line or Integer | Optional   |

**Collections:** `custom.color_theme` (Single line) for collection-level default.

---

## 3. Theme files

- **Section:** `sections/main-product.liquid` — resolves color theme, renders layout (breadcrumbs, media, badge, info, price, CTAs, guarantees, downloads, tabs, product details, CTA banner). Tab content from metafields only.
- **Templates:** `templates/product.json` and `templates/product.product-v1.json` use `main-product` with settings only (no tab blocks).
