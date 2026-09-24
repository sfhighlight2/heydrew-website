# HeyDrew homepage redesign (prototype)

The homepage `index.html` plus shared assets (see below). Images are loaded from `img/` using relative paths. The only external resources are Google Fonts (DM Sans, plus DM Mono 500 for data on paper) and GSAP 3.12.5 + ScrollTrigger from cdnjs (pinned versions).

## Multi-page foundation (2026-09-24)

The homepage now shares its chrome and styles with every page.

| Path | What it is |
|---|---|
| `assets/css/site.css` | Shared: tokens, base, type, buttons, paper/stamp/box, deadline bar, header + dropdown nav + menu sheet, stage, section, FAQ, footer, sticky CTA, exit sheet, hero entrance, reduced motion |
| `assets/css/home.css` | Homepage sections only |
| `assets/css/pages.css` | Page components for inner pages (see `_components.html`) |
| `assets/js/site.js` | Shared: analytics (`HD.track`, adds `page_slug`), TaxLand links, deadline bar, header, dropdowns, menu sheet, sticky CTA, FAQ, exit intent, scroll depth, `[data-reveal]` reveals. Every block guards its elements. |
| `assets/js/home.js` | Homepage: estimator, rail, tiles, swipe rails, GSAP choreography |
| `assets/css/resources.css`, `assets/js/resources.js` | Resources section only (`resources.html` + `resources/*.html`): binder tabs, key takeaways, guide article layout (reading progress, TOC scrollspy, pull quotes, related-strategy card, prev/next), first-call checklist (localStorage), worksheet spreads, FAQ search |
| `_template.html` | Blank page with the full shared chrome and build instructions in a comment |
| `_components.html` | Live component reference with copyable markup (noindex) |
| `tools/sync-chrome.mjs` | Copies the chrome blocks from `_template.html` into every page |
| `index.backup3.html` | The single-file homepage before the split (rollback) |

**Relative links.** Every page declares `<body data-page="<slug>" data-root="">` (`"../"` in `product/`, `solutions/`, `company/`, `resources/`). The shared markup (sprite, header + sheet, footer, exit sheet + sticky) lives between `<!-- chrome:NAME -->` markers and is written for the root in `_template.html`. After adding a page or editing the chrome, run `node tools/sync-chrome.mjs` from `site/`: it copies the blocks into every page, prefixes relative `href`/`src` with the page's depth, sets `?src=<slug>` and marks the current page (`aria-current="page"`, `.is-current` on its dropdown). `--check` reports stale pages. site.js also sets the current page and TaxLand `src` at runtime.

