# SEO + GEO Phase 2: implementation report

Date: 2026-09-24 · Plan: `SEO_GEO_PLAN.md` · Build: `site/tools/build.mjs` → `dist/`

## 1. What changed

### Client decisions (applied everywhere: source, chrome, JSON-LD, metas)
- **Renewal.** "Never auto-renews" is gone from:
  - the hero checks ("Renewal reminder 30 days out")
  - the homepage terms sheet (§2)
  - Pricing: the at-a-glance chip, the §3 clause, the stamp ("30-day renewal reminder"), the timeline step and the comparison-table row
  - the How It Works rhythm note, and the Affiliates and Contact copy
  - the FAQ answer plus its JSON-LD, and the Product dropdown description (now "One annual fee, quoted up front.")

  The standard sentence is: "We reach out about 30 days before your renewal with your options."
- **Credentials.** Every "licensed CPAs" is now "licensed tax professionals" / "licensed tax pros":
  - the hero lead and hero check
  - the estimator stamp ("✓ Filed by licensed pros")
  - the proof strip
  - How It Works ("Your licensed tax pro, in April")
  - the component library
- **No address or phone** anywhere, including schema. Organization carries name, legalName (Aspire Advisors LLC), url, logo, founder and sameAs (Instagram @heydrewcpa, LinkedIn company page).
- **No strategy counts.** Checked by the build lint and by grep. The only hits are in the non-deployed `index.backup*.html` files and one JS code comment.

### Source pages (`site/`, still work over file://)
- **§5 titles and metas** applied to all 24 pages. Resources pages already matched.
- **H1 topic kickers** on 17 pages that had slogan-only H1s, e.g. `<h1><span class="h1-kicker">Tax strategy for S-Corp owners</span> Pay yourself right…</h1>`, styled like the existing mono label, with a screen-reader-only ": " separator. The resources pages already had topic H1s.
- **Answer-first leads** that name HeyDrew and the topic on 13 product/solution/company pages (same facts, reworded).
- **Links:**
  - All `https://heydrew.com/contact/?src=…` CTAs (40) now go to the internal `company/contact.html?src=…`. On the Contact page they go to `#ct-form`.
  - `/our-strategies/` now goes to `solutions/strategies.html`; `/faq/` goes to `resources/faq.html`.
  - Footer "Terms of Service" (a nonexistent URL) is now "Engagement Terms" → `/engagement-terms/`.
  - `sync-chrome.mjs` now sets `?src=` on the internal contact links.
- **Contextual internal links:**
  - Homepage (in-copy): How it works, Tax Valet, Pricing, Case Studies.
  - About 15 in-body links with descriptive anchors across the product, solution and company pages.
- **Breadcrumbs:** "HeyDrew" → "Home". The Product/Company middle crumbs are no longer links to a non-hub page. BreadcrumbList schema is generated from the visible crumbs.
- **Headings:**
  - FAQ "Q1…" counters are `aria-hidden` (and excluded from schema).
  - UI labels are no longer headings ("Show strategies for", the contact-form thanks).
  - The case-study step numerals are `aria-hidden`.
- **Real Estate tab panels** now ship visible in the HTML; JS hides the inactive ones at init. Verified: after load, only the first panel is visible.
- **Images:**
  - `srcset`/`sizes` plus new smaller variants: -720 for the 1300–1500px scenes, -640 for Drew in TaxLand, -1200 for the TaxLand parallax layers. The mobile TaxLand hero dropped from about 970 KB to about 305 KB.
  - Alt text was reviewed: every informative image has alt; decorative ones keep `alt=""`; all images have width/height.
- **Worksheets:** the four real PDFs were downloaded to `site/downloads/` and linked locally. The old `/wp-content/…` URLs 301 to them.
- **Icons and share image:** favicon.ico, 32/180/192/512 PNGs from the real avatar, `img/icons/heydrew-logo.png` (for schema), and `img/og-default.jpg` (1200×630: logo + Drew + tagline).

