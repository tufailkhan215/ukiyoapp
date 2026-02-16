# Product page: color theme & tabs (snippets + blocks, no metafield lists)

The product page uses **snippets** and **section blocks** so tab content is **dynamic per product from the product description only**—no metafield lists required.

## Color theme (per collection or product)

- **From collection:** First collection handle sets the theme: `courses` → purple, `sections` → amber, `agents`/`automation` → emerald, else blue.
- **Override:** Optional product metafield **`custom.color_theme`** (single line): `blue` | `purple` | `emerald` | `amber`.

---

## Tabs: blocks + snippet, description-only content

### How it works

1. **Blocks** – In the Theme Editor, the Product section has **Tab** blocks. Each block = one tab (label, optional panel heading, content source).
2. **Snippet** – `snippets/product-tab-content.liquid` renders each tab’s content. It only reads the **product description** and **section settings** (e.g. default “What’s Included”).
3. **No metafield lists** – Benefits, Features, FAQ, etc. all come from **one field: the product description**, structured with headings.

### Product description format

Use `## SectionName` on its own line to start a section. Everything **before** the first `##` is the **Overview** content.

**Example:**

```
Main overview text for this product. Shown in the Overview tab.

## Benefits
- Saves time
- Easy to use
- No code required

## Features
- Feature one
- Feature two

## FAQ
**Q:** How do I get access?
**A:** Instant download after purchase.

**Q:** Refunds?
**A:** 14-day guarantee.
```

- **Overview** tab → content before the first `##` (plus “What’s Included” from section settings).
- **Benefits** tab → block with content source “From description (section by heading)” and section heading **Benefits**.
- **Features** tab → same, section heading **Features**.
- **FAQ** tab → same, section heading **FAQ**.

Each product can have different text; you only edit the product description in the admin.

### Tab block settings

| Setting           | Purpose |
|-------------------|--------|
| **Tab label**     | Text in the tab bar (e.g. Overview, Benefits, FAQ). |
| **Panel heading** | Optional; defaults to tab label. |
| **Content source**| **Overview** = description (before first ##) + What’s Included from section. **From description (section by heading)** = one section after a `## SectionName` line. |
| **Section heading** | For “From description” only. Must match the text after `##` exactly (e.g. `Benefits`, `Features`, `FAQ`). |

### What’s Included (no metafield)

“What’s Included” is **section-level** only. In the Product section settings, set **Default What’s Included** as a pipe-separated list, e.g.:

`Complete files ready to use|Documentation and setup guide|Free updates|Commercial license|Email support`

That list is shown in the Overview tab for all products. To vary it per product, you can add a `## What's Included` section in the product description and add a tab block with that section heading.

### Product Details sidebar

Category, Version, Last updated, License can use **optional** single metafields (`custom.product_category`, etc.) or fall back to **section settings** (default version, default license) and **product type** (as category). No list metafields are used.

---

## Optional metafields (only if you want overrides)

| Metafield              | Use |
|------------------------|-----|
| `custom.color_theme`   | Override color theme per product. |
| `custom.product_type_badge` | Override badge label (e.g. Course, Section). |
| `custom.product_category`   | Override category in Product Details. |
| `custom.product_version`    | Override version. |
| `custom.last_updated`       | Override last updated. |
| `custom.license`            | Override license. |
| `custom.downloads_count`    | Override download count. |

No list metafields are required; all tab content is driven by the product description and blocks.

---

## Summary

1. **Tabs** = section blocks (add/reorder in Theme Editor).
2. **Content** = snippet reads **product description** only; sections are marked with `## SectionName`.
3. **What’s Included** = section setting (pipe-separated), not a metafield.
4. **Product Details** = section defaults + optional single metafields; category can use product type.
5. No Benefits/Features/FAQ (or other) **list** metafields; everything is dynamic from the description and blocks.
