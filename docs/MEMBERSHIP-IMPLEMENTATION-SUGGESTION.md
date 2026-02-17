# Membership Implementation — Analysis & Suggestions

This document suggests **how to implement membership** in the Ukiyo theme so that certain **products and pages are available only to active members**. It does not change any code; it only describes options and where to implement.

---

## 1. Current theme state

- **Membership marketing:** The theme already has a membership sales page (`page.memebership.json` — note typo in filename) with:
  - Membership intro, “everything you need,” pricing plans, browse library, deep-dive sections.
- **Product/collection CTAs:** Product page and shop sub-pages (courses, automation-templates, ai-agents) promote “Join membership” / “View Membership Plans” but **do not gate** access.
- **Customer account:** Login, register, account, and order pages exist; the theme can use the Liquid `customer` object (e.g. `customer.tags`, `customer.metafields`).
- **No gating yet:** All products and pages are currently visible to everyone.

---

## 2. What “active membership” means (you must choose)

Define membership in one of these ways (or a combination):

| Approach | Meaning | How to track |
|--------|--------|----------------|
| **A) Customer tag** | “Member” = has tag (e.g. `member` or `membership-active`). | Add/remove tag when they subscribe or cancel (app/Flow). |
| **B) Customer metafield** | “Member” = metafield says active and optionally expiry (e.g. `membership_expires_at`). | Set/update via app or Shopify Flow when subscription is active/cancelled. |
| **C) Subscription app** | “Member” = has an active subscription in an app (ReCharge, Appstle, etc.). | App exposes status via customer tag, metafield, or API; theme uses tag/metafield for Liquid. |
| **D) One-time “lifetime” product** | “Member” = has purchased a specific product (e.g. “Lifetime access”). | Order history check or tag added by Flow/app on purchase. |

**Recommendation:** Use **customer tags** for “is member” (e.g. `member` or `membership-active`) and optionally a **customer metafield** for expiry (e.g. `custom.membership_expires_at`) if you have time-based membership. Tags are simple to use in Liquid (`customer.tags contains 'member'`); metafields allow expiry logic.

---

## 3. How to set “member” status (no theme code — backend only)

- **Subscription app (e.g. ReCharge, Appstle, Seal Subscriptions):** When a customer subscribes to a “membership” product, the app (or Shopify Flow) adds a tag like `member`; when they cancel or lapse, remove the tag.
- **Shopify Flow:** Trigger on “Order paid” for a specific product/collection (e.g. “Monthly membership”) → add customer tag `member`. Another flow: “Subscription cancelled” or “Fulfillment / date condition” → remove tag.
- **Manual (testing):** In Admin → Customers → select customer → add tag `member`.
- **App that writes metafields:** If you use expiry, an app or Flow can set `customer.metafields.custom.membership_expires_at` when they subscribe and clear it when they cancel.

Theme only **reads** this (tags/metafields); it does not add or remove them.

---

## 4. What to gate (products and pages)

### 4.1 Products “only for active members”

**Option 1 — By collection (recommended)**  
- Create a collection (e.g. “Members-only” or “Included in membership”).  
- Put membership-only products in this collection.  
- In the **collection template** (section that lists products):  
  - If customer is not logged in → show “Log in” + “Join membership” CTA (no product grid).  
  - If logged in but not member (`customer.tags contains 'member'` is false) → show “Join membership to access” + link to membership page (no product grid).  
  - If member → show products as now.  
- In the **product template** (for products in that collection):  
  - Same checks: not logged in or not member → show CTA block instead of full product (add to cart, downloads, etc.); member → show full product.

**Option 2 — By product tag or metafield**  
- Tag products with `members-only` or set a product metafield (e.g. `custom.members_only` = true).  
- In the **product** section: if product has that tag/metafield, then apply the same “logged in + member” check; if not member, show CTA instead of add-to-cart / content.

**Option 3 — Separate “members only” collection and URL**  
- One collection that is **only** linked from the membership area (e.g. “Member library”).  
- Use a dedicated collection template (e.g. `collection.members.json`) that always enforces: redirect or show CTA unless `customer.tags contains 'member'`.  
- All products in that collection are members-only by definition.

### 4.2 Pages “only for active members”