### Build (`node tools/build.mjs` from site/, zero dependencies)
- **Output:** 24 pages at trailing-slash URLs, plus 404.html (noindex), sitemap.xml, robots.txt (AI crawlers explicitly allowed), llms.txt, llms-full.txt (about 127 KB of clean Markdown of every page), site.webmanifest, and `_redirects` + `vercel.json` (38 rules, including the 301 map from the live WordPress URLs).
- **Head injection:** canonical, robots, OG/Twitter, icons and manifest, self-hosted DM Sans/DM Mono with inline @font-face, `font-display:swap` and a preload. This replaces Google Fonts, so there are no third-party font requests.
- **JSON-LD:** one @graph per page:
  - Every page: Organization, WebSite, WebPage (or AboutPage/ContactPage/CollectionPage/FAQPage) and BreadcrumbList.
  - By page type: Service, WebApplication (TaxLand), Article (guides), ItemList, DigitalDocument (worksheets), and Person (Andrew).
  - FAQPage is built from the Q&A visible on the page.
  - There are no Article dates yet: the `DATES` map is empty on purpose and gets filled only after pages go live.

## 2. Verification

| Check | Result |
|---|---|
| Build lint (unique titles ≤60 and descriptions ≤155, canonical, one H1, img alt + size, internal links + srcset, JSON-LD parses, sitemap = pages, banned claims) | **OK**, 0 errors |
| Playwright, dist over HTTP (python http.server), 25 URLs × 1440 + 390 | 0 console errors, 0 failed requests, 0 horizontal overflow, 0 broken images, 1 H1 each, DM Sans loaded from /assets/fonts |
| Playwright, source over file://, 24 pages × 1440 + 390 | Same: 0 problems |
| Internal link resolution (all unique hrefs: files over file://, GET over HTTP) | 0 broken |
| grep `never auto-renew` / `licensed CPA` in site + dist | 0 hits |
| grep strategy counts | Only in the non-deployed `index.backup*.html` and a JS comment ("3.5 Strategies") |
| `sync-chrome.mjs --check` | All pages up to date |
| Visual check (1440 and 390 screenshots of home, pricing, TaxLand, S-Corp) | Design intact; the kicker renders as a small mono label above the H1 |

The QA script is `brand-research/seo-qa.mjs` (`node seo-qa.mjs http` with dist served on :8765, or `node seo-qa.mjs file`).

### Per-page output (dist)
| URL | Title (chars) | Desc chars | JSON-LD (besides Organization + WebSite) |
|---|---|---|---|
| `/case-studies/` | Tax Strategy Examples & Client Stories \| HeyDrew (48) | 148 | BreadcrumbList, CollectionPage |
| `/company/about/` | About HeyDrew and Founder Andrew Cordle (39) | 146 | BreadcrumbList, AboutPage, Person |
| `/company/affiliates/` | Tax Strategy Affiliate Program \| HeyDrew (40) | 146 | BreadcrumbList, WebPage |
| `/company/careers/` | Careers at HeyDrew: Remote Roles in the US (42) | 135 | BreadcrumbList, WebPage |
| `/company/contact/` | Contact HeyDrew: Book a Tax Strategy Call (41) | 129 | BreadcrumbList, ContactPage, FAQPage |
| `/company/security/` | Security & Privacy: How We Protect Your Tax Data (48) | 154 | BreadcrumbList, WebPage |
| `/` | HeyDrew: Year-Round Tax Strategy for Business Owners (52) | 146 | WebPage, Person, Service, FAQPage |
| `/product/bookkeeping-payroll/` | Bookkeeping & Payroll for Business Owners \| HeyDrew (51) | 147 | BreadcrumbList, WebPage, Service, FAQPage |
| `/product/how-it-works/` | How HeyDrew Works: Year-Round Tax Planning, Step by Step (56) | 149 | BreadcrumbList, WebPage, Service, FAQPage |
| `/product/pricing/` | Tax Strategy Pricing: One Annual Fee \| HeyDrew (46) | 148 | BreadcrumbList, WebPage, Service, FAQPage |
| `/product/tax-valet/` | Your Tax Valet: Year-Round Tax Support, One Contact (51) | 150 | BreadcrumbList, WebPage, Service, FAQPage |
| `/product/taxland/` | TaxLand: Free Tax Strategy Assessment for Owners (48) | 151 | BreadcrumbList, WebPage, WebApplication, FAQPage |
| `/resources/faq/` | Tax Strategy FAQ: Straight Answers \| HeyDrew (44) | 148 | BreadcrumbList, WebPage+FAQPage |
| `/resources/guides/first-call-checklist/` | Tax Planning Checklist: What to Bring to Your First Call (56) | 149 | BreadcrumbList, WebPage, Article |
| `/resources/guides/` | Tax Planning Guides for Business Owners \| HeyDrew (49) | 149 | BreadcrumbList, CollectionPage, ItemList |
| `/resources/guides/proactive-tax-planning/` | Proactive vs. Reactive Tax Planning, Explained \| HeyDrew (56) | 145 | BreadcrumbList, WebPage, Article |
| `/resources/guides/records-that-hold-up/` | Business Tax Records That Hold Up: A Plain Guide \| HeyDrew (58) | 149 | BreadcrumbList, WebPage, Article |
| `/resources/` | Tax Planning Resources for Business Owners \| HeyDrew (52) | 132 | BreadcrumbList, CollectionPage, ItemList |
| `/resources/worksheets/` | Free Tax Worksheets & Templates for Owners \| HeyDrew (52) | 147 | BreadcrumbList, CollectionPage, ItemList |
| `/solutions/families/` | Family Tax Strategies for Business Owners \| HeyDrew (51) | 137 | BreadcrumbList, WebPage, Service |
| `/solutions/real-estate-investors/` | Tax Planning for Real Estate Investors \| HeyDrew (48) | 150 | BreadcrumbList, WebPage, Service, FAQPage |
| `/solutions/s-corp-owners/` | S-Corp Tax Strategy: Salary, Payroll & Planning \| HeyDrew (57) | 150 | BreadcrumbList, WebPage, Service, FAQPage |
| `/solutions/self-employed/` | Tax Strategies for Self-Employed & LLC Owners \| HeyDrew (55) | 146 | BreadcrumbList, WebPage, Service |
| `/strategies/` | Tax Strategies for Business Owners, Explained \| HeyDrew (55) | 133 | BreadcrumbList, CollectionPage, ItemList |

## 3. Left for the client / launch

1. **Legal pages (launch blocker).** Migrate the real text of `/privacy-policy/`, `/terms-of-use/`, `/engagement-terms/`, `/sms-terms/` and `/cookie-policy/` at the exact same paths (SMS/10DLC registrations point at them). The engagement terms also need their renewal language aligned with the new site copy. The site links to these paths now; the build prints a NOTE until the pages exist.
2. **Booking URL.** "Book a strategy call" currently lands on the Contact page. Swap in the real scheduler URL when confirmed (`data-confirm="booking URL"`).
3. **Old prototype.** Add noindex or a password to `hey-drew.vercel.app`, and keep every staging deploy of `dist/` noindexed (`X-Robots-Tag: noindex` at the host).
4. **Search Console + Bing Webmaster Tools.** Verify the domain, submit `https://heydrew.com/sitemap.xml`, run URL inspection on the top pages after launch, and enable IndexNow on Bing. Check that every 301 resolves in one hop.
5. **HRA PDFs.** The two HRA documents (written plan document, employment agreement) are served as-is from the live site. Please confirm they are the current, reviewed versions before the new site links them.
6. **Confirm sameAs profiles:** Instagram `heydrewcpa` (and whether "CPA" in the handle is allowed for the entity), and the LinkedIn company page. The YouTube URL was left out until confirmed. Andrew's LinkedIn is used for Person.sameAs.
7. **Article dates.** Once guides are live, add their real publish/modified dates to `DATES` in build.mjs. Add a visible "Last reviewed" line only if a real review date (and ideally a named licensed reviewer) is supplied.
8. **TaxLand app (taxland.heydrew.com).** Give it a title, meta description, canonical and an H1 in the initial HTML; the prior audit flagged all four as missing.
9. **Host setup:** 301s only (no 302 on /), HSTS, www→apex, http→https, a 404 status for unknown paths, long-cache headers for `/assets` and `/img`.

## 4. Recommended next content pages (in order)
1. `/resources/tax-strategist-vs-cpa/`: low difficulty (KD 10), commercial intent, the brand's core thesis.
2. `/strategies/augusta-rule/`, which pairs with the real comparable-rent worksheet.
3. `/strategies/accountable-plan/`, which pairs with the board-resolution template.
4. `/strategies/hire-your-kids/` (sole proprietor vs S-Corp rules).
5. `/resources/s-corp-reasonable-salary/`.
6. `/strategies/solo-401k/`.
7. Pillar: `/resources/how-to-reduce-business-taxes/`.
8. `/resources/when-to-elect-s-corp/`.
9. HSA, HRA, Traditional & Roth IRA and 529 pages.

Titles and metas for all of these are in §5 of the plan. Add each new page to `PAGES` in `build.mjs`.
