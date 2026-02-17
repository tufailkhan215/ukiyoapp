# Account, Login, Register & Digital-Product Pages — Theme Analysis & Guidelines

## Summary

This theme had **no custom customer account templates**. The header links to `{{ routes.account_url }}`, so login, register, and account pages were served by Shopify’s default (e.g. Dawn) and did not match the Ukiyo dark theme. This document defines the theme design system used elsewhere and how account-related pages must follow it. Custom sections and JSON templates have been added so all customer flows match the theme.

---

## Theme Design System (Strict)

All account-related pages **must** use these tokens so they match the rest of the store.

### Colors & background
- **Page background:** `#000000` (black) — same as `body` and `theme.css`.
- **Cards/panels:** `bg-white/[0.02]`, `border border-white/10`, `rounded-2xl` (or `rounded-xl` for smaller blocks).
- **Dividers:** `border-white/10` or `bg-gradient-to-r from-transparent via-white/10 to-transparent` for full-width lines.
- **Error/alert:** `bg-red-500/10 border border-red-500/30 text-red-200`.
- **Success:** `bg-white/10 border border-white/20 text-white`.

### Typography
- **Headings:** `font-heading` (Space Grotesk), `font-bold`, `text-white`. Sizes: `text-3xl md:text-4xl` for H1, `text-2xl` for H2.
- **Body:** Inter (default), `text-white`, `text-white/50` or `text-white/60` for secondary.
- **Labels:** `text-white/60 text-sm mb-2`.
- **Small/overlines:** `text-[10px] font-medium text-white/40 tracking-[0.3em] uppercase`.

### Form inputs (match contact form)
- **Container:** `w-full px-4 py-4 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:outline-none transition-colors`.
- **Select:** Same base + custom chevron (e.g. SVG background), `appearance-none`, `padding-right: 2.5rem`.

### Buttons
- **Primary (submit):** `rounded-xl` or `rounded-full`, `bg-white text-black font-semibold hover:bg-gray-100 transition-colors`, optionally `py-4` for full-width.
- **Secondary (link-style):** `rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors font-medium`.
- **Text link:** `text-white/50 hover:text-white` or `text-white/60 hover:text-white`.

### Layout
- **Section:** `relative z-10 py-16 lg:py-24`, `max-w-[1400px] mx-auto px-6 lg:px-12`.
- **Form width:** Centered card, e.g. `max-w-md mx-auto` for login/register, or full width inside the section container for account/order.

### Accessibility
- `aria-label` on icon-only buttons; `aria-required="true"` and `required` where needed; error/success in `role="alert"` / `role="status"`.
- Focus: theme uses `*:focus-visible { outline: 2px solid ... }` in `theme.css`; avoid overriding with `outline-none` on inputs without a visible focus state.

---

## Pages Required for Login, Register & Digital Products

| Page | Purpose | Template | Section |
|------|--------|----------|---------|
| **Login** | Email + password, “Forgot password”, optional guest checkout | `customers/login.json` | `main-customer-login` |
| **Register** | Create account (first name, last name, email, password) | `customers/register.json` | `main-customer-register` |
| **Account dashboard** | Orders, profile, addresses, logout | `customers/account.json` | `main-customer-account` |
| **Order detail** | Single order: line items, fulfillment (e.g. digital download links) | `customers/order.json` | `main-customer-order` |
| **Activate account** | Set password when invited / activation link | `customers/activate_account.json` | `main-customer-activate` |
| **Reset password** | Set new password from email link | `customers/reset_password.json` | `main-customer-reset-password` |
| **Addresses** | List and edit addresses | `customers/addresses.json` | `main-customer-addresses` |

For **digital products**, the important flows are: **Register → Login → Account (order history) → Order (download links)**. Activate, reset password, and addresses support account management and should still follow the same design.

---

## Implementation Notes

- **Forms:** Use Shopify form tags: `form 'customer_login'`, `form 'create_customer'`, `form 'recover_customer_password'`, `form 'activate_customer_password'`, `form 'reset_customer_password'`, `form 'customer_address', address`.
- **Digital downloads:** Order detail section shows `order.line_items`; download links come from fulfillment (e.g. “Download” link on line item or in fulfillment). No theme changes required for Shopify’s digital download fulfillment; only styling of the order page to match the theme.
- **Layout:** All customer templates use the default `theme.liquid` layout (header + main + footer + cart drawer); no extra wrapper.
- **Customer account menu:** `config/settings_data.json` references `customer-account-main-menu` in the footer; ensure that menu exists in Navigation and links to `/account`, `/account/addresses`, etc., if desired.

---

## File Reference

- **Sections:** `sections/main-customer-login.liquid`, `main-customer-register.liquid`, `main-customer-account.liquid`, `main-customer-order.liquid`, `main-customer-activate.liquid`, `main-customer-reset-password.liquid`, `main-customer-addresses.liquid`.
- **Templates:** `templates/customers/login.json`, `register.json`, `account.json`, `order.json`, `activate_account.json`, `reset_password.json`, `addresses.json`.
- **Design reference:** `sections/contact-form.liquid` (inputs, buttons, cards), `sections/main-cart.liquid` (section layout, list styling).
