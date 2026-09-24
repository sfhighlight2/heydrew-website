# HeyDrew Homepage: Art Direction (overrides BLUEPRINT.md on visual matters)

**Scope.** This file wins on anything visual: layout families, type treatment, color ratios, radii, texture, imagery placement, motion. **BLUEPRINT.md still wins** on copy, section order, CTA labels and destinations, compliance, [CONFIRM] markers, analytics and performance budgets. When the two conflict on something visual, build this one.

**Design read:** a premium-fintech homepage for small-business owners, written with a calm, ledger-precise voice and warmed by one character. It borrows Mercury's restraint, Stripe Press's respect for the printed object and Ramp's clarity. Dials: `DESIGN_VARIANCE 7 / MOTION_INTENSITY 6 / VISUAL_DENSITY 4`.

**Theme:** light page, locked. The blueprint's two dark bands (TaxLand portal, Founder) and the dark footer are deliberate rhythm, not theme flips. We do not ship a dark mode for the prototype, because the brand has no dark identity yet. Note it as a follow-up.

**The one-sentence test:** if you could swap the logo for any other tax startup and the page still made sense, we failed. Every section must carry **The Plan** (below) or **Drew**. Never both at full volume in the same viewport, except the hero.

---

## 1. AI-tell audit of the blueprint

