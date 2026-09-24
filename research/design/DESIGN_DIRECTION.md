# HeyDrew Homepage: Visual and UX Direction

**Role:** Senior web designer / UI-UX lead · **Date:** 2026-09-24
**Inputs:** `brand-research/HEYDREW_BRAND_KIT.md`, current homepage copy and screenshots, and 15 reference homepages that I captured with Playwright. All captures are in `./refs/`. Firecrawl credits used: 0.
**Locked decisions:** The primary action is to start the TaxLand assessment. The secondary action is to book a strategy call. The look is premium fintech credibility, with Drew as a guide who appears at a few key moments. We keep DM Sans, navy #1E285F, the money-green CTA, the sticker logo and Drew. We raise their quality instead of replacing them.

---

## 0. The thesis in one paragraph

The current page is a **storybook with a form attached.** The TaxLand forest fills the full width of the hero, a 2:52 video sits where the product should be, and Drew appears 3 times at full size. The stat trio uses three unrelated hues and makes a "100% Success Rate" claim. Nothing on the first screen shows what a client actually *gets*. The $100M fintech playbook is the reverse: **show the product artifact first, prove it second, and add personality third.** In the redesign, the hero shows a **HeyDrew Strategy Plan**: a crisp HTML/CSS card stack with strategies found and illustrative dollars. Drew peeks over it the way he peeks over the counter card today. TaxLand becomes **one** immersive section (the "portal" into the game) instead of the page's wallpaper. Navy and white carry the page, and green only means *money or go*.

---

## 1. Reference research: what $100M fintech homepages actually do

Captured at 1440×900 (and as full-page slices) with Playwright. Files: `refs/<site>-hero.jpg`, `refs/<site>-full-N.jpg`. Computed type and CTA metrics are in `refs/metrics-fintech.jsonl` and `refs/metrics-mascot.jsonl`.

| Site | Hero composition | What to steal for HeyDrew | What not to copy |
|---|---|---|---|
| **Keeper** (`keeper-hero.jpg`, `keeper-full-1/2`) | Closest competitor. Left: H1 "Taxes built for S-Corps" with a rotating word. Right: **floating UI chips**: "Tax Strategies" list, "$3,184 estimated savings" card, "Scott, CPA" avatar bubble. Then human CPAs shown as **profile cards with credentials**, and a navy **comparison table: Keeper vs other software vs traditional accountants**. | (1) Product-UI chips as the hero visual, the exact job our Strategy Plan card does. (2) A CPA/Tax Valet credential card. (3) A 3-column comparison table on navy. | Busy dotted-orbit lines and too many floating chips. We use one tidy stack. |
| **Collective** (`collective-hero.jpg`, `collective-full-1`) | 5-col text / 7-col **app screenshot with an overlaid "Due April 15" card and an "Auto Payroll: On schedule" toast**. G2 stars sit *above* the H1. Offers a secondary "How much can I save?" CTA. The stats band is dark with 3 bordered stat cards, and the **disclaimer sits directly under the stats in 10px.** | Rating directly above the H1. A secondary CTA phrased as a question. Disclaimer *attached* to the number, not buried in the footer. | Press logos. We have none that are verified, so we don't fabricate them. |
| **Pilot** (`pilot-hero.jpg`, `pilot-full-1`) | Deep purple. Human photo + UI card ("$17,560.45 +18%") + chat bubble ("Bridget, your CFO: Your books are ready"). Advisors appear as **named people with a one-line pedigree and a first-person quote.** | "**Human + UI card + message bubble**" is the pattern for "AI-Driven, Human-Perfected": a Tax Valet message bubble next to the plan card. Named-expert cards. | Handwritten script accents (too cute next to Drew). |
| **Ramp** (`ramp-hero.jpg`, `ramp-full-1`) | White, left-aligned 64px H1, **inline email field + lime CTA with black text**, and a huge product canvas below with a live ticker ("Agents at work today"). Its "See recommendations for your business" section is an input box. | (1) **Bright green button with dark ink text** (fixes our contrast, see §4). (2) A ticker/proof strip. (3) An "input-first" section: *"What does your business do?"* opens TaxLand prefilled. | The quiet grey is too austere for a consumer-ish brand. |
| **Mercury** (`mercury-hero.jpg`, `mercury-full-1`) | Cinematic photoreal landscape (a desk on a mountain) with centered H1 + email + CTA. Dark mode throughout, a **2×2 bento with one micro-UI per tile**, and 1-line captions under the tiles. | **Proof that a *landscape world* can be premium**: desaturated, one focal object, typography on top. TaxLand can live like this in ONE section. Bento tiles hold one UI fragment each. | Full dark theme; our audience needs warmth. |
| **Wealthfront** (`wealthfront-hero.jpg`, `wealthfront-full-1`) | "4.45% APY" as the H1: **the number is the headline**, with a serif italic subline and 3 icon bullets. Includes a Forbes quote block, **4 stat pills (1.5M+, $100B+, 14+ yrs, WLTH)** on a purple band, and a **left-title / right-accordion FAQ** ("5 things to know in 5 minutes"). | The FAQ layout (sticky left title, right accordion). Stat pills with a disclaimer under the band. Letting one number carry a section. | A second typeface; we stay DM Sans only. |
| **Brex** (`brex-hero.jpg`, `brex-full-1`) | 72px/72 Inter 500, −1.44px tracking. Feature rows alternate **UI vignette on grey tile / text + "Explore →" link**. A 3-up "756 hours / 71% / Up to 3.85%†" stat row in accent color with daggered footnotes. | Alternating feature rows with **tiny isolated UI vignettes** (not full screenshots). Dagger footnotes on stats (†, ‡) are the compliant way to show numbers. | Orange accent. |
| **Arc** (`arc-hero.jpg`) | Centered 64px light-weight H1, 2 buttons (solid + ghost), full-width dashboard ("Your total assets are $12,085,769.59") **with the relationship-manager card visible in the UI.** | The human is *inside* the product UI: our plan card shows "Your Tax Valet · Online". | Light (300) weight headlines read cold for this audience. |
| **Rho** (`rho-hero.jpg`) | Black, starfield, 80px, pill "NEW:" tag above the H1, disclaimer under the CTAs, product UI below with an AI-ask box. | The eyebrow pill ("2026 plans are open"). Disclaimer line under the hero CTAs. | Starfield / dark AI aesthetic. |
| **Found** (`found-hero.jpg`) | Rounded dark "hero card" inset from the page edge (not full-bleed), serif H1 with a rotating word, laptop + floating notification cards. | **Inset hero card with 24px radius**: it frames the hero like a product and makes the page feel "designed" rather than "templated". | Serif. |