**Nav.** Dropdowns are disclosure buttons (not ARIA menus): hover intent 120ms open / 200ms close for mouse, click/tap toggles, Enter/Space/ArrowDown open and focus the first link, arrows/Home/End move inside, Left/Right move between top items, Esc closes and returns focus, tabbing out or clicking outside closes. Without JS, panels open on hover/focus-within. Below 1024px the menu sheet shows the same links as accordions (the current page's group starts open) with the CTA pinned at the bottom.

**Resources section (2026-09-24).** Resources is a dropdown (Guides, Worksheets & Templates, FAQ, three guide quick links, "All resources", and a featured Augusta worksheet card). Pages: `resources.html` (hub; keeps the legacy anchors `#guides`, `#worksheets`, `#faq`, `#doc-augusta`, `#doc-accountable`, `#doc-hra-plan`, `#doc-hra-employment`), `resources/guides.html`, `resources/guide-proactive-tax-planning.html`, `resources/guide-first-call-checklist.html`, `resources/guide-records-that-hold-up.html`, `resources/worksheets.html` (anchors `#augusta`, `#accountable`, `#hra`, `#hra-plan`, `#hra-employment`), `resources/faq.html` (one `details.qa` per question, id per question). The glossary and tax calendar were removed at the client's request. `tools/sync-chrome.mjs` knows the `resources` group. QA: `node qa-resources2.mjs` in `../../brand-research`.

**HRA thumbnail note.** The live `HRA-Written-Plan-Document.pdf` has an internal "Review Flag" box at the top (it says the draft is routed for an accuracy review before client use). `img/pages/docs/hra-plan.webp` is cropped below it on purpose, but the PDF itself still shows it. The client should publish a clean PDF before launch.

**Strategy anchors** the nav links to on `solutions/strategies.html`: `#hire-your-kids`, `#augusta-rule`, `#solo-401k`, `#accountable-plan`.

**Copy rule:** never state a number of strategies anywhere (no "8", "eight", "N of 8", "+ 4 more").

## Open / preview

- **Quickest:** open `index.html` in a browser. It works from `file://`.
- **Local server:** `cd site && python3 -m http.server 8080`, then open http://localhost:8080.
- **Deadline bar preview:** outside Oct 1 to Dec 31, add `?deadline=1` to the URL.
- **Exit-intent preview:** add `?exit=1` to open the exit sheet immediately. It skips all guards and the once-per-session cap. See [Exit intent](#exit-intent).
- **Screenshots and QA:** run `node qa-fix.mjs all` from `../../brand-research` (Playwright lives there). It writes `desktop-*` and `mobile-*` to `site/shots/` and reports the following:
  - console errors
  - scrollWidth at 390, 768, 1024 and 1280
  - estimator result and handoff URLs
  - no-JS FAQ and tile heights
  - reduced-motion hidden elements
  - a 3s slow-CDN hero test
- **Older screenshot script:** `node shot-home.mjs` still works.

## Files

| Path | What it is |
|---|---|
| `index.html` | The page |
| `img/o-*.webp` | Optimized assets used by the page |
| `img/o-drew-point.webp` | Hero Drew, desktop only, 34KB |
| `img/o-drew-desk.webp` | Drew in the strategies bento |
| `img/o-drew-hero.webp` | Drew in the TaxLand portal |
| `img/o-drew-celebrate.webp` | Drew in the final CTA |
| `img/o-drew-avatar.webp` | Drew avatar |
| `img/o-backdrop-*.webp`, `img/o-fg-*.webp` | Parallax layers for the portal diorama |
| `img/o-andrew-solo.webp` | Founder photo, cropped to Andrew only (figurine removed) |
| `img/o-andrew-avatar.webp` | 56px avatar for the proof strip |
| `img/o-t-*.webp` | Testimonial headshots |
| `img/o-logo.webp`, `img/logo-white.svg` | Logos |
| `img/drew-*.webp`, `img/taxland-*.webp`, `img/raw/`, `img/t/` | Source renders and downloads. Not referenced by the page. |
| `img/o-andrew.webp`, `img/o-art-*.webp` | Retired, no longer referenced. Safe to delete. |
| `shots/` | Latest 1440 and 390 scroll-through screenshots |

## Scroll and animation inventory

All motion is transform- or opacity-only, apart from two CSS custom-property draws (the highlighter and the rail fill). GSAP `matchMedia` splits the motion into three groups:

- desktop (≥1024)
- mobile (<1024)
- `prefers-reduced-motion: reduce`, where nothing animates and everything renders final

Without JS, or if GSAP never loads, the page is complete: FAQ answers and "Who it fits" text render expanded.

| # | Section | Motion |
|---|---|---|
| 1 | Hero entrance | The H1, lead, CTA and estimator card are never pre-hidden, so they are visible at first paint and LCP-safe. If GSAP is ready within about 350ms of the head script, the full choreography plays: H1 lines rise out of a mask, the card settles from −2.4° to −0.6°, then lead, CTA and card rows. Otherwise only the decorative layer plays: tab, rule draw, highlighter sweep, Drew slide-in, CPA stamp slam, check row. If GSAP arrives after the 1.5s failsafe, the entrance is skipped and never replays. |
| 2 | Hero idle | Drew breathes (the page's one loop). It pauses off-screen. |
| 3 | Hero parallax | On desktop, Drew and the card drift at different rates as the hero scrolls away. |
| 4 | Proof strip | A hairline draws, then the cells stagger in. |
| 5 | Problem | Heading lines slide in, then the pull-quote rule grows. The 12-month rail's green fill is **scrubbed** to scroll, lighting each month node in turn. The "Planning window missed" stamp slams in at the end. The rail key fades up. |
| 6 | How it works | The Plan sheet settles in. Entries stagger. Each vignette plays once: a chip is selected, the Tax Valet types then the message appears, plan boxes tick. |
| 7 | Strategies | Tiles batch-reveal in order, and each IRC cite rises out of its mask. The mini documents (timesheet, reimbursement) parallax inside their tiles. The Drew-desk image parallaxes. The caption card and speech bubble pop. The dashed "stub" draws open. |
| 8 | Illustrative example | The one pin: desktop, viewport height ≥720px, 70% of a viewport. Ledger rows and hairlines are **scrubbed**. The $135,000 total is not scroll-linked: it counts once over 1.2s when the pin starts, then holds. The ILLUSTRATIVE stamp is visible from the start. The double underline draws after the count. On mobile the same count plays once at 50% visibility. |
| 9 | Portal diorama | Three-layer parallax (backdrop, Drew, foreground grass). The headline masks in and the list checks pop. |
| 10 | Testimonials | Jess's quote reveals line by line. The right column parallaxes on desktop. |
| 11 | Team | Photo wipe, note fade, AI and Team ledger columns. |
| 12 | Pricing and FAQ | The terms sheet settles, then clauses and security checks. The FAQ sheet settles. |
| 13 | Final CTA | Highlighter sweep on "open". Drew does one hop on the horizon line with a shadow squash. Bubble pop. |

### Phones (<768px)

Nothing on phones is scrubbed to scroll, apart from the problem rail's fill. The portal, strategy-tile and mini-doc parallax is desktop-only. Jess's quote fades in as a block instead of word by word. The "Who it fits" line is always visible, so the tiles have no toggle.

## Mobile layout (<768px)

- **Hero:** the "2026 plans are open" tab is hidden and spacing is tighter. The first estimator question starts about 480px down at 390px wide, so both rows of chips are in the first screen at 390×844 and 360×740.
- **Tap targets:** the header CTA and all text links are at least 44px tall.
- **Strategies:** one swipeable row of full cards with Drew's desk card first. Text is unclamped, the fit line is always shown and the mini-docs are hidden. A hairline progress thumb and 44px arrow buttons sit under the row. The "Which of these fit you?" stub now sits outside the grid; desktop renders the same as before.
- **Testimonials:** all five short quotes sit in a swipeable row as paper cards, with Vicky's first. "Show all 6" is hidden on phones.
- **Team photo:** 5:4 instead of 4:5.
- **Footer:** keeps only safe-area bottom padding, because the sticky CTA hides over it.
- **Sticky CTA:** also hides while the exit sheet is open.
- **Result:** at 390px the page is about 13,700px, down from 15,330px.

Analytics: `strategy_rail_swipe` and `testimonial_rail_swipe` each fire once, on the first swipe.

## Exit intent

The exit sheet is a "Your 2026 Strategy Plan" page: four unchecked strategy rows under a red "Unchecked" stamp. It has the page's primary CTA and a soft email capture for the strategy checklist. On desktop, the pointing Drew (`o-drew-point.webp`) sits beside the sheet. On phones it is a bottom sheet with the Drew avatar and no Drew image.

If the visitor already finished the estimator, the sheet is personalized:

- the heading changes to "your plan is still open"
- the rows are ticked and list only the strategies that may fit
- the stamp reads "Up to N may fit"
- the CTA reads "Continue in TaxLand" and carries `entity`/`rev`

**Triggers**

- **Desktop:** the pointer leaves through the top edge of the viewport (`mouseout` with no `relatedTarget` and `clientY <= 0`) after at least 8s on the page.
- **Touch devices** (`hover: none` or `pointer: coarse`) have two triggers:
  - a fast upward fling of at least 1.2 viewports within 600ms, after the visitor has scrolled past 50% of the page and spent at least 20s on it. Anchor jumps and sticky "resume" scrolls are ignored for 1.5s.
  - 45s with no scroll, touch or key input after reaching 50% depth, while the tab is visible.

**Never shown when:**

- it has already shown this session (`sessionStorage.hd_exit_shown`, with an in-memory fallback)
- the visitor clicked any TaxLand link this session (`sessionStorage.hd_tl_clicked`)
- the visitor is mid-estimator: Q1 answered but not Q2, or focus is inside the unfinished card
- the mobile menu is open
- a form field is focused

**Dismissal**

- the close button, Esc, or a backdrop tap
- focus is trapped inside the dialog; the page behind is `inert` with scrolling locked
- focus returns to the element that had it before the sheet opened
- with `prefers-reduced-motion`, the sheet appears without movement

**Email:** submission is handled in JS with `preventDefault`. It validates inline, then swaps to a "✓ Sent" thanks state. `TODO(ESP)` in the script marks where to POST to Klaviyo/HubSpot. The email address is never pushed to `dataLayer`.

**Events:**

- `exit_intent_shown` with `{trigger: mouse_top|scroll_up_fast|idle|preview, personalized, seconds_on_page}`
- `exit_intent_cta`
- `exit_intent_dismiss` with `{method: close|escape|backdrop}`
- `exit_intent_email_submit`

The CTA also fires the usual `cta_click` with `pos=exit`.

**Console controls for QA:** `hdExitIntent.open('preview')` and `hdExitIntent.close('close')`. To reset the session cap, run `sessionStorage.removeItem('hd_exit_shown')`.

## [CONFIRM] launch blockers

Every item is flagged in the markup with `data-confirm`. Nothing is marked visibly on the page.

1. **CPA sign-off: estimator rule table.** `RULES` in the script. Every row is illustrative.
2. **CPA sign-off: $135K example.** The scenario inputs, plus the five ledger line amounts. **$32,200 / $21,000 / $58,000 / $12,000 / $11,800 are placeholders** that sum to $135,000 so the ledger reads as a ledger. The CPA must supply the real split.
3. **CPA sign-off: IRC citations.** All cites, including the HRA type (§105 · §9831).
4. **2026 figures.** The $16,100 standard deduction, and the Solo 401(k) limit (only after a CPA check).
5. **Credential wording.** "Licensed CPAs" in the hero lead and check row. The "✓ Filed by licensed CPAs" stamp on the estimator card. "Licensed CPAs & EAs" in the proof strip. CPA/EA in the team section.
6. **Existing-CPA policy.** The line under the rail, and FAQ Q6.
7. **Minimum fit criteria.** FAQ Q5.
8. **Call length.** How it works, step 2.
9. **Testimonials.** All six are consenting HeyDrew tax clients. Rename the headshot files to match (the live site uses `Image-Robert-Angela-T.png` for Kesh K.).
10. **Founder.** Andrew approves the note wording. Photo rights for both the photo and the avatar.
11. **URLs.** Booking URL (×6), portal/Sign-in URL (×3), YouTube channel URL.
12. **Legal.** Deadline bar wording. Disclaimer block review. Licensing/regulatory statement for the CPA/EA practice.
13. **Logo.** A true vector color logo from the client. The header uses a raster fallback.

## Analytics positions (`pos` on TaxLand links)

The positions are:

- `nav`, `hero`, `hero_result` (in-card button after the estimator), `hero_skip` (mobile "Skip ahead" link)
- `hiw`, `bento`, `example`, `portal`, `pricing`, `final`, `footer`, `sticky`, `deadline`, `exit` (exit-intent sheet)

Estimator answers (`entity`, `rev`) are appended to every TaxLand link except `deadline`. `cta_click.prefilled` reflects whether the clicked href carried them.
