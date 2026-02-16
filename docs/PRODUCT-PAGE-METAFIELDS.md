# Product page: color theme & tabs (metafields)

The single product section (`sections/main-product.liquid`) supports **per-product color theme** and **product-specific tab content** (Overview, Benefits, Features, FAQs) using Shopify metafields.

## 1. Color theme per product / collection

**Resolution order:** product metafield → first collection metafield → section setting “Default color theme”.

| Where | Namespace & key | Type | Values |
|-------|-----------------|------|--------|
| Product | `custom.color_theme` | Single line text | `blue`, `purple`, `emerald`, `amber` |
| Collection | `custom.color_theme` | Single line text | Same |

- **Product:** Settings → Custom data → Products → Add definition: `color_theme`, Single line text. On each product, set e.g. `purple` for Courses, `emerald` for AI Agents, `amber` for Sections.
- **Collection:** Settings → Custom data → Collections → Add definition: `color_theme`, Single line text. Set once per collection so all products in that collection use that theme unless a product has its own `color_theme`.

Result: buttons, badge, glows, and membership CTA use the chosen gradient (blue/cyan, purple/pink, emerald/teal, amber/orange).

---

## 2. Tab content (product-specific)

Tabs are shown only when the corresponding content exists. Content is **per product** via metafields.

### Product metafields to define (Settings → Custom data → Products)

| Key | Type | Used for |
|-----|------|----------|
| `custom.type_badge` | Single line text | Badge on image (e.g. "Course", "Shopify Section", "Automation Template"). |
| `custom.short_description` | Single line or Multi-line text | Short summary; if blank, description is truncated. |
| `custom.feature_tags` | List of single line text | Small tags under description (e.g. "content", "campaign", "templates"). |
| `custom.whats_included` | List of single line text | “What’s Included” list in **Overview** tab. |
| `custom.benefits` | Rich text | **Benefits** tab body. |
| `custom.features` | Rich text | **Features** tab body. |
| `custom.downloads_count` | Single line text (or number) | e.g. "883+". |
| `custom.version` | Single line text | Product details sidebar (e.g. "1.0"). |
| `custom.license` | Single line text | Product details sidebar (e.g. "Commercial"). |

**Overview tab:** Always uses the main **product description** (from Shopify product body). If `custom.whats_included` is set, a “What’s Included” list is shown below the description.

---

## 3. FAQs (two options)

### Option A: List of metaobject references (recommended)

1. **Metaobject definition:** Settings → Custom data → Metaobjects → Create type `faq_entry` with:
   - `question` (Single line text)
   - `answer` (Multi-line text or Rich text)
2. **Product metafield:** Products → Add definition:
   - Name: e.g. `FAQs`
   - Namespace and key: `custom.faqs`
   - Type: **List of metaobject references** → Metaobject type: `faq_entry`
3. On each product, add FAQ entries and reference them in the `custom.faqs` list.

The section expects each referenced metaobject to have `question` / `answer` (or `title` / `body`).

### Option B: Two list metafields

1. **Product metafields:**
   - `custom.faq_questions` – List of single line text (one question per item).
   - `custom.faq_answers` – List of single line text (one answer per item, same order as questions).
2. Questions and answers are paired by index (first question with first answer, etc.).

---

## 4. Section settings (theme editor)

- **Default color theme** – Fallback when no product/collection `color_theme` is set.
- **Default type badge** – Fallback when product has no `custom.type_badge`.
- **Tab labels** – Overview, Benefits, Features, FAQs (and headings).
- **Trust copy** – Instant Download, 14-Day Guarantee, Lifetime Access.
- **Downloads** – Fallback when `custom.downloads_count` is blank.
- **Product details** – Default version and license when metafields are blank.
- **Membership CTA** – Heading, subtext, primary/secondary links (e.g. “View Membership Plans”, “Browse More”).

---

## 5. Quick reference: collection → theme

Use product or collection `custom.color_theme` so each collection can have its own look:

- **Courses** → `purple`
- **AI Agents** → `emerald`
- **Shopify Sections** → `amber`
- **Other** → `blue` (or leave unset to use section default)

This gives you different color themes per collection/product and fully product-specific tabs (description, benefits, features, FAQ) in the theme.