**Patterns that recur in 8 of 10:**
1. **Product artifact in the hero** (UI card, dashboard, phone). None of these heroes leads with an illustration or a video thumbnail.
2. **A single primary action color** used only on CTAs (Ramp lime, Brex orange, Mercury blue). Everything else is neutral.
3. **H1 56–80px, tight tracking (−1% to −3%), line-height 1.0–1.15.** Measured: Ramp 64/64, Brex 72/72 −1.44px, Keeper 64/65 −1.6px, Rho 80/78.
4. **Proof immediately below the fold line:** logos, rating or ticker, always in one quiet grey row.
5. **Numbers with a footnote mark** (†, *) and the footnote directly beneath: Collective, Brex, Wealthfront, Rho, Mercury.
6. **Section rhythm alternates light / tinted / dark** roughly every 2 sections, with one dark "authority" band.
7. **Left-title + right-accordion FAQ**, then a slim closing CTA, then a dense multi-column footer with legal copy.
8. **CTA buttons are 40–52px tall, radius 6–12px or full pill, 14–18px text.** None use 20px text like HeyDrew's current buttons.

---

## 2. Mascot research: how premium brands use a character without looking childish

Files: `refs/duolingo-*`, `refs/mailchimp-*`, `refs/lemonade-*`, `refs/headspace-*`, `refs/notion-*`.

| Brand | What they do | Rule it teaches |
|---|---|---|
| **Duolingo** (`duolingo-full-0.jpg`) | Duo appears in the hero cluster, then **each feature row gets one character vignette** paired with one claim ("free. fun. effective." / "backed by science"). Characters always *do* something with a UI object (a phone, a card, a leaderboard). | **The character always holds or points at product.** Never a standalone portrait. Duolingo can go maximal because the product *is* a game. We sit one notch below that. |
| **Mailchimp** (`mailchimp-full-0.jpg`) | Freddie is reduced to the **logo mark only**. The homepage uses photography + UI cards + a yellow button. Personality comes from the yellow color and the serif, not the monkey. | A mascot can **retreat to a signature** as the brand matures. Drew's *avatar squircle* can play this role in the nav, footer and chat bubble. |
| **Lemonade** (`lemonade-hero.jpg`) | Monochrome line-art world at **low contrast behind** a centered serif H1 + one hot-pink CTA. Maya (the AI bot) lives inside the product flow, not the marketing hero. | The **world is atmosphere, the CTA is the only saturated thing.** Keep TaxLand art desaturated or cropped when text sits over it. The AI persona lives in the conversion flow (TaxLand), where Drew already lives. |
| **Headspace** (`headspace-hero.jpg`) | Soft orange blob characters at **small scale, tucked beside phone UIs**, never larger than the phone. | **Scale cap:** the character is never larger than the product element it sits next to. |
| **Notion** (`notion-full-0.jpg`) | Hand-drawn avatars as small **inline accents** (a row of faces above the H1, tiny icons orbiting the UI). A strict 1-color line style. | Use the character in **micro doses** (avatar in a chat bubble, a 32px head in an eyebrow) to keep presence without dominating. |

**HeyDrew mascot rules (derived):**
1. **Max 4 Drew moments per page** (listed in §6). Right now there are 3 large ones plus the forest wallpaper.
2. **Scale cap:** Drew's bounding box ≤ **28% of the viewport area** on desktop and never taller than the element he interacts with. The only exception is the TaxLand section, where he can be 40%.
3. **Drew always interacts with a product object:** he peeks over the plan card, holds the map beside the phone, or points at a strategy. He is never a free-floating portrait.
4. **Never in these zones:** testimonials, founder/credentials, security, pricing talk, FAQ, disclaimers, footer legal. Money and trust zones stay human and typographic.
5. **Never next to a guarantee-sounding number.** He can sit next to "illustrative" figures only when the footnote is visible in the same viewport.
6. **Micro-Drew** (the iridescent avatar squircle, 24–40px) is allowed anywhere as an identity signature: nav, Tax Valet chat bubble, footer. It does not count toward the 4.
7. **Art treatment:** keep the 3D Pixar render (brand-locked). Place him on a **clean surface** (white, navy or a soft radial glow). Scenic TaxLand backgrounds are reserved for the TaxLand section. Add a **soft contact shadow** (`radial-gradient(ellipse, rgba(11,16,51,.18), transparent 70%)`) so he sits on the UI instead of floating.

---

## 3. Layout system

### Grid
| Breakpoint | Width | Columns | Gutter | Side margin | Content max |
|---|---|---|---|---|---|
| Mobile | 360–767 | 4 | 16 | 20 | 100% |
| Tablet | 768–1023 | 8 | 24 | 32 | 100% |
| Desktop | 1024–1439 | 12 | 24 | 40 | 1200 |
| Wide | ≥1440 | 12 | 32 | auto | **1200 content / 1320 "wide" (bento, hero card) / 760 "prose" (FAQ answers, disclaimers)** |

- Hero and TaxLand use an **inset rounded "stage"** (Found pattern): `max-width: 1400px; margin: 0 16px; border-radius: 28px` (16px radius on mobile). This framing is what makes the page read as a product rather than a WordPress template.
- Hero split: **6 / 6** columns on desktop (text left, plan stack right), stacking text-first on mobile.

### Spacing scale (4px base)
`--s-1: 4 · --s-2: 8 · --s-3: 12 · --s-4: 16 · --s-5: 24 · --s-6: 32 · --s-7: 48 · --s-8: 64 · --s-9: 96 · --s-10: 128 · --s-11: 160`

| Use | Desktop | Mobile |
|---|---|---|
| Section vertical padding | 128 (`--s-10`) | 72 |
| Section heading → content | 64 | 40 |
| Eyebrow → H2 | 16 | 12 |
| H2 → lead paragraph | 20 | 16 |
| Card padding | 32 (big) / 24 (small) | 20 |
| Card grid gap | 24 | 16 |
| Button group gap | 12 | 12 (stacked full-width) |

