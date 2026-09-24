# HeyDrew SEO + GEO Plan (phase 1: audit and strategy)

Date: 2026-09-24 · Scope: the static prototype at `site/`, which replaces https://heydrew.com
Inputs: every page in `site/` (parsed: head, headings, images, links, schema, hidden content), `SITEMAP.md` truth rules, `site/README.md`, `brand-research/HEYDREW_BRAND_KIT.md`, the live scrapes in `brand-research/.firecrawl/`, the prior agency audit (unzipped to `research/seo/prior-audit/`: Semrush site audit, backlink audit, position tracking, Live Media Digital manual analysis, July 2026), and light SERP checks.

> Truth rules apply to everything here: never state a number of strategies; no invented stats, reviews, credentials, authors or dates. Every title and meta below follows them.

---

## 1. Executive summary

1. **heydrew.com has almost no organic footprint.** In July 2026 Semrush found 2 ranking keywords ("oliver drew" #35, "hey taxes" #82), zero estimated traffic, and zero top-100 positions across 59 tracked commercial keywords. The redesign is therefore a near-greenfield launch: there is little equity to lose and a lot of room to win. The backlink profile is small and mostly toxic (100 referring domains, 75% flagged toxic, including PBN spam anchors).
2. **The prototype has strong bones.** Every page has one H1, a sensible H2/H3 outline, `lang="en"`, real text in the static HTML (FAQ answers render without JS, the hero is never pre-hidden), width/height on nearly every image, lazy loading below the fold, and `fetchpriority="high"` on the hero image. Writing quality is high and specific, which suits AI citation.
3. **The whole head layer is missing.** No page has a canonical, Open Graph or Twitter tags, a favicon, a manifest, or Organization/WebSite/Breadcrumb schema. There is no robots.txt, sitemap.xml, llms.txt or 404 page. Only 3 pages have JSON-LD (FAQPage). Titles and descriptions run long on most pages (8 of 18 titles over 60 characters; 11 of 18 descriptions over 155) and a few are generic ("Resources | HeyDrew", "Careers | HeyDrew").
4. **Links point at the old WordPress site.** The homepage body contains zero internal links. Its in-content links go to `https://heydrew.com/our-strategies/`, `/faq/` and `/contact/`, and every page's secondary CTA goes to `https://heydrew.com/contact/`. The footer's "Terms of Service" link points to `/terms-of-service/`, which does not exist on the live site. The legal pages (privacy, terms of use, engagement terms, SMS terms, cookie policy) are not in the new site at all.
5. **YMYL and trust gaps are the ranking ceiling.** Tax is a Your Money or Your Life topic. The site still has no stated licensing (who is licensed, where), no named reviewer on educational content, no visible address or phone even though the engagement terms publish them, and one real contradiction: the site says pricing "never auto-renews", while the live Engagement Terms say "some services may renew automatically". Separately, the Instagram handle `@heydrewcpa` uses "CPA", which state boards restrict to licensed CPA firms. Fixing these matters more than any meta tag.
6. **The biggest opportunity is strategy-level content plus GEO structure.** The commercial SERPs ("tax strategist vs cpa", KD 10; "advanced tax planning", KD 13; "best tax strategist", KD 7) are low-difficulty and are dominated by small CPA-firm blogs. Individual strategy pages (Augusta Rule, Hire Your Kids, Accountable Plan, S-Corp reasonable salary, Solo 401(k)) and a "Tax strategist vs. CPA" page, written answer-first with question H2s, clean schema and consistent entity data, can win both blue links and AI citations.

**Recommended URL strategy:** clean, trailing-slash directory URLs (`https://heydrew.com/product/pricing/`), produced by a build step from the existing `.html` sources so `file://` previews keep working. See §6.2.

---

## 2. Audit findings by severity

### Critical (fix before launch)

| # | Finding | Where | Fix |
|---|---|---|---|
| C1 | No robots.txt, sitemap.xml, canonical tags or 404 page. | site-wide | Generate them at build (§6). Self-referencing absolute canonical on every page. `404.html` with `noindex`, search-style links to hubs, and a real 404 status from the host. |
| C2 | Legal pages missing from the new site: `/privacy-policy/`, `/terms-of-use/`, `/engagement-terms/`, `/sms-terms/`, `/cookie-policy/`. Footer links to a nonexistent `/terms-of-service/`. | footer, `company/security.html`, `company/contact.html` | Migrate all five at their **exact current paths**. The SMS terms and privacy URLs are almost certainly registered in the A2P 10DLC SMS campaign, so they must not move. Point "Terms of Service" at `/engagement-terms/` (label it "Engagement Terms"). |
| C3 | In-content links point to old WordPress URLs (`heydrew.com/our-strategies/`, `/faq/`, `/contact/`). The homepage `<main>` has zero internal links. | `index.html`, all pages (secondary CTA), `resources.html`, `company/contact.html` | Swap every in-site absolute link for a relative internal link: strategies → `solutions/strategies.html`, FAQ → `resources/faq.html`, contact → `company/contact.html`. Keep `?src=` params on the CTA if analytics needs them. |
| C4 | The production deploy would ship junk: `index.backup*.html` (3 full duplicate homepages), `_components.html`, `_template.html`, `shots/` (105 MB), `img/raw/` (95 MB), `tools/`. | `site/` | Build to `dist/` with an allowlist. Never deploy backups. Keep `_components.html` noindexed (it is) and excluded anyway. |
| C5 | Contradiction on a YMYL money term: the site says "never auto-renews", but the live Engagement Terms say "Some services may renew automatically…". | `product/pricing.html`, homepage terms sheet, FAQ | Client/legal must reconcile the terms and the site before launch. Google's quality raters and AI answers both surface contradictions like this. |
| C6 | Credential claims are unverified ("Licensed CPAs", "Licensed CPAs & EAs", "Filed by licensed CPAs"), with no licensing statement anywhere. | home hero, proof strip, team section, estimator stamp (README blocker #5, #12) | Until confirmed, use the FAQ-sanctioned phrase "licensed professionals". After confirmation, add a licensing statement to the footer and About page (who is licensed, in which state, the CPA firm name if one exists). |
| C7 | A staging/prototype copy is publicly indexed (`hey-drew.vercel.app`, "HeyDrew - Tax Strategy App Prototype" shows in search for the brand). | off-site | Password-protect it or send `X-Robots-Tag: noindex`. Do the same for any preview host of this redesign. |

### High

| # | Finding | Where | Fix |
|---|---|---|---|
| H1 | No Open Graph or Twitter Card tags, and no share image. | all | Build injects `og:type/title/description/url/image/site_name`, `twitter:card=summary_large_image`. Create 1200×630 OG images: one sitewide, plus per-section ones (Drew + page title on brand paper). |
| H2 | No favicon, apple-touch-icon or manifest. | all | Use the real avatar (`cropped-Icon-Business-Tax-AI-Full-Color-2-270x270.png`): `favicon.ico` (32), `icon.svg`/png 192 and 512, `apple-touch-icon.png` 180, `site.webmanifest`. Keep `theme-color`. |
| H3 | No Organization, WebSite, Person, Service or BreadcrumbList schema. Entity data is not machine-readable. | all | Schema plan, §4. |
| H4 | Titles too long or generic. Descriptions over 155 characters on 11 pages. | see §5 | Use the §5 table. |
| H5 | The homepage H1 ("You built the income. Now keep it.") and most inner H1s carry no topic words. Slogan-only H1s are weak for both Google and LLM chunking. | most pages | Keep the slogans, but put the topic phrase in the H1 via a kicker span (`<h1><span class="h1-kicker">Tax strategy for S-Corp owners</span> Pay yourself right. Keep the rest.</h1>`), or make the first sentence under the H1 name the topic and HeyDrew explicitly. |
| H6 | Duplicate content risk: `resources.html` contains the full guides, a month-by-month calendar, a glossary and the FAQ, and the new `resources/*` pages will contain the same text. Identical FAQ Q&As (audit risk, multiple entities, prior years) repeat on the home, S-Corp, Real Estate, Resources and upcoming FAQ pages. | `resources.html`, FAQ blocks | Each long-form item lives in full on one URL. The hub gets summaries plus links. Per the client, the calendar and glossary are removed entirely (not moved): delete those sections from `resources.html` and the nav. Repeated FAQ answers: keep the full version on `/resources/faq/`, and on other pages keep only page-specific questions (at most 1–2 shared ones), marked up in FAQPage only where they are shown. |
| H7 | Tab panels are hidden in the source HTML (`hidden` on 4 of 5 Real Estate "property file" panels; the guides tabs on Resources). Google indexes hidden DOM text but gives it less weight, and some LLM text extractors drop `[hidden]`. | `solutions/real-estate-investors.html`, `resources.html` | Progressive enhancement: ship all panels visible in the HTML and let JS add `hidden` at init. Better still for the Real Estate page: stack the panels as H3 sections on mobile. |
| H8 | Performance: the TaxLand hero loads about 970 KB of eager images (backdrop 352 KB + foreground 392 KB + Drew 228 KB), with no `srcset`. Inner-page heroes are 100–170 KB, 900–1500 px wide, served to 390 px phones, with no `srcset`. | `product/taxland.html`, all inner heroes | Generate 480/900/1500 widths and add `srcset` + `sizes`. Lazy-load the TaxLand foreground/Drew layers or give them `fetchpriority="low"`. AVIF is optional. Target under 120 KB for the LCP image on mobile. |
| H9 | Fonts are render-blocking from Google Fonts CSS (DM Sans variable with opsz 400–800 + italic + DM Mono). | all | Self-host subset woff2 (Latin), preload the roman DM Sans file, `font-display:swap`, and a metric-matched fallback (`size-adjust`) to avoid CLS. This also removes two third-party origins. |
| H10 | Breadcrumbs link "Product" to How It Works and "Solutions" to All Strategies, so the category crumbs have no real hub. | inner pages | Product/Company: `Home › Page`. Solutions: `Home › Solutions › Page`, with "Solutions" pointing to `/strategies/`, the de facto hub. Resources: `Home › Resources › Guides › Page`. Mirror in BreadcrumbList. |
| H11 | No visible NAP/contact data. The live Engagement Terms publish support@heydrew.com, 904-822-5910 and 145 Land Grant Street, Unit 1, St. Augustine, FL 32092. The prior audit PDFs show a Miami address, but that is the agency's (Live Media Digital), not HeyDrew's. | footer, contact | Client confirms which of these are public-facing, then shows them in the footer + Contact page and uses exactly the same strings in schema, Google Business Profile, LinkedIn and llms.txt. |

### Medium

| # | Finding | Fix |
|---|---|---|
| M1 | FAQ headings include the counter ("Q1 What if…"), so the accessible heading text and the extracted question both start with "Q1". | Move `<span class="qn">` outside the `<h3>`, or keep it and add `aria-hidden="true"`. JSON-LD names are already clean. |
| M2 | UI labels marked up as headings: "Show strategies for" (H2, strategies filter); "Got it. Thanks, there" (H3, contact form success). | Make them `<p>`/`<legend>`. Headings are for content only. |
| M3 | Informative images with `alt=""`: page-hero Drew renders on Pricing, Tax Valet, TaxLand, S-Corp, Real Estate, Affiliates, Contact, Resources, How It Works; strategy card art; worksheet thumbnails on Resources. Testimonial avatars are empty on some pages and named on others. | Hero Drew: short descriptive alt ("Drew holding a clipboard with a pricing sheet"). Worksheet thumbnails: "First page of the Augusta Rule comparable worksheet". Pure decoration (celebrate Drew in CTA bands, repeated card art beside a visible title) stays `alt=""`. Testimonial avatars next to a visible name: `alt=""`; standalone: the name. |
| M4 | Strategies hub loads 5 card images eagerly (no `loading`) at the top plus 8 again lazily. | Only the first gets eager/high priority. |
| M5 | Anchor text: "How it works" ×3 on Self-Employed (non-descriptive, identical anchors to different targets); "Product" breadcrumb. | Use "How the Solo 401(k) works" etc. |
| M6 | Thin pages: Careers (~320 words), Affiliates (~460), Security (~455), Contact (~480), Families (~490). | Fine for utility pages (Careers, Contact). Families and Security should grow to 700+ with question H2s (families: hiring kids by entity type, Roth for kids, 529; security: portal, retention, e-sign). |
| M7 | `FAQPage` markup no longer earns Google rich results for commercial sites (restricted to authoritative government/health sites since Aug 2023). HowTo rich results were retired in 2023. | Keep FAQPage (Bing, AI engines and entity understanding still use it) but don't expect SERP stars. Skip HowTo; use ordered lists. |
| M8 | Semrush flagged a 302 (temporary) redirect on the live homepage and no HSTS. | New host: 301s only, `Strict-Transport-Security: max-age=31536000; includeSubDomains`, www→apex 301, http→https 301. |
| M9 | TaxLand (`taxland.heydrew.com`) has no title, meta description or H1, and very low text (prior audit). It is the main CTA target and a brand-name landing surface. | Give the app shell a real `<title>` ("TaxLand: Free Tax Strategy Assessment by HeyDrew"), a meta description, a canonical, an H1 in the initial HTML, and a link back to heydrew.com. Keep the login/app state `noindex`. |
| M10 | Toxic backlinks, including PBN anchors ("High Quality Dofollow Backlinks DA 50…"). | Google mostly ignores these. Optionally disavow the handful of obvious PBN domains. Don't buy links. |

### Low / hygiene

- Brand name usage varies (HeyDrew / Hey Drew / HeyDrew!). Body copy: **HeyDrew**. Legal: **HeyDrew!**. Schema `alternateName`: ["Hey Drew", "HeyDrew!", "Hey Drew!"].
- Minify CSS/JS at build (Semrush flagged unminified assets on the live site). site.css 33 KB, home.css 42 KB, home.js 26 KB, site.js 28 KB are fine gzipped.
- GSAP: already deferred, hero is never pre-hidden, pin/scrub is desktop-only. CWV risk is low. Keep ScrollTrigger off pages that don't use it (it is only loaded on the homepage today; keep it that way).
- `theme-color` and `color-scheme` are present. Viewport is fine.

### Passing (keep)
One H1 per page · logical outlines · `lang="en"` · static HTML content (JS-free reading works) · FAQ answers in DOM · hero LCP never hidden · width/height on images · lazy loading below the fold · `fetchpriority="high"` heroes · no strategy counts found anywhere (checked all pages) · clear disclaimer block and legal entity line in the footer · real testimonials only · illustrative scenarios labeled.

---

## 3. Keyword and topic strategy

### 3.1 What the data says
- From the prior position-tracking set (volume / KD / CPC): "how to pay less taxes" 880 / 28 / $1.93 · "tax expert" 2,400 / 55 · "tax experts" 1,300 / 90 · "tax strategist vs cpa" 140 / **10** / $8.94 · "advanced tax planning" 140–170 / **3–13** · "best tax strategist" 40 / **7** · "tax strategists" 70 / 49 · "tax planning specialist" 40 / 28 · "talk to a tax expert" 110 / 29 · "how to pay less in taxes" 140 / 33.
- Takeaway: the head terms ("tax expert") are generic and hard. The winnable, high-intent set is **strategist/planning** vocabulary plus **named strategies**. The "tax relief / back taxes / resolution" terms in the agency list are the wrong intent (IRS debt resolution). **Do not target them.**
- SERP competitors for our clusters: CPA-firm blogs (Anderson Advisors, Taxstra, Madsen, Hottenrott), productized players (Block Advisors, TurboTax Expert 365 Business, Gelt, Instead, Collective), and publishers (TaxAct blog, Forbes Councils). Strategy SERPs (Augusta Rule, hiring kids) are fragmented among small firms, so depth plus documentation angle plus worksheets is a real edge. HeyDrew already owns real worksheets.

### 3.2 Clusters (one cluster = one URL)

| Cluster | Intent | Primary | Secondary / supporting | URL |
|---|---|---|---|---|
| Brand + category | Nav/commercial | tax strategy for business owners | year-round tax planning service, proactive tax planning service, tax strategist for entrepreneurs, AI tax strategy, HeyDrew, Hey Drew | `/` |
| Process | Commercial | how tax planning works | year-round tax planning process, what does a tax strategist do | `/product/how-it-works/` |
| Assessment | Transactional | free tax strategy assessment | tax savings assessment, tax savings quiz, TaxLand | `/product/taxland/` |
| Dedicated support | Commercial | year-round tax support | dedicated tax advisor, tax pro you can message | `/product/tax-valet/` |
| Books/payroll | Commercial | bookkeeping and payroll for business owners | S-Corp payroll service, small business bookkeeping and tax | `/product/bookkeeping-payroll/` |
| Price | Commercial | tax strategy pricing | how much does a tax strategist cost, tax planning fees | `/product/pricing/` |
| S-Corp | Commercial | S-Corp tax strategy | S-Corp tax planning, S-Corp owner taxes | `/solutions/s-corp-owners/` |
| Reasonable salary | Info → commercial | S-Corp reasonable salary | how much salary should an S-Corp owner pay, reasonable compensation S-Corp | `/resources/s-corp-reasonable-salary/` (new) |
| Self-employed | Commercial | tax strategies for self-employed | LLC tax strategies, single-member LLC tax planning | `/solutions/self-employed/` |
| S-Corp election | Info | when to elect S-Corp | should my LLC be an S-Corp, S-Corp election for LLC | `/resources/when-to-elect-s-corp/` (new) |
| Real estate | Commercial | tax planning for real estate investors | real estate professional status, cost segregation for business owners | `/solutions/real-estate-investors/` |
| Families | Commercial | family tax strategies | generational wealth tax planning, family business tax planning | `/solutions/families/` |
| Strategy hub | Info/commercial | tax strategies for business owners | legal tax strategies for small business, how do business owners pay less tax, advanced tax strategies | `/strategies/` |
| Augusta Rule | Info | Augusta Rule | Section 280A(g), rent your home to your business, Augusta Rule documentation | `/strategies/augusta-rule/` (new) |
| Hire your kids | Info | hiring your kids tax | paying your children through your business, hire your kids S-Corp vs sole proprietor | `/strategies/hire-your-kids/` (new) |
| Accountable plan | Info | accountable plan | S-Corp accountable plan, reimburse home office S-Corp | `/strategies/accountable-plan/` (new) |
| Solo 401(k) | Info | solo 401k for self-employed | solo 401k S-Corp, Roth solo 401k | `/strategies/solo-401k/` (new) |
| HSA / HRA / IRA / 529 | Info | HSA for self-employed · HRA for small business · Roth IRA for kids · 529 plan for business owners | (per page) | `/strategies/hsa/`, `/strategies/hra/`, `/strategies/traditional-roth-ira/`, `/strategies/529-plan/` (new, phase 3) |
| Comparison | Commercial | tax strategist vs CPA | CPA vs tax strategist, do I need a tax strategist, tax planner vs tax preparer | `/resources/tax-strategist-vs-cpa/` (new) |
| Pillar "pay less" | Info | how to reduce taxes as a business owner | how to pay less taxes as a business owner, how to reduce small business taxes legally | `/resources/how-to-reduce-business-taxes/` (new) |
| Proactive planning | Info | proactive tax planning | proactive vs reactive tax planning, year-round tax planning | `/resources/guides/proactive-tax-planning/` |
| First call | Info | tax planning checklist | what to bring to a tax planning meeting, tax strategy call prep | `/resources/guides/first-call-checklist/` |
| Records | Info | business tax records to keep | how long to keep business tax records, documenting deductions | `/resources/guides/records-that-hold-up/` |
| Worksheets | Info/transactional | tax planning worksheets | Augusta Rule worksheet, accountable plan template, HRA plan document template | `/resources/worksheets/` |
| FAQ | Nav/info | tax strategy FAQ | HeyDrew FAQ, is a tax strategist worth it | `/resources/faq/` |
| Proof | Commercial | tax strategy examples | tax planning case studies, HeyDrew reviews | `/case-studies/` |
| Company | Nav | HeyDrew / Andrew Cordle | about HeyDrew, HeyDrew founder | `/company/about/` |

**Cannibalization guards:** the S-Corp solution page targets the *service* ("S-Corp tax strategy"); the reasonable-salary article targets the *question*. Strategy pages own the named strategy; solution pages link to them with the strategy name as the anchor and summarize in at most 2–3 sentences. The FAQ page owns brand Q&As; the guides own "how to" topics.

### 3.3 Content gaps and new pages, ranked by impact

Score = demand × winnability × conversion fit, net of thin-content risk.

| Rank | Page | Why | Thin-content risk |
|---|---|---|---|
| 1 | **Legal pages** (5, same URLs) | Trust + YMYL + SMS compliance; prerequisite, not optional | None |
| 2 | `/resources/tax-strategist-vs-cpa/` | KD 10, $8.94 CPC, exactly the brand's thesis ("Most CPAs work backwards"); strong AI-answer target ("do I need a tax strategist?") | Low: comparison table, when you need both, questions to ask |
| 3 | `/strategies/augusta-rule/` | Strongest strategy query family; HeyDrew has a real comparable-rent worksheet | Low if 900–1500 words with documentation steps |
| 4 | `/strategies/accountable-plan/` | S-Corp core; real board-resolution template | Low |
| 5 | `/strategies/hire-your-kids/` | High-interest family/owner query; Andrew's social content drives demand | Low; entity-type differences are substantive |
| 6 | `/resources/s-corp-reasonable-salary/` | Core S-Corp question, commercial adjacency to payroll | Low |
| 7 | `/strategies/solo-401k/` | Evergreen self-employed query | Medium: avoid numbers unless CPA-verified (truth rule); focus on how and when |
| 8 | `/resources/how-to-reduce-business-taxes/` | Pillar for the "pay less taxes" cluster (880+/mo family); hubs all strategies | Medium: must not duplicate `/strategies/`. Make it a decision guide by situation |
| 9 | `/resources/when-to-elect-s-corp/` | Self-employed → S-Corp decision; high intent | Low |
| 10 | HSA, HRA, IRA, 529 strategy pages | Complete the set; HRA has 2 real documents | Medium for IRA/529 (crowded by big publishers); write for the business-owner angle only |
| 11 | Andrew Cordle profile section (anchor on About, or `/company/andrew-cordle/`) | Person entity for E-E-A-T and brand queries | Keep it on About unless there's enough real bio material |
| No | State pages | Service is national and remote, with no state-specific offering; would be doorway pages | High. Skip unless real state-specific content (e.g. SALT/PTET) is written by a licensed pro |
| No | "Tax relief / back taxes" pages | Wrong intent | n/a |

When individual strategy pages exist, the hub `/strategies/` keeps short sections (2–3 sentences + "Keep on file" + link) and the nav quick links point to the pages instead of anchors.

---

## 4. GEO strategy and schema

### 4.1 How to become the cited source
1. **One canonical entity sentence**, reused verbatim on Home (lead), About (first paragraph), FAQ Q1, footer tagline area, llms.txt and Organization `description`:
   > HeyDrew is a year-round tax strategy service for business owners. Software identifies the tax strategies an owner may qualify for, and licensed professionals help put them in place and file the return. HeyDrew is operated by Aspire Advisors LLC d/b/a HeyDrew! and was founded by Andrew Cordle.
2. **Answer-first blocks.** Directly under every H1: a 40–60 word paragraph that answers the page's core question in a self-contained way (no "this", "we" without antecedent). Guides and strategy pages add a **Key takeaways** list (3–5 bullets) and end with "Where HeyDrew fits" (2 sentences + TaxLand link).
3. **Question-shaped H2s** that mirror prompts: "What is the Augusta Rule?", "Who qualifies?", "What records should you keep?", "How is this different for S-Corps and sole proprietors?", "What does HeyDrew do here?"
4. **Definition blocks.** The first sentence after a question H2 is a definition: "An accountable plan is a written reimbursement policy that lets a company repay employees, including owner-employees, for business costs they paid personally, without the payment counting as wages."
5. **Specific, verifiable, stat-free claims.** Cite the source by name (IRC §280A(g), IRC §62(c) and Treas. Reg. §1.62-2, IRS Publication 15, 463, 583, 969) and link to irs.gov. LLMs favor pages that cite primary sources. No invented percentages, averages or "clients save $X".
6. **Comparison tables** in real `<table>` markup (CPA vs strategist; sole proprietor vs S-Corp for hiring kids; proactive vs reactive). These get lifted into AI answers.
7. **FAQ blocks** with a standalone first sentence per answer.
8. **Consistent entity data everywhere**: same name, legal name, founder, URL, contact details and social profiles across site, schema, llms.txt, LinkedIn company page, Instagram, YouTube, Google Business Profile (service-area business, if the St. Augustine address is confirmed public), Crunchbase. Avoid "#1" superlatives (unverifiable, and AI engines discount them).
9. **Off-site signals** (these drive AI mentions most): real reviews on Google/Trustpilot for HeyDrew (not Andrew's other brands), podcast/show notes that link heydrew.com with the entity sentence, Reddit/community answers by the team (disclosed), and inclusion in "best tax planning services" roundups.
10. **Crawl access**: allow AI crawlers (below), serve everything as static HTML, and ship llms.txt + llms-full.txt.

### 4.2 robots.txt (recommend allow)
```
User-agent: *
Allow: /
Disallow: /_components/
Disallow: /_template/

# AI search + assistants: explicitly allowed (citation visibility)
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: GPTBot
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: ClaudeBot
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: Bingbot
Allow: /

Sitemap: https://heydrew.com/sitemap.xml
```
(Training bots GPTBot/ClaudeBot/Google-Extended/Applebot-Extended are allowed deliberately: the brand wants models to learn the entity. If the client objects, block only those four and keep the search/user agents.)

### 4.3 llms.txt (draft, `/llms.txt`)
```
# HeyDrew

> HeyDrew is a year-round tax strategy service for business owners (S-Corps, LLCs, the self-employed, owners who hold real estate, and business-owning families). Software identifies strategies an owner may qualify for; licensed professionals help put them in place and file the return. Operated by Aspire Advisors LLC d/b/a HeyDrew!. Founded by Andrew Cordle. Free assessment: TaxLand (https://taxland.heydrew.com).

Educational content only; not tax, legal or financial advice. HeyDrew does not guarantee savings.

## Product
- [How it works](https://heydrew.com/product/how-it-works/): the five-step process from assessment to filed return
- [TaxLand assessment](https://heydrew.com/product/taxland/): free, game-style assessment
- [Tax Valet](https://heydrew.com/product/tax-valet/): one point of contact all year
- [Bookkeeping & payroll](https://heydrew.com/product/bookkeeping-payroll/)
- [Pricing](https://heydrew.com/product/pricing/): one annual fee, quoted on a call

## Who it's for
- [S-Corp owners](https://heydrew.com/solutions/s-corp-owners/)
- [Self-employed & LLC owners](https://heydrew.com/solutions/self-employed/)
- [Real estate investors](https://heydrew.com/solutions/real-estate-investors/)
- [Families](https://heydrew.com/solutions/families/)

## Strategies
- [Tax strategies for business owners](https://heydrew.com/strategies/) (+ one line per strategy page as they ship)

## Guides and reference
- [Proactive vs. reactive tax planning](https://heydrew.com/resources/guides/proactive-tax-planning/)
- [First-call checklist](https://heydrew.com/resources/guides/first-call-checklist/)
- [Records that hold up](https://heydrew.com/resources/guides/records-that-hold-up/)
- [Worksheets & templates](https://heydrew.com/resources/worksheets/)
- [FAQ](https://heydrew.com/resources/faq/)

## Company
- [About HeyDrew and Andrew Cordle](https://heydrew.com/company/about/)
- [Security & privacy](https://heydrew.com/company/security/)
- [Contact](https://heydrew.com/company/contact/)

## Optional
- [Case studies and illustrative scenarios](https://heydrew.com/case-studies/)
- [Careers](https://heydrew.com/company/careers/) · [Affiliate program](https://heydrew.com/company/affiliates/)
- [Full text for LLMs](https://heydrew.com/llms-full.txt)
```
`llms-full.txt`: generated at build from each indexable page's `<main>` converted to Markdown (headings, lists, tables, FAQ Q&A), with chrome, the exit sheet and the estimator UI stripped, and each page prefixed with its canonical URL.

### 4.4 Schema plan (JSON-LD, one `@graph` per page, injected at build)

Stable `@id`s: `https://heydrew.com/#organization`, `https://heydrew.com/#website`, `https://heydrew.com/company/about/#andrew-cordle`, `<page-url>#webpage`, `<page-url>#breadcrumb`.

| Page type | Types | Notes |
|---|---|---|
| Every page | `WebPage` (or subtype) + `BreadcrumbList` (not on home) | `isPartOf` → #website; `about`/`publisher` → #organization. |
| Home | `Organization`, `WebSite`, `WebPage`, `FAQPage` (existing) | Organization: `name` "HeyDrew", `alternateName` ["Hey Drew","HeyDrew!","Hey Drew!"], `legalName` "Aspire Advisors LLC", `url`, `logo` (ImageObject 512 png), `description` (entity sentence), `founder` → Andrew @id, `slogan` "AI-Driven, Human-Perfected.", `areaServed` "US", `knowsAbout` [tax planning, S corporation taxation, …], `sameAs` [Instagram `heydrewcpa`, LinkedIn company `linkedin.com/company/heydrew.com`, YouTube (confirm URL first)], `contactPoint` + `email`/`telephone`/`address` **only after the client confirms** (§2 H11). No `aggregateRating`. WebSite: no SearchAction (there is no site search). |
| About | `AboutPage` + `Person` (Andrew Cordle) | Person: `name`, `jobTitle` "Founder", `worksFor` #organization, `image` (real photo), `sameAs` [linkedin.com/in/andrewcordle, youtube.com/cordleandrew, confirmed Aspire links]. No "#1 tax strategist" or credentials unless verified. |
| Product/solution pages | `WebPage` + `Service` | Service: `name` (e.g. "Tax strategy for S-Corp owners"), `serviceType` "Tax planning", `provider` #organization, `areaServed` US, `audience` BusinessAudience with an audienceType. No `offers.price` (quote-based). Plus `FAQPage` for page-specific visible Q&A. |
| TaxLand page | `WebPage` + `WebApplication` | `name` "TaxLand", `applicationCategory` "FinanceApplication", `url` taxland.heydrew.com, `offers` {price 0, priceCurrency USD}, `provider` #organization. |
| Pricing | `WebPage` + `Service` + `FAQPage` | Describe billing terms in text; no price. |
| Strategy hub, guides hub, resources hub | `CollectionPage` + `ItemList` | ItemList of child URLs in order. |
| Strategy pages, guides, comparison, pillar | `Article` + `FAQPage` (if a Q&A block exists) | `headline`, `description`, `image`, `author` = **Organization** #organization (Google accepts an Organization author; no fake person), `publisher` #organization, `about` (Thing, e.g. the strategy name), `citation` (IRS sources). **Dates:** `datePublished` = the real date the page first goes live on heydrew.com, stamped by the build from git history; `dateModified` = the last real content commit. Never backdate. Show "Updated <Month YYYY>" visibly only once it's real. When a licensed pro actually reviews a page, add a visible "Reviewed by <name, credential>" and `reviewedBy` Person. Never before. |
| FAQ page | `FAQPage` | All Q&As shown on the page, exactly as visible. |
| Worksheets | `CollectionPage` + `ItemList` of `DigitalDocument` | `name`, `url` (PDF), `encodingFormat` application/pdf, `isAccessibleForFree` true, `publisher`. |
| Case studies | `CollectionPage` | **No `Review`/`AggregateRating`** (self-serving review markup is ineligible and risky). Testimonials stay visible text in `<blockquote>`. |
| Careers | `WebPage` (+ `JobPosting` per role only with the real `datePosted`, `employmentType`, `jobLocationType` TELECOMMUTE, `applicantLocationRequirements` US from Dover) | Remove the JobPosting when a role closes. |
| Contact | `ContactPage` | `mainEntity` #organization with contactPoint (confirmed data only). |
| Security | `WebPage` | Link to the privacy policy. |
| Legal pages | `WebPage` | Visible "Last updated" is the real legal date from the document. |
| 404 | none, `noindex` | |

Validate with the Rich Results Test and the Schema.org validator in phase 2.

---

## 5. Page-by-page keyword map, titles and meta descriptions

Title ≤ 60 characters, description ≤ 155 (both counted and verified). Brand suffix "| HeyDrew" where it fits. URL = recommended production URL.

<!-- KEYMAP-START -->
| Page (source file) | Production URL | Primary kw | Secondary kw | Title | Meta description |
|---|---|---|---|---|---|
| Home (`index.html`) | `/` | tax strategy for business owners | year-round tax planning service; tax strategist for entrepreneurs | HeyDrew: Year-Round Tax Strategy for Business Owners | Year-round tax planning for S-Corps, LLCs and the self-employed. AI finds strategies you may qualify for; licensed pros help set them up and file. |
| How It Works (`product/how-it-works.html`) | `/product/how-it-works/` | how tax planning works | year-round tax planning process | How HeyDrew Works: Year-Round Tax Planning, Step by Step | Take the free TaxLand assessment, meet your Tax Valet, get a written strategy plan, put it in place with support all year, then file with confidence. |
| TaxLand (`product/taxland.html`) | `/product/taxland/` | free tax strategy assessment | tax savings assessment; tax savings quiz | TaxLand: Free Tax Strategy Assessment for Owners | TaxLand is HeyDrew's free tax strategy assessment, played like a game. Answer questions about your business and family to see which strategies may fit. |
| Tax Valet (`product/tax-valet.html`) | `/product/tax-valet/` | year-round tax support | dedicated tax contact | Your Tax Valet: Year-Round Tax Support, One Contact | Your Tax Valet is your dedicated point of contact at HeyDrew. Message them from your portal; they coordinate your strategy, filing, books and payroll. |
| Bookkeeping & Payroll (`product/bookkeeping-payroll.html`) | `/product/bookkeeping-payroll/` | bookkeeping and payroll for business owners | S-Corp payroll service | Bookkeeping & Payroll for Business Owners | HeyDrew | Optional monthly bookkeeping and in-house payroll, coordinated by the Tax Valet who runs your tax strategy. Clean books and a salary that holds up. |
| Pricing (`product/pricing.html`) | `/product/pricing/` | tax strategy pricing | how much does a tax strategist cost | Tax Strategy Pricing: One Annual Fee | HeyDrew | One annual fee based on your entities and complexity, quoted on your call before you commit. We reach out about 30 days before renewal with options. |
| S-Corp Owners (`solutions/s-corp-owners.html`) | `/solutions/s-corp-owners/` | S-Corp tax strategy | S-Corp tax planning; S-Corp owner salary | S-Corp Tax Strategy: Salary, Payroll & Planning | HeyDrew | Tax planning for S-Corp owners: a documented reasonable salary, clean payroll, the Accountable Plan, the Augusta Rule and retirement, planned in time. |
| Self-Employed (`solutions/self-employed.html`) | `/solutions/self-employed/` | tax strategies for self-employed | LLC tax strategies; single-member LLC tax planning | Tax Strategies for Self-Employed & LLC Owners | HeyDrew | Year-round tax planning for sole proprietors and single-member LLCs: Solo 401(k), HSA, home office, hiring your kids, estimates and S-Corp timing. |
| Real Estate (`solutions/real-estate-investors.html`) | `/solutions/real-estate-investors/` | tax planning for real estate investors | real estate professional status; cost segregation | Tax Planning for Real Estate Investors | HeyDrew | Tax planning for business owners who hold property: entity structure, the Augusta Rule, real estate professional status, cost segregation and records. |
| Families (`solutions/families.html`) | `/solutions/families/` | family tax strategies | generational wealth tax planning; hiring your kids | Family Tax Strategies for Business Owners | HeyDrew | Tax planning for business-owning families: hiring your kids, Roth IRAs for working kids, 529 plans and health costs through the business. |
| All Strategies (`solutions/strategies.html`) | `/strategies/` | tax strategies for business owners | legal tax strategies for small business; advanced tax strategies | Tax Strategies for Business Owners, Explained | HeyDrew | Tax strategies HeyDrew uses, in plain English: who each one fits, how it works, what to keep on file, and the worksheets behind them. |
| Case Studies (`case-studies.html`) | `/case-studies/` | tax strategy examples | tax planning case studies; HeyDrew reviews | Tax Strategy Examples & Client Stories | HeyDrew | HeyDrew clients in their own words, plus clearly labeled illustrative scenarios that show how a year-round tax plan gets built for different owners. |
| Resources hub (`resources.html`) | `/resources/` | tax planning resources for business owners | small business tax planning worksheets | Tax Planning Resources for Business Owners | HeyDrew | Free tax worksheets and templates, plain-English planning guides and straight answers for business owners, from the team at HeyDrew. |
| Guides hub (`resources/guides.html`) | `/resources/guides/` | tax planning guides for business owners | small business tax guide | Tax Planning Guides for Business Owners | HeyDrew | Short, plain-English guides for business owners: proactive tax planning, what to bring to your first strategy call, and keeping records that hold up. |
| Guide: proactive planning (`resources/guide-proactive-tax-planning.html`) | `/resources/guides/proactive-tax-planning/` | proactive tax planning | proactive vs reactive tax planning; year-round tax planning | Proactive vs. Reactive Tax Planning, Explained | HeyDrew | Proactive tax planning means making moves while the year is still open. How it differs from reactive tax prep, and what a year-round plan covers. |
| Guide: first call (`resources/guide-first-call-checklist.html`) | `/resources/guides/first-call-checklist/` | tax planning checklist | what to bring to a tax planning meeting | Tax Planning Checklist: What to Bring to Your First Call | A checklist for your first tax strategy call: the returns, entity documents, payroll and books to gather, and the questions to ask, so the plan fits. |
| Guide: records (`resources/guide-records-that-hold-up.html`) | `/resources/guides/records-that-hold-up/` | business tax records to keep | how long to keep business tax records; documenting deductions | Business Tax Records That Hold Up: A Plain Guide | HeyDrew | How business owners keep records that support their deductions: write it down when it happens, tie costs to a business purpose, put plans in writing. |
| Worksheets (`resources/worksheets.html`) | `/resources/worksheets/` | tax planning worksheets | Augusta Rule worksheet; accountable plan template; HRA plan document | Free Tax Worksheets & Templates for Owners | HeyDrew | Free templates: an Augusta Rule comparable-rent worksheet, an Accountable Plan board resolution, and an HRA plan document and employment agreement. |
| FAQ (`resources/faq.html`) | `/resources/faq/` | tax strategy FAQ | HeyDrew FAQ; is a tax strategist worth it | Tax Strategy FAQ: Straight Answers | HeyDrew | Straight answers about HeyDrew: what it is, who it fits, pricing, filing, audit risk, keeping your current CPA, catching up on prior years and security. |
| About (`company/about.html`) | `/company/about/` | HeyDrew | Andrew Cordle; HeyDrew founder | About HeyDrew and Founder Andrew Cordle | HeyDrew is year-round tax strategy for business owners, founded by Andrew Cordle. Why it exists and how software and licensed pros split the work. |
| Careers (`company/careers.html`) | `/company/careers/` | HeyDrew careers | remote jobs | Careers at HeyDrew: Remote Roles in the US | Join HeyDrew and help business owners keep what they earn. How we work, what we value, and the open remote roles on our team right now. |
| Affiliates (`company/affiliates.html`) | `/company/affiliates/` | tax strategy affiliate program | CPA referral program | Tax Strategy Affiliate Program | HeyDrew | Refer business owners to HeyDrew through our affiliate program on Impact. Built for CPAs, coaches, creators and communities. Terms live on Impact. |
| Contact (`company/contact.html`) | `/company/contact/` | contact HeyDrew | book a tax strategy call | Contact HeyDrew: Book a Tax Strategy Call | Reach a person at HeyDrew. Send a message, book a strategy call, start the free assessment, or sign in to message your Tax Valet. |
| Security (`company/security.html`) | `/company/security/` | tax data security | is HeyDrew secure | Security & Privacy: How We Protect Your Tax Data | How HeyDrew protects your file: encrypted in transit and at rest, access limited to the people on your account, never sold. Plus what to ask any tax firm. |
| Privacy policy (new, migrate) | `/privacy-policy/` | HeyDrew privacy policy | | Privacy Policy | HeyDrew | How HeyDrew (Aspire Advisors LLC) collects, uses and protects your personal and tax information, and the choices you have. |
| Terms of use (new, migrate) | `/terms-of-use/` | HeyDrew terms of use | | Terms of Use | HeyDrew | The terms that govern your use of the HeyDrew website and TaxLand assessment, operated by Aspire Advisors LLC d/b/a HeyDrew!. |
| Engagement terms (new, migrate) | `/engagement-terms/` | HeyDrew engagement terms | | Engagement Terms of Service | HeyDrew | The terms that govern HeyDrew services you purchase: scope, your responsibilities, billing, renewal, cancellation and refunds. |
| SMS terms (new, migrate) | `/sms-terms/` | HeyDrew SMS terms | | SMS Messaging Terms | HeyDrew | Terms for HeyDrew text messages: what we send, message frequency, rates, and how to opt out or get help at any time. |
| Cookie policy (new, migrate) | `/cookie-policy/` | HeyDrew cookie policy | | Cookie Policy | HeyDrew | Which cookies and similar technologies the HeyDrew website uses, why we use them, and how to manage your preferences. |
| 404 (new) | `/404.html` (noindex) | | | Page Not Found | HeyDrew | That page moved or no longer exists. Find tax strategies, guides and the free TaxLand assessment from here. |
| NEW Tax strategist vs CPA | `/resources/tax-strategist-vs-cpa/` | tax strategist vs CPA | do I need a tax strategist; tax planner vs tax preparer | Tax Strategist vs. CPA: What's the Difference? | HeyDrew | A CPA files what already happened; a tax strategist plans what happens next. How the roles differ, when you need both, and what to ask either one. |
| NEW Augusta Rule | `/strategies/augusta-rule/` | Augusta Rule | Section 280A(g); rent your home to your business | Augusta Rule (Section 280A): How It Works | HeyDrew | How the Augusta Rule lets your business rent your home for real business meetings, who it fits, how to set a fair rent, and the records to keep. |
| NEW Accountable Plan | `/strategies/accountable-plan/` | accountable plan | S-Corp accountable plan; reimburse home office S-Corp | Accountable Plan for S-Corp Owners, Explained | HeyDrew | How an accountable plan lets your company reimburse business costs you paid personally, like a home office or mileage, and the records it needs. |
| NEW Hire Your Kids | `/strategies/hire-your-kids/` | hiring your kids tax | paying your children through your business | Hiring Your Kids in Your Business: Tax Rules | HeyDrew | How paying your children for real work shifts income to them, how the rules differ for sole proprietors and S-Corps, and the records to keep. |
| NEW Solo 401(k) | `/strategies/solo-401k/` | solo 401k for self-employed | solo 401k S-Corp; Roth solo 401k | Solo 401(k) for the Self-Employed, Explained | HeyDrew | How a Solo 401(k) works for self-employed owners and S-Corps with no employees: employee and employer contributions, Roth options and setup timing. |
| NEW HSA | `/strategies/hsa/` | HSA for self-employed | HSA business owner | Health Savings Accounts for Business Owners | HeyDrew | How a health savings account works for business owners: who is eligible, how contributions are treated by entity type, and what records to keep. |
| NEW HRA | `/strategies/hra/` | HRA for small business | health reimbursement arrangement owner | Health Reimbursement Arrangements (HRA), Explained | HeyDrew | How a health reimbursement arrangement lets a business repay medical costs, which HRA types fit small businesses, and the plan documents it requires. |
| NEW Traditional & Roth IRA | `/strategies/traditional-roth-ira/` | Roth IRA for kids | traditional vs Roth IRA business owner | Traditional & Roth IRAs for Owners and Their Kids | HeyDrew | How traditional and Roth IRAs fit a business owner's plan, including a Roth IRA for a child with earned income from the family business. |
| NEW 529 plan | `/strategies/529-plan/` | 529 plan for business owners | 529 education plan tax benefits | 529 Education Plans for Business Owners | HeyDrew | How a 529 education plan grows savings for school, how it fits a business-owning family's tax plan, and what to track along the way. |
| NEW S-Corp reasonable salary | `/resources/s-corp-reasonable-salary/` | S-Corp reasonable salary | reasonable compensation S-Corp | S-Corp Reasonable Salary: How to Set It | HeyDrew | How S-Corp owners set a reasonable salary: the factors the IRS weighs, why no single percentage fits everyone, and how to document your number. |
| NEW When to elect S-Corp | `/resources/when-to-elect-s-corp/` | when to elect S-Corp | should my LLC be an S-Corp | When Should an LLC Elect S-Corp Status? | HeyDrew | How to tell whether an S-Corp election makes sense for your LLC: the trade-offs, the added payroll and filing work, and the timing that matters. |
| NEW Pillar | `/resources/how-to-reduce-business-taxes/` | how to reduce taxes as a business owner | how to pay less taxes as a business owner | How to Reduce Taxes as a Business Owner, Legally | HeyDrew | Legal ways business owners lower their taxes: plan before year-end, pick the right entity, use the strategies you qualify for, and keep the records. |
<!-- KEYMAP-END -->

Notes:
- C5 resolved by the client (2026-09-24): no "never auto-renews" anywhere; renewal copy is "We reach out about 30 days before your renewal with your options."
- Guide metas must match the final guide text. The resources builder should adjust wording, not intent, if content differs.
- H1 guidance per page: include the primary keyword or its plain variant in the H1 (kicker span allowed) and in the first sentence.

---

## 6. Technical checklist

### 6.1 Build step (new `tools/build.mjs`, run after `sync-chrome.mjs`)
- Input: `site/` sources + a `pages.json` manifest (slug, source, url, title, description, primary kw, og image, breadcrumb, schema type, indexable).
- Output: `dist/` using an allowlist (no backups, `_*.html`, `shots/`, `img/raw/`, `img/t/`, `tools/`, README).
- Writes each page to `<url>/index.html` and rewrites every internal `href`/`src` from relative `.html` to root-relative clean URLs (`/product/pricing/`). Anchors are preserved (`/strategies/#augusta-rule` until pages exist).
- Injects into `<head>`: `<link rel="canonical">` (absolute), OG/Twitter, icons + manifest, JSON-LD `@graph` (from manifest + parsed visible FAQ), `<meta name="robots" content="noindex">` for non-indexable pages.
- Emits `sitemap.xml` (indexable pages only, `lastmod` from git), `robots.txt`, `llms.txt`, `llms-full.txt`, `404.html`, and a `_redirects` (Netlify/Cloudflare Pages) or `vercel.json` redirect file.
- Minifies CSS/JS/HTML; content-hash filenames for long cache.
- Checks (fail the build): title ≤ 60, description ≤ 155, one H1, unique titles/descriptions, no `alt` missing, no link to `heydrew.com/*` pages that exist in-site, no `\b(eight|\d+ strategies)\b`.

### 6.2 URL and canonical rules
- Canonical host: `https://heydrew.com` (apex, https). 301 `www` → apex and `http` → `https`. HSTS on.
- Trailing slash on every page URL. 301 the non-slash and `.html`/`index.html` forms to it.
- Why folders + trailing slash: it matches the live WordPress convention (existing links and CTAs use `/contact/`), works on any static host without rewrite rules, and gives a clean hierarchy for breadcrumbs.
- `?src=` / `?pos=` params: canonical strips them, so there's no duplicate problem. Keep them on outbound TaxLand links only. For internal links, prefer clean URLs and track clicks with `HD.track` instead of params.
- Move "All Strategies" to `/strategies/` (short, entity-rich, parent of the strategy pages). Its file can stay `solutions/strategies.html`; the manifest maps it.

### 6.3 301 map (live → new)
Source: `brand-research/.firecrawl/map.txt` + the Semrush crawl.

| Live URL | New URL | Code |
|---|---|---|
| `/` | `/` | 200 (make sure the old temporary 302 is gone) |
| `/about-us` and `/about-us/` | `/company/about/` | 301 |
| `/how-it-works/` | `/product/how-it-works/` | 301 |
| `/our-strategies/` | `/strategies/` | 301 |
| `/why-we-are-different/` | `/resources/tax-strategist-vs-cpa/` (interim until built: `/product/how-it-works/`) | 301 |
| `/faq/` | `/resources/faq/` | 301 |
| `/careers/` | `/company/careers/` | 301 |
| `/contact/` | `/company/contact/` | 301 (query string preserved) |
| `/privacy-policy/`, `/terms-of-use/`, `/engagement-terms/`, `/sms-terms/`, `/cookie-policy/` | same path | 200, content migrated |
| `/legal/cookie-policy`, `/legal/sms-terms` (seen on www) | `/cookie-policy/`, `/sms-terms/` | 301 |
| `/lcookie-policy` (typo, currently 404) | `/cookie-policy/` | 301 |
| `/terms-of-service/` (linked from the new footer) | `/engagement-terms/` | 301, and fix the link |
| `/wp-content/uploads/2026/07/HRA-Employment-Agreement.pdf` (+ the other 3 PDFs) | `/downloads/hra-employment-agreement.pdf`, `/downloads/augusta-rule-comparable-worksheet.pdf`, `/downloads/accountable-plan-board-resolution.pdf`, `/downloads/hra-written-plan-document.pdf` | 301 (or keep the old paths live if moving the files is inconvenient) |
| `/sitemap_index.xml`, `/page-sitemap.xml`, `/post-sitemap.xml` | `/sitemap.xml` | 301 |
| `/feed/`, `/comments/feed/`, `/wp-json/*`, `/wp-admin/*`, `/wp-login.php`, `/?p=*` | `/` or 410 | 410 preferred for wp-* |
| `/get-started`, `/login` (if used in ads/email) | `https://taxland.heydrew.com/` / `https://portal.heydrew.com/` | 302 (off-site app) |

Also: update the Google Business Profile, Instagram and LinkedIn bio links, email templates, the Impact affiliate landing URL, and ad final URLs to the new URLs, then submit the new sitemap in Search Console and Bing Webmaster Tools (enable IndexNow on Bing).

### 6.4 Performance
Self-host fonts (H9) · `srcset`/`sizes` on all hero and scene images (H8) · no eager below-fold images · keep GSAP deferred and homepage-only · `preconnect` only to origins still used · long-cache immutable assets · Brotli · target LCP < 2.5 s and CLS < 0.1 on a mid-range Android over 4G (verify with Lighthouse and PageSpeed on the staging URL).

---

## 7. Implementation checklist for phase 2

**A. Foundation (do first, all pages)**
- [ ] `pages.json` manifest with the §5 titles/metas/URLs; `tools/build.mjs` (§6.1) with lint checks.
- [ ] Apply the §5 titles and descriptions to every source page (so `file://` previews match production).
- [ ] Canonical, OG/Twitter, icons/manifest, theme-color injected at build; create the 1200×630 OG images.
- [ ] robots.txt, sitemap.xml, llms.txt, llms-full.txt, 404.html, redirects file.
- [ ] Organization/WebSite/Person/Breadcrumb/Service/Article/FAQPage/ItemList JSON-LD per §4.4. Validate.

**B. Links and content fixes**
- [ ] Replace every `https://heydrew.com/{our-strategies,faq,contact}/` in-content link and the chrome's secondary CTA with internal links (C3). Fix the footer "Terms of Service" link (C2).
- [ ] Add 3–6 contextual body links on every page (homepage: the strategies section → `/strategies/` and each strategy; the FAQ → `/resources/faq/`; the Tax Valet step → `/product/tax-valet/`; the pricing sheet → `/product/pricing/`; the testimonials → `/case-studies/`).
- [ ] Breadcrumbs per H10.
- [ ] H1 kicker or topic words (H5), FAQ `Q1` spans (M1), UI headings (M2), alt text (M3), anchor text (M5).
- [ ] Tab panels visible in source (H7).
- [ ] De-duplicate FAQ Q&As; `resources.html` becomes a summary hub (H6).
- [ ] Entity sentence placed verbatim (§4.1).

**C. Trust / YMYL (needs the client)**
- [ ] Reconcile auto-renew wording between the site and the Engagement Terms (C5).
- [ ] Confirm credential wording and add a licensing statement (C6); decide whether the `@heydrewcpa` handle and "CPA" usage are allowed.
- [ ] Confirm public NAP (H11); add it to the footer, Contact and schema.
- [ ] Migrate the 5 legal pages at the same paths (C2).
- [ ] Confirm the YouTube URL and social profiles for `sameAs`.
- [ ] Choose a licensed reviewer for educational pages (optional but strong for YMYL); only then add "Reviewed by".

**D. Performance**
- [ ] Image derivatives + `srcset` (H8), self-hosted fonts (H9), minification, caching headers, HSTS.

**E. Launch**
- [ ] Noindex/password all preview hosts, including `hey-drew.vercel.app` (C7).
- [ ] Deploy `dist/`, verify the 301 map with a script (every row → one hop → 200), verify the 404 status.
- [ ] Search Console + Bing: verify, submit the sitemap, request indexing for top pages; IndexNow.
- [ ] Fix TaxLand's title/meta/H1 (M9).
- [ ] Baseline tracking: Search Console queries; monthly manual AI-answer checks for the prompts "tax strategist vs CPA", "what is the Augusta Rule", "best year-round tax planning service for S-Corp owners", "what is HeyDrew".

**F. Content (phase 3, in §3.3 order)**
- [ ] Tax strategist vs CPA → Augusta Rule → Accountable Plan → Hire Your Kids → S-Corp reasonable salary → Solo 401(k) → pillar → When to elect S-Corp → HSA/HRA/IRA/529. Each page: answer-first intro, key takeaways, question H2s, IRS citations, worksheet links, FAQ, "Where HeyDrew fits", "educational, not tax advice" note, CPA sign-off on any figure.

---

## 8. Rules for page builders (active now)

1. **Title and meta:** use the exact §5 values for your page (`Primary topic | HeyDrew`, ≤60 / ≤155). Don't hand-write canonical, OG or JSON-LD; phase 2 generates them.
2. **One H1 with the topic in plain words.** A slogan is fine, but the literal topic (e.g. "Proactive tax planning") must be in the H1, in a kicker `<span>` inside it, or in the first sentence.
3. **Answer first.** The first paragraph under the H1 is 40–60 words and answers the page's main question in standalone sentences. Guides add a "Key takeaways" list of 3–5 bullets.
4. **Question-shaped H2s** that match what people ask; the first sentence after each is a direct answer or definition. Never skip levels. UI labels and counters ("Q1", filter labels, success messages) are not headings: put `Q1` in an `aria-hidden` span outside the heading text.
5. **Everything in static HTML.** Tabs and accordions are allowed only if every panel's full text is in the source with no `hidden` attribute; JS may hide panels on init. Never inject text with JS.
6. **One home per piece of content.** Each guide, the worksheets and the full FAQ live on their own `resources/*` page. `resources.html` gets a 1–2 sentence summary + link per item. Don't copy full text between pages, and don't reuse another page's FAQ answers word for word.
7. **Internal links:** a breadcrumb (`Home › Resources › Guides › Page`), 3–6 in-body links with descriptive anchors (e.g. "how the Augusta Rule works" → `solutions/strategies.html#augusta-rule`, "S-Corp owners" → `solutions/s-corp-owners.html`, "free TaxLand assessment" → `product/taxland.html`), 2+ links to sibling resources, and a link back to the hub. Relative `.html` links only. Never link to `https://heydrew.com/faq|contact|our-strategies` (use `resources/faq.html`, `company/contact.html`). No bare "learn more" or "click here".
8. **Images:** width/height always; `loading="lazy"` except the hero (`fetchpriority="high"`); a specific alt for informative images ("First page of the Augusta Rule comparable-rent worksheet"); `alt=""` for decorative Drew art and for avatars next to a visible name; descriptive file names.
9. **Truth and YMYL:** no strategy counts, stats, dates, authors, reviewer credentials, ratings or `Review` markup. Worked examples are labeled "Illustrative scenario" in visible text. Don't use tax figures unless they match the homepage. Cite primary sources by name (IRC §280A(g), IRS Publication 463…) and link irs.gov. End every guide with "Educational only, not tax advice. Your situation needs your own review."
10. **FAQ and definitions:** one `.qa` per question; the answer's first sentence stands alone (answer, then detail).
11. **Tables and lists:** comparisons in real `<table>` with `<th scope>`; steps in `<ol>`; checklists in `<ul>`. Define a term in the sentence where it first appears ("An accountable plan is…"); don't build a glossary page.
12. **Case studies:** testimonials as `<blockquote>` + `<cite>` with visible text (quote word for word). Scenario headings are descriptive ("Illustrative scenario: an S-Corp consultant"). Link each strategy mentioned to its `solutions/strategies.html#anchor` and the matching solutions page. Use the §5 title/meta.

---

## Phase 2 status (2026-09-24)

Implemented. See `research/seo/PHASE2_REPORT.md` for details and verification. Client decisions applied:
- Renewal: "We reach out about 30 days before your renewal with your options." Nothing says "never auto-renews".
- Credentials: "licensed (tax) professionals" everywhere.
- No address or phone anywhere, including schema.
- Clean URLs come from `site/tools/build.mjs`, which outputs `dist/`.

Resources scope is final: no glossary and no tax calendar.
