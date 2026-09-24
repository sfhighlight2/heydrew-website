# HeyDrew Homepage Blueprint (single source of truth)

**Owner:** CMO · **Date:** 2026-09-24 · **Status:** Ready to build. Items marked **[CONFIRM]** must be verified by HeyDrew before launch; the builder ships them with the placeholder text shown and a visible `data-confirm` attribute so QA can find them.
**Supersedes:** `research/cro/CRO_SPEC.md`, `research/design/DESIGN_DIRECTION.md`, `research/brand/BRAND_MESSAGING.md` wherever they disagree. Those remain the rationale and reference library.
**Primary conversion:** start the TaxLand assessment (`https://taxland.heydrew.com/`). **Secondary:** book a strategy call.
**Direction:** premium fintech credibility (Ramp / Mercury / Pilot register). Drew is a guide at 4 moments, not wallpaper.

---

## 0. Decisions log (where the three leads disagreed, and the call)

| # | Topic | CRO said | Design said | Brand said | **Final call** | Why |
|---|---|---|---|---|---|---|
| D1 | **Hero headline** | "Your CPA files your taxes. HeyDrew cuts them." | "Keep more of what you earn. Stop overpaying the IRS." | "You built the income. Now keep it." | **"You built the income. Now keep it."** A/B challenger: "Pay what you owe. Not a dollar more." | No implied savings promise ("cuts them" reads as a result claim and pits us against CPAs while we employ CPAs). It is the brand's own line, ties to Create / **Keep** / Multiply, and is the calm $100M register. CRO's valid point (the H1 doesn't name audience or mechanism) is fixed by the eyebrow + sub, which name *business owners*, *year-round*, *AI + licensed CPAs*. |
| D2 | **Hero visual** | Inline 2-question estimator | "Your 2026 Strategy Plan" card with illustrative $38,420 | Result-preview card, no numbers | **One object that is both:** the Strategy Plan card *is* the estimator. It opens with Q1 chips inside the card and 8 strategy rows shown locked beneath; answering unlocks rows ("Up to 6 of 8 may fit"). **No dollar figure in the hero.** | Keeps the CRO's foot-in-the-door mechanic and the designer's "show the product artifact" pattern in a single focal object. Removing the $38,420 avoids an unverified CPA-signed number above the fold; the dollar story lives in §7 with its disclaimer. A $ range is tested later (T2). |
| D3 | **Primary CTA label** | "Start free assessment" (hero: "See what I can keep") | "See what you can keep" everywhere | "See what you can keep"; header "Start assessment" | **"See what you can keep" on every green button**, including header and estimator result. Mobile header uses a compact **"Start free"**. Only label test: T5. | Locked by the user; matches TaxLand's own copy, so the promise and the destination agree. One label = one habit. |
| D4 | **Button color + text** | Darken gradient, keep white text | Keep bright green, dark ink text (8.66:1) | – | **Dark ink `#0B1033` on the green gradient.** Radius 12px (chips stay pill). | White on #04CE00 is 2.14:1 (fails). Ink keeps the brand's bright money-green instead of muddying it, and it's what Ramp does. |
| D5 | **Secondary CTA in hero** | Text link | Full ghost button | Text link | **Text link** in hero ("Rather talk first? Book a strategy call →"). Ghost button only in #pricing and the final band. | One button above the fold. The call is a fallback, not a peer. |
| D6 | **Dec 31 deadline bar** | Yes | Not specified | Not specified | **Yes, behind a feature flag, Oct 1 to Dec 31 only**, live day count, dismissible, wording **[CONFIRM legal]**. | The deadline is true and is pillar 1 of the message. Scoped to Q4 so it isn't permanent fake urgency. |
| D7 | **Stats** | Drop 100%; line-item example | Keep $135K, $50K, 18+ with daggers | Drop $50K, 18+, 100% | **Keep only the $135K counter**, reframed as "potential deductions for a hypothetical owner" with line items and the disclaimer printed under it. **Remove "$50K", "18+ Strategies", "100% Success Rate".** | Unitless $50K and self-defined 100% cost more trust than they earn and contradict the FAQ's "be skeptical of guarantees". The counter is brand equity; the line items make it credible. |
| D8 | **Assessment length** | "3 min" | "~5 min [confirm]" | "About 5 minutes [confirm]" | **"Takes a few minutes"** until TaxLand's median completion time is measured; then swap in the real number. | Never print an unverified time. |
| D9 | **How it works** | 4 steps | 3 steps | 3 steps | **3 steps, with the call named in step 2** ("Talk to your Tax Valet, get your price, no obligation"). | CRO's concern (make step 2 feel safe) is met without a 4th card. |
| D10 | **Drew placements** | Peeking over estimator | Peek / map / chest / wave | Point / peek / map / hello | **4 moments using the new renders:** (1) hero `drew-point.webp` pointing at the plan card, (2) strategy bento tile `drew-desk.webp`, (3) TaxLand portal `drew-hero.webp` (holding the phone = the TaxLand app) over `taxland-backdrop.webp` + `taxland-foreground.webp`, (4) final CTA `drew-celebrate.webp`. Micro-Drew avatar (head crop of `drew-advisor.webp`) in estimator captions + mobile sticky bar only. | New renders are on-model, transparent (RGBA, verified) and higher-res than the legacy PNGs. Each pose holds or points at something real. Never in testimonials, founder, pricing, security, FAQ, disclaimers. |
| D11 | **Tax Valet "Maya" bubble in hero** | – | Yes (name placeholder) | – | **Removed from hero.** Unnamed "Your Tax Valet" bubble moves to How-it-works step 2 vignette. | No invented named people on the most-viewed pixel. |
| D12 | **Trustpilot 4.9 (229)** | Only if HeyDrew's | Placeholder | Belongs to andrewcordle.com | **Off by default.** If Andrew approves attribution, it appears in the proof strip as "Andrew Cordle: 4.9 on Trustpilot (229 reviews)" linked to the source. Never "HeyDrew 4.9". | Misattributed ratings are a compliance risk. |
| D13 | **FAQ length** | 8 | 6 | 8 | **8**, chosen by objection frequency (list in §12). | Every question maps to a known blocker; `faq_open` data will prune it. |
| D14 | **Page rhythm / dark bands** | Navy final band | Navy closing stage | – | Dark bands = **TaxLand portal** and **Founder + team** only. Final CTA is a **light tinted stage** (footer is dark, so a navy final band would stack two darks). | Rhythm rule: never two dark bands in a row. |
| D15 | **Analytics naming** | CRO event list | Different short names | – | **CRO names are canonical** (§16). | They span heydrew.com + TaxLand + CRM. |
| D16 | **Performance budget** | <1.2MB total, <250KB fold | ≤900KB initial | – | **≤900KB initial load, ≤1.2MB after full scroll, ≤250KB above the fold, LCP ≤2.0s (mobile 4G), CLS ≤0.05.** | Take the stricter number where they overlap. |

---

## 1. Design tokens

### 1.1 Color
```css
:root{
  /* Navy ramp (from brand #1E285F) */
  --ink-950:#0B1033; --navy-900:#1E285F; --navy-800:#2A3574; --navy-600:#3A4478;
  --navy-500:#5A6280; --navy-400:#8C93B8; --navy-300:#B9BFDA; --navy-200:#DDE0EC;
  --navy-100:#EEF0F6; --navy-50:#F7F8FB;
  /* Money green: CTA fills, positive money, checks, "keep" highlight. Nothing else. */
  --green-400:#1FDB1B; --green-500:#04CE00; --green-550:#0FB80C; --green-600:#129D0F;
  --green-700:#0E7A0C; --green-200:#C9F5C7; --green-100:#EAF8E9; --green-glow:rgba(4,206,0,.35);
  /* Accents: TaxLand portal + strategy icon art ONLY */
  --sky-400:#65A4E5; --purple-500:#8365E3; --parchment:#FDDEBC;
  /* Semantic */
  --miss-600:#C2413A; /* "traditional way" ✕ marks only, never a fill */
  --star:#F5B301;     /* only with a verified review source */
  /* Surfaces */
  --bg:#FFFFFF; --bg-tint:var(--navy-50); --line:#E3E6EF; --shadow-ink:11,16,51;
}
```

**Contrast (WCAG 2.2, measured):**
| Pair | Ratio | Use |
|---|---|---|
| `#0B1033` on `#04CE00` | **8.66** | Primary CTA label (AAA) |
| `#0B1033` on `#0FB80C` (gradient end) | 6.94 | CTA label at gradient bottom (AA) |
| `#FFFFFF` on `#04CE00` | 2.14 | **Banned** |
| `#1E285F` on `#FFFFFF` | 13.78 | Headlines, body |
| `#1E285F` on `#F7F8FB` | 12.98 | Text on tint |
| `#5A6280` on `#FFFFFF` / `#F7F8FB` / `#EEF0F6` | 6.01 / 5.66 / 5.28 | Secondary text, footnotes |
| `#0E7A0C` on `#FFFFFF` / `#EAF8E9` | 5.52 / 5.02 | Green text (money deltas, "may fit") |
| `#C2413A` on `#FFFFFF` | 5.11 | "Missed" labels |
| `#FFFFFF` on `#0B1033` | 18.48 | Text on dark bands |
| `#B9BFDA` / `#8C93B8` on `#0B1033` | 10.15 / 6.14 | Secondary text on dark |
| `#1E285F` on `#C9F5C7` | 11.40 | Text over the "keep" highlight |
| Sky `#65A4E5` / `#2EA3F2` on white | 2.63 / 2.75 | **Never for text** |

**Usage ratio per full scroll:** ~70% neutrals · ~22% navy · ≤5% green · ≤3% accents. Green is never a section background, a headline color or a decorative stripe.

### 1.2 Typography: DM Sans only (variable, `opsz,wght@9..40,400..800`, latin subset, `font-display:swap`, preloaded; Open Sans removed)
| Token | Desktop (size/lh) | Mobile | Weight | Tracking | Use |
|---|---|---|---|---|---|
| `--fs-display` | 76/76 | 42/44 | 700 | −0.035em | Hero H1 only |
| `--fs-h2` | 52/56 | 34/38 | 700 | −0.03em | Section titles; optional 2nd line at 400 in `navy-500` (h2-split) |
| `--fs-h3` | 24/30 | 20/26 | 600 | −0.015em | Card titles |
| `--fs-stat` | 64/64 | 44/44 | 700 | −0.04em, `tabular-nums` | Big numbers |
| `--fs-lead` | 20/30 | 18/28 | 400 | −0.005em | Hero sub, section intros (max 56ch) |
| `--fs-body` | 17/27 | 16/25 | 400 | 0 | Paragraphs (max 68ch) |
| `--fs-ui` | 15/20 | 15/20 | 500 (600 on buttons) | 0 | Nav, buttons, chips |
| `--fs-small` | 14/20 | 13/18 | 400 | 0 | Captions, testimonial meta |
| `--fs-eyebrow` | 13/16 | 12/16 | 600 | +0.08em uppercase | Section labels, `navy-500` |
| `--fs-micro` | 12/17 | 12/17 | 400 | 0 | Footnotes, disclaimers (never smaller) |

Fluid: `--fs-display: clamp(2.625rem, 1.6rem + 3.6vw, 4.75rem)`; `--fs-h2: clamp(2.125rem, 1.5rem + 2.1vw, 3.25rem)`. `font-optical-sizing:auto`.
**Signature move, the "keep" highlight:** in the H1 the word *keep* gets `background:linear-gradient(transparent 62%, var(--green-200) 62%)`; it draws in left→right (600ms) after the H1 paints. Used once per page (plus the final CTA H2).

### 1.3 Spacing (4px base)
`--s-1:4 --s-2:8 --s-3:12 --s-4:16 --s-5:24 --s-6:32 --s-7:48 --s-8:64 --s-9:96 --s-10:128`
| Use | Desktop | Mobile |
|---|---|---|
| Section padding (vertical) | 128 | 72 |
| Heading block → content | 64 | 40 |
| Eyebrow → H2 | 16 | 12 |
| H2 → lead | 20 | 16 |
| Card padding | 32 / 24 | 20 |
| Grid gap | 24 | 16 |

**Grid:** 12 col / 24 gutter / 1200 content max (1320 "wide" for hero stage, bento, portal; 760 "prose" for FAQ answers + disclaimers). Tablet 8 col. Mobile 4 col, **16px side gutter**, no horizontal scroll (only the explicitly snapping carousels scroll inside themselves).
**Stages:** hero, TaxLand portal and final CTA sit in an inset rounded stage: `max-width:1400px; margin-inline:16px (auto ≥1432px); border-radius:28px` (16px on mobile).

### 1.4 Radii
`--r-sm:8` (inputs, tooltips) · `--r-md:12` (buttons, strategy chips-in-card) · `--r-lg:16` (small cards, sticky bar, bubbles) · `--r-xl:20` (cards) · `--r-2xl:28` (stages) · `--r-pill:999` (estimator chips, status pills, eyebrow pill).

### 1.5 Shadows (navy-tinted only)
```css
--elev-1: 0 1px 2px rgba(11,16,51,.06), 0 1px 1px rgba(11,16,51,.04);
--elev-2: 0 8px 24px -8px rgba(11,16,51,.14), 0 2px 4px rgba(11,16,51,.05);
--elev-3: 0 24px 48px -16px rgba(11,16,51,.28), 0 4px 12px rgba(11,16,51,.06);
--glow-cta: 0 8px 24px -8px rgba(4,206,0,.55);
--drew-contact: radial-gradient(ellipse 50% 12% at 50% 100%, rgba(11,16,51,.18), transparent 70%);
```
Cards: 1px `--line` border + `--elev-1`; interactive hover `--elev-2` + translateY(−2px).

### 1.6 Motion
`--t-fast:160ms` (hover/press) · `--t-base:280ms` (reveals) · `--t-slow:600ms` (hero choreography) · `--ease-out:cubic-bezier(.2,.8,.2,1)`. No bounce/elastic except Drew's one wave.
Rules: animate only `transform`/`opacity`; scroll reveals = opacity 0→1 + translateY 12px, once, at 15% visibility; ≤2 idle loops on screen; pause loops off-screen (IntersectionObserver); `prefers-reduced-motion: reduce` → no count-ups (final value rendered), no bob, no parallax, no shimmer, crossfades only.

### 1.7 Buttons
| Variant | Spec |
|---|---|
| **Primary** | Height 52 (hero, portal, final) / 44 (nav, inline, bento). Padding 0 24px. Radius 12. `background:linear-gradient(180deg,#1FDB1B 0%,#04CE00 55%,#0FB80C 100%)`, `border:1px solid #0FA50C`, `box-shadow:inset 0 1px 0 rgba(255,255,255,.35)`. Label `#0B1033` 16px/600 + trailing 16px arrow. Hover: `--glow-cta`, translateY(−1px), arrow +3px. Active: scale .98 (120ms). Focus: `outline:3px solid #0B1033; outline-offset:3px` (on dark: add 2px white inner ring). Mobile full-width, 56px tall in hero. |
| **Secondary (ghost)** | Same geometry. White fill, 1px `--line`, navy-900 600, `--elev-1`. On dark: transparent, `1px solid rgba(255,255,255,.28)`, white label. Never green, never larger than primary. |
| **Text link** | navy-900 500, underline offset 4px, `→` nudges 3px on hover. |

**All primary destinations:** `https://taxland.heydrew.com/?src=home&pos={pos}` + passthrough `utm_*` + GA4 cross-domain linker (`_gl`). `pos ∈ nav | hero | hiw | bento | example | portal | final | sticky`. Estimator adds `entity` and `rev`. **Nothing points to `/login`.**
**Secondary destination:** booking URL **[CONFIRM: Calendly/HubSpot link]** `?src=home&pos={pos}`, same tab on mobile.
**Existing clients:** "Sign in" text link → portal URL **[CONFIRM]**. Never green.

---

## 2. Final section order

| # | Section | Background | Conversion job | Green CTA? |
|---|---|---|---|---|
| 0 | Deadline bar (flag, Oct–Dec) | ink-950 | True urgency | link |
| 1 | Header (sticky) | white | One next step on every screen | ✓ |
| 2 | **Hero + Strategy Plan estimator** | navy-50 stage | Promise + 1-tap commitment | ✓ |
| 3 | Proof strip | white | "Who are you?" in 3 seconds | – |
| 4 | Problem: "Most CPAs work backwards." | white | Name the enemy; Dec 31 is the real deadline | – |
| 5 | How it works (3 steps) | navy-50 | Make step 2 feel safe | ✓ |
| 6 | The 8 strategies (bento) + **Drew moment 2** | white | Tangible, legal, "that's me" | ✓ (tile) |
| 7 | Illustrative example ($135K) | navy-50 | Make the number credible | ✓ |
| 8 | TaxLand portal + **Drew moment 3** | dark inset stage | The fun part; biggest CTA | ✓ |
| 9 | Testimonials (6 real) | white | Peer proof | – |
| 10 | Who's behind it: Andrew + the team | ink-950 | Authority, "human-perfected" made real | ghost (call) |
| 11 | How pricing works + security (#pricing) | navy-50 | Kill cost / data / guarantee objections | ghost (call) |
| 12 | FAQ | white | Last objections | text link |
| 13 | Final CTA + **Drew moment 4** | navy-50 stage w/ green glow | Close with two paths | ✓ + ghost |
| 14 | Footer + expanded disclaimers | ink-950 | Compliance + navigation | – |
| – | Sticky mobile CTA | ink-950 96% | Always one tap away | ✓ |

Drew moment 1 is in the hero (§4). Mobile target: ~10 screens (current ~15).

---

## 3. Section 0 + 1: Deadline bar and header

### 0. Deadline bar
- **Show:** Oct 1 – Dec 31 only (`DEADLINE_BAR=on`), until dismissed (`localStorage` key `hd_deadline_dismissed`, wrapped in try/catch). Height 40 (desktop) / auto, 1 line (mobile).
- **Copy:** "**[n] days left** to make 2026 tax moves. Most strategies need to be in place by Dec 31. **See yours →**" **[CONFIRM legal wording]**. `n` computed client-side in America/New_York; server renders a no-number fallback: "Most 2026 strategies need to be in place by Dec 31. See yours →".
- Mobile copy: "**[n] days** left for 2026 tax moves. See yours →"
- Link → TaxLand `pos=deadline`. Close ✕ (44×44 hit area, `aria-label="Dismiss"`).
- Events: `deadline_bar_view`, `cta_click{cta_id:deadline}`, `deadline_bar_dismiss`.

### 1. Header
```
Desktop (72px, white; on scroll >24px: rgba(255,255,255,.92) + blur(12px) + 1px --line bottom)
┌──────────────────────────────────────────────────────────────────────────────┐
│ [HEY DREW! sticker 40px]  How it works  Strategies  Pricing  FAQ    Sign in  [See what you can keep →] │
└──────────────────────────────────────────────────────────────────────────────┘
Mobile (60px)
┌──────────────────────────────────┐
│ [HEY DREW! 32px]   [Start free →] [≡] │  ← compact 40px primary always visible
└──────────────────────────────────┘
Menu sheet: links stacked 56px rows · "Sign in" · pinned bottom full-width primary
```
- Links anchor to `#how`, `#strategies`, `#pricing`, `#faq` (smooth scroll, offset 80px). Careers, Affiliate, About move to footer.
- Logo: true vector SVG **[CONFIRM: client to supply]**; interim `HeyDrew-Logo@2x-1.svg` (verify it's not an embedded raster).
- Skip link "Skip to content" is the first focusable element.
- Events: `cta_click{cta_id:nav}`, `nav_click{target}`, `signin_click`.

---

## 4. Section 2: Hero + Strategy Plan estimator

**Conversion job:** state one promise, name the audience and mechanism, and turn the first commitment into a one-tap identity question that pre-fills TaxLand.

### Copy
- **Eyebrow pill** (pill, navy-100 bg, navy-900 600 13px): `● 2026 plans are open` (the dot is green-500)
- **H1:** You built the income. Now **keep** it.  *(highlight on "keep")*
- **Sub (lead):** HeyDrew is year-round tax strategy for business owners. AI finds the moves you qualify for. Licensed CPAs **[CONFIRM credential wording]** help you set them up and file, while the year is still open.
- **Primary CTA (left column, desktop only; on mobile the card carries the CTA):** [See what you can keep →]
- **Microcopy under CTA:** Free · Takes a few minutes · No credit card
- **Secondary:** Rather talk first? **Book a strategy call →**
- **Check row (14px, navy-500, green-700 checks):** ✓ Strategy all year, not just April · ✓ Licensed CPAs file your return **[CONFIRM]** · ✓ Never auto-renews
- **Footnote under stage (12px navy-500):** Strategy matches are a preliminary screen based on two answers, not tax advice or a guarantee. Your plan depends on your full situation.

### Layout
```
DESKTOP 1440 — inset stage (navy-50, r28, faint 24px dot grid + radial green glow top-right at 10%)
╭──────────────────────────────────────────────────────────────────────────────────────╮
│  (● 2026 plans are open)                                                              │
│                                                  ┌─────────────────────────────────┐  │
│  You built the                        [DREW      │ ◉ Your 2026 Strategy Plan  [PREVIEW]│
│  income. Now                           pointing  │ ─────────────────────────────── │  │
│  keep it.            ← display 76      → at card]│ How's your business set up?     │  │
│  ▔▔▔▔ (mint)                          ~300px     │ (Sole prop / 1-member LLC) (S-Corp)│
│                                        tall,     │ (Partnership / multi-member LLC) │  │
│  HeyDrew is year-round tax strategy…   overlaps  │ (More than one business) (Not sure)│
│                                        card's    │ ─────────────────────────────── │  │
│  [See what you can keep →]  52px       left edge │ 🔒 Hire Your Kids                 │  │
│  Free · Takes a few minutes · No card   by 24px  │ 🔒 Augusta Rule                   │  │
│  Rather talk first? Book a strategy call →       │ 🔒 Solo 401(k)       (rows at 45%) │  │
│                                                  │ 🔒 + 5 more                        │  │
│  ✓ All year  ✓ Licensed CPAs file  ✓ No auto-renew│ Step 1 of 2 ▓▓▓░░░░░░             │  │
│                                                  └─────────────────────────────────┘  │
│                                         [✓ Filed by licensed CPAs] chip, card top-right│
│  Strategy matches are a preliminary screen… (footnote, 12px)                          │
╰──────────────────────────────────────────────────────────────────────────────────────╯
Columns: copy 6/12, card 6/12 (card max-width 480). Drew sits between, anchored to card's left edge,
bottom-aligned with card bottom, z above card, with --drew-contact shadow. Drew height ≤ card height.

MOBILE 390
┌──────────────────────────────┐
│ (● 2026 plans are open)       │
│ You built the income.         │ display 42/44, 3 lines max
│ Now keep it.                  │
│ HeyDrew is year-round tax…    │ lead 18/28, ≤4 lines
│ ╭──────────────────────────╮  │
│ │ [Drew head+pointing hand  │  │ drew-point cropped waist-up, 120px tall,
│ │  peeks over top-right]    │  │ overlapping card top edge by 20px
│ │ Your 2026 Strategy Plan   │  │
│ │ How's your business set up?│ │
│ │ (Sole prop/LLC) (S-Corp)  │  │ chips 2-col, ≥48px tall
│ │ (Partnership) (2+ biz)    │  │
│ │ (Not sure)                │  │
│ │ 🔒 Hire Your Kids  🔒 +7   │  │ collapsed locked rows
│ ╰──────────────────────────╯  │
│ Free · Takes a few minutes · No card │
│ Rather talk first? Book a call →│
│ Strategy matches are prelim… │
└──────────────────────────────┘
The Q1 chips must be fully visible in the 390×844 fold (below a 60px header, without the deadline bar;
with it, at least the first chip row).
```

### Components
- **`<form class="plan-card" aria-label="Estimate which HeyDrew strategies may fit your business">`** built in HTML/CSS (no screenshot). White, r20, `--elev-3`, padding 24, max-width 480.
- Header row: 24px micro-Drew avatar + "Your 2026 Strategy Plan" (600 15px) + `PREVIEW` pill (navy-100 bg, navy-600, 11px 600 uppercase).
- Chips: `role="radiogroup"`, each a `<button role="radio">` pill, 48px min height, 1px `--line`, navy-900 500 15px; selected = navy-900 bg, white text, ✓ icon. Keyboard: arrow keys move, Enter/Space selects.
- Locked strategy rows: 40px, lock icon navy-400, name navy-500 at 45% opacity, 1px navy-100 dividers. They are real text (screen readers read "Hire Your Kids, not yet checked").
- Progress bar: 6px, navy-100 track, green gradient fill, `aria-valuenow`.
- CPA chip: ink-950 pill, white 13px 500, "✓ Filed by licensed CPAs" **[CONFIRM]**, absolute top-right −16px.

### Estimator spec (the interactive heart of the page)
**Step 1 — "How's your business set up?"** (single tap, auto-advance after 350ms)
| Chip label | `entity` param | Drew caption (≤8 words, 1.6s, next to avatar) |
|---|---|---|
| Sole prop / single-member LLC | `sole` | "Got it. One more question." |
| S-Corp | `scorp` | "Nice. One more question." |
| Partnership / multi-member LLC | `partner` | "Got it. One more question." |
| More than one business | `multi` | "Ooh, busy. One more question." |
| Not sure | `unsure` | "No problem. We'll sort that out." |
Captions never state numbers, eligibility or outcomes. **[CONFIRM compliance review of captions]**

**Step 2 — "Roughly what did the business bring in last year?"** (chips; bands must map 1:1 to TaxLand's revenue options **[CONFIRM TaxLand bands]**)
`Under $100K` (`lt100k`) · `$100K–$250K` (`100-250k`) · `$250K–$1M` (`250k-1m`) · `$1M–$5M` (`1-5m`) · `$5M+` (`5m-plus`)
A "← Back" text button returns to step 1.

**Result state** (no email, no dollars):
```
┌─────────────────────────────────────┐
│ ◉ Your 2026 Strategy Plan [PREVIEW] │
│ S-Corp · $250K–$1M        Edit      │
│ Up to 8 of 8 strategies             │ ← --fs-stat 44px ink; "may fit" in green-700
│ may fit a business like yours.*     │
│ ✓ Hire Your Kids                    │ rows unlock top→bottom, 60ms stagger,
│ ✓ Augusta Rule                      │ lock icon morphs to green check
│ ✓ Solo 401(k)                       │
│ ✓ Accountable Plan   + 4 more       │
│ ▓▓▓▓▓▓▓▓░░ You're ~30% done          │
│ [See what you can keep →]  (full width, 52px)
│ Continue in TaxLand · free · no credit card
└─────────────────────────────────────┘
* Preliminary screen on two answers, not tax advice. Your plan depends on your full situation.
```

**Rule table (illustrative; every row [CONFIRM — HeyDrew CPA sign-off before launch]):**
| Strategy | sole | scorp | partner | multi | unsure |
|---|---|---|---|---|---|
| Hire Your Kids | ✓ | ✓ | ✓¹ | ✓ | ✓ |
| Augusta Rule (§280A(g)) | – | ✓ | ✓ | ✓ | ✓ |
| Solo 401(k) | ✓ | ✓ | ✓² | ✓ | ✓ |
| Accountable Plan | – | ✓ | ✓ | ✓ | ✓ |
| Health Savings Account | ✓ | ✓ | ✓ | ✓ | ✓ |
| Health Reimbursement Arrangement | ✓ | ✓ | ✓ | ✓ | ✓ |
| Traditional & Roth IRA | ✓ | ✓ | ✓ | ✓ | ✓ |
| 529 Education Plan | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Count shown ("Up to N of 8")** | 6 | 8 | 8 | 8 | 8 |
¹ parents-only partnership · ² no full-time employees besides spouse. Footnotes live in TaxLand, not the card.
Revenue band does not change N in v1 (it prefills TaxLand and tunes one line): `lt100k` adds under the count "Some moves make more sense as you grow. TaxLand will show which." `5m-plus` adds "Bigger businesses usually get a deeper review on the call."
Store the table as a JSON object in the page script so the CPA can edit it without touching markup.

**Handoff URL:**
`https://taxland.heydrew.com/?entity={entity}&rev={rev}&src=home&pos=hero&{utm_*}&_gl={linker}`
- Same tab. Params in the query string (survives Safari ITP), not only cookies.
- The left-column "See what you can keep" button (desktop) links to TaxLand with whatever has been answered so far (`entity` only, or nothing).
- **No-JS fallback:** the card renders as a plain list of the 8 strategies + the green button to TaxLand root.
- **Resume:** answers saved to `sessionStorage` (`hd_est`, try/catch). If Q1 answered and Q2 not, the sticky bar shows the resume state (§15).

**TaxLand dependencies (dev ticket, not blocking launch; params are ignored harmlessly until done):**
1. Read `entity`/`rev`, skip answered questions, open on the next one.
2. Progress bar starts partly filled ("You're already ~30% done").
3. Cookie banner must not cover the question on mobile (slim bottom bar, non-blocking).
4. Ask email/phone at the results reveal, not first.
5. "Book your strategy call" calendar on the results screen.
6. Retire `/login` as a prospect entry.

### Imagery
- **Drew moment 1:** `site/img/drew-point.webp` (1000×1250, transparent). Export `drew-point-600.avif/.webp` (≤60KB) via `<picture>`, `width=600 height=750`, `alt="" aria-hidden="true"`, rendered at ~300px tall desktop, 120px crop on mobile (`object-position: top`). He points **at the card** (mirror with `transform:scaleX(-1)` only if needed for direction — verify watch/bracelet side still reads correctly; prefer placing him left of the card so no mirroring).
- Fallback: `brand-research/assets/Frame-39630-1.png` (peek pose) over the card top edge.
- No video, no landscape, no GIF in the hero.

### Motion (≤1.4s, once)
0–400ms card fades + rises 16px → 250ms H1 "keep" highlight draws → 500–900ms Drew slides in 24px from behind the card edge → idle bob ±4px / 4s (paused off-screen). Result state: rows unlock with 60ms stagger, the count ticks 0→N over 500ms. Reduced motion: all static.

### Analytics
`hero_view{lcp_ms}` · `estimator_q1_answer{entity}` · `estimator_q2_answer{revenue_band}` · `estimator_back` · `estimator_result_view{entity,revenue_band,strategy_count}` · `cta_click{cta_id:hero|hero_result, cta_type:primary, prefilled:bool}` · `cta_click{cta_id:hero_call, cta_type:secondary}`

---

## 5. Section 3: Proof strip

**Job:** answer "who is this?" in one glance, right under the fold line.
**Copy (4 items, icon + text, 15px 500 navy-500, 18px line icons navy-600):**
1. 🎓 Licensed CPAs & EAs file your return **[CONFIRM credential types]**
2. 👤 Founded by Andrew Cordle *(24px real headshot, `Image-Andrew-Cordle-1.jpg`, rights [CONFIRM])*
3. 📅 Strategy all year, not just April
4. 🔒 Encrypted. Never sold.
Optional 5th, only if approved (D12): ★ Andrew Cordle: 4.9 on Trustpilot (229 reviews) → links to the Trustpilot page.
**No press, client or "as seen on" logos.**
```
Desktop: one centered row, 32px gaps, 1px --line top/bottom, 72px tall
Mobile:  2×2 grid, 13px, icons 16px (no marquee)
```
Events: none beyond `scroll_depth`.

---

## 6. Section 4: The problem (#problem)

**Job:** name the enemy (tax prep that looks backward) and plant the real deadline.
- **Eyebrow:** THE PROBLEM
- **H2 (split):** Most CPAs work backwards. / *By the time they look, the year is over.*
- **Body:** Your CPA collects your paperwork, adds it up and files. That's tax prep. It's necessary, but it's a history lesson. The moves that actually lower your bill have to happen *during* the year: paying your kids for real work, renting your home to your business, opening the right retirement account. Miss the window, and those savings don't come back.
- **Pull line (24px 600, navy-900, left rule 3px green-500):** December 31 is the real tax deadline.

**Component: 12-month rail (HTML/CSS/SVG):**
```
DESKTOP
TRADITIONAL  Jan ─ Feb ─ Mar ─ [Apr ● File] ─ May ─ … ─ Dec      ✕ Planning window missed
             (navy-200 line, single node, --miss-600 ✕ + label)
HEYDREW      Jan●Plan ─ Feb● ─ Mar●Augusta days booked ─ Apr●File ─ … ─ Oct●Check-in ─ Dec●Moves locked ✓
             (dots fill green L→R as the section scrolls; each node has a focusable tooltip)
MOBILE: two vertical columns side by side (months ↓), labels shortened.
```
Tooltip examples (illustrative, no numbers): "Jan: Strategy plan built", "Mar: Augusta Rule days scheduled", "Jun: Mid-year check-in", "Oct: Last call for Q4 moves", "Dec: Moves in place before the deadline".

**Compact comparison (under the rail, 4 rows, table semantics):**
| | Traditional tax prep | HeyDrew |
|---|---|---|
| When it starts | After the year ends | January, or the day you join |
| What it does | Records what happened | Changes what happens |
| Who you talk to | A busy firm in March | Your Tax Valet, all year |
| Strategies | Whatever you remember to ask about | Every one you legitimately qualify for, with the math shown |
Traditional column text navy-500 with ✕ in `--miss-600`; HeyDrew column navy-900 with green-700 ✓.
**Under table (small):** We don't just second-guess your return. We give you a strategy worth filing, and our licensed pros can file it for you. **[CONFIRM existing-CPA policy; if HeyDrew works alongside outside CPAs, append "Or hand it to your CPA."]**

No Drew (Sad Drew retired). No CTA. Motion: rail fill via `animation-timeline: view()` with IO fallback.
Events: `rail_tooltip_open{month}`.

---

## 7. Section 5: How it works (#how)

**Job:** make step 2 (a call) feel safe and known before the visitor starts step 1.
- **Eyebrow:** HOW IT WORKS
- **H2:** Three steps. One year that finally works for you.
- **Cards:**
  1. **Take the assessment.** Answer a few questions about your business and family in TaxLand. You'll see the strategies that likely fit, before you talk to anyone. *Free · no credit card*
  2. **Talk to your Tax Valet. Get your price.** A short call **[CONFIRM length]** with your dedicated point of contact. We cover fit and your exact annual price. No obligation, no pressure.
  3. **Put it in place, then file.** We help you set up each strategy during the year, with check-ins and the documentation to back it up. When April comes, filing is the easy part.
- **CTA:** [See what you can keep →] · microcopy: *Step 1 is free.*
- **Link:** See the full process → `/how-it-works`

```
DESKTOP: 3 cards, 4 cols each, connected by a 1px dashed navy-200 line with 01/02/03 badges.
Each card top = a mini UI vignette (HTML, 160px tall, navy-50 tile):
  01 → a TaxLand question chip row ("How many kids work in the business?" with 3 chips)
  02 → an unnamed chat bubble: [avatar placeholder circle] "Your Tax Valet · Hi! Here's your checklist for Thursday's call." + "Replies within a couple of hours" micro label
  03 → a checklist: ✓ Augusta Rule documented · ✓ Kids' payroll set up · ◌ Return filed (April)
MOBILE: horizontal scroll-snap cards, 85% width, next card peeks, dots indicator (no autoplay).
```
No Drew (vignettes are the visuals). Events: `cta_click{cta_id:hiw}`, `hiw_card_view{step}`.

---

## 8. Section 6: The 8 strategies (#strategies) — Drew moment 2

**Job:** prove expertise with named, legal, code-backed moves and create "that's me" recognition.
- **Eyebrow:** THE STRATEGIES
- **H2 (split):** None of this is a loophole. / *It's all in the tax code.*
- **Lead:** Most business owners never hear about these. Here are eight we use all the time. Your plan may include more.

**Tiles (eyebrow = code cite [CONFIRM all cites], h3, one line, "Good fit if…"):**
| Tile | Cite | Line | Good fit if… |
|---|---|---|---|
| **Hire Your Kids** (2×1) | IRC §73 / §3121(b)(3)(A) | Pay your kids real wages for real work. The business deducts it, and up to the standard deduction ($16,100 for 2026 **[CONFIRM]**) they may owe no income tax on it. | Your kids can do real work in the business. |
| **Augusta Rule** | IRC §280A(g) | Rent your home to your business for up to 14 days a year for real business use. The business deducts it; the rent can be tax-free to you. | You hold meetings or events at home. |
| **Solo 401(k)** | IRC §415 | Put away far more than an IRA allows, pre-tax or Roth. **[CONFIRM: add 2026 limit only after CPA check]** | You're self-employed with no full-time staff besides a spouse. |
| **Accountable Plan** (2×1) | IRC §62(c) | Your business reimburses real business costs like home office, phone and mileage. It deducts them, and you don't pay income tax on them. | You run an S-Corp or C-Corp. |
| **Health Savings Account** | IRC §223 | Deductible going in, tax-free growth, tax-free out for medical costs. | You're on a qualifying high-deductible plan. |
| **Health Reimbursement Arrangement** | IRC §105 / §9831 **[CONFIRM HRA type]** | Your business pays medical costs with pre-tax dollars instead of you paying with after-tax dollars. | You can meet HRA eligibility rules. |
| **Traditional & Roth IRA** | IRC §408 / §408A | Pick the right account in the right year; the lifetime difference can be big. | Almost everyone. |
| **529 Education Plan** | IRC §529 | Tax-free growth and tax-free qualified withdrawals, plus a state deduction in many states. | You're saving for school. |
*(These fix the live site's duplicated HSA and HRA copy.)*

- **Drew tile (1 col × 2 rows):** `site/img/drew-desk.webp` (1600×1062, has its own warm office background) as a full-bleed tile image, `object-fit:cover`, r20. Overlay caption card bottom-left (white, r12): **"Your plan, reviewed line by line."** Drew caption in a bubble: *"Let's see which ones fit."* Fallback: `brand-research/assets/Group-39597-1.png` (treasure chest) on navy-50.
- **CTA tile (full-width row, navy-900 bg, r20, padding 32, flex space-between):** "Which of these fit you?" (white h3) + "Takes a few minutes. No credit card." (navy-300) + [See what you can keep →] (44px).
- **Footnote under grid (12px):** Eligibility rules apply to every strategy. We only recommend the ones you actually qualify for. Limits change yearly.
- **Link:** See all strategies → `/our-strategies`

```
DESKTOP bento (1320 wide, 4 cols, 24 gap)
┌───────────────────────────┬─────────────┬─────────────┐
│ Hire Your Kids (2×1)      │ Augusta     │ DREW DESK   │
├─────────────┬─────────────┴─────────────┤ (1 col ×    │
│ Solo 401(k) │ Accountable Plan (2×1)    │  2 rows)    │
├─────────────┼─────────────┬─────────────┼─────────────┤
│ HSA         │ HRA         │ Trad/Roth   │ 529         │
│             │             │ IRA         │             │
├─────────────┴─────────────┴─────────────┴─────────────┤
│ CTA tile, full width, navy-900: "Which of these fit you?"  [See what you can keep →] │
└───────────────────────────────────────────────────────┘
grid-template-areas:
  "kids kids aug drew" "solo acc acc drew" "hsa hra ira s529" "cta cta cta cta";
Tile: white, 1px line, r20, padding 24; strategy 3D icon art (from current game cards, icon-only crop, 56px) top-right.
Click/tap expands tile in place (grid-row span) to show "Good fit if…" + "What you'll need"; aria-expanded.
MOBILE: 2-col grid of 1:1 tiles (title + cite only, tap to expand into a bottom sheet); Drew tile + CTA tile each span 2 cols.
```
Events: `strategy_card_open{strategy}`, `cta_click{cta_id:bento}`.

---

## 9. Section 7: Illustrative example (#example)

**Job:** keep the brand's cash-register moment, but make the number credible and honest.
- **Eyebrow:** AN ILLUSTRATIVE EXAMPLE
- **H2:** Here's what planning ahead can look like.
- **Persona card (left):** "**Meet a hypothetical owner.** Married, S-Corp, two kids who help in the business, works from a home office, about $400K in revenue." **[CONFIRM: the scenario inputs behind $135K, signed off by a HeyDrew CPA]**
- **Counter (right):** label "Potential deductions in this example†" → **$135,000** (`--fs-stat`, ink-950, tabular-nums; counts from $0 once at 50% visibility, 1.2s ease-out; final value present in DOM, `aria-live="off"`)
- **Line items under counter** (each row: name · cite · illustrative amount in green-700 · all [CONFIRM]):
  - Hire Your Kids · 2 kids' wages · $X **[CONFIRM]**
  - Augusta Rule · 14 days of rent · $X **[CONFIRM]**
  - Solo 401(k) · contributions · $X **[CONFIRM]**
  - Accountable Plan · home office, phone, mileage · $X **[CONFIRM]**
  - Other strategies · $X **[CONFIRM]** — rows must sum to $135,000.
- **Disclaimer (directly under, 13px navy-500, visible, not collapsed):** † Illustrative, hypothetical example. Deductions reduce taxable income; they are not dollar-for-dollar tax savings. Your results depend on your income, entity, state and eligibility, and are not guaranteed.
- **Honesty pull-quote (below, 24px 500 navy-900, with an open-quote mark in green-500):** "Can you guarantee I'll save money? No, and be skeptical of anyone who says otherwise. What we guarantee is that we'll look at every strategy you legitimately qualify for and show you the math." — *from our FAQ*
- **CTA:** [See what you can keep →] · microcopy: *Run your own numbers in TaxLand.*

```
DESKTOP: 5/7 split. Left persona card (white, r20). Right: stat + ledger rows (hairlines) + dagger note.
Pull-quote full-width below, max 760. CTA left-aligned under quote.
MOBILE: persona → stat → ledger → disclaimer → quote → CTA (stacked).
```
No Drew (next to a number = rule violation). **Removed:** "$50K Annual Savings", "18+ Strategies", "100% Success Rate".
Events: `example_counter_complete`, `cta_click{cta_id:example}`.

---

## 10. Section 8: TaxLand portal — Drew moment 3

**Job:** the one immersive, joyful moment. Show that the assessment is a game you'll want to finish, then ask with the biggest button on the page.
- **Eyebrow (on dark):** THE ASSESSMENT
- **H2 (white):** Your taxes, as a game / *you actually want to finish.* (2nd line `navy-300` 400)
- **Bullets (white 17px, green-400 checks):** ✓ Answer quick questions about your business and family · ✓ Unlock strategy cards as you go · ✓ See your map of likely strategies, before anyone calls you
- **CTA (52px):** [See what you can keep →] · microcopy (navy-300): *Free · Takes a few minutes · No credit card*
- **Tiny label next to Drew's phone (12px, navy-300):** Illustrative screen

```
DESKTOP inset stage (r28, 1320 wide, min-height 560)
╭──────────────────────────────────────────────────────────────────────────────╮
│ [taxland-backdrop.webp, cover, filter: saturate(.85)]                        │
│ [overlay: linear-gradient(90deg, rgba(11,16,51,0) 0%, rgba(11,16,51,.35) 45%,│
│           rgba(11,16,51,.88) 62%, #0B1033 100%)]                             │
│                                                                              │
│   [DREW holding phone,            │  THE ASSESSMENT                          │
│    drew-hero.webp, ~440px tall,   │  Your taxes, as a game                   │
│    standing in the grass]         │  you actually want to finish.            │
│                                   │  ✓ … ✓ … ✓ …                             │
│ [taxland-foreground.webp grass layer along the bottom, in front of Drew's    │
│  feet/waist, parallax 1.0× vs backdrop 0.6×]                                 │
│                                   │  [See what you can keep →]               │
╰──────────────────────────────────────────────────────────────────────────────╯
MOBILE: stage r16; backdrop top 280px with Drew (220px) + foreground; below it a solid ink-950 panel with copy + full-width CTA.
```
- **Imagery:** `site/img/taxland-backdrop.webp` (2400×1028, RGB) → export 1600w + 800w AVIF/WebP, ≤180KB, lazy. `taxland-foreground.webp` (RGBA) → ≤90KB. `drew-hero.webp` (1100×1375, RGBA) → 880w ≤90KB. His phone shows "$5,230": acceptable only with the "Illustrative screen" label; **preferred: retouch the phone screen to the TaxLand logo/"See what you can keep" start screen (graphic designer task)**. Fallback Drew: `brand-research/assets/AC-WITH-MAP-1-1.png` (map pose).
- The sticky mobile bar hides while this section is in view (its own CTA is visible).
- Motion: parallax only here (backdrop 0.6×, foreground 1.0×, Drew 0.9×), disabled under reduced motion.
- Events: `portal_view`, `cta_click{cta_id:portal}`.

---

## 11. Section 9: Testimonials (#clients)

**Job:** peer proof, verbatim. **Only these six quotes. Never edit, merge or invent.** [CONFIRM: all six are HeyDrew tax clients who consented; rename headshot files to match names — the live site shows `Image-Robert-Angela-T.png` for Kesh K.]
- **Eyebrow:** CLIENTS
- **H2:** From owners who got a plan.
- **Featured (large, 24/34):**
  > "I feel empowered, because I know I have a team that's got my back and is making sure I'm protected. If you're a business owner and you're carrying that anxiety of not knowing what you don't know, this is the team you want."
  > **Jess B.**, Business Owner, Denver CO
- **Second (large):**
  > "I've already saved more in taxes than my initial investment—and that alone felt like a breakthrough."
  > **Vicky G.**, Business Owner, Phoenix AZ
- **Compact cards (18/28):**
  > "They've given us clarity, strategy, and speed." — **Rob R.**, Business Owner, Lewiston ME
  > "What hooked me was how he simplified something complex so anyone can understand it." — **Kesh K.**, Business Owner, Scottsdale AZ
  > "We learned the process to take our company to the next level." — **Will H.**, Business Owner, Nashville TN
  > "I left inspired, challenged, and equipped with strategies I can immediately apply." — **Allen D.**, Business Owner, Los Angeles CA
- **Note (12px):** Testimonials reflect individual experiences and are not a guarantee of future results.
- Business type / entity per person: add only if confirmed **[CONFIRM]**. No stars (no verified source per person).

```
DESKTOP: row 1 = Jess (7 cols) + Vicky (5 cols); row 2 = 4 compact cards (3 cols each). White cards, 56px real headshots.
MOBILE: Jess, Vicky, Rob stacked; "Show all 6" button reveals Kesh, Will, Allen.
```
No Drew. Events: `testimonial_expand`.

---

## 12. Section 10: Who's behind it (#team) — dark authority band

**Job:** make "AI-driven, human-perfected" concrete: a real founder, real licensed people, and a clear split of who does what.
- **Eyebrow (navy-300):** AI-DRIVEN. HUMAN-PERFECTED.
- **H2 (white):** Software does the finding. / *People you can reach do the rest.*
- **Founder block:** real photo of Andrew (`brand-research/assets/Image-Andrew-Cordle-1.jpg`, rights **[CONFIRM]**, r20, 4:5, grayscale 0 — true color) + first-person note **[CONFIRM: Andrew approves wording]**:
  > I lost everything in 2008. Rebuilding taught me something nobody tells you when you start a business: making money is the first game. Keeping it is the second one, and most owners never get coached on it. For years I've built tax plans for families with serious wealth. The strategies aren't secret. They're in the tax code. Most owners just never get shown them, because their CPA is busy looking at last year. HeyDrew brings that playbook to every business owner ready to use it. Create. Keep. Multiply. We're the Keep.
  > **Andrew Cordle**, Founder *(signature SVG if supplied)*
- **Two-column split (cards on ink with 1px rgba(255,255,255,.12) borders):**
  - **What our AI does:** Screens your situation for strategies you likely qualify for. Flags deadlines before they pass. Keeps your documents organized in one secure portal.
  - **What your team does:** Your Tax Valet is your single point of contact; message them in the portal and hear back within a couple of hours, usually sooner. Licensed tax professionals **[CONFIRM: CPA/EA]** review your plan and file your return. Bookkeeping and payroll specialists are there if you need them.
- **Team strip:** 3–5 headshot cards with name + credential **[CONFIRM: real names, credentials, permission]**. If not supplied at launch, omit the strip entirely (do not use stock or placeholders on the live site).
- **Video (optional):** existing Vimeo welcome video as a click-to-play facade (poster from `Thumbnail-2-1-scaled.png` → AVIF ≤60KB); iframe only on click.
- **Secondary CTA:** [Book a strategy call] (ghost on dark) · microcopy: *Talk fit and pricing. No obligation.*

```
DESKTOP: 5/7 split — photo left, eyebrow/H2/note right; below, AI | Team two cards; team strip; ghost CTA.
MOBILE: photo (4:5, 100%) → note → cards stacked → CTA.
```
No Drew. Events: `video_play`, `video_progress_{25|50|75|100}`, `cta_click{cta_id:team_call, cta_type:secondary}`.

---

## 13. Section 11: How pricing works + security (#pricing)

**Job:** remove the cost, commitment, data and guarantee objections without publishing a price.
- **Eyebrow:** PRICING & TRUST
- **H2:** Clear terms. No surprises.
- **Four term cards (icon, h3, one line; all from the live FAQ):**
  1. **You'll know the full price first.** One annual fee based on your entities and complexity, quoted on your call before you commit.
  2. **Never auto-renews.** We reach out about 30 days before your anniversary with your options.
  3. **Fall behind? We don't cancel on you.** We roll your engagement into the following year.
  4. **Bookkeeping and payroll are optional.** Tax strategy stands on its own. Add them whenever it makes sense, mid-year is fine.
- **Security row (3 items, 15px, lock/eye/shield icons):** Encrypted in transit and at rest · Only the people working your account can see your file · We never sell your data or share it with advertisers. *(Add SOC 2 or similar only if true [CONFIRM].)*
- **CTA pair:** [See what you can keep →] + [Book a strategy call] (ghost) · microcopy: *Questions about price? That's what the call is for.*

```
DESKTOP: 4 cards in a row (3 cols each) on navy-50; security row as a white strip card below; CTA pair centered.
MOBILE: 2×2 cards → security list → stacked full-width buttons.
```
No Drew. Events: `cta_click{cta_id:pricing|pricing_call}`.

---

## 14. Section 12: FAQ (#faq)

**Job:** answer the last blockers; `faq_open` tells us which objections are live.
- **Left column (sticky, 4 cols):** H2 "Straight answers." + "Still unsure? **Book a strategy call →**" + "See all FAQs →" (`/faq`)
- **Right column (8 cols):** `<details>`/`<summary>`-style accordion, 72px min rows, `+` rotates 45°, answer 17/27 max 64ch, `grid-template-rows:0fr→1fr` transition. Output `FAQPage` JSON-LD with these exact Q&As. Remove the hidden "Don't Delete" headings from the live template.

1. **Can you guarantee I'll save money?** No, and be skeptical of anyone who says otherwise. What we guarantee is that we'll look at every strategy you legitimately qualify for and show you the math.
2. **How much does it cost?** It depends on your entities and complexity, so we quote it on your strategy call. You'll know the full number before you commit. It's billed annually, paid upfront, and never auto-renews.
3. **What happens after the assessment? Is it a sales call?** You'll see which strategies may fit. If you want to go further, you book a call with a Tax Valet to talk fit and pricing. No obligation.
4. **Will these strategies raise my audit risk?** We only recommend strategies you actually qualify for, and we help you build the documentation to back them up. Defensibility is the whole point.
5. **Who is HeyDrew for?** S-Corps, LLCs, partnerships and self-employed owners with real complexity: multiple income streams, property, equipment or a growing team. If you're a W-2 employee with no business, we're probably not the right fit. **[CONFIRM minimum fit criteria]**
6. **I already have a CPA. Do I have to switch?** **[CONFIRM policy]** Draft if HeyDrew files: "Most CPAs file what already happened. We plan what happens next, and our licensed pros file it for you." Draft if HeyDrew works alongside: "No. We can build and run your strategy and hand the plan to your CPA, or file for you. Your call."
7. **Do you file my return too?** Yes. Licensed professionals handle everything that needs a license, including filing.
8. **Is my information secure?** Yes. Your data is encrypted in transit and at rest, and only the people working your account can see it. We never sell your data or share it with advertisers.

No Drew. Mobile: left column becomes the heading block above the accordion. Events: `faq_open{question_id:q1..q8}`, `cta_click{cta_id:faq_call, cta_type:secondary}`.

---

## 15. Section 13: Final CTA — Drew moment 4 · Sticky mobile CTA

### Final CTA
- **H2:** The year's still **open**. Let's use it. *(mint highlight on "open", the page's second and last highlight)*
- **Sub:** See which strategies fit your business before December 31 decides for you.
- **CTA pair:** [See what you can keep →] (52px) + [Book a strategy call] (ghost)
- **Microcopy:** Free · Takes a few minutes · No credit card
- **Drew caption (bubble, ≤8 words):** "Your move."
- **Image:** `site/img/drew-celebrate.webp` (900×900, RGBA; thumbs up + gold coin, no numbers) → 560w ≤50KB, ~260px tall desktop, left of the copy, on `--drew-contact` shadow. One-time wave/hop (translateY −8px, 400ms) on first view, then static. Fallback: `brand-research/assets/accountable-1.png` crop.
```
DESKTOP inset stage (navy-50 + radial green glow 12% center-left, r28, padding 96)
╭──────────────────────────────────────────────────────────────╮
│   [DREW celebrate]   The year's still open. Let's use it.     │
│   ("Your move.")     See which strategies fit your business…  │
│                      [See what you can keep →] [Book a call]  │
│                      Free · Takes a few minutes · No card     │
╰──────────────────────────────────────────────────────────────╯
MOBILE: Drew 160px centered above H2; buttons stacked full width.
```
Events: `cta_click{cta_id:final|final_call}`.

### Sticky mobile CTA (<768px only)
- Fixed bottom, margin 12px, r16, `rgba(11,16,51,.96)` + `backdrop-filter: blur(12px)`, 64px tall + `env(safe-area-inset-bottom)`.
- Left: 32px micro-Drew avatar + two lines: "See what you can keep" (15/600 white) / "Free · a few minutes" (12px navy-300). Right: 44×44 green button with ink arrow (whole bar is one link, `aria-label="See what you can keep, free assessment"`).
- **Resume state:** if `hd_est` has Q1 but not Q2: "Finish your plan · 1 question left" and tapping scrolls back to the hero card (focus moves to Q2). If both answered: "Continue in TaxLand" and links out with params.
- **Show** after the hero card leaves the viewport. **Hide** while the TaxLand portal, pricing CTA pair, final CTA or footer is in view, while any input has focus, and while the menu sheet is open. Slide 200ms.
- Never overlaps the cookie banner (if the banner is present, the bar waits until it's dismissed).
- Events: `sticky_cta_shown{scroll_depth}`, `sticky_cta_click{state:default|resume|continue}`.

---

## 16. Section 14: Footer + compliance disclaimer block

```
ink-950, padding 96/64
┌──────────────────────────────────────────────────────────────────────┐
│ [HEY DREW! reversed]  AI-Driven, Human-Perfected.                     │
│ Product: How it works · Strategies · Pricing · Start assessment · Sign in │
│ Company: About · Careers · Become an affiliate · FAQ · Contact        │
│ Legal: Terms of Service · Privacy · Cookies · Messaging Terms · Terms of Use │
│ Social: Instagram · YouTube (icons, 24px, aria-labels)                │
│ ─────────────────────────────────────────────────────────────────── │
│ DISCLAIMERS (open by default, 12/17, navy-300, max 760)               │
│ © 2026 Aspire Advisors LLC d/b/a HeyDrew!                             │
└──────────────────────────────────────────────────────────────────────┘
MOBILE: link columns become accordions; the disclaimer block stays expanded.
```
**Compliance disclaimer block (`id="disclaimers"`, rendered expanded; every †/* on the page links here) [CONFIRM legal review]:**
> All savings and deduction figures on this page are illustrative, based on hypothetical scenarios, and are not a guarantee of results. Deductions reduce taxable income; actual tax savings depend on your tax bracket, filing status, entity type, state and eligibility. Strategy matches shown by the homepage estimator are a preliminary screen based on limited answers and are not tax, legal or financial advice. Tax laws, limits and thresholds change every year. Every strategy must be properly implemented and documented under current IRS and state rules. Testimonials reflect individual experiences and do not guarantee future results. HeyDrew! is a d/b/a of Aspire Advisors LLC. **[CONFIRM: add licensing/regulatory statement for the CPA/EA practice as required]**

Events: `footer_link_click{target}`.

---

## 17. Imagery map (all placements)

| Placement | File | Source | Treatment | Budget |
|---|---|---|---|---|
| Hero (Drew 1) | `site/img/drew-point.webp` | new (RGBA) | AVIF/WebP 600w + 300w, pointing at card | ≤60KB |
| Estimator + sticky avatar | head crop of `site/img/drew-advisor.webp` | new (RGBA) | 64×64 squircle, WebP | ≤6KB |
| Strategy bento (Drew 2) | `site/img/drew-desk.webp` | new (RGB, own bg) | cover crop in r20 tile, 800w | ≤70KB |
| Strategy icons | icon-only crops of current game cards (`HRA-2-1.png`, `augusta-1.png`, etc.) | existing | 112px @2x, no vines/sand | ≤8KB each |
| TaxLand portal (Drew 3) | `drew-hero.webp` + `taxland-backdrop.webp` + `taxland-foreground.webp` | new | layered parallax; phone screen retouch preferred | ≤360KB total, lazy |
| Founder | `brand-research/assets/Image-Andrew-Cordle-1.jpg` | existing, rights [CONFIRM] | 4:5 AVIF 720w | ≤70KB |
| Testimonials | current-site headshots (rename to match names) | existing | 112px circles | ≤8KB each |
| Final CTA (Drew 4) | `site/img/drew-celebrate.webp` | new (RGBA) | 560w | ≤50KB |
| Video poster | `Thumbnail-2-1-scaled.png` | existing | AVIF 1200w, facade | ≤60KB |
All `<img>` get explicit `width`/`height`; everything below the hero is `loading="lazy" decoding="async"`. Drew images `alt=""` + `aria-hidden="true"`. **Never ship** GIFs, `AC-HANDS-DOWN-1.svg` (5MB embedded raster), or the Vimeo iframe on load. Unused: `site/img/drew-hero.webp` in hero (test only, T6).

---

## 18. Analytics (GA4 + product analytics; cross-domain with taxland.heydrew.com)

Global params on every event: `page_variant`, `device`, `utm_*`, `ga_client_id`, `session_id`.
| Event | Where |
|---|---|
| `hero_view{lcp_ms}` | §4 |
| `estimator_q1_answer{entity}` · `estimator_q2_answer{revenue_band}` · `estimator_back` · `estimator_result_view{strategy_count}` | §4 |
| `cta_click{cta_id, cta_type, label, prefilled}` — `cta_id ∈ deadline, nav, hero, hero_result, hero_call, hiw, bento, example, portal, team_call, pricing, pricing_call, faq_call, final, final_call` | all |
| `sticky_cta_shown{scroll_depth}` · `sticky_cta_click{state}` | §15 |
| `deadline_bar_view` · `deadline_bar_dismiss` | §3 |
| `nav_click{target}` · `signin_click` · `footer_link_click{target}` | §3, §16 |
| `rail_tooltip_open{month}` · `hiw_card_view{step}` · `strategy_card_open{strategy}` · `example_counter_complete` · `portal_view` · `testimonial_expand` · `faq_open{question_id}` · `video_play` · `video_progress_{n}` | sections |
| `scroll_depth{25,50,75,90}` | page |
| TaxLand: `taxland_landing{prefilled,entity,revenue_band,src,pos}` · `taxland_step_n{step,question_id}` · `taxland_lead_submit{strategy_count}` · `cookie_banner_interaction` | TaxLand |
| `call_booked{source}` | booking tool |
| CRM import (offline): `call_held` · `closed_won` · `plan_value` | CRM |
**North star:** qualified `taxland_lead_submit` per homepage session. **Guardrails:** call-held rate, close rate, plan value.

---

## 19. Accessibility + performance acceptance criteria
- Viewport `width=device-width, initial-scale=1` (remove `maximum-scale=1, user-scalable=0` and duplicate tags). Zoom to 200% without loss.
- All text ≥4.5:1 (≥3:1 at ≥24px); CTA label 8.66:1. Focus rings visible on every control; tab order = visual order; one `h1`; `h2` per section.
- Estimator fully keyboard- and screen-reader-operable (radiogroups, live region `aria-live="polite"` announces "Up to 8 of 8 strategies may fit").
- Touch targets ≥44×44 (chips ≥48).
- `prefers-reduced-motion` and `prefers-contrast: more` honored.
- **Budgets:** LCP ≤2.0s mobile 4G (LCP element = H1 text), CLS ≤0.05, INP ≤150ms, JS ≤60KB gz, initial ≤900KB, full scroll ≤1.2MB, above-the-fold ≤250KB, one DM Sans variable woff2 (~45KB) preloaded, critical CSS inlined, network-idle reached, no third-party scripts before interaction except analytics.

---

## 20. Launch blockers ([CONFIRM] roll-up)
1. CPA sign-off: estimator rule table, $135K scenario inputs + line items, IRC cites, 2026 figures ($16,100 standard deduction, any Solo 401(k)/HSA limits).
2. Legal: Dec 31 bar wording, all footnotes/disclaimer block, Drew captions, removal of "100% Success Rate" (and $50K / 18+).
3. Credentials wording ("licensed CPAs & EAs"), team names/photos, regulatory statement.
4. Testimonials: all six are tax clients with consent; headshot filenames fixed.
5. Andrew: founder note approval, photo rights, Trustpilot attribution (D12).
6. Policies: existing-CPA answer (FAQ 6), minimum fit, strategy-call length.
7. TaxLand: revenue bands (estimator must match), booking URL, portal URL for "Sign in".
8. True vector logo.