| # | Blueprint element | Why it reads generic / AI | Replacement (build this) |
|---|---|---|---|
| 1 | Hero stage "faint 24px dot grid + radial green glow top-right" | The dot grid and the glow blob are the two most common AI hero backdrops | **Remove both.** Flat `navy-50` stage. Give it depth with real objects instead: the Plan document (paper with ledger rules, §2) and Drew's contact shadow. The only texture is the global grain (§4.4). |
| 2 | Eyebrow pill "● 2026 plans are open" with a green dot | Status-dot pill eyebrows are a template staple | Keep the copy. Render it as a **ledger tab**: DM Mono 12px/500, uppercase, +0.06em tracking, navy-600 on white, 1px `--line` border, **4px radius**, with the green dot swapped for a 6×6 green **square** (a ledger tick box) filled green-500. No pill. |
| 3 | An eyebrow above every section (8 of them) | The #1 template rhythm tell | **4 eyebrows render visibly:** hero tab, THE PROBLEM, AN ILLUSTRATIVE EXAMPLE, AI-DRIVEN. HUMAN-PERFECTED. All four use the ledger-tab style (item 2), never the pill. For HOW IT WORKS, THE STRATEGIES, THE ASSESSMENT, CLIENTS and PRICING & TRUST, put the text in the section's `aria-label` and don't render it visually. The H2 carries the section. |
| 4 | Proof strip: 4 emoji icons (🎓👤📅🔒) in a centered row between two hairlines | Emoji bullets plus a centered "stock proof bar" | **No icons, no emoji.** Set it as a 4-column **ledger header row**, left-aligned to the 1200 grid. Each cell gets a DM Mono 11px navy-500 label on top (`FILED BY`, `FOUNDED BY`, `CADENCE`, `DATA`) and the blueprint copy below it in DM Sans 15/500 navy-900. Andrew's 28px real headshot sits inline in cell 2. Use one 1px `--line` rule on top only, and 1px vertical dividers between cells. Mobile: 2×2 with the same labels. |
| 5 | HIW: 3 equal cards, a dashed connector and "01/02/03" badges | Symmetric 3-col icon cards with ornamental numbering | Numbering stays, because the steps really are a sequence, but it becomes the **ledger line number**: DM Mono 13px navy-400 in a 48px left gutter, not a badge. **No card boxes.** Build 3 columns at `4fr 5fr 4fr` (the middle one, the call, is wider because it's the step we need to de-risk). Each column is a vignette on top (navy-50 tile, 4px radius, paper object) and text below, with a single 1px `--line` top rule. The middle vignette is offset **−32px** up (it breaks the baseline on purpose). No dashed line. |
| 6 | Bento of 8 identical white tiles with a 3D icon top-right | Bento-for-no-reason, identical icon cards | Treat it as **the tax code as typography.** Each 1×1 tile leads with its IRC cite set as display type (DM Mono 500, 34px, −0.02em, navy-900), with the strategy name under it as the h3. Only the **2 wide tiles** (Hire Your Kids, Accountable Plan) carry 3D art, rendered large (220px, bleeding off the tile's right and bottom edges, clipped by the tile). The other six have no art. Tiles are paper (4px radius, ledger rules), not rounded app cards. Grid re-shaped in §4.6. |
| 7 | CTA tile "full-width navy-900 bar" inside the bento | Stock "banner CTA" strip | Keep it, but as the **tear-off stub** of the plan: white, 1px dashed `navy-300` **top border only** (perforation), text left, button right. It shouldn't be a navy bar, because navy bands get rationed. |
| 8 | Pricing: 4 identical icon cards in a row | Symmetric feature-card row | A **terms sheet**: one paper object (max 880px, left-aligned on the grid) with the 4 terms as numbered clauses `§1`–`§4` in a DM Mono gutter, h3 inline-bold plus the sentence, and one 1px rule between clauses (not around each). The security row sits under it as three plain-text lines in 15px with a green-700 ✓ glyph. No icons, no strip card. |
| 9 | Testimonials: a 7+5 row, then 4 compact cards | Uniform testimonial card grid | **Editorial layout.** Jess sits full-width as a pull quote at DM Sans 36/44 weight 500, −0.02em, max 22ch per line, with her 72px photo and attribution below. **No card.** Under it, Vicky and the four compact quotes run in a **2-column offset column** (the right column starts 96px lower) with no card boxes, each quote separated by a 1px rule on top. 56px circular photos. |
| 10 | Four "term cards" plus four compact cards plus bento cards | Uniform `r20` + `elev-1` on everything | **Radius lock (see §4.5).** Paper objects are 4px. Only the three stages get 28px. Cards as a category mostly go away. |
| 11 | Portal: gradient overlay + backdrop + dark copy panel | Borderline "hero over dark gradient" | Keep it, but make it a **real diorama with 3 parallax layers** (§3). Pull the overlay back so the golden sky reads: `linear-gradient(90deg, rgba(11,16,51,0) 0%, rgba(11,16,51,.10) 38%, rgba(11,16,51,.78) 58%, #0B1033 78%)`. Backdrop `saturate(.9)`, not .85. |
| 12 | "keep" mint highlight done as `background: linear-gradient` and "drawn in" | Animating a background can't be done with transform/opacity | Build it as a `::after` bar (height 0.30em, bottom 0.08em, green-200, `transform-origin:left`) animated with `scaleX 0→1`. It stays static at scaleX(1) without JS. |
| 13 | Final CTA "radial green glow center-left" | Glow blob | **Remove the glow.** Put Drew on a real ground instead: a 1px `navy-200` horizon line spans the stage at his feet, plus `--drew-contact` shadow. The stage stays flat `navy-50`. |
| 14 | Three hero check-row items with ✓ + the "Free · Takes a few minutes · No card" microcopy + footnote | Stacks of middot micro-strips | Microcopy stays (compliance and CRO), but as **one** line of DM Sans 14px navy-500 with `·` used once per line, max. Check row: drop the ✓ glyphs and render the three items as the ledger-tab style at 12px, in a single row, below the CTA block with 24px gap. Blueprint copy unchanged. |
| 15 | Rounded "PREVIEW" pill + "✓ Filed by licensed CPAs" ink pill on the plan card | Pill-badge soup | PREVIEW becomes a DM Mono 11px tab in the card's header (4px radius, navy-100). The CPA chip becomes a **rubber stamp** (§2): ink-950 1.5px border, ink text, DM Mono 11px/500 uppercase, 4px radius, rotated −4°, sitting over the card's top-right corner. It's the only rotated element on the page besides Drew. |
| 16 | Deadline bar in ink with bold + arrow | Fine, but generic | Keep it. The day count renders in DM Mono tabular (`47 days left`). No pulse, no emoji. |
| 17 | FAQ `+` rotating 45° | Standard, fine | Keep. Numbers left of questions in DM Mono navy-400 (`Q1`…`Q8`), which ties to the ledger system. |
| 18 | H2-split second line at 400 navy-500 on 6 sections | Becomes a tic if used everywhere | Use the split line on **3 H2s only**: Problem, Strategies, Portal. Team and the others get a single-weight H2. |
| 19 | Scroll-snap carousel with **dots indicator** (HIW mobile) | Dot indicators are a template tell | Keep scroll-snap (85% width, next card peeks), **no dots**. Use a DM Mono `1 / 3` counter top-right of the rail. Not a pill, just text. |
| 20 | Symmetric centered CTA pairs (pricing, final) | Center bias | Left-align every CTA pair to the copy column. Nothing on the page is center-aligned except Drew on mobile. |

**Blueprint items I confirm as good and non-generic:** the Plan-card-as-estimator, the 12-month rail, the ledger of line items under $135K, the honest pull-quote, the founder's first-person note, and Drew's four moments. These are the page. Protect them.

---

## 2. The signature idea: **The Plan** (a real, tactile working document)

HeyDrew's product *is* a document: "Your 2026 Strategy Plan." Drew literally holds one in `drew-desk.webp` (a sheet with green check rows). So the page's recurring object is **that sheet of paper**: a precise, printed, CPA-grade ledger document that gets filled in as you scroll. No other tax startup's world has Drew holding this exact paper. It also answers "premium fintech" without borrowing glassmorphism or dashboards: premium here means paper, rules, stamps and tabular figures.

### 2.1 The object's anatomy (build once as CSS, reuse)
```css
.paper{
  background:#FFFFFF;
  border:1px solid #E3E6EF;
  border-radius:4px;                       /* paper corners, never 20 */
  box-shadow:
    0 1px 0 rgba(11,16,51,.04),
    0 18px 36px -18px rgba(11,16,51,.22),  /* sheet lifts off the desk */
    0 2px 6px -2px rgba(11,16,51,.06);
  position:relative;
}
.paper--ruled{                               /* ledger rules, 32px pitch */
  background-image:repeating-linear-gradient(
    to bottom, transparent 0 31px, #EEF0F6 31px 32px);
  background-position:0 56px;               /* rules begin under the header row */
}
.paper::before{                              /* the margin line, like ledger paper */
  content:""; position:absolute; top:0; bottom:0; left:40px;
  width:1px; background:rgba(194,65,58,.18); /* miss-600 at 18%, the only red that isn't a ✕ */
}
.paper--perf{ border-top:1px dashed #B9BFDA; }         /* tear-off stub */
.stamp{ font:500 11px/1 'DM Mono'; letter-spacing:.06em; text-transform:uppercase;
  color:#0B1033; border:1.5px solid #0B1033; border-radius:4px; padding:6px 8px;
  transform:rotate(-4deg); background:#fff; }
.tab{ font:500 12px/1 'DM Mono'; letter-spacing:.06em; text-transform:uppercase;
  color:#3A4478; background:#fff; border:1px solid #E3E6EF; border-radius:4px; padding:6px 10px; }
```
Rules: the margin line appears **only** on the hero plan card and the $135K ledger (the two "master" sheets). Ruled lines appear on the hero card, the ledger, and the strategy tiles. Numbers, dates, IRC cites and counts on paper are always **DM Mono, tabular**.

### 2.2 Where it recurs (and nowhere else)
| Section | How The Plan shows up |
|---|---|
| Hero | The estimator card **is** the Plan: ruled, margin line, header row "Your 2026 Strategy Plan" + `PREVIEW` tab, stamp `REVIEWED BY LICENSED CPAs [CONFIRM]` top-right. Locked rows are ledger lines. On result, each unlocked row's lock becomes a green-700 **check box tick** (14px square, 1.5px border, check drawn). Resting rotation **−0.6°** on desktop (0 on mobile). It's the only "tilted paper" on the page. |
| Problem | The 12-month rail is drawn as a ledger header: month columns in DM Mono 12px, the two rows labeled in the 40px margin (`TRAD.` / `HEYDREW`). The ✕ "missed" is a stamp (`.stamp` in miss-600, rotated −4°). |
| How it works | Step 3 vignette is a mini Plan sheet (ruled, 3 check rows). Step 1 is a TaxLand chip row; step 2 is the Tax Valet bubble. |
| Strategies | Each tile is a paper index card: 4px radius, ruled, IRC cite as display. The CTA row is the **perforated tear-off stub** (`.paper--perf`). Drew's desk tile shows him holding the real printed Plan, which closes the loop. |
| Example ($135K) | **The master ledger sheet.** Margin line, ruled, line items as ledger rows, and an accounting **double underline** (two 1px ink rules 3px apart) under the total, drawn on scroll. This is the page's second strongest moment. |
| Pricing | The terms sheet: `§1`–`§4` clauses in the mono gutter. |
| Final CTA | No paper. Drew and the open year close the page. (Restraint: the device rests before the ask.) |

**Stamp budget:** 3 stamps on the page, total: the hero CPA stamp, the Problem "✕ Planning window missed" stamp, and the `ILLUSTRATIVE` stamp on the $135K ledger's top-right corner. The ILLUSTRATIVE stamp is a compliance label promoted to a design element. It doubles the honesty signal.

---

## 3. Scroll + motion choreography (GSAP 3.12.5 + ScrollTrigger)

### 3.0 Non-negotiable engineering rules
1. **Everything is visible without JS.** No CSS rule may set `opacity:0` or an offscreen transform on content unless `html.js-motion` is present. An inline `<head>` script adds `js-motion` only when `matchMedia('(prefers-reduced-motion: no-preference)').matches`. A `setTimeout(…, 2500)` removes `js-motion` if `window.gsap` hasn't loaded, which acts as a CDN failsafe.
2. Only the **hero** uses pre-hidden CSS states (to avoid a flash). Every scroll reveal below the fold uses `gsap.from()` created at runtime, so no-JS and failed-JS both render complete.
3. Wrap everything in `gsap.matchMedia()`: `"(prefers-reduced-motion: no-preference) and (min-width: 1024px)"` (full choreography incl. pin), `"(prefers-reduced-motion: no-preference) and (max-width: 1023px)"` (reveals + light parallax, **no pin**), `"(prefers-reduced-motion: reduce)"` (no timelines; counters render final values; 200ms opacity crossfades on estimator state changes only).
4. Animate **transform and opacity only.** The highlight bars, rule draws, rail fill and photo wipe all use `scaleX`/`scaleY` on pseudo-elements or spans. No clip-path, width, top, filter or background-position animations.
5. `will-change: transform` only on the 3 portal layers and the hero Drew. Remove it on `onLeave`.
6. Use `ScrollTrigger.batch()` for repeated reveals (≤ 14 ScrollTrigger instances total). Call `ScrollTrigger.refresh()` after `document.fonts.ready` and after the portal images decode.
7. Idle loops: at most **one** on screen (hero Drew breathing). Pause it via its own ScrollTrigger `onToggle` when the hero is out of view.
8. No scroll hijack, no smooth-scroll library, no `window.addEventListener('scroll')`.

**Eases (use these names only):** `enter = "power3.out"`, `mask = "expo.out"`, `draw = "power2.inOut"`, `settle = "power4.out"`, `scrub = "none"`. No `back`/`elastic` except Drew's one hop.

### 3.1 Hero entrance timeline (runs once on `DOMContentLoaded` + fonts ready or 400ms, whichever is first; total 1.45s)
H1 lines are wrapped server-side in `<span class="line"><span>…</span></span>` (overflow hidden, `padding-bottom:.08em` for descender clearance).

| t (ms) | Element | From → To | Dur | Ease |
|---|---|---|---|---|
| 0 | Hero ledger tab | opacity 0→1, y 8→0 | 400 | enter |
| 60 | H1 line 1 inner span | yPercent 108→0 | 760 | mask |
| 150 | H1 line 2 inner span | yPercent 108→0 | 760 | mask |
| 240 | Plan card | y 48→0, rotate −2.4°→−0.6°, opacity 0→1 | 820 | settle |
| 420 | Lead paragraph | opacity 0→1, y 12→0 | 520 | enter |
| 500 | CTA block (button, microcopy, call link) | opacity 0→1, y 12→0, stagger 60 | 480 | enter |
| 620 | Plan card inner: header row, Q1 label, chips | opacity 0→1, y 6→0, stagger 40 | 360 | enter |
| 700 | Plan ledger rules (`.rule` spans on each locked row) | scaleX 0→1 from left, stagger 50 | 420 | draw |
| 780 | "keep" highlight `::after` (via a `.hl` span) | scaleX 0→1, origin left | 600 | draw |
| 860 | Drew (`drew-point`) | x −40→0, opacity 0→1 | 700 | enter |
| 1180 | CPA stamp | scale 1.35→1, rotate −10°→−4°, opacity 0→1 | 260 | settle |
| 1240 | Check-row tabs | opacity 0→1, stagger 50 | 300 | enter |
| 1450 | Drew idle begins | y 0→−4px, yoyo, repeat −1 | 2200 each way | sine.inOut |

**Hero scroll-out (scrub, desktop only):** trigger hero, `start "top top"`, `end "bottom top"`, `scrub 0.4`. Drew `y: -60` (moves 1.15× page speed), plan card `y: -24`, H1 `y: 0` (anchored). This gives depth as the stage leaves. Mobile: none.

### 3.2 Proof strip
On enter (`top 85%`): the top rule scales X 0→1 in 600ms `draw`, then cells go opacity 0→1 / y 8→0 with a 70ms stagger from left. Andrew's headshot scales 0.85→1 with them.

### 3.3 Problem (scrubbed rail, **not** pinned)
- H2 line 1: plain `from` opacity/y 16. The split line 2 follows 120ms later with **x −12→0** instead of y (reveal variety).
- **12-month rail fill, scrubbed:** trigger the rail, `start "top 75%"`, `end "bottom 45%"`, `scrub 0.5`. The HeyDrew row's green line is a span with `scaleX 0→1` (origin left, `ease none`). In `onUpdate`, each month node whose x-position is under the fill gets `.is-on`. That class swaps the node to green-500 with a CSS `transform: scale(1)` from 0.6 (160ms transition) and fades its label to navy-900. It is the page's clearest "motion = meaning" moment: the year gets used.
- The traditional row stays static. When the scrub passes 0.98, the **"✕ Planning window missed" stamp** plays once: scale 1.35→1, rotate −10→−4°, opacity 0→1, 260ms settle.
- Pull line: its 3px green rule is a `::before` with `scaleY 0→1`, origin top, 500ms draw, then text opacity 0→1, x −8→0.
- Comparison table rows reveal by row, 60ms stagger, opacity only (tables shouldn't slide).
- Mobile: rail becomes vertical, fill uses `scaleY`, same logic.

### 3.4 How it works
- Columns reveal **left to right**, x −24→0, opacity 0→1, stagger 120ms, `start "top 78%"`.
- Vignettes animate *after* their column lands, and each shows a state change (feedback, not decoration):
  - Step 1: after 500ms, the 2nd chip fills navy-900 (the selected state), 160ms.
  - Step 2: the Tax Valet bubble goes scale .92→1, origin bottom-left, opacity 0→1, 320ms settle. A "typing" 3-dot row shows for 700ms and is then replaced by the message text (opacity crossfade). This is the only typing effect on the page.
  - Step 3: the three check boxes tick in sequence, 180ms apart (the ✓ path is a span with `scale 0→1`). The third one (Return filed, April) stays an empty box on purpose.
- Mobile (scroll-snap): no x reveals, only the vignette state changes, fired when each card is ≥60% in view (IntersectionObserver on the scroller).

### 3.5 Strategies
- Tiles: `ScrollTrigger.batch('.tile')`, `start "top 85%"`, from `opacity 0, y 20, scale .98`, 520ms enter, stagger 60ms. Stagger order follows the grid **reading order**, not DOM order if they differ.
- The IRC cite in each tile slides **up from its ledger rule**: its wrapper is overflow hidden, the inner span goes yPercent 100→0, 480ms mask, 120ms after its tile lands.
- The 2 wide tiles' 3D art: parallax `y 30 → −30` across the tile's scroll range (scrub 0.6) so the art drifts against the paper.
- **Drew desk tile:** the image sits at `scale 1.14` inside an overflow-hidden tile. Scrub `yPercent −6 → 6` (`start "top bottom"`, `end "bottom top"`). The caption card ("Your plan, reviewed line by line.") rises y 16→0 after the tile is 40% in view. The speech bubble "Let's see which ones fit." pops scale .9→1, origin bottom-left, 240ms, 300ms later.
- Tear-off CTA stub: the dashed perforation draws (a span overlay `scaleX 1→0` from the right, uncovering the dashes) over 500ms, then the button fades in.

### 3.6 Illustrative example: **the one pinned + scrubbed moment**
Desktop ≥1024 only, and only when `innerHeight ≥ 720`. Otherwise use the mobile path.
- Pin the section wrapper: `start "top top"`, `end "+=110%"`, `pin true`, `scrub 0.6`, `anticipatePin 1`.
- The timeline (progress 0 → 1):
  - 0.00–0.10: ledger sheet settles, y 40→0, rotate 0.8°→0.
  - 0.08–0.70: the 5 line-item rows write in one by one (each gets opacity 0→1, x −12→0, and its hairline `scaleX 0→1`), evenly spaced.
  - 0.05–0.80: the **counter** runs `$0 → $135,000`, driven by a proxy object `{v:0}` tweened to 135000 with `ease "power1.out"`. `onUpdate` writes `Math.round(v/100)*100` formatted with `toLocaleString('en-US')` into a `tabular-nums` span that has a fixed `min-width` in `ch`, so nothing reflows.
  - 0.80–0.90: the **double underline** under the total draws (two spans, `scaleX`, 40ms offset).
  - 0.86–0.92: the `ILLUSTRATIVE` stamp lands (scale 1.35→1, rotate −8→−3°).
  - 0.90–1.00: hold. Nothing moves, so it can be read.
- **The † disclaimer is never animated and never hidden.** It sits outside the timeline at full opacity from frame 0. The persona card on the left is static during the pin (it's the "reading" column).
- The honesty pull-quote and CTA sit **after** the pin spacer, with a normal reveal: the green open-quote mark goes scale .6→1, then the quote opacity 0→1.
- Mobile / short viewport: no pin. The counter ticks once when 50% visible, over 1200ms `power2.out`; rows stagger 90ms; the underline draws at the end. Fires `example_counter_complete`.
- Reduced motion: the final `$135,000`, all rows and the underline render statically.
- No-JS: the markup contains `$135,000` literally.

### 3.7 TaxLand portal: layered parallax diorama (no pin)
Structure (desktop): the stage is `overflow:hidden; min-height:640px`. The layers are absolutely positioned and `pointer-events:none`:
```
z1 backdrop  (taxland-backdrop, cover, scale 1.16, object-position 50% 60%)
z2 overlay   (static gradient from §1 item 11)
z3 Drew      (drew-hero, height 500px, left 7%, bottom −56px so his waist sits in the grass)
z4 foreground(taxland-foreground, width 100%, bottom −2px, height ~46% of stage, object-fit cover, object-position bottom)
z5 copy      (right 5/12 columns, on the dark part of the gradient)
```
One ScrollTrigger: `trigger stage`, `start "top bottom"`, `end "bottom top"`, `scrub 0.8`:
| Layer | Tween across the range | Perceived speed |
|---|---|---|
| Backdrop | `yPercent −7 → 7`, `x −1% → 1%` | ~0.6× (sits far away) |
| Drew | `y 70 → −40` | ~0.9× |
| Foreground grass | `y 90 → −90` | ~1.2× (slides over Drew's waist on the way out) |
| Copy block | none (anchored, readable) | 1.0× |
- Copy reveal (not scrubbed): H2 lines use the **mask** reveal (yPercent 108→0, 760ms, 90ms stagger). This is the only other place it's used besides the hero, because this is the page's second "opening". The checklist goes check-first: each ✓ scales 0→1 and its text follows 80ms later, 110ms per item.
- **"Illustrative screen" label:** DM Mono 11px navy-300 on a 1px `rgba(255,255,255,.28)` 4px tab, pinned to Drew's layer at `left: calc(7% + 500px*0.78*0.8)` roughly beside the phone. It sits **inside Drew's layer so it moves with him**. It must be visible whenever the phone is visible.
- Drew micro-motion here: none beyond parallax (he's "in the world").
- Mobile: the backdrop band is 300px tall. Drew is 240px (left 4%, bottom −28px), the foreground covers the bottom 40%, and the parallax amplitudes are halved (backdrop yPercent ±4, Drew y 36→−20, grass y 46→−46). The copy panel below is solid ink-950.
- Reduced motion: layers static at their midpoint values (backdrop yPercent 0, Drew y 0, grass y 0).

### 3.8 Testimonials
- Jess's pull quote reveals **by line**: split the quote into lines at runtime with a simple word-wrap measure (or pre-wrap in 3–4 `<span class="qline">`), then opacity 0→1, y 10→0, 70ms stagger, 520ms enter. The photo and attribution follow.
- The two offset columns get **differential drift**: the right column is scrubbed `y 48 → −48` across the section. The left column is static. This is subtle parallax that makes the masonry feel alive. Desktop only.
- The "Show all 6" (mobile) expand uses opacity + y 8 on the three revealed items (200ms stagger 60).

### 3.9 Founder + team (dark)
- Andrew's photo **wipe**: an ink-950 overlay `div` over the photo animates `scaleY 1→0` with `transform-origin: top`, 900ms `power4.inOut`, `start "top 75%"`. At the same time the image goes `scale 1.08→1`, 1200ms `power3.out`. This is the only wipe on the page.
- The first-person note: paragraph opacity 0→1, y 12→0. The signature line "Andrew Cordle, Founder" follows 200ms later.
- AI | Team columns: they come from opposite sides (AI x −20→0, Team x 20→0) in 560ms. The motion literally splits the work, which is what the section says.
- Ghost CTA: opacity only.

### 3.10 Pricing terms sheet
- The sheet lifts (y 24→0, opacity 0→1, 560ms settle). The clauses follow (opacity 0→1, 60ms stagger). Each `§` numeral gets x −6→0.
- Security lines: ✓ scale 0→1, 100ms stagger.

### 3.11 FAQ
- No scroll reveal on the rows (answers must feel instantly there). The left sticky heading block fades in once.
- Accordion: `grid-template-rows: 0fr→1fr` is the blueprint's spec and it's allowed here as the one exception to the transform-only rule, because it's user-initiated and short (240ms). The `+` rotates 45° in 200ms `power2.out`.

### 3.12 Final CTA
- H2: the "open" highlight bar draws (scaleX, 600ms draw) 300ms after the H2 lands.
- **Drew celebrate, one-time hop:** `start "top 70%"`, `once: true`: `y 0 → −12 → 0` over 520ms total (up 200ms power2.out, down 320ms `back.out(2.2)`). This is the only overshoot on the page. His contact shadow scales `1 → 0.82 → 1` in sync (shadow shrinks as he leaves the ground).
- "Your move." bubble: scale .88→1, origin bottom-left, 260ms settle, 220ms after landing.
- Buttons: opacity + y 10, 60ms stagger.

### 3.13 Global micro-interactions
| Element | Hover | Press | Focus |
|---|---|---|---|
| Primary button | `translateY(-1px)`, `--glow-cta`, arrow `translateX(3px)`, 160ms `cubic-bezier(.2,.8,.2,1)` | `scale(.98)`, 120ms | 3px ink outline, 3px offset (plus a 2px white inner ring on dark) |
| Ghost button | border to navy-400, `translateY(-1px)` | `scale(.98)` | same |
| Estimator chip | border navy-400, bg navy-50 | `scale(.97)` | ink outline |
| Chip selected | bg navy-900, white text. The ✓ is a span `scale 0→1` in 180ms settle, then auto-advance after 350ms (blueprint) | – | – |
| Estimator result | lock → check: the lock goes opacity 1→0, scale 1→.6 (120ms), the green check box goes scale .6→1 (180ms settle), 60ms stagger by row. The count ticks 0→N over 500ms (DM Mono) | – | – |
| Strategy tile | `translateY(-3px)`, shadow deepens to `--elev-2`, the IRC cite goes to green-700 (color transition allowed on hover, 160ms) | `scale(.99)` | ink outline |
| Text links | underline is a `::after` 1px bar, `scaleX .0→1` from left on hover (it rests at `scaleX(1)` with 40% opacity, so it's always an affordance) | – | – |
| Sticky mobile bar | slides in y 100%→0 in 220ms enter; hides with y→100% in 180ms | whole bar `scale(.99)` | – |

**Reduced motion summary:** no pin, no scrub, no parallax, no idle, no hop, no masks, no count-ups. States render final. Hover transitions keep color and shadow only (no translate). The estimator lock→check becomes a 150ms crossfade.

---

## 4. Refinements

### 4.1 Typography
- **Faces:** DM Sans (variable, `opsz,wght@9..40,100..1000`, plus the italic axis for one use) + **DM Mono** 400/500 as the single utility face. Justification: this brand is a ledger. Figures, IRC cites, dates, tabs and stamps need a monospaced, tabular voice, and DM Mono is DM Sans's own sibling, so the pairing reads as one family, not a "fintech mono" costume. DM Mono is **never** used for headlines or body.
- **Display (H1):** weight **680** (not 700; reads more expensive at 76px), `font-variation-settings:"opsz" 40`, tracking **−0.038em**, line-height **0.98**, with `padding-bottom:.08em` on each masked line. Max 2 lines desktop (≥1200). At 1024–1199, 3 lines is allowed.
- **H2:** weight 650, −0.032em, lh 1.06. On the 3 split H2s, the second line is **DM Sans 400 italic** navy-500 (same family, the "editorial move"), `opsz 40`. Check descender clearance (`y g p`) with lh ≥1.1 on that line.
- **Big numbers** (`$135,000`, the estimator count): DM Sans 600, `tabular-nums lining-nums`, −0.045em. The `$` is set at **0.52em, weight 500, raised `vertical-align: 0.62em`**, navy-500. This is the one editorial number treatment and it applies to both.
- **Body:** 17/27, navy-900 at 88% for long paragraphs (the founder note, the problem body) and navy-500 for secondary text.
- **Mono sizes:** 11px (stamps, tabs on paper), 12px (labels, rail months), 13px (line numbers, `§`), 34px (IRC cites as display in tiles, weight 500, −0.02em). Tracking: +0.06em uppercase at ≤12px, −0.02em at display sizes.
- **Hanging punctuation:** the opening quote mark on Jess's pull quote hangs into the margin (`text-indent:-0.42em`).
- Ban: any third face, script/handwriting fonts, gradient text.

### 4.2 Color ratios (per full scroll; tighter than the blueprint)
- 72% white/navy-50 neutrals · 20% navy/ink (two dark bands + footer + type) · **≤4% green** · ≤4% portal imagery accents.
- Green appears only as: CTA fills, the two highlight bars (green-200), check ticks (green-700 on light, green-400 on dark), the rail fill, the hero tab's tick square, the pull-line rule and the open-quote mark. **Not** on the stamps, the strategy art backgrounds or hover states (except the IRC cite color on hover).
- Sky/purple/parchment: never used as UI. They only appear inside the strategy 3D art and the portal photo.
- Stage tint stays `navy-50 #F7F8FB`. Paper is pure `#FFFFFF` on it. The contrast between tinted stage and white paper is the whole trick, so don't put paper on white sections without its shadow.

### 4.3 Imagery handling
- Convert all new webp to optimized sizes with PIL: `drew-point` 600w (q80), `drew-hero` 880w, `drew-celebrate` 560w, `drew-desk` 1000w, backdrop 1600w + 800w, foreground 1600w + 800w, micro-avatar 128×128 crop of `drew-advisor` (crop box on the 1000×1237 original: `(205, 20, 795, 610)`).
- Strategy art: only `Group-39585-1-1.png` (kids) and `accountable-1.png` in the wide tiles, at 440w webp. Crop to the icon object, with no vines or sand.
- Logo: header uses `/Volumes/Ext SSD/Aspire/Hey Drew/HeyDrew-Logo.png` (518×304) → `img/logo.webp` at 44px tall (desktop), 36px (mobile). Footer uses `brand-research/assets/hey-drew-logo-wht.svg` (true vector). Both `HeyDrew-Logo.svg` files are raster-in-SVG, so don't use them.
- Testimonial headshots: download the six, 112×112 webp, `object-fit:cover`, circle. Circles are the one exception to the radius lock (faces are round).
- Andrew photo: 4:5, 720w, true color, 4px radius (it's a print on paper, consistent with the device).

### 4.4 Texture and grain
- **One global grain layer:** `body::after { position:fixed; inset:0; pointer-events:none; z-index:90; opacity:.035; mix-blend-mode:multiply; background-image:url("data:image/svg+xml,…feTurbulence baseFrequency .9, numOctaves 2…"); }`. It's fixed, never on a scrolling container, and never animated. On dark bands it reads as film grain, on white as paper tooth.
- Ledger rules live on paper objects only (§2.1). No page-wide grid, no dot pattern, no noise gradients.

### 4.5 Radius lock (documented rule, follow everywhere)
| Object | Radius |
|---|---|
| Paper objects (plan card, ledger, strategy tiles, terms sheet, vignettes, tabs, stamps, Andrew photo, drew-desk tile, caption card) | **4px** |
| Stages (hero, portal, final) | **28px** desktop / **16px** mobile |
| Buttons | **12px** |
| Estimator chips | **pill** (they're choices, not paper) |
| Speech bubbles | **14px** with a 4px corner on the tail side |
| Faces | circle |
Nothing else. Specifically no 20px cards.

### 4.6 Section rhythm and layouts (≥ 7 distinct layout families)
| § | Layout family | Key geometry (1440) | Background |
|---|---|---|---|
| Hero | Asymmetric split in an inset stage | Copy 6/12 · Drew straddles the seam · Plan 5/12 offset right, top +40px lower than the H1 cap height | navy-50 stage |
| Proof | Ledger header row | 4 cells, left-aligned to 1200 | white |
| Problem | Full-width typographic + rail | H2 spans 9/12 (left). The body sits in cols 2–8 (indented one col from the H2, an editorial indent). Rail full 1200 wide. Table in cols 2–10. | white |
| HIW | Unequal 3-col (`4fr 5fr 4fr`) with offset middle | Middle column −32px | navy-50 **full-bleed** (no stage) |
| Strategies | Bento, re-shaped for the real image ratio | 4 cols, `grid-template-areas: "kids kids drew drew" "aug solo acc acc" "hsa hra ira s529" "stub stub stub stub"`. Row 1 `min-height:380px` (Drew desk is 3:2; `object-position: 50% 42%` keeps his face and the plan sheet). Rows 2–3 `min-height:240px`. Mobile: 2-col, drew/kids/acc/stub span 2. | white |
| Example | Pinned sheet | Persona 4/12 left (sticky inside the pin) · Ledger sheet 7/12 right, offset 1 col | navy-50 full-bleed |
| Portal | Full-bleed diorama | Inset stage 1320 × 640 | image + ink |
| Testimonials | Editorial quote + offset masonry | Jess across 10/12. Below it, 2 columns (6/12 each, right column +96px) | white |
| Team | Portrait + letter | Photo 5/12 · note 6/12 starting col 7. AI/Team 2 columns below | ink-950 full-bleed |
| Pricing | Terms sheet, single column | Sheet max 880, left col 1; CTA pair left | navy-50 full-bleed |
| FAQ | Sticky left + accordion | 4/12 sticky, 8/12 list | white |
| Final | Inset stage, Drew-left | Drew 4/12 on a horizon line, copy 7/12 | navy-50 stage |
Vertical rhythm: sections 128px desktop / 72px mobile, **except** Example (pin handles spacing), Proof (48px) and Portal (96px top, 0 bottom; the stage bleeds into the testimonial spacing). The varied padding is intentional.

### 4.7 Drew per moment (actual files, actual scale)
| Moment | File | Desktop | Mobile (390) | Behaviour |
|---|---|---|---|---|
| 1 Hero | `drew-point.webp` (points to viewer's right) | **440px tall** (352w), placed left of the Plan card. His fingertip (≈ 96% x, 47% y of the image) lands **16px inside** the card's left edge, overlapping it, with z above the card. His waist crop is **hidden by the stage's bottom edge** (Drew bottom = stage bottom, stage `overflow:hidden`), so it reads as standing behind the stage lip, not a floating cut-out. Contact shadow is unnecessary here (the crop is hidden). **No mirroring.** | 136px tall, `object-position: top`, top-**left** of the card, overlapping the card's top edge by 24px, finger pointing across the card title. Card title gets `padding-left: 120px` on its first line only. | Entrance per §3.1, breathing idle ±4px, scroll-out drift |
| micro | head crop of `drew-advisor.webp` | 24px (card header), 32px (sticky bar) | same | Static. The squircle mask is `border-radius: 30%` (the only squircle) |
| 2 Strategies | `drew-desk.webp` | 2×1 tile, ~648×380, cover `50% 42%` | full-width tile 350×240, cover `50% 38%` | Inner parallax ±6% |
| 3 Portal | `drew-hero.webp` | 500px tall, left 7%, bottom −56px | 240px, left 4%, bottom −28px | Layer parallax 0.9×; "Illustrative screen" label rides with him |
| 4 Final | `drew-celebrate.webp` (full body) | 300px tall, feet on a 1px navy-200 horizon, `--drew-contact` at feet | 176px, centered above the H2 | One hop, bubble "Your move." |
Drew never appears in: proof, problem, HIW, example, testimonials, team, pricing, FAQ, footer (a micro-avatar is fine in the footer tagline).

---

## 5. Definitely don't (builder checklist)
1. Don't set content to `opacity:0` in CSS without `html.js-motion`. Test with JS disabled and with the GSAP CDN blocked.
2. Don't use the same fade-up for everything. Mask for the 2 "openings", x-slides for sequences, scale for paper, wipe once, scrub where the motion *is* the meaning (rail, ledger, parallax).
3. Don't pin anything on mobile or on viewports < 720px tall. Don't add a second pin.
4. Don't animate the disclaimer, the † footnotes, the "Illustrative screen" label or the testimonial note. Compliance text is always at full opacity.
5. Don't use gradient text, glassmorphism (except the blueprint's sticky header/mobile bar blur), glow blobs, dot grids, mesh gradients or neon shadows.
6. Don't render emoji anywhere. Use real ✓ / ✕ glyphs in DM Sans, or 1.5px CSS box ticks.
7. Don't use 20px-radius cards, pills for labels (only estimator chips are pills), or colored status dots.
8. Don't center section headings or CTA pairs.
9. Don't put Drew next to a number (the $135K ledger), in testimonials, or on dark text bands other than the portal. Don't mirror him. Don't add a bob to more than one Drew at a time.
10. Don't use scroll cues ("Scroll", arrows, mouse icons), marquees, scroll-progress bars or custom cursors.
11. Don't use em-dashes (`—`) or en-dashes in any copy the builder writes, including captions, alt text and attribution. **Sole exception:** Vicky G.'s testimonial is verbatim and keeps its em-dash (compliance > style). Render testimonial attribution on its own line, never as "— Name".
12. Don't invent numbers. The line items stay `$X` with the `[CONFIRM]` marker (a DM Mono 10px navy-400 superscript `CONFIRM` tag with a 1px dashed underline, and `data-confirm` on the element). That's the only visual treatment for [CONFIRM], and only where the blueprint marks it.
13. Don't use Lenis, smooth-scroll hijacks, `window.addEventListener('scroll')`, or any host other than Google Fonts and cdnjs.
14. Don't animate `width`, `height`, `top`, `left`, `background-position`, `filter` or `clip-path` (the FAQ accordion rows are the one documented exception).
15. Don't let the page scroll horizontally at 390. Parallax layers need `overflow:hidden` on their stage, and the foreground grass must never widen the document.
16. Don't use more than 3 stamps, 4 visible eyebrow tabs or 2 highlight bars.
17. Don't use a hand-drawn illustration, a fake dashboard of divs, or a stock icon set to fill a gap. If a spot feels empty, give it more whitespace or a paper object with real copy.
