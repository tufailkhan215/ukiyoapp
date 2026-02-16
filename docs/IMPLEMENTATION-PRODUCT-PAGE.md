# Single Product Page: Color Theme + Dynamic Tabs

## Summary

- **Color theme per collection/product**: Resolve from product metafield → collection metafield → section default; apply same gradient/accents as shop-sub-page (blue, purple, emerald, amber).
- **Tabs (Overview, Benefits, Features, FAQ) per product**: Each tab’s content comes from product metafields (or fallbacks). Only tabs that have content are shown, so they “change for different products only.”

---

## 1. Color theme (per collection / product)

**Resolution order**

1. `product.metafields.custom.color_theme` (if set)  
2. Else first collection: `product.collections.first.metafields.custom.color_theme`  
3. Else section setting: `section.settings.default_color_theme`

**Allowed values**: `blue` | `purple` | `emerald` | `amber`

**Where to use**

- Badge and glow on product image
- “Buy Now” button gradient
- Bottom “Get Unlimited Access” banner gradient
- Any other accent (e.g. checkmarks can stay emerald or follow theme)

**Shopify setup**

- **Product metafield** (optional): Namespace `custom`, key `color_theme`, type Single line text, value one of: blue, purple, emerald, amber.
- **Collection metafield** (optional): Same namespace/key/type for collection-level default.

Theme Liquid uses the resolution order above and then applies the same class pattern as `shop-sub-page-about.liquid` (e.g. `from-purple-500 to-pink-500` when `color_theme == 'purple'`).

---

## 2. Dynamic tabs (Overview, Benefits, Features, FAQ)

**Content source per tab**

| Tab       | Primary source                         | Fallback                    |
|----------|-----------------------------------------|-----------------------------|
| Overview | `product.metafields.custom.overview`   | `product.description`       |
| Benefits | `product.metafields.custom.benefits`   | Section default or hide tab |
| Features | `product.metafields.custom.features`   | Section default or hide tab |
| FAQs     | `product.metafields.custom.faqs`       | Section default or hide tab |

So each product can have different tab content; if a metafield is blank, use fallback or hide that tab.

**Recommended metafields (namespace `custom`)**

| Key          | Type        | Notes                                      |
|-------------|-------------|--------------------------------------------|
| `overview`  | Rich text   | Optional; else use product description     |
| `benefits`  | Rich text   | HTML/list for “What’s included” style       |
| `features`  | Rich text   | HTML/list                                   |
| `faqs`      | Rich text   | Or use list of metaobjects (question/answer)|

**Behaviour**

- Only render a tab if there is content (metafield or fallback).
- Overview always has at least `product.description`; other tabs can be hidden when empty.
- Product details sidebar (Category, Version, Last updated, License): use product metafields with section-setting defaults so they can vary per product.

**Define in Shopify Admin (Settings → Custom data)**

- **Products**: `custom.color_theme` (Single line), `custom.badge_label` (Single line), `custom.overview` (Rich text), `custom.benefits` (Rich text), `custom.features` (Rich text), `custom.faqs` (Rich text), `custom.whats_included` (Single line, pipe-separated list), `custom.category` / `custom.version` / `custom.last_updated` / `custom.license` (Single line), `custom.downloads_count` (Single line or Integer).
- **Collections**: `custom.color_theme` (Single line): `blue`, `purple`, `emerald`, or `amber`.

---

## 3. Theme implementation

- **Section**: `sections/main-product.liquid` (or dedicated section) implements:
  - Color theme resolution (product → collection → section default).
  - Full layout: breadcrumbs, media + badge, info column, price, CTAs, guarantees, downloads, then tabs, then product details + CTA banner.
  - Tabs: loop over Overview / Benefits / Features / FAQ; for each, output tab button and panel; content from metafields (and description for Overview); hide tab if no content.
- **Template**: Use `product.json` or `product.product-v1.json` to include this section and any section settings (default color theme, default labels, CTA URLs, etc.).
- **Metafields**: Define in Shopify Admin (Settings → Custom data) for products and optionally collections so merchants can set color theme and tab content per product.

This gives “each collection product have different color theme” and “tabs for description, benefit, features, faq also change for different products only” as requested.
