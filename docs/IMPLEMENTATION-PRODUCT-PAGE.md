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

| Tab       | Source (product metafields)   | Fallback / alternative |
|----------|-------------------------------|-------------------------|
| Overview | `custom.overview`             | `product.description`   |
| Benefits | **Simple:** `custom.benefits` (rich text) or `custom.benefits_list` (pipe-separated). **Structured:** stats + progress bars + comparison cards (see below). | Section default lists when layout is structured |
| Features | **Simple:** `custom.features` (rich text) or `custom.features_list` (pipe-separated). **Cards:** grid of feature cards from `custom.features_cards` (see below). | Section default cards when layout is cards |
| FAQs     | **Accordion:** `custom.faqs_accordion` (multi-line, question\|answer per line). **Fallback:** `custom.faqs` (rich text). | Section default accordion when set |

Overview also uses **What's Included** from `custom.whats_included` (pipe-separated) or section default.  
**Section headings** for each tab (e.g. "About This Product", "What's Included", "Benefits", "Features", "FAQs") are configurable in the section settings so content can differ per theme or product context.  
**Product Details** (Category, Version, Last updated, License): `custom.category`, `custom.version`, `custom.last_updated`, `custom.license` with section defaults.

### Benefits: structured layout

When **Benefits layout** is **Structured** (section setting or product `custom.benefits_style` = `structured`), the Benefits tab shows:

- **Header:** Section heading (e.g. "Why This Course?") + optional subtext from `custom.benefits_subtext` or section default.
- **What Students Achieve:** 4 circular stats. Data from `custom.benefits_stats` (Single line) or section default. Format: `value|label|value|label|value|label|value|label` (e.g. `94|Course Completion|87|Apply Skills Within 1 Week|76|Career Advancement|92|Would Recommend`).
- **Skill Development Progress:** 4 progress bars. Data from `custom.benefits_progress` (Single line) or section default. Format: `label|percent|label|percent|label|percent|label|percent` (e.g. `Technical Proficiency|90|Creative Application|85|Industry Knowledge|88|Problem Solving|82`).
- **Comparison cards:** Left "Without This Course" / right "With This Course". Lists from `custom.benefits_without_list` and `custom.benefits_with_list` (Single line, pipe-separated) or section defaults. Labels are configurable in section settings.

**Structured variant:** Section or product `custom.benefits_structured_variant` = `course` (default) | `impact`.
- **Course:** Above layout (4 circular stats "What Students Achieve", "Skill Development Progress" bars, comparison).
- **Impact:** "Conversion Impact" — 3 cards (value + label + icon: dollar-sign, clock, trending-up). Data from `custom.benefits_impact_cards` or section default. Format: `value|label|icon|value|label|icon|value|label|icon`. Then "Average Store Improvements" (same 4 progress bars as course). Then comparison with default labels "Without Premium Sections" / "With Premium Sections".

Structured Benefits tab is shown when at least one of stats, progress, impact cards, or comparison lists has content. Section settings: `benefits_layout`, `benefits_structured_variant`, `benefits_impact_heading`, `benefits_improvements_heading`, `default_benefits_impact_cards`, plus existing structured headings and default textareas.

### Features: cards layout

When **Features layout** is **Cards** (section setting or product `custom.features_style` = `cards`), the Features tab shows a grid of cards (e.g. "Key Features") with icon, title, and description per card.

- **Data:** `custom.features_cards` (Multi-line text) or section default. One line per card; each line format: `title|description|icon`.
- **Icons:** `zap`, `shield`, `users`, `clock`, `download`, `star` (Lucide-style). Unknown icon key falls back to a check-style icon.
- **Section settings:** `features_layout` (simple | cards), `features_heading` (e.g. "Key Features"), `default_features_cards` (multi-line, same format).

Features tab is shown when cards layout has content or when simple layout has `custom.features` / `custom.features_list`.

### FAQs: accordion layout

When **FAQ accordion** content is present (`custom.faqs_accordion` or section default), the FAQs tab shows an accordion (e.g. "Frequently Asked Questions") with one question per row; click to expand/collapse the answer.

- **Data:** `custom.faqs_accordion` (Multi-line text) or section default. One line per FAQ; each line format: `question|answer`.
- **Markup:** `max-w-3xl` container, rounded panel with border, each item has a button (question) and collapsible answer. One item open at a time.
- **Section settings:** `faqs_heading` (default "Frequently Asked Questions"), `default_faqs_accordion` (multi-line, same format). If no accordion data, tab falls back to `custom.faqs` (rich text) when set.

**Recommended metafields (Products, namespace `custom`):**

| Key               | Type      | Notes                          |
|-------------------|-----------|--------------------------------|
| `color_theme`     | Single line | Optional; overrides collection |
| `badge_label`     | Single line | e.g. Course, Section           |
| `overview`        | Rich text | Optional; else use description  |
| `benefits`        | Rich text | Or use benefits_list for list (simple layout) |
| `benefits_list`   | Single line | Pipe-separated; list with checkmarks (simple layout) |
| `benefits_intro`  | Rich text | Optional intro paragraph above list/benefits content |
| `benefits_style`  | Single line | `simple` or `structured`; falls back to section "Benefits layout" |
| `benefits_subtext` | Single line | Subtext under main Benefits heading (structured) |
| `benefits_stats`  | Single line | 4 pairs value\|label (e.g. 94\|Course Completion\|87\|…); structured only |
| `benefits_progress` | Single line | 4 pairs label\|percent (e.g. Technical Proficiency\|90\|…); structured only |
| `benefits_without_list` | Single line | Pipe-separated items for "Without" column; structured only |
| `benefits_with_list` | Single line | Pipe-separated items for "With" column; structured only |
| `benefits_structured_variant` | Single line | `course` or `impact`; structured variant (course = circles + progress, impact = 3 cards + progress) |
| `benefits_impact_cards` | Single line | Impact variant: 3× value\|label\|icon (e.g. $0\|Monthly Savings\|dollar-sign; icons: dollar-sign, clock, trending-up) |
| `features`        | Rich text | Simple layout; or use features_list |
| `features_list`   | Single line | Simple layout; pipe-separated list with checkmarks |
| `features_intro`  | Rich text | Optional intro (simple layout only) |
| `features_style`  | Single line | `simple` or `cards`; falls back to section "Features layout" |
| `features_cards`  | Multi-line text | Cards layout: one line per card, format title\|description\|icon (icon: zap, shield, users, clock, download, star) |
| `faqs`            | Rich text | Fallback when faqs_accordion is blank |
| `faqs_accordion`  | Multi-line text | One line per FAQ: question\|answer; accordion layout |
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