- **Option A — Dedicated template:** Create a template that is “members only” (e.g. `page.members-only.json`). Any page using this template shows content only when `customer` is logged in and has the member tag; otherwise show a section with “Log in” / “Join membership” and optional teaser.  
- **Option B — Section-level gate:** Add a **section** (e.g. “Members-only content”) that wraps content blocks. The section checks `customer.tags contains 'member'`; if false, it outputs the CTA/teaser instead of the inner content. Use this section on any page (membership library, exclusive guides, etc.).  
- **Option C — Same membership page, different content:** The current membership page (`page.memebership.json`) stays public. Add a **separate** page (e.g. “Member library” or “Downloads”) that uses the members-only template or the gated section so only members see the real content.

**Suggested pages to gate (examples):**  
- Member library / downloads hub.  
- Exclusive guides or “members only” content pages.  
- Any page that lists or links to members-only products.

---

## 5. Where to implement in the theme (implementation points only)

- **Collection page (members-only collection):**  
  - In the section used by `collection.json` (or by `collection.members.json`), at the top:  
    - If no `customer` → show “Log in to view” + “Join membership” (same style as existing CTAs).  
    - If `customer` and `customer.tags contains 'member'` is false → show “Join membership to access this collection.”  
    - Else → render the existing collection grid.

- **Product page (members-only products):**  
  - In the product section (or in a dedicated product template for members-only):  
    - Determine “members only” by: product in a given collection (e.g. handle `members-only`), or product tag `members-only`, or product metafield.  
    - If members-only and (no customer or customer not member) → show a block with heading, short teaser, “Log in”, “Join membership” (reuse existing CTA styling), and **do not** render add-to-cart or download links.  
    - Else → show full product as now.

- **Pages (members-only content):**  
  - Either:  
    - Use a **members-only page template** that wraps one or more sections and, at the top, runs the same “customer + tag” check and shows CTA or content; or  
    - Add a **“Members-only content” section** that has a setting “Require membership” and wraps its content (or child blocks) with the same check.

- **Navigation:**  
  - “Member library” or “My downloads” link in header/footer: show only when `customer.tags contains 'member'` (in the header/footer section). If you use a single “Members” link for non-members (to marketing page) and “Member library” for members, the same nav block can output different links based on the tag.

- **Reuse existing design:**  
  - All “Join membership” / “Log in” messages should use the same layout and styles as the existing membership CTAs (e.g. product page CTA, `shop-sub-page-cta`, membership pricing plan). So: same button style (e.g. “View Membership Plans”), same card style, same copy tone.

---

## 6. Suggested flow (end-to-end)

1. **Define membership:** e.g. “Active member = customer has tag `member` (and optionally `membership_expires_at` not past).”
2. **Backend:** Use a subscription app or Shopify Flow to add/remove the tag (and optional metafield) on subscribe/cancel.
3. **Products:** Create a “Members-only” (or “Included in membership”) collection; add member-only products to it. Optionally tag those products or set a metafield for clarity.
4. **Collection template:** In the section that renders the members-only collection (or a dedicated `collection.members.json`), add the “not logged in / not member → CTA” logic; “member → products” as now.
5. **Product template:** In the product section (or a product template for members-only), if product is in members-only collection (or has tag/metafield), gate add-to-cart and full content behind “customer + member”; otherwise show CTA.
6. **Pages:** Add a members-only page template or a “Members-only content” section; use it for “Member library” or any exclusive page. Link to it from header/footer when `customer.tags contains 'member'`.
7. **Testing:** Create a test customer, add tag `member`, visit a members-only collection and product and a members-only page; then remove the tag and confirm CTA shows and products/content are hidden.

---

## 7. Apps and tools (optional)

- **Subscriptions:** ReCharge, Appstle, Seal Subscriptions, etc. — to sell recurring membership and optionally integrate tags/Flows.
- **Shopify Flow:** To add/remove customer tag (and metafields) on order paid, subscription active/cancelled.
- **Customer metafields:** If you need expiry, use a metafield (e.g. `custom.membership_expires_at`) and in Liquid compare `customer.metafields.custom.membership_expires_at` with `'now'` (with timezone in mind).

---

## 8. Summary table

| Goal | Suggested approach |
|------|---------------------|
| Who is a member? | Customer tag `member` (and optional expiry metafield). |
| Who sets it? | Subscription app + Shopify Flow (or app that writes tags/metafields). |
| Products only for members | Put them in a “Members-only” collection; gate that collection’s template and product template by “customer + tag”. |
| Pages only for members | Members-only page template or “Members-only content” section; show CTA if not member. |
| Where in theme? | Collection section, product section, new page template or section, optional header/footer link. |
| Design | Reuse existing membership CTA styling and copy (“Join membership”, “View Membership Plans”). |

No code has been changed in the theme; this document is for planning and implementation reference only.
