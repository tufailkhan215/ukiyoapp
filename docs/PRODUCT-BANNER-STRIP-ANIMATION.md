# Product page: banner strip animation (slide-up)

## Comparison: live site vs Shopify theme

Reference: [30-day AI Content Pack product page](https://ukiyo-prod.com/shop/courses/30-day-ai-content-pack).

### Live site (ukiyo-prod.com) – animated strip

- **Wrapper:** `py-4 border-y border-white/5 bg-white/[0.01]`, `max-w-[1400px] mx-auto px-6 lg:px-12`, `overflow-hidden`.
- **Inner content div** has inline style:  
  `style="opacity: 0; transform: translateY(9.99752px);"`  
  So the strip starts **invisible and ~10px lower**; a script (or CSS animation) then animates to `opacity: 1` and `transform: translateY(0)` for a **slide-up + fade-in**.
- **Content:** icon (e.g. star, amber) + text (e.g. "4.9/5 average rating"). You described that **text and icon keep changing** → the live site likely **rotates** multiple messages (e.g. rating, then “creators trust us”, etc.), each with its own slide-up when it appears.
- **Icon on live:** `lucide-star`, `text-amber-400` (rating line). Other lines can use different icons (e.g. users, download).

### Current Shopify theme (`main-product.liquid`)

- **Same structure:** same wrapper, `overflow-hidden`, and inner `flex items-center justify-center gap-2`.
- **No animation:** the inner div has **no** `opacity` or `transform`; content is visible immediately.
- **Single message:** one `banner_text` and one `banner_icon` (users or download). No rotation, no slide-up.

So the **only** behavioral difference for the strip itself is: **live = slide-up (and likely rotating lines); theme = static, no animation.**

---

## Suggested implementation (do not change code – reference only)

### 1. Slide-up on load (single message, like live initial state)

**Goal:** One line (icon + text) that slides up and fades in when the page loads.

- **Markup:** Keep the existing inner div; add a class, e.g. `product-banner-strip-line`.
- **Initial state:**  
  `opacity: 0`, `transform: translateY(10px)` (e.g. Tailwind `opacity-0 translate-y-2.5` or inline style).
- **End state:**  
  `opacity: 1`, `transform: translateY(0)`.
- **How to run:**
  - **Option A – CSS:**  
    Use a small CSS animation (e.g. `@keyframes` slideUpIn) that runs once on load, and apply it to `.product-banner-strip-line`. Parent already has `overflow-hidden`, so the motion stays clipped.
  - **Option B – JS:**  
    On load (or when the strip enters the viewport via `IntersectionObserver`), remove the initial class / set inline style to the “visible” state and add a `transition` (e.g. `transition: opacity 0.4s ease-out, transform 0.4s ease-out`). Same visual result.

No change to section schema is required if you keep a single `banner_text` and `banner_icon`.

---

### 2. Rotating messages (text and icon keep changing)

**Goal:** Multiple lines (icon + text) that cycle; each new line appears with a slide-up (and the previous can slide out or fade).

- **Data:** Either section **blocks** (each block = icon + text) or a single setting with multiple lines, e.g. one line per message: `icon_key|Text here` (e.g. `star|4.9/5 average rating`, `users|2,847+ creators trust us`).
- **Markup:** One visible “slot” with `overflow-hidden` and a fixed height (one line). Inside, either:
  - One div that **replaces** content (icon + text) via JS and re-runs the slide-up animation each time, or
  - Multiple divs (one per message) stacked vertically, and JS/CSS cycles which one is visible and runs slide-up for the incoming line.
- **Animation:** When switching to the next message:
  - Current: animate out (e.g. `translateY(-10px)` + `opacity: 0`).
  - Next: start from `translateY(10px)` + `opacity: 0`, then animate to `translateY(0)` + `opacity: 1`.
- **Timing:** e.g. show each message 3–5 seconds, then transition to the next; loop.

This matches the idea that on the live site “the text and icon keeps in changing” with a slide-up feel.

---

### 3. Technical notes (for when you implement)

- **overflow-hidden:** Already on the banner container in the theme; keep it so the sliding content doesn’t spill.
- **Initial state:** The live site’s `translateY(9.99752px)` is just ~10px; using `10px` or Tailwind `translate-y-2.5` is equivalent.
- **Reduced motion:** Prefer `prefers-reduced-motion: reduce` to skip or shorten the animation (e.g. no transform, or instant opacity).
- **Icons:** Theme already supports `users` and `download`; adding a `star` option (and optionally others) in the section schema would align with the live “4.9/5 average rating” line.

---

## Summary

| Aspect              | Live site (ukiyo-prod.com)     | Current Shopify theme        |
|---------------------|---------------------------------|------------------------------|
| Strip layout        | Same (border, padding, overflow)| Same                         |
| Initial state       | `opacity: 0`, `translateY(~10px)` | Visible, no transform/opacity |
| Animation           | Slide-up + fade-in              | None                         |
| Content             | Rotating (text + icon change)   | Single message               |
| Implementation idea| CSS or JS slide-up; optional JS rotation with multiple lines | Add class + initial state + CSS/JS for slide-up; optionally add multiple lines and rotation |

Implementing the slide-up (and optionally rotation) in the theme would mean: (1) giving the inner banner line an initial hidden state and a class or inline style, (2) adding a one-time slide-up animation (CSS or JS), and (3) if desired, adding multiple messages and a small script to cycle them with the same slide-up behavior. This document does not change any code; it only compares the live source with the theme and suggests the above approach.