Rhythm: **light → light-tint → dark → light → tint → dark (CTA)**. Never two dark bands in a row. Maximum one full-bleed image section (TaxLand).

---

## 4. Typography (DM Sans only)

Drop Open Sans entirely. Load DM Sans as a **variable font** (Google Fonts `DM+Sans:opsz,wght@9..40,400..800`). The `opsz` axis automatically gives display sizes tighter, crisper letterforms. Set `font-optical-sizing: auto`.

| Token | Desktop size / line-height | Mobile | Weight | Tracking | Use |
|---|---|---|---|---|---|
| `display` | 76 / 76 (1.0) | 44 / 46 | 700 | −0.035em | Hero H1 only |
| `h2` | 52 / 56 | 34 / 38 | 700 | −0.03em | Section titles |
| `h2-split` | 52 / 56, second line weight 400 in `navy-500` | same | 700 + 400 | −0.03em | Keeps the brand's bold/regular split ("Two ways to handle taxes. / Two very different outcomes.") |
| `h3` | 24 / 30 | 20 / 26 | 600 | −0.015em | Card titles |
| `stat` | 64 / 64 | 44 / 44 | 700 | −0.04em, `tabular-nums` | Big numbers |
| `lead` | 20 / 30 | 18 / 28 | 400 | −0.005em | Hero sub, section intros (max 56ch) |
| `body` | 17 / 27 | 16 / 25 | 400 | 0 | Paragraphs (max 68ch). Current is 14px/500, too small and too heavy. |
| `ui` | 15 / 20 | 15 / 20 | 500 | 0 | Buttons, nav, chips |
| `small` | 14 / 20 | 13 / 18 | 400 | 0 | Captions, testimonial meta |
| `eyebrow` | 13 / 16 | 12 / 16 | 600 | +0.08em, uppercase | Section labels |
| `micro` | 12 / 17 | 12 / 17 | 400 | 0 | Disclaimers, footnotes (never below 12px) |

Use `clamp()`. Example: `--fs-display: clamp(2.75rem, 1.6rem + 3.6vw, 4.75rem)`.
**Headline color:** navy-900 on light and white on dark. **Do not** use the sky-blue second line from the current hero: `#65A4E5` on white is **2.63:1** and fails. To get the two-tone headline, set the second line in **navy-900 at weight 400**, or give just the money phrase a green underline highlight (see below).

**Signature type move ("money highlight"):** in the H1, the phrase *"keep"* gets a 0.28em-tall mint bar behind its lower third: `background: linear-gradient(transparent 62%, #C9F5C7 62%)`. It's quiet and ownable, and it echoes the Instagram highlight bars without their loudness.

---

## 5. Color: making navy + green feel premium

### Measured contrast (WCAG)
| Pair | Ratio | Verdict |
|---|---|---|
| **White text on #04CE00** (current primary CTA) | **2.14** | **Fails.** This is the main visual-quality problem. |
| White on #129D0F | 3.59 | Fails for 15–17px text |
| **Ink #0B1033 on #04CE00** | **8.66** | Passes AAA. **New primary CTA.** |
| Green text #129D0F on white | 3.59 | Fails. Use `green-700` #0E7A0C (5.52) |
| Sky #2EA3F2 on white | 2.75 | Fails. Never use it for text or links |
| Navy #1E285F on white | 13.78 | Passes |
| Muted #5A6280 on white | 6.01 | Passes (secondary text) |
| #8C93B8 on ink #0B1033 | 6.14 | Passes (secondary text on dark) |

### Palette tokens (evolved, not replaced)
```css
:root{
  /* Navy ramp (derived from brand #1E285F) */
  --ink-950:#0B1033;  --navy-900:#1E285F; --navy-800:#2A3574; --navy-600:#3A4478;
  --navy-500:#5A6280; --navy-400:#8C93B8; --navy-200:#DDE0EC; --navy-100:#EEF0F6; --navy-50:#F7F8FB;
  /* Money green */
  --green-500:#04CE00;  /* CTA fill (brand) */   --green-600:#129D0F; /* CTA gradient end, borders */
  --green-700:#0E7A0C;  /* green text on light */ --green-100:#EAF8E9; --green-200:#C9F5C7; /* mint wash + highlight */
  --green-glow:rgba(4,206,0,.35);
  /* Accents, TaxLand section ONLY */
  --sky-400:#65A4E5; --purple-500:#8365E3; --parchment:#FDDEBC;
  /* Surfaces */
  --bg:#FFFFFF; --bg-tint:#F7F8FB; --line:#E3E6EF; --shadow-ink:11,16,51;
}
```

### Usage ratio (per full page scroll)
- **~70% neutrals** (white, `navy-50` tint, hairlines `#E3E6EF`)
- **~22% navy** (text, one authority band, closing CTA, footer)
- **≤5% green**: *only* (a) primary CTA fills, (b) positive money deltas (`+$14,200`), (c) check-marks and "found" status chips, (d) the mint headline highlight. **Green is never a section background, a headline color or a decorative stripe.** Scarcity is what makes it read as "money".
- **≤3% accents** (sky, purple, parchment), confined to the TaxLand section and the strategy-card art.
- **Red** only in the "Traditional way" comparison column, as a muted `#C2413A` icon and text, never a filled red pill.

### Retire from the homepage
The purple CTA band gradient, the blue/purple/brown stat-card triad, the full-green $135K counter slab, the forest wallpaper behind testimonials, and the 92° navy "Get Started" gradient button. The header gets **one** CTA only (see §9).

### Depth
Use navy-tinted shadows only; there are no grey shadows. `--elev-1: 0 1px 2px rgba(11,16,51,.06), 0 1px 1px rgba(11,16,51,.04)` · `--elev-2: 0 8px 24px -8px rgba(11,16,51,.14), 0 2px 4px rgba(11,16,51,.05)` · `--elev-3 (floating hero cards): 0 24px 48px -16px rgba(11,16,51,.28), 0 4px 12px rgba(11,16,51,.06)`. Cards get a 1px `--line` border. The current 1–2px colored borders are retired.

---

## 6. Where Drew appears (exactly 4 moments)

