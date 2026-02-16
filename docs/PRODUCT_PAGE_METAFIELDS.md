# Product page: color theme & tabs (metafields)

The main product section (`sections/main-product.liquid`) supports **per-product color theme** and **product-specific tab content** (Overview, Benefits, Features, FAQ).

## Color theme (per collection or product)

- **Automatic from collection:** If the product belongs to a collection, the theme is derived from the **first collection handle**:
  - `courses` → **purple** / pink
  - `sections` or `shopify-sections` → **amber** / orange
  - `agents` or `automation` → **emerald** / teal
  - Otherwise → **blue** / cyan (or the section default)
- **Override per product:** Set product metafield **`custom.color_theme`** (single line text) to: `blue` | `purple` | `emerald` | `amber`.

**Where to set:** Shopify Admin → Settings → Custom data → Products → Add definition:  
Name `Color theme`, Namespace and key `custom.color_theme`, Type **Single line text**.

---

## Product-specific tabs

Only tabs that have content are shown. Content sources:

| Tab       | Source |
|----------|--------|
| Overview | `product.description` + **What's Included** list + **Product Details** (category, version, license, etc.) |
| Benefits | Product metafield (list or text) |
| Features | Product metafield (list or text) |
| FAQs     | Two product metafields: questions list + answers list |

### Recommended product metafields (Settings → Custom data → Products)

Create these definitions so each product can have its own tab content:

| Name (admin label)   | Namespace and key       | Type                | Notes |
|----------------------|-------------------------|----------------------|--------|
| Color theme          | `custom.color_theme`    | Single line text     | Optional override: `blue`, `purple`, `emerald`, `amber` |
| Type badge          | `custom.product_type_badge` | Single line text | e.g. "Course", "Automation Template", "Shopify Section" |
| What's Included     | `custom.whats_included` | List — Single line text | Bullet list for Overview |
| Product category    | `custom.product_category` | Single line text  | e.g. "Course"; shown in Product Details |
| Version             | `custom.product_version` | Single line text   | e.g. "1.0" |
| Last updated        | `custom.last_updated`    | Single line text   | e.g. "Feb 2026" |
| License             | `custom.license`        | Single line text   | e.g. "Commercial" |
| Benefits            | `custom.benefits`       | List — Single line text | Each item = one benefit (Benefits tab) |
| Features            | `custom.features`       | List — Single line text | Each item = one feature (Features tab) |
| FAQ questions       | `custom.faq_questions`   | List — Single line text | One question per entry |
| FAQ answers         | `custom.faq_answers`    | List — Single line text | One answer per entry (same order as questions) |
| Downloads count     | `custom.downloads_count`| Integer or single line | Shown next to download icon |

For **FAQ**, keep the same number of entries in `custom.faq_questions` and `custom.faq_answers`; they are paired by index.

---

## Section settings (Theme Editor)

Under the Product template, you can set:

- **Default color theme** when not inferred from collection or product metafield
- **Default type badge** and badge icon (course / template / section)
- **Breadcrumb** shop URL and label
- **Rating** text and footer
- **Guarantees** (e.g. Instant Download, 14-Day Guarantee, Lifetime Access)
- **Downloads** placeholder and label
- **Default What's Included** (pipe-separated) when product has no `whats_included` metafield
- **Default version / license** for Product Details
- **Bottom CTA** (heading, text, primary/secondary buttons and URLs)
- **Buy button** text

---

## Summary

1. **Color theme:** Set by collection handle automatically, or override with product metafield `custom.color_theme`.
2. **Tabs:** Overview always uses description + What's Included + Product Details. Benefits, Features, and FAQs appear only when the corresponding product metafields have content.
3. Create the product metafield definitions above in Shopify Admin so merchants can fill them per product.
