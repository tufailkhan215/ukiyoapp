# Product Page: Metafields to Create in Shopify

Use this list to create **metafield definitions** in Shopify (Settings → Custom data → Products / Collections) or via the Admin API. All use **namespace: `custom`**.

---

## Quick reference (Products)

| Key | Shopify type | Purpose | Example / format |
|-----|--------------|---------|------------------|
| `color_theme` | Single line text | Override theme color | `blue`, `purple`, `emerald`, `amber` |
| `badge_label` | Single line text | Badge on product image | `Course`, `Template`, `Section` |
| `overview` | Rich text | Overview tab (else description) | HTML/rich text |
| `whats_included` | Single line text | Pipe-separated “What’s Included” | `Item 1\|Item 2\|Item 3` |
| `benefits` | Rich text | Benefits tab (rich) | HTML/rich text |
| `benefits_list` | Single line text | Benefits tab (list) | `Benefit 1\|Benefit 2` |
| `benefits_intro` | Rich text | Intro above benefits list | Short paragraph |
| `benefits_style` | Single line text | `simple` or `structured` | `structured` |
| `benefits_subtext` | Single line text | Subtext under Benefits heading | One line |
| `benefits_stats` | Single line text | 4 circular stats (structured) | `94\|Label\|87\|Label\|76\|Label\|92\|Label` |
| `benefits_progress` | Single line text | 4 progress bars (structured) | `Label\|90\|Label\|85\|Label\|88\|Label\|82` |
| `benefits_without_list` | Single line text | “Without” column items | `Item 1\|Item 2` |
| `benefits_with_list` | Single line text | “With” column items | `Item 1\|Item 2` |
| `benefits_structured_variant` | Single line text | `course` or `impact` | `impact` |
| `benefits_impact_cards` | Single line text | 3 impact cards | `$0\|Monthly Savings\|dollar-sign\|0hrs\|Time Saved\|clock\|0%\|\|trending-up` |
| `features` | Rich text | Features tab (rich) | HTML/rich text |
| `features_list` | Single line text | Features tab (list) | `Feature 1\|Feature 2` |
| `features_intro` | Rich text | Intro above features | Short paragraph |
| `features_style` | Single line text | `simple` or `cards` | `cards` |
| `features_cards` | Multi-line text | Feature cards (one per line) | `Title\|Description\|zap` |
| `faqs` | Rich text | FAQs tab (rich fallback) | HTML/rich text |
| `faqs_accordion` | Multi-line text | FAQs accordion | `Question?\|Answer.` per line |
| `category` | Single line text | Product details: category | `Digital Product` |
| `version` | Single line text | Product details: version | `1.0` |
| `last_updated` | Single line text | Product details: last updated | `Feb 2026` |
| `license` | Single line text | Product details: license | `Commercial` |
| `downloads_count` | Integer or Single line text | Downloads stat | `2847` |

**Collections (namespace `custom`):**

| Key | Shopify type | Purpose | Example |
|-----|--------------|---------|--------|
| `color_theme` | Single line text | Default theme for products in collection | `blue`, `purple`, `emerald`, `amber` |

---

## 1. Product metafield definitions (copy-paste ready)

Create these under **Settings → Custom data → Products** (or via API). Use **namespace: `custom`** and the **key** as below. **Name** and **Description** can be copied from the table.

| # | Key | Type | Name | Description |
|---|-----|------|------|-------------|
| 1 | `color_theme` | Single line text | Color theme | Overrides collection/section. One of: blue, purple, emerald, amber. |
| 2 | `badge_label` | Single line text | Badge label | Shown on product image (e.g. Course, Template, Section). |
| 3 | `overview` | Rich text | Overview | Overview tab content. If blank, product description is used. |
| 4 | `whats_included` | Single line text | What's Included | Pipe-separated list for Overview tab. |
| 5 | `benefits` | Rich text | Benefits (rich text) | Benefits tab rich content. Use with simple layout. |
| 6 | `benefits_list` | Single line text | Benefits (list) | Pipe-separated list for simple Benefits layout. |
| 7 | `benefits_intro` | Rich text | Benefits intro | Optional intro above benefits list/rich content. |
| 8 | `benefits_style` | Single line text | Benefits layout | simple or structured. |
| 9 | `benefits_subtext` | Single line text | Benefits subtext | Subtext under main Benefits heading (structured). |
| 10 | `benefits_stats` | Single line text | Benefits stats | 4 pairs: value\|label (e.g. 94\|Course Completion\|87\|Apply Skills…). |
| 11 | `benefits_progress` | Single line text | Benefits progress | 4 pairs: label\|percent (e.g. Technical Proficiency\|90\|…). |
| 12 | `benefits_without_list` | Single line text | Benefits “Without” list | Pipe-separated items for left comparison column. |
| 13 | `benefits_with_list` | Single line text | Benefits “With” list | Pipe-separated items for right comparison column. |
| 14 | `benefits_structured_variant` | Single line text | Benefits structured variant | course or impact. |
| 15 | `benefits_impact_cards` | Single line text | Benefits impact cards | 3× value\|label\|icon (icons: dollar-sign, clock, trending-up). |
| 16 | `features` | Rich text | Features (rich text) | Features tab rich content (simple layout). |
| 17 | `features_list` | Single line text | Features (list) | Pipe-separated list for simple Features layout. |
| 18 | `features_intro` | Rich text | Features intro | Optional intro above features. |
| 19 | `features_style` | Single line text | Features layout | simple or cards. |
| 20 | `features_cards` | Multi-line text | Features cards | One line per card: title\|description\|icon (icons: zap, shield, users, clock, download, star). |
| 21 | `faqs` | Rich text | FAQs (rich text) | FAQs tab when faqs_accordion is blank. |
| 22 | `faqs_accordion` | Multi-line text | FAQs accordion | One line per FAQ: question\|answer. |
| 23 | `category` | Single line text | Category | Product details sidebar. |
| 24 | `version` | Single line text | Version | Product details sidebar. |
| 25 | `last_updated` | Single line text | Last updated | Product details sidebar. |
| 26 | `license` | Single line text | License | Product details sidebar. |
| 27 | `downloads_count` | Integer | Downloads count | Shown next to “Downloads” (optional). |