| # | Section | Asset | Size (desktop) | Behavior |
|---|---|---|---|---|
| 1 | **Hero:** peeks over the top edge of the Strategy Plan card | `Frame-39630-1.png` (peeking, hands on the edge). This is already the brand's signature "hello". | Head + hands ~220px wide; his hands overlap the card's top edge by 14px | Idle: 4s ±4px bob. On load he slides up 24px from behind the card (after the card lands). |
| 2 | **TaxLand portal section** (the one immersive "world" moment) | `AC-WITH-MAP-1-1.png`, or the looping `drew-landing-map` converted to AVIF/WebM | ~420px tall, left third, beside the phone mockup | Scroll-linked parallax of 0.9× vs the background at 0.6×; no bob. |
| 3 | **Strategy bento:** one tile only ("Found in TaxLand"), using the treasure-chest pose | `Group-39597-1.png`, cropped to Drew + chest; the sand/vines are removed via bg-removal (Higgsfield `remove_background` if needed) | Fills a 1×2 tile, ~280px | None (static). Hover lifts the tile. |
| 4 | **Closing CTA:** small, waving at the button | `accountable-1.png` cropped to the waving Drew only (strip the card and rocks), or a new Higgsfield render "Drew waving, clean navy bg" | ~200px, to the left of the headline | One wave on enter-viewport, then idle |

**Micro-Drew (not counted):** a 28px avatar squircle in the nav logo lockup hover, in the Tax Valet chat bubble in the hero stack, and in the sticky mobile CTA.
**Sad Drew:** do not use him on the homepage. The "traditional way" should be shown through UI (a red "missed" ledger), not a sad mascot.
**Higgsfield asks for the art team (only if needed):** (a) Drew peeking, transparent background, 3000px, for crisp retina; (b) Drew waving, isolated; (c) TaxLand valley, **desaturated 20% and slightly defocused**, 21:9, for the portal section, so white type sits on it at AA. Use the prompt seed from the brand kit §2.5.

---

## 7. Hero product-UI concept: "Your 2026 Strategy Plan" card stack

**Idea:** the hero shows what the assessment *produces*. A layered stack of 3 cards on a soft navy-50 stage with a faint 24px dot grid:

```
            (Drew peeking over the top edge)
   ┌───────────────────────────────────────────────┐
   │ ◉ HEY DREW!  Strategy Plan · 2026    ● Live   │  ← Card A (main, 460w)
   │ Acme Studio LLC · S-Corp · 2 kids  [EXAMPLE]  │
   │───────────────────────────────────────────────│
   │ Estimated tax you can keep*                   │
   │ $38,420   ▲ vs. last year's approach          │  ← stat token, ticks up on load
   │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░  6 of 8 strategies found    │
   │───────────────────────────────────────────────│
   │ ✓ Hire Your Kids        IRC §73   +$9,800     │
   │ ✓ Augusta Rule          §280A     +$6,300     │
   │ ✓ Solo 401(k)           §415      +$11,200    │
   │ ◌ Accountable Plan      reviewing…            │  ← shimmer row = "AI working"
   │ [ See my plan → ]                              │
   └───────────────────────────────────────────────┘
        ┌──────────────────────────────┐
        │ (◉) Maya · Your Tax Valet  • │  ← Card B, overlaps bottom-left (-40px)
        │ "Augusta Rule docs are ready │     chat bubble = the human half
        │  for your signature."   2m   │
        └──────────────────────────────┘
                              ┌─────────────────────┐
                              │ Reviewed by a CPA ✓ │  ← Card C chip, top-right (-24px)
                              └─────────────────────┘
* Illustrative example for a hypothetical S-Corp owner. Not a guarantee; results vary.
```

**Compliance built into the design:** an "EXAMPLE" pill in the card header, an asterisk on the stat, and the footnote sitting directly under the stage (12px, `navy-500`). The Tax Valet name "Maya" is **[PLACEHOLDER - confirm]**; better, use a real Tax Valet with permission. Per-strategy dollar amounts are illustrative and must be **[PLACEHOLDER - confirm with a CPA]** before launch. The IRC section references also need CPA confirmation.

