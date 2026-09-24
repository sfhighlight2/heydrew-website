# HeyDrew Site Map & Page Specs (2026-09-24)

Multi-page prototype built on the homepage's design system (`site/index.html`, ART_DIRECTION.md, BLUEPRINT.md).
Every page shares the header (with dropdowns), the footer, the sticky mobile CTA, and the exit-intent popup.

## File structure (flat .html files so local previews work over file://)
```
site/
  index.html                      Home
  assets/css/site.css             shared styles (extracted from index.html)
  assets/js/site.js               shared JS (header, dropdowns, sticky CTA, exit intent, reveals, analytics)
  product/how-it-works.html
  product/taxland.html
  product/tax-valet.html
  product/bookkeeping-payroll.html
  product/pricing.html
  solutions/s-corp-owners.html
  solutions/self-employed.html
  solutions/real-estate-investors.html
  solutions/families.html
  solutions/strategies.html
  case-studies.html
  resources.html
  company/about.html
  company/careers.html
  company/affiliates.html
  company/contact.html
  company/security.html
  img/  img/pages/
```
All internal links are relative and end in `.html`. Primary CTA everywhere: "See what you can keep" → `https://taxland.heydrew.com/?src=<page-slug>&pos=<position>`. Secondary: "Book a strategy call" → `company/contact.html?src=<page-slug>&pos=<position>` (internal; swap in the booking URL once confirmed). Production URLs are clean (`/company/contact/`) via `site/tools/build.mjs`.

## Navigation
**Product ▾** (each item has a one-line description in the dropdown)
- How It Works: "Five steps from quiz to filed return"
- TaxLand Assessment: "The free game that maps your strategies"
- Your Tax Valet: "One person, all year, a few hours' reply"
- Bookkeeping & Payroll: "Clean books so the strategy holds up"
- Pricing: "One annual fee. Never auto-renews."
- Feature card: Drew + "See what you can keep" CTA

**Solutions ▾**
- By business: S-Corp Owners · Self-Employed & LLCs · Real Estate Investors · Families & Generational Wealth
- By strategy: All Strategies (plus quick links to Hire Your Kids, Augusta Rule, Solo 401(k), Accountable Plan as anchors on strategies.html)

**Case Studies** (single page) · **Resources ▾**: Guides (index + 3 guide pages) · Worksheets & Templates · FAQ, with resources.html as the section overview. No glossary or tax calendar (removed by the client).

**Company ▾**
- About HeyDrew · Careers ("We're hiring" pill) · Affiliate Program · Contact · Security & Privacy

Mobile: the same items in the menu sheet as accordions, with a CTA pinned at the bottom.

## Truth rules (non-negotiable)
- **Client decisions (2026-09-24):** no "never auto-renews"; say "We reach out about 30 days before your renewal with your options." Say "licensed professionals" / "licensed tax professionals", never "licensed CPAs". No street address or phone number on the site. Clean URLs via a build step (source stays .html).
- **Never state a number of strategies** (no "8", "eight", "Up to N of 8", "8-strategy checklist", "All Eight Strategies", "+ 4 more"). HeyDrew keeps adding strategies. Say "we find the best strategies for your business" / "strategies you qualify for" / "here are a few we use all the time". Page names use "All Strategies".
- No invented testimonials, clients, stats, logos, awards, press, team names, or case-study results.
- Real testimonials only (Kesh K., Will H., Vicky G., Jess B., Rob R., Allen D.). Quote them word for word.
- Worked examples must be labeled "Illustrative scenario" with a disclaimer, framed as hypothetical, never presented as clients.
- Named people: only Andrew Cordle (founder). The real team group photo exists at https://heydrew.com/wp-content/uploads/2026/09/group-headshots.jpg.
- Real facts available: FAQ answers (brand-research/.firecrawl/faq.md), strategy descriptions (our-strategies.md: use these as examples, never as a complete or counted list), the 5-step process (how-it-works.md), careers roles + Dover apply links (careers.md), affiliate program on Impact (https://app.impact.com/campaign-campaign-info-v2/Hey-Drew.brand), real downloadable worksheets:
  - https://heydrew.com/wp-content/uploads/2026/07/HRA-Employment-Agreement.pdf
  - https://heydrew.com/wp-content/uploads/2026/07/Augusta-Rule-Comparable-Worksheet.pdf
  - https://heydrew.com/wp-content/uploads/2026/07/Accountable-Plan-Board-Resolution-Owner-Resolution.pdf
  - https://heydrew.com/wp-content/uploads/2026/07/HRA-Written-Plan-Document.pdf
- Legal entity: Aspire Advisors LLC d/b/a HeyDrew!. Security claims only as stated in the FAQ (encrypted in transit and at rest, access limited to the people working your account, never sell or share data with advertisers, won't use or disclose tax info beyond preparing your return without written consent).
- Tax figures (limits, amounts) must match the homepage's figures or be phrased without specific numbers. Never guarantee savings.
- No visible "Confirm" labels (the client removed them). Track unverified items in site/README.md instead.

## Page anatomy (vary the layouts; don't stamp one template)
Each page: a hero with a clear H1, one-sentence value, primary CTA and a Drew image or product-UI object → 3–6 sections specific to that page → proof (a real testimonial or FAQ) → a final CTA band. Use the "Plan" paper and stamp language where it fits. Drew appears at most 2 times per page.

## Page images (site/img/pages/)
| Page | Image |
|---|---|
| How It Works | drew-walk-map.webp (transparent) |
| TaxLand | taxland-backdrop.webp + taxland-foreground.webp (parallax) + drew-hero.webp |
| Tax Valet | drew-headset.webp (transparent) |
| Bookkeeping & Payroll | drew-bookkeeping.webp (3:2 scene) |
| Pricing | drew-clipboard.webp (transparent) |
| S-Corp Owners | drew-scorp.webp (transparent) |
| Self-Employed | drew-coffee.webp (3:2 scene) |
| Real Estate | drew-house.webp (transparent) |
| Families | drew-family.webp (3:2 scene) |
| Strategies | existing strategy-card art in brand-research/assets |
| Case Studies | drew-desk.webp / real testimonial headshots |
| Resources | drew-reading.webp (transparent) |
| About | real Andrew photo + team group photo + drew-team.webp |
| Careers | drew-whiteboard.webp (3:2 scene) |
| Affiliates | drew-handshake.webp (transparent) |
| Contact | drew-phone.webp (transparent) |
| Security | drew-vault.webp (3:2 scene) |
