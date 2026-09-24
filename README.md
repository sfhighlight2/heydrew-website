# HeyDrew Website Redesign (prototype)

A conversion-focused redesign of heydrew.com: the homepage plus 17 pages behind the new nav (Product ▾ · Solutions ▾ · Case Studies · Resources · Company ▾).

- `site/`: the site. Open `site/index.html` in a browser (no build step).
  - `product/`: How It Works, TaxLand, Tax Valet, Bookkeeping & Payroll, Pricing
  - `solutions/`: S-Corp Owners, Self-Employed, Real Estate Investors, Families, All Strategies
  - `company/`: About, Careers, Affiliates, Contact, Security & Privacy
  - `case-studies.html`, `resources.html`
  - Shared header/footer live in `_template.html`; run `node tools/sync-chrome.mjs` from `site/` after editing them. `_components.html` shows the page building blocks.
  - `?exit=1` previews the exit-intent popup; `?deadline=1` previews the year-end deadline bar.
- `BLUEPRINT.md`: section-by-section spec (copy, layout, analytics)
- `ART_DIRECTION.md`: visual system, signature "Plan" idea, scroll/motion choreography
- `CONVERSION_STRATEGY.md`: stakeholder rationale, CTA strategy, A/B roadmap
- `SITEMAP.md`: multi-page structure, nav dropdowns, truth rules
- `research/`: CRO, UI/UX, and brand/messaging research

**Before launch:** claims, figures, testimonial consent, and URLs flagged in `site/README.md` must be confirmed by HeyDrew. Savings figures are illustrative.