**Reference HTML/CSS (production starting point):**
```html
<div class="plan-stage" aria-label="Example HeyDrew strategy plan (illustrative)">
  <img class="plan-drew" src="/img/drew-peek.avif" alt="" width="220" height="150" aria-hidden="true">
  <article class="plan-card">
    <header class="plan-head">
      <span class="plan-title">Strategy Plan · 2026</span>
      <span class="pill pill--example">Example</span>
    </header>
    <p class="plan-meta">Acme Studio LLC · S-Corp · 2 kids</p>
    <p class="plan-label">Estimated tax you can keep<sup>*</sup></p>
    <p class="plan-stat" data-countup="38420">$38,420</p>
    <div class="plan-bar" role="img" aria-label="6 of 8 strategies found"><span style="--p:75%"></span></div>
    <ul class="plan-list">
      <li><span class="tick"></span>Hire Your Kids<em>IRC §73</em><b>+$9,800</b></li>
      <li><span class="tick"></span>Augusta Rule<em>§280A</em><b>+$6,300</b></li>
      <li><span class="tick"></span>Solo 401(k)<em>§415</em><b>+$11,200</b></li>
      <li class="is-pending"><span class="spin"></span>Accountable Plan<em>reviewing…</em></li>
    </ul>
  </article>
  <aside class="valet-bubble"><img src="/img/drew-avatar.webp" alt="" width="28" height="28">
    <p><strong>Your Tax Valet</strong> Augusta Rule docs are ready for your signature.</p></aside>
  <span class="cpa-chip">✓ Reviewed by a licensed CPA</span>
</div>
<p class="footnote">*Illustrative example for a hypothetical S-Corp owner. Not a guarantee. Actual results depend on your eligibility, income and implementation.</p>
```
```css
.plan-stage{position:relative;padding:56px 32px 48px;border-radius:28px;background:
  radial-gradient(60% 60% at 70% 30%,rgba(4,206,0,.10),transparent 70%),
  radial-gradient(#DDE0EC 1px,transparent 1px) 0 0/24px 24px,var(--navy-50)}
.plan-card{position:relative;z-index:2;max-width:460px;margin-inline:auto;background:#fff;border:1px solid var(--line);
  border-radius:20px;padding:24px;box-shadow:var(--elev-3)}
.plan-drew{position:absolute;z-index:3;left:50%;top:-92px;translate:-50% 0}   /* hands overlap card edge */
.plan-stat{font:700 56px/1 'DM Sans';letter-spacing:-.04em;font-variant-numeric:tabular-nums;color:var(--ink-950)}
.plan-bar{height:8px;border-radius:99px;background:var(--navy-100)} .plan-bar span{display:block;width:var(--p);height:100%;border-radius:inherit;background:linear-gradient(90deg,#04CE00,#129D0F)}
.plan-list li{display:grid;grid-template-columns:20px 1fr auto auto;gap:12px;align-items:center;padding:12px 0;border-top:1px solid var(--navy-100);font:500 15px/20px 'DM Sans'}
.plan-list em{font:400 13px/1 'DM Sans';color:var(--navy-500);font-style:normal}
.plan-list b{color:var(--green-700);font-variant-numeric:tabular-nums}
.valet-bubble{position:absolute;z-index:3;left:-8px;bottom:24px;max-width:260px;display:flex;gap:10px;padding:12px 14px;
  background:#fff;border:1px solid var(--line);border-radius:16px 16px 16px 4px;box-shadow:var(--elev-2);font:400 14px/20px 'DM Sans'}
.cpa-chip{position:absolute;z-index:3;right:8px;top:40px;padding:8px 12px;border-radius:99px;background:var(--ink-950);color:#fff;font:500 13px/1 'DM Sans'}
.pill--example{background:var(--navy-100);color:var(--navy-600);font:600 11px/1 'DM Sans';letter-spacing:.08em;text-transform:uppercase;padding:5px 8px;border-radius:99px}
@media (max-width:767px){.plan-drew{width:150px;top:-64px}.valet-bubble{position:relative;left:0;bottom:0;margin:-16px 12px 0}.cpa-chip{top:8px;right:8px}}
```
**Why HTML and not a screenshot:** it stays sharp at every DPR, weighs about 3KB, can be translated and A/B-tested (swap the persona: "S-Corp · 2 kids" vs "Real-estate investor"), and animates cheaply.

---

## 8. Motion principles