---

## 2. Collection metafield definition

Create under **Settings → Custom data → Collections**. Namespace: `custom`.

| Key | Type | Name | Description |
|-----|------|------|-------------|
| `color_theme` | Single line text | Color theme | Default theme for products in this collection. One of: blue, purple, emerald, amber. |

---

## 3. Shopify type mapping

Use these **definition types** in Shopify so the theme can read values correctly:

| Doc “type” | Shopify metafield type |
|------------|------------------------|
| Single line text | `single_line_text_field` |
| Multi-line text | `multi_line_text_field` |
| Rich text | `rich_text_field` |
| Integer | `number_integer` |

---

## 4. Example values (for testing or defaults)

**color_theme (Product or Collection)**  
`blue` | `purple` | `emerald` | `amber`

**badge_label**  
`Product` | `Course` | `Template` | `Section` | `Automation Template`

**whats_included**  
`Complete files\|Documentation\|Free updates\|Commercial license\|Email support`

**benefits_stats (structured course)**  
`94|Course Completion|87|Apply Skills Within 1 Week|76|Career Advancement|92|Would Recommend`

**benefits_progress**  
`Technical Proficiency|90|Creative Application|85|Industry Knowledge|88|Problem Solving|82`

**benefits_impact_cards (structured impact)**  
`$0|Monthly Savings|dollar-sign|0hrs|Time Saved Weekly|clock|0%|Productivity Boost|trending-up`

**benefits_without_list**  
`Hours of random tutorials|Outdated information|No structured path|Trial and error|No support`

**benefits_with_list**  
`Expert-led curriculum|Current best practices|Step-by-step progression|Frameworks included|Community access`

**features_cards (multi-line, one line per card)**  
```
Ready to Use|Download and start using immediately. No complex setup required.|zap
Fully Tested|Extensively tested to ensure reliability and performance.|shield
Team Friendly|Works great for individuals and teams of any size.|users
```

**faqs_accordion (multi-line, one line per FAQ)**  
```
What do I get?|You receive instant access to download the product.
Is there a guarantee?|Yes, we offer a 14-day money-back guarantee.
Can I use for client work?|Yes, your purchase includes a commercial license.
```

**category / version / last_updated / license**  
`Digital Product` | `1.0` | `Feb 2026` | `Commercial`

---

## 5. Creating definitions in Shopify Admin

1. **Settings → Custom data → Products** (or Collections).
2. **Add definition** → choose **Namespace**: create or select `custom`.
3. **Key**: use the exact key from the table (e.g. `color_theme`, `benefits_stats`).
4. **Name**: friendly label (e.g. “Color theme”, “Benefits stats”).
5. **Type**: pick the type from section 3 (e.g. Single line text, Rich text, Multi-line text, Number integer).
6. **Description** (optional): copy from the table.

No need to set default values on the definitions; the theme uses section settings as fallbacks when a product (or collection) has no value.

---

## 6. Optional: JSON for Metafield Definition API

Use with **Shopify Admin API** (`POST /admin/api/2024-01/metafield_definitions.json`) if you create definitions by script. Example for one product metafield:

```json
{
  "metafield_definition": {
    "namespace": "custom",
    "key": "color_theme",
    "name": "Color theme",
    "description": "Overrides collection/section. One of: blue, purple, emerald, amber.",
    "type": "single_line_text_field",
    "owner_type": "product"
  }
}
```

Repeat with each key and the correct `type` (`single_line_text_field`, `multi_line_text_field`, `rich_text_field`, `number_integer`). For collections, use `"owner_type": "collection"` and only the `color_theme` definition.
