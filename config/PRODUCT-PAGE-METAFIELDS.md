# Product page: data options and snippets

The product page supports **two ways** to supply data, so you can avoid creating many metafields.

---

## Option A: One JSON metafield (recommended)

Create **one** product metafield and put all optional data in it.

1. **Settings → Custom data → Products → Add definition**
2. Name: **Product page**, Namespace and key: `custom.product_page`, Type: **JSON**
3. On each product, paste JSON in this shape (all keys optional):

```json
{
  "color_theme": "purple",
  "type_badge": "Course",
  "short_description": "One sentence summary for the hero.",
  "feature_tags": ["content", "campaign", "templates"],
  "whats_included": ["Complete files ready to use", "Documentation and setup guide", "Free updates", "Commercial license", "Email support"],
  "benefits": ["Benefit one", "Benefit two", "Benefit three"],
  "features": ["Feature one", "Feature two"],
  "faqs": [
    { "q": "How do I get access?", "a": "Instant download after purchase." },
    { "q": "Refund policy?", "a": "14-day guarantee." }
  ],
  "product_category": "Course",
  "version": "1.0",
  "last_updated": "Feb 2026",
  "license": "Commercial",
  "downloads_count": "883+",
  "rating": 5,
  "review_count": 24
}
```

- **color_theme**: `blue` | `purple` | `emerald` | `amber` (can also be set on collection or section).
- **faqs**: array of `{ "q": "...", "a": "..." }` or `{ "question": "...", "answer": "..." }`.
- Omit any key to use fallbacks (e.g. first collection title for type badge, product description for short description, product tags for feature tags).

---

## Option B: Individual metafields + native fields

If you prefer separate metafields or already use them:

- **Product**: `custom.color_theme`, `custom.type_badge`, `custom.short_description`, `custom.feature_tags` (list), `custom.benefits`, `custom.features`, `custom.whats_included` (list), `custom.faqs` (JSON), `custom.product_category`, `custom.version`, `custom.last_updated`, `custom.license`, `custom.downloads_count`, `custom.rating`, `custom.review_count`
- **Collection**: `custom.color_theme` (single line) — applies to all products in that collection if product has no override.

The section uses **Option A** when `custom.product_page` is set; otherwise it uses **Option B** and native fields (description, tags, product type).

---

## Color theme (any option)

- **Product** `custom.color_theme` (or inside JSON as `color_theme`)
- **Collection** `custom.color_theme`
- **Section setting** “Default color theme” in the Product section

Priority: product → collection → section default.

---

## Snippets (reusable markup)

The product section is built from snippets so you can reuse or override parts:

| Snippet | Use |
|--------|-----|
| `snippets/product-page-hero.liquid` | Media, badge, thumbnails, title, short description, feature tags, price, Buy/Save/Share, guarantees, downloads |
| `snippets/product-page-tabs.liquid` | Tab bar (Overview, Benefits, Features, FAQs) and panels + Product details sidebar |
| `snippets/product-page-cta.liquid` | Bottom “Get Unlimited Access” (or custom) CTA block |

They receive data from the section (product, section, and assigned variables). To change layout or copy, edit the snippet; to change what data is shown, use the JSON metafield or individual metafields above.