1. **Motion explains cause → effect, never decorates.** Examples: the plan card lands, *then* Drew peeks, *then* the number counts. That sequence *is* the value proposition.
2. **Timing tokens:** `--t-fast:160ms` (hover, press) · `--t-base:280ms` (reveals) · `--t-slow:600ms` (hero choreography) · easing `cubic-bezier(.2,.8,.2,1)` (out-expo-ish). No bounce or elastic easing except Drew's one-off wave.
3. **Hero choreography (≤1.4s total, runs once):** card A fades and rises 16px (0–400ms) → strategy rows stagger 60ms each → Drew slides up from behind (500–900ms) → stat counts up $0 → $38,420 over 900ms with an ease-out (this keeps the brand's "cash register") → the pending row shimmers in a loop (2.4s, low contrast) → the Valet bubble pops at 1.2s (scale .96→1).
4. **Scroll reveals:** opacity 0→1 + translateY 12px, triggered once at 15% visibility, max 1 per section group. No parallax except in the TaxLand portal.
5. **Idle loops are limited to 2 on screen at once** (Drew bob + one shimmer). Pause every loop when it leaves the viewport (IntersectionObserver).
6. **`prefers-reduced-motion: reduce`** turns off the count-up (it renders the final number), the bob, the parallax and the shimmer. Crossfade only.
7. **Button feedback:** hover lifts 1px and the green glow grows (`0 6px 20px -6px var(--green-glow)`). Active: translateY(0), scale .98, 120ms. Arrow icons nudge 3px on hover.
8. Only `transform` and `opacity` are animated. Never animate layout properties.

---

## 9. Section-by-section wireframes

### Page order and purpose
| # | Section | Job | Primary CTA present? |
|---|---|---|---|
| 0 | Nav (sticky) | Orientation + 1 CTA | "See what you can keep" |
| 1 | Hero | Promise + product artifact + proof | Yes + secondary "Book a strategy call" |
| 2 | Proof strip | Credibility in 1 line | – |
| 3 | The problem: "Most CPAs work backwards" | Enemy + reframe (12-month rail) | – |
| 4 | How it works (3 steps) | Reduce effort perception | Inline link |
| 5 | Strategy bento (The 8) | Tangibility, "these are real and legal" | Yes (tile) |
| 6 | TaxLand portal (dark/immersive) | The game, 3 minutes, fun | **Yes (big)** |
| 7 | Illustrative scenario | The $ number with its disclaimer | – |
| 8 | Testimonials (real) | Social proof | – |
| 9 | Founder + humans | Authority (Andrew, CPAs, Tax Valet) | Secondary (book call) |
| 10 | Trust & terms | Security, never auto-renews, no guarantees | – |
| 11 | FAQ | Objection handling | – |
| 12 | Closing CTA | Final ask | Yes + secondary |
| 13 | Footer | Navigation + full disclaimers | – |

### Desktop (1440)
```
┌────────────────────────────────────────────────────────────────────────────────────┐
│ [HEY DREW!]   How it works  Strategies  About  FAQ        Sign in  [See what you can keep →]│ 72px, white, 1px bottom hairline on scroll
├────────────────────────────────────────────────────────────────────────────────────┤
│ ╭──────────────────────────────── inset stage, navy-50, r28 ─────────────────────╮ │
│ │  (★ 4.9 · 229 reviews [PLACEHOLDER-confirm])   ·  2026 plans now open           │ │
│ │                                                         (Drew peeking)          │ │
│ │  Keep more of what                                 ┌──────────────────────┐    │ │
│ │  you earn. Stop                                    │ Strategy Plan · 2026 │    │ │
│ │  overpaying the IRS.       ← display 76/76         │ $38,420*  ▓▓▓▓▓░ 6/8 │    │ │
│ │                                                    │ ✓ Hire Your Kids +$  │    │ │
│ │  HeyDrew finds the tax strategies your CPA         │ ✓ Augusta Rule   +$  │    │ │
│ │  missed, then licensed pros set them up with       │ ◌ Accountable…       │    │ │
│ │  you all year. AI-driven, human-perfected.         └──────────────────────┘    │ │
│ │                                                 [💬 Tax Valet: docs ready]      │ │
│ │  [ See what you can keep  → ]  [ Book a strategy call ]   ← 52px buttons       │ │
│ │  ✓ ~5-minute assessment [confirm]  ✓ No card needed  ✓ Never auto-renews      │ │
│ │  *Illustrative example. Not a guarantee.                                        │ │
│ ╰────────────────────────────────────────────────────────────────────────────────╯ │
│                                                                                    │
│  Licensed CPAs · Year-round, not just April · 18+ strategies reviewed · Secure portal│ proof strip, navy-500, 15px, icons 18px
├────────────────────────────────────────────────────────────────────────────────────┤
│  EYEBROW: THE PROBLEM                                                              │
│  Most CPAs work backwards.                                                         │
│  By the time they look, the savings are gone.  (h2-split, 2nd line 400)            │
│                                                                                    │
│  TRADITIONAL  Jan ─ Feb ─ Mar ─ [Apr: file] ─ ─ ─ ─ ─ ─ ─ ─ ─ Dec   ✕ missed       │ 12-month rail, muted red ✕ dots
│  HEYDREW      Jan●Plan─Feb●─Mar●─Apr●File─May●─…─Oct●─Nov●─Dec● Taxes done ✓       │ green dots fill on scroll (L→R)
│                                                                                    │
│  ┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐│ 3 contrast cards
│  │Looks back at last year  │ │Moves made during the year│ │A person who knows you   ││
│  └─────────────────────────┘ └─────────────────────────┘ └─────────────────────────┘│
├──────────────────────────────── bg: navy-50 tint ──────────────────────────────────┤
│  HOW IT WORKS                                                                      │
│  From tax stress to tax strategy.                                                  │
│  ┌──────── 01 ────────┐ ─── ┌──────── 02 ────────┐ ─── ┌──────── 03 ────────┐       │
│  │[mini UI: quiz step]│     │[mini UI: valet chat]│    │[mini UI: plan +file]│       │ Brex-style UI vignettes, no Drew
│  │Take the assessment │     │Meet your Tax Valet  │    │Execute & file       │       │
│  │~5 min [confirm]    │     │Strategy call        │    │Year-round support   │       │
│  └────────────────────┘     └─────────────────────┘    └─────────────────────┘       │
│                                       See the full 5-step process →                │
├────────────────────────────────────────────────────────────────────────────────────┤
│  THE 8 STRATEGIES                                                                  │
│  Legal. Documented. Built into the tax code.                                       │
│  ┌─────────────────────────┬────────────┬────────────┐                             │ bento 12-col, 1320 wide
│  │ Hire Your Kids   (2x1)  │ Augusta    │ Solo 401(k)│                             │
│  │ "Pay them real wages…"  │ Rule §280A │ up to $70k │                             │
│  │ [mini payroll UI]       │            │[confirm]   │                             │
│  ├────────────┬────────────┼────────────┴────────────┤                             │
│  │ HSA        │ HRA        │ Accountable Plan (2x1)  │                             │
│  ├────────────┼────────────┼─────────────┬───────────┤                             │
│  │ Trad/Roth  │ 529        │ DREW + chest│ "Which apply to you?"                   │
│  │ IRA        │            │ (moment 3)  │ [See what you can keep →]  (CTA tile)   │
│  └────────────┴────────────┴─────────────┴───────────┘                             │
├═══════════════════ TAXLAND PORTAL, inset stage, dark, r28 ═══════════════════════════┤
│ ╭──────────────────────────────────────────────────────────────────────────────╮  │
│ │ [desaturated TaxLand valley 21:9 + navy 55% overlay gradient L→R]            │  │
│ │  (DREW with map,     [phone: TaxLand      │  THE ASSESSMENT                  │  │
│ │   moment 2)          "See what you can    │  Your taxes, as a game           │  │
│ │                       keep in 2026"]      │  you actually want to finish.    │  │
│ │                                           │  • Answer quick questions [confirm]│ │
│ │                                           │  • Unlock strategy cards by level │ │
│ │                                           │  • Get your savings map          │  │
│ │                                           │  [Start the game → ] (green)     │  │
│ ╰──────────────────────────────────────────────────────────────────────────────╯  │
├────────────────────────────────────────────────────────────────────────────────────┤
│  ILLUSTRATIVE SCENARIO                                                             │
│  ┌─────────────────────────────────────┐   $135,000†     potential deductions      │ counter kept, but typographic
│  │ Persona: S-Corp owner, 2 kids,      │   $50,000†      est. annual savings        │ on white, not a green slab
│  │ home office, $400K revenue [confirm]│   18+           strategies reviewed        │
│  └─────────────────────────────────────┘                                           │
│  † Hypothetical scenario. Deductions ≠ savings; results vary. [Full disclaimer ↓]  │
│  (remove "100% Success Rate" from the homepage)                                    │
├──────────────────────────── bg navy-50 ────────────────────────────────────────────┤
│  WHAT CLIENTS SAY                                                                  │
│  ┌──────────── featured (2 col) ────────────┐ ┌──────────┐                          │
│  │ "I feel empowered, because I know I have │ │"I've     │                          │ Jess B. featured; Vicky G. second
│  │  a team that's got my back…" — Jess B.,  │ │already   │                          │
│  │  Business Owner, Denver CO   [photo]     │ │saved more│                          │
│  └──────────────────────────────────────────┘ └──────────┘                          │
│  Kesh K. · Will H. · Rob R. · Allen D. (4 compact quote cards, marquee on mobile)  │
├──────────────────────── ink-950 dark authority band ───────────────────────────────┤
│  [Andrew real photo]  "I built HeyDrew because…" [PLACEHOLDER quote-confirm]       │
│                       Andrew Cordle, Founder. Aspire Tour, Money Is ___ [confirm]  │
│  ┌ Tax Valet ┐ ┌ Licensed CPA ┐ ┌ Bookkeeping & payroll ┐  (credential cards)       │
│                       [Book a strategy call]  (ghost on dark)                      │
├────────────────────────────────────────────────────────────────────────────────────┤
│  Trust row: 🔒 Encrypted in transit & at rest · Never sell your data · Annual,     │
│  never auto-renews · "Can you guarantee savings? No, and be skeptical of anyone    │
│  who says otherwise."  (the honesty line as a pull-quote)                          │
├────────────────────────────────────────────────────────────────────────────────────┤
│  FAQ (sticky left col 4)          │  accordion col 8 (6–7 Qs max, see §10)          │
├═════════════════════ closing CTA, inset navy stage r28 ═════════════════════════════┤
│  (DREW waving, moment 4)   The IRS doesn't need more of your money.                │
│                            [See what you can keep →] [Book a strategy call]        │
├────────────────────────────────────────────────────────────────────────────────────┤
│  FOOTER #0B1033: logo(rev) + tagline | Product | Company | Legal | Social           │
│  Disclaimers & legal (expanded text, 12px, 760 max) · © 2026 Aspire Advisors LLC   │
│  d/b/a HeyDrew!                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Mobile (390)
```
┌──────────────────────────┐
│[HEY DREW!]      [≡]      │ 60px; menu sheet has the CTA pinned at the bottom
├──────────────────────────┤
│★4.9 · 229 reviews[conf]  │
│Keep more of what         │ display 44/46
│you earn. Stop overpaying │
│the IRS.                  │
│HeyDrew finds the tax…    │ lead 18/28, max 4 lines
│[See what you can keep →] │ full-width 56px
│[Book a strategy call   ] │ full-width ghost 52px
│✓5 min ✓No card ✓No renew │ 13px, wraps into 2 lines
│╭────────────────────────╮│
││   (Drew peek 150px)    ││
││ Strategy Plan · 2026   ││ card full-bleed inside a 16px-margin stage
││ $38,420*  ▓▓▓▓░ 6/8    ││ list trimmed to 3 rows
││ ✓ … ✓ … ◌ …            ││
│╰────────────────────────╯│
│[💬 Tax Valet bubble]     │
│*Illustrative…            │
├──────────────────────────┤
│Proof: horizontal chips   │ scroll-snap, no marquee
├──────────────────────────┤
│Problem: 2 stacked rails  │ vertical timeline (months ↓)
├──────────────────────────┤
│How it works: 3 cards     │ swipe carousel w/ dots; UI vignette on top
├──────────────────────────┤
│Strategies: 2-col grid    │ 8 tiles, 1:1; the CTA tile spans 2 cols
├──────────────────────────┤
│TaxLand portal: phone     │ Drew overlaps the phone bottom-left, 180px
│centered; text below;     │
│[Start the game →]        │
├──────────────────────────┤
│Scenario: 3 stacked stats │ with † footnote below
├──────────────────────────┤
│Testimonials: snap cards  │ 85% width peeking the next card
├──────────────────────────┤
│Founder, trust, FAQ       │
├──────────────────────────┤
│Closing CTA + footer      │ footer columns → accordions
└──────────────────────────┘
┌──────────────────────────┐
│[See what you can keep →] │ STICKY BOTTOM BAR: appears after the hero CTA leaves the viewport,
└──────────────────────────┘ hides over the TaxLand + closing CTA sections and when the keyboard is open
```

---

## 10. Component specs

### Buttons
| Variant | Spec |
|---|---|
| **Primary (green)** | Height 52 (desktop hero/closing) or 44 (nav, inline). Padding 0 24px, radius **12px** (squarer and more "fintech" than the current 50px pill. Keep the pill only for chips). Fill `linear-gradient(180deg,#1FDB1B 0%,#04CE00 55%,#0FB80C 100%)`, inset highlight `inset 0 1px 0 rgba(255,255,255,.35)`, border `1px solid #0FA50C`. **Text `#0B1033` 600, 16px** (8.66:1 contrast). Trailing arrow icon 16px. Hover: glow `0 8px 24px -8px rgba(4,206,0,.55)`, translateY(−1px). Focus: `outline:3px solid #0B1033; outline-offset:3px` (plus a white inner ring on dark). |
| **Secondary** | Same geometry. Fill white, border `1px solid var(--line)`, text navy-900 600, `--elev-1`. On dark: transparent, `1px solid rgba(255,255,255,.28)`, white text. |
| **Tertiary link** | Navy-900 500 underline-offset 4px, `→` nudges on hover. |
| **Labels (copy lock)** | Primary: **"See what you can keep"** (matches TaxLand and names the payoff). In the TaxLand section: "Start the game". Secondary: **"Book a strategy call"**. Retire "Take The Assessment", "Unlock Your Savings Now!" and "Get Started". |
| **Destinations** | All primary CTAs go to `https://taxland.heydrew.com/` with UTM `?src=home&pos=hero|bento|taxland|closing|sticky|nav` (fixes audit #10: the nav currently sends people to /login). |

### Nav
72px, white, logo 40px tall (true-vector SVG required, audit #7). Links: How it works · Strategies · About · FAQ (15px 500 navy). Right side: "Sign in" as a text link, plus one primary 44px CTA. The **navy "Get Started" button is dropped**, so there are never two filled buttons competing. On scroll past 24px it gets a hairline border and a 92%-opacity white background with `backdrop-filter: blur(12px)`.

### Cards
White, 1px `--line`, radius 20 (large) / 16 (small), `--elev-1` at rest, `--elev-2` + translateY(−2px) on hover (interactive cards only). Padding 32/24. Strategy tile: eyebrow (IRC section, 12px `navy-500`) → title h3 → 2-line plain-English hook → optional micro-stat in `green-700` with a dagger. Strategy **3D icon art** from the current cards is cropped to the icon only (no vines or sand) at 64px, top-right.

### Proof strip
A single row with centered 32px gaps, 15px/500 `navy-500`, and an 18px line icon (1.75px stroke, navy-600) per item. It holds verified facts only. The Trustpilot rating is Andrew's brand rating per the brand kit, so it is **[PLACEHOLDER - confirm it's HeyDrew-attributable]**. If it can't be confirmed, drop the stars and keep 4 factual items. **No press or client logos** unless they are verified.

### Stat block (scenario)
Number `stat` token in ink-950 (not green), label 15px `navy-500`, dagger in superscript linking to `#disclaimers`. A thin 1px vertical divider between stats. The $135K count-up is kept (brand signature). It triggers when 50% is in view and runs once.

### Testimonial card
White card, 56px real headshot (circular, 2px white ring), name 600 + "Business Owner, City ST" 14px `navy-500`, quote 18/28 (featured: 24/34 400). Use 5 gold stars (#F5B301) **only if the rating came from a real review source.** Otherwise omit them. No carousel arrows on desktop: show all 6 in a 1 featured + 5 compact grid. There is no forest background.

### FAQ accordion
Left column: sticky H2 "Questions, answered." + "Still unsure? Book a strategy call →". Right column: `<details>/<summary>` or button+region, each row 72px min, 1px hairline divider, question 18/26 600, `+` icon rotates 45° (160ms), answer 17/27 at max 64ch, opened with a height transition via `grid-template-rows:0fr→1fr`. **Homepage set (6):** Can you guarantee I'll save money? · How much does it cost? / Why isn't pricing on the site? · Will these strategies raise my audit risk? · Do you file my return, too? · Is my information secure? · Does it renew automatically? Remove the hidden "Don't Delete" headings (audit #4). Output `FAQPage` JSON-LD.

### Sticky CTA (mobile)
Fixed bottom, 12px margin, radius 16, ink-950 at 96% + blur. Left: micro-Drew avatar 32px + "See what you can keep" 15/600 white. Right: green arrow button 44×44. It appears after the hero CTA scrolls out, hides inside the TaxLand portal and closing CTA sections, and respects the `env(safe-area-inset-bottom)` padding. Desktop has no sticky bar (the nav CTA is enough).

### Comparison rail ("works backwards")
12 month nodes, 8px dots on a 2px line. The Traditional row is `navy-200` with a single "File" node and muted-red ✕ marks. The HeyDrew row fills green L→R as the section scrolls (scroll-linked via `animation-timeline: view()` with a JS fallback). Each node has a tooltip on hover/focus (e.g., "Mar: Augusta Rule scheduled"). On mobile it's vertical.

### Disclaimers
Every figure gets its footnote **in the same viewport** (12px `navy-500`). The full legal text lives in the footer in an expanded `<details open>` on the homepage, not collapsed. The "100% Success Rate" claim is removed (the CRO/compliance call; flagged for the team).

---

## 11. Accessibility requirements
- Remove `maximum-scale=1, user-scalable=0` and the duplicate viewport tags (audit #8). Use `width=device-width, initial-scale=1`.
- All text meets **AA 4.5:1** (3:1 for ≥24px). The primary CTA uses dark ink on green (8.66:1). Sky blue is never used for text.
- Visible focus rings on every interactive element (3px, offset 3px). Tab order follows the visual order. A skip link "Skip to content" is the first focusable element.
- Heading outline: one `h1` (hero), `h2` per section, `h3` for cards. Hidden "Don't Delete" headings are removed.
- Drew images are decorative: `alt=""` + `aria-hidden`. The hero plan card is real text (screen-reader readable) with an `aria-label` that includes "illustrative example".
- The count-up uses `aria-live="off"`, and the final value is in the DOM from the start (the animation only changes visuals), so screen readers and crawlers read "$135,000".
- Carousels (mobile only) use native scroll-snap, not autoplay. If any auto-motion exists, it has a pause control.
- Touch targets ≥44×44. Accordion buttons expose `aria-expanded`.
- Honor `prefers-reduced-motion` (see §8) and `prefers-contrast: more` (remove glows, 2px borders).
- Language: `lang="en"`. Link text says where it goes (no "click here").

## 12. Performance requirements (budgets)
| Metric | Budget |
|---|---|
| LCP (mobile, 4G) | **≤ 2.0s**. The LCP element is the H1 text, *not* an image. |
| CLS | ≤ 0.05 (explicit width/height on all images; font `size-adjust` fallback) |
| INP | ≤ 150ms |
| Total JS | ≤ 60KB gz (no page builder runtime; vanilla or Astro islands) |
| Page weight (initial) | ≤ 900KB. The current GIFs (`landing-savings.gif`, `drew-landing-map.gif`) → AVIF stills + WebM loops, lazy |
| Fonts | 1 variable DM Sans woff2 (latin subset, ~45KB), `font-display: swap`, preloaded. Open Sans is removed. |

- Drew PNGs → **AVIF + WebP** via `<picture>`, sized to their render size ×2 (hero peek ≤ 60KB). `AC-HANDS-DOWN-1.svg` (a 5MB embedded raster) must never ship.
- Vimeo welcome video: facade (a poster image + play button), iframe loaded on click only, and placed in the founder section rather than the hero.
- Below-fold images: `loading="lazy" decoding="async"`. Hero Drew: `fetchpriority="high"` only if it's in the first viewport on mobile (it isn't, since the stack comes after the CTAs), so lazy is fine.
- The site must reach network-idle (it currently never does, audit #9). No third-party scripts before interaction except analytics. reCAPTCHA only on pages with forms.
- Static render (SSG). Critical CSS inlined (<14KB).

---

## 13. Hand-off checklist and open items
- [ ] True vector logo (AI/SVG) from the client.
- [ ] Transparent high-res Drew renders: peek, map, chest, wave (existing files, or Higgsfield regenerations using the brand-kit prompt seed).
- [ ] Confirm: Trustpilot 4.9 / 229 attribution, assessment duration ("~5 min"), a Tax Valet name/photo for the hero bubble, the example persona and per-strategy $ (CPA sign-off), IRC section refs, the Solo 401(k) "$70k" figure for the current year, and an Andrew quote.
- [ ] Legal sign-off on: the removal of the "100% Success Rate" claim, the hero footnote wording, and dagger footnotes.
- [ ] Real testimonial headshots: permission to reuse at 112px.
- [ ] Analytics events: `cta_click{pos}`, `taxland_start`, `call_book`, `faq_open{q}`, `scroll_depth`.

## Reference file index (`./refs/`)
Fintech: `ramp-*`, `mercury-*`, `pilot-*`, `found-*`, `collective-*`, `keeper-*`, `wealthfront-*`, `brex-*`, `arc-*`, `rho-*` · Mascot: `duolingo-*`, `mailchimp-*`, `lemonade-*`, `headspace-*`, `notion-*` · Metrics: `metrics-fintech.jsonl`, `metrics-mascot.jsonl` · Capture script: `brand-research/shoot-refs.mjs`
