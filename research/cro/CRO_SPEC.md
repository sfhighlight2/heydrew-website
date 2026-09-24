# HeyDrew homepage: CRO requirements spec

**Role:** CRO lead · **Date:** 2026-09-24 · **Primary conversion:** start the TaxLand assessment · **Secondary:** book a strategy call
**Evidence folder:** `homepage-redesign/research/cro/` (current-site crops, `refs/` reference screenshots + `refs.json` perf/CTA inventory, `web/` search results)

> Compliance rule for everyone using this spec: every savings figure is **illustrative** and sits next to its disclaimer, not in a collapsed footer. Nothing below promises a result. Anything marked **[PLACEHOLDER - confirm]** is not verified and must be confirmed by HeyDrew before launch.

---

## 1. Why the current homepage under-converts

Evidence: `brand-research/screens/slices/home-0..3.jpg`, `cro/cur-mobile-fold.jpg`, `cro/cur-taxland-mobile.jpg`, `.firecrawl/home.md`, Playwright run in `refs/refs.json`.

### 1.1 Above the fold
| # | Problem | Evidence | Conversion cost |
|---|---|---|---|
| A1 | **The headline doesn't say who it's for or how it works.** "Keep Your Money, Stop Overpaying the IRS" could come from TurboTax, a debt-relief ad or a CPA. It never says *business owners*, *year-round*, or *CPA-backed*. | home-0 | Qualified S-Corp/LLC owners don't self-identify, and unqualified W-2 visitors start the quiz and then bounce. |
| A2 | **The CTA doesn't say what happens.** "Take The Assessment" gives no time, cost, what you get back, or whether it's a sales form. On desktop it's the smallest button on the screen (~196×32px) and sits below a 5-line sub. | home-0 | High-intent but skeptical visitors (the ICP) hesitate at the unknown. |
| A3 | **A 2:52 Vimeo video card fights the CTA for attention.** The biggest object on the fold is a play button, not the conversion. It also gets most of the page weight. | home-0, home.md | Clicks go to a passive 3-minute watch. |
| A4 | **No proof above the fold.** No rating, no client count, no credential, no face. The only trust device (testimonials) is 3 scrolls down on desktop and about 6 screens down on mobile. | home-0, cur-mobile-fold | Money plus a new brand plus a cartoon means trust has to come first. |
| A5 | **The storybook meadow sets a low price anchor.** A full-bleed Pixar valley reads as a consumer app or kids' game to a business owner about to hand over entity details and pay an annual fee upfront. | home-0 | Lowers perceived expertise and willingness to pay. The locked direction fixes this: fintech credibility, Drew as the guide. |

### 1.2 CTA clarity and competition
- **The header spends the money-green color on existing clients.** `Sign In` (green, goes to portal) looks like the primary action. `Get Started` (navy) is secondary and goes to `taxland.heydrew.com/login`, while every body CTA goes to `taxland.heydrew.com/`. So the page has two destinations for one action, and the header one starts with a **login wall** (audit #10).
- **"Unlock Your Savings Now!"** is bold text styled like a button, sitting right above the real button (home-1). That's a dead click and visual noise.
- All 4 body CTAs repeat the same words with no progression, and there's **no path for visitors who aren't ready** (no "book a call", no strategy preview, no "how pricing works").
- **The mobile header has no CTA at all**, just a hamburger (cur-mobile-fold), and **there's no sticky CTA** on a page about 5,900 CSS px tall.

### 1.3 Proof
- **The $135K counter is a hypothetical, presented like a result.** "HeyDrew 2026 Potential Tax Deductions $135,000" plus "$50K Annual Savings · 18+ Strategies · **100% Success Rate**" carry no asterisk. The disclaimer that explains them is hidden in a collapsed "Disclaimers & Legal" drawer in the footer. Sophisticated owners read "100% success rate" as a red flag, and the FAQ itself says "be skeptical of anyone who says otherwise". **The page contradicts its own best trust line.** The screenshot also caught the counter mid-tick at $133,800, which is the $133K/$135K inconsistency from audit #13.
- **The testimonials are vague and read like event testimonials.** "We learned the process to take our company to the next level" and "I left inspired, challenged, and equipped…" sound like Aspire Tour attendees, not tax clients. Only Vicky G. mentions money. None names a business type, entity or outcome. A carousel hides 3 of the 6. The image filenames don't match the names (`Image-Robert-Angela-T.png` is shown for Kesh K.), which is a risk if anyone inspects them. **[PLACEHOLDER - confirm]** that all 6 are HeyDrew tax clients who consented.
- **Zero credentials on the homepage.** "Human-Perfected" is claimed but never shown: no CPA/EA names, no licenses, no Andrew photo, no years, no team.

### 1.4 Objection handling and friction
- **The page never answers the questions that stop owners:** What does it cost? Do I replace my CPA? Is this legal / will I get audited? Is it for my size of business? What happens after the quiz, a sales call? Is my data safe? The answers already exist in `/faq` and are strong ("never auto-renews", "you'll know the full number before you commit", "we don't cancel on you, we roll into next year"), but none of them is on the homepage.
- **"How it works" isn't on the homepage**, so the visitor can't picture step 2 (a call) before committing to step 1.
- **The TaxLand handoff is cold.** Question 1 is "What is the top-line revenue of your single largest business?" This is the most sensitive question, asked first, with no context. On mobile, a CookieYes banner then **covers the bottom half of question 1** (cur-taxland-mobile). That's a double friction spike at the exact moment of commitment.

### 1.5 Speed and mobile
- **About 7.4 MB transferred** in the first 3.5 s on desktop and 7.35 MB on mobile (Playwright, `refs.json`). The weight comes from the Vimeo embed, `drew-landing-map.gif`, `landing-savings.gif` and webm loops, and the page never reaches network-idle (audit #9). Pilot ships 0.25–0.37 MB and Lemonade 0.53 MB.
- **On mobile, the fold is spent on text**: 4 lines of H1, 5 lines of sub, one CTA, and a video card cut off at the bottom. No proof, no interaction, no Drew face.
- **`user-scalable=0, maximum-scale=1`** blocks zoom (WCAG 1.4.4) and duplicate viewport tags exist (audit #8).
- The stat cards and testimonials are a 3-up desktop layout that stacks into a very long mobile scroll with no CTA in between.

**Diagnosis in one line:** The page asks for a commitment (a sensitive financial quiz) before it has earned trust (proof, credentials, honesty) or set expectations (time, cost, what happens next), and it slows everything down with 7 MB of storybook media.

---

## 2. What high-converting references do (research)

Screenshots are in `cro/refs/` (desktop + mobile fold + desktop full page): Collective, Keeper, Pilot, Found, Mercury, Lemonade, Ramp (desktop was bot-blocked, mobile OK), plus HeyDrew for comparison.

| Reference | Pattern worth stealing | HeyDrew translation |
|---|---|---|
| **Collective** (`collective-desk.jpg`, `collective-savings-calc.jpg`) | Rating strip **above** the H1 ("G2 ★4.5 · Trusted by 12K solopreneurs"). A specific money promise in the sub ("Members save an average of $10,000*" with an asterisk). **A secondary CTA "How much can I save?"** opens a short estimator modal (service, entity chips, revenue band, expenses) *before* signup. | Same two-CTA pattern, but our estimator lives **inline in the hero** and hands off to TaxLand. The rating strip goes above the H1 only with a verified source. |
| **Keeper** (`keeper-desk.jpg`) | "IRS authorized e-File Provider" badge above the H1. A **named CPA headshot chip** ("Scott, CPA · 15 years") floating on the product visual. Scenario chips (S-Corp, K-1s, Rental Property) that let visitors self-identify. Section flow: complexity → tech+humans → year-round → coverage → pricing → **strategies** → FAQ. | A real CPA/EA chip on the hero visual. Entity chips *are* the estimator's first question. The same flow order works for us. |
| **Pilot** (`pilot-desk.jpg`) | Rating ("4.7 · 142 reviews") above the H1. The product UI is the hero visual, not illustration. One repeated CTA. A "Not ready to talk? Get free insights" section for low-intent visitors. Very light page (0.25 MB). | The hero visual should be a **HeyDrew strategy-plan UI card** (strategy list plus an illustrative total), with Drew as the guide next to it, not a landscape. |
| **Found** (`found-desk.jpg`) | Check-mark value bullets with **inline superscript disclaimers** tied to footnotes. Award laurels under the CTA. A **Security** section near the FAQ. Closing "Sign up in as little as 5 minutes". | Superscript disclaimers next to every number. A security block. A time promise on the CTA. |
| **Mercury** (`mercury-desk.jpg`) | The CTA is an **inline input** (email + button), so the first keystroke *is* the commitment. The regulatory disclaimer sits visibly on the hero ("not an FDIC-insured bank…"). Premium through restraint: one headline, one line of sub. | The first chip tap is the commitment. Put a short "Illustrative. Not a guarantee." line on the hero, not hidden. |
| **Lemonade** (`lemonade-mob.jpg`) | Mobile fold = 2-line H1 + 2-line sub + **one huge CTA with an outcome verb** ("Check our prices"). The quiz is conversational, one question per screen, with a mascot/bot voice. | Button copy with an outcome verb: "See what I can keep". Drew speaks in TaxLand the way Maya does in Lemonade. |
| **Noom-style quiz funnels** (pattern knowledge) | Easy, identity-affirming first question. A progress bar that starts partly filled. Micro-feedback between questions ("Nice, S-Corps usually qualify for…"). Email asked *after* value is shown. | Start with entity type, not revenue. Show "2 of 7 done" on arrival in TaxLand. Drew reacts between steps. Ask for contact info at the results reveal. |

**Supporting data (vendor-reported, directional; see `web/` for sources):**
- Unbounce, 41K pages: the median landing page converts at **6.6%**. Interact reports quizzes average **40.1% start-to-lead and 65% start-to-finish**. These measure different events, so don't compare them directly (digitalapplied.com 2026 benchmark guide).
- Multi-step forms with an easy first step beat single long forms, the foot-in-the-door effect. Venture Harbour reported up to 300% more conversions (ventureharbour.com, zuko.io).
- Sticky CTA: Conversion Rate Experts found a **minimum +8% and up to +25%** lift on long pages, even with the same CTA words (conversion-rate-experts.com). Other e-commerce tests found smaller but significant mobile lifts.
- In accounting/CPA trust research the pattern holds: trust comes from specificity and evidence (named credentials, concrete outcomes), not claims (buildyourfirm.com, apexure CPA examples).

---

## 3. Recommended section order, with the conversion job of each section

A short page with high information density. Target is about 9 screens on mobile, down from about 15. The primary CTA appears 6 times (header, hero, after How it works, after Strategies, after Example, final band) plus the mobile sticky bar, **always with the same words**.

| # | Section | Conversion job | Must contain |
|---|---|---|---|
| 0 | **Deadline bar** (dismissible, thin, navy) | Create *true* urgency | "**[n] days left to make 2026 tax moves.** Most strategies must be in place by Dec 31 → See yours". The count is computed live and is real. Legal must confirm the Dec 31 wording per strategy. **[PLACEHOLDER - confirm wording]** |
| 1 | **Header** (sticky, white, 64px) | Put one clear next step on every screen | Logo · How it works · Strategies · Pricing (anchors to #pricing) · FAQ · text link "Log in" · **green "Start free assessment"**. Remove Careers and Affiliate from the primary nav (move them to the footer). **Existing clients never get the green button.** |
| 2 | **Hero with the inline estimator** | Qualify, then start the commitment with a 1-tap first step | Proof strip above the H1, H1, sub, estimator card (§5), microcopy, one small inline disclaimer, Drew peeking over the estimator card as the guide. See §4. |
| 3 | **Trust bar** | Answer "who are you?" in 3 seconds | 4 items, icons plus text: "Licensed CPAs & EAs implement and file **[PLACEHOLDER - confirm credential types/count]**" · "Founded by Andrew Cordle" (small headshot) · "Never auto-renews" · "Encrypted, never sold". Optional: Trustpilot ★ **[PLACEHOLDER - confirm the 4.9/229 reviews belong to HeyDrew and not Andrew/Aspire; otherwise omit]**. **No press logos unless verified.** |
| 4 | **The problem: "Most CPAs work backwards."** | Name the enemy, create the gap | Keep this copy, it's the best on the site. Visualize it with the existing 12-month Traditional (red) vs HeyDrew (green) timeline module: Jan–Dec icons, with a "savings window closes" marker in the Traditional row. |
| 5 | **How it works (4 steps)** | Remove fear of the unknown and make step 2 feel safe | 1. Take the 3-min assessment (free) → 2. 20-min call with your Tax Valet: fit + your exact price, **no obligation** → 3. Get your custom strategy plan + implementation support → 4. File with a licensed CPA. **[PLACEHOLDER - confirm call length]** CTA below. |
| 6 | **The 8 strategies** (card grid, each flips or expands) | Show proof of expertise and create "that's me" moments | Each card: name, one plain-English line, "Good fit if…", code citation (e.g. "IRC §280A(g)" for Augusta). **Fix the HSA/HRA duplicate copy first** (audit #2). CTA: "See which apply to you". |
| 7 | **Illustrative example** (replaces the naked $135K counter) | Make the big number credible through line items | "Meet a hypothetical client: married S-Corp owner, 2 kids, $X profit **[PLACEHOLDER - confirm scenario inputs]**". The counter ticks to the illustrative total, with a **visible** line-item breakdown (Solo 401(k) $…, Augusta $…, Hire kids $…) and deductions shown separately from estimated tax saved. The disclaimer sits directly under it at 13px, not collapsed. **Remove "100% Success Rate".** CTA: "Run your own numbers". |
| 8 | **Testimonials wall** (grid, not carousel; 2 columns on mobile, show 4 and "show more") | Social proof from peers | All 6 real quotes. Lead with Vicky G. ("saved more in taxes than my initial investment") and Jess B. Add business type + entity to each **[PLACEHOLDER - confirm]**. Link to the review source. Video testimonial if it exists. **Never write new quotes.** |
| 9 | **Who's behind it: "AI finds it. Humans sign off."** | Credibility for the "human-perfected" claim | Andrew's real photo + 1-line bio (verified facts only). A CPA/EA team strip with names/credentials **[PLACEHOLDER - confirm]**. A 3-step visual of what the AI does vs what the licensed pro does. |
| 10 | **How pricing works** (#pricing) | Kill the #1 objection without publishing a number | "One annual fee, quoted live on your call. You'll know the full number before you commit. Never auto-renews: we reach out 30 days before your anniversary. Didn't get to it this year? We roll you into next year." (all from the FAQ). Optional anchor: "Most clients' plans cost less than the strategies they implement" **[PLACEHOLDER - only if substantiated]**. Secondary CTA here: **"Book a strategy call"**. |
| 11 | **Security** (compact, 3 icons) | Remove the data-risk objection before the quiz asks for revenue | Encrypted in transit and at rest · access limited to your team · never sold. Add SOC 2 etc. only if true **[PLACEHOLDER - confirm]**. |
| 12 | **FAQ** (8 objections from §7, accordion, FAQPage schema) | Handle the last objections | Remove the hidden "Don't Delete" headings (audit #4). |
| 13 | **Final CTA band** (navy, not purple) | Close, with two paths | Drew holding the map (guide pose) + "See what you can keep in 2026." Primary green button + ghost "Book a strategy call" + "3 minutes · free · no SSN, no credit card". |
| 14 | **Footer** | Compliance and navigation | Full disclaimers **expanded** in small text (not a toggle). Legal entity "Aspire Advisors LLC d/b/a HeyDrew!". Careers, Affiliate, social links. |

**Cut from the current page:** the Vimeo embed above the fold (move it to section 9 as a click-to-play facade), the purple "IRS Doesn't Need More of Your Money" band (its copy duplicates section 3), the fake-button "Unlock Your Savings Now!" line, the 3-up stat triad, and the carousel.

---

## 4. Above-the-fold requirements

**Desktop (1440×900):** a two-column layout. The left 55% holds the copy, the right 45% holds the estimator card with Drew. Everything below must be visible without scrolling:
1. **Proof strip** (above the H1, 14px): "★ 4.9 on Trustpilot **[PLACEHOLDER - confirm]** · For S-Corps, LLCs & self-employed owners"
2. **H1 (≤ 10 words, 2 lines max).** Candidates for testing:
   - A. "Your CPA files your taxes. HeyDrew cuts them."
   - B. "Keep more of what your business earns. Legally, all year."
   - C. "The tax moves your CPA never mentioned." (control-adjacent)
3. **Sub (≤ 2 lines):** "Year-round tax strategy for business owners. AI finds every strategy you qualify for; licensed CPAs set it up and file it."
4. **The estimator card** with question 1 visible and interactive (see §5). It replaces the video as the dominant object.
5. **Microcopy under the CTA:** "3 minutes · Free · No SSN or credit card · Not sure? Book a call instead →"
6. **Inline disclaimer** (12px, under the card): "Estimates are illustrative, not a guarantee. Results depend on your situation."
7. **Drew:** one guide pose (map or top-down "hello") peeking over the card edge and pointing at question 1. Keep it to about 20% of the card's height. He introduces the tool; he's not the scenery.

**Mobile (390×844):** the fold must show the proof strip, an H1 of 3 lines or fewer at about 34px, a 2-line sub, and **question 1's chips, fully tappable**. Drew shows as a small head peeking over the card. No video, no background scene.

**Performance budget for the fold:** LCP < 2.0 s on 4G, hero payload < 250 KB (Drew as a single AVIF/WebP of about 40 KB, fonts subset, DM Sans 400/600/700 only), CLS < 0.05, no third-party script before interaction.

---

## 5. Interactive hero: "Drew's 2-question estimator"

**Goal:** turn the scariest step (TaxLand Q1: revenue) into the *second* step, after an easy identity tap, and arrive in TaxLand already about 30% done.

**Question 1 (chips, single tap, auto-advance):** "How's your business set up?"
`Sole prop / single-member LLC` · `S-Corp` · `Partnership / multi-member LLC` · `More than one business` · `Not sure`

**Drew micro-reaction (1 line, 600 ms):** e.g. S-Corp → "Nice. S-Corp owners usually have the most room to work with." This is feedback, not a promise. Every line needs compliance review.

**Question 2 (chips, not a dropdown or free-text field):** "Roughly what did it bring in last year?" Bands must **map 1:1 to TaxLand's revenue options** **[PLACEHOLDER - confirm TaxLand bands]**, e.g. `<$100K` · `$100–250K` · `$250K–1M` · `$1–5M` · `$5M+`

**Result state (in the card, no email required):**
- "**Up to [n] of the 8 strategies** may fit a business like yours." The chips show which ones (Hire Your Kids, Solo 401(k), Augusta Rule…) as mini game cards. The count comes from a simple rule table that HeyDrew's CPA signs off on.
- Recommended default: **show strategy count and names, not a dollar figure.** Test an illustrative $ range as a variant (hypothesis H2), shown with its disclaimer.
- CTA: **"See what I can keep →"** Microcopy: "Continue in TaxLand · about 2 more minutes · free".

**Handoff:** `https://taxland.heydrew.com/?entity=scorp&rev=250k-1m&src=home_hero&utm_*` (pass UTMs + GA client_id via the cross-domain linker).
**Required TaxLand changes (dev dependency):**
1. Read the params, skip the answered questions, and open on the next unanswered one ("Type of industry").
2. Show a **progress bar that starts partly filled**: "Step 3 of 7 · You're already 30% done".
3. **Don't let the cookie banner cover the question.** Use a slim bottom bar or a consent step that doesn't block (see cur-taxland-mobile.jpg).
4. Ask for email/phone **at the results reveal**, not at the start ("Where should Drew send your plan?"). Kill the `/login` entry that header "Get Started" currently uses.
5. Show a "Book your strategy call" calendar on the results screen (the secondary conversion happens at peak intent).

**Fallback:** if JS fails or a visitor skips the chips, the CTA still links to TaxLand root.

---

## 6. CTA strategy

| Item | Spec |
|---|---|
| **Primary label** | Hero (after estimator): "See what I can keep". Everywhere else: "**Start free assessment**". Keep it consistent everywhere else, with first-person/outcome variants only in tests. Retire "Take The Assessment" ("assessment" sounds like homework) and "Get Started" (vague, currently goes to login). |
| **Primary style** | Money-green gradient `#04CE00 → #129D0F`, pill, **≥ 48px tall (56px on mobile)**, 18px/700 DM Sans, white text. **Check contrast**: white on #04CE00 is about 2.1:1, which fails WCAG even for large text. White on #129D0F is about 3.6:1, which passes only for large text (18px bold). Shift the gradient darker (start at about #0FB00C) so the whole button clears 3:1 with 18px/700 labels, or use navy text. Green is **reserved for this action only**. |
| **Secondary** | "Book a strategy call": ghost/outline navy, only at the hero microcopy (text link), #pricing, the final band, and the TaxLand results screen. Never green, never bigger than the primary. **[PLACEHOLDER - confirm booking tool URL (Calendly/HubSpot)]** |
| **Existing clients** | "Log in" as a plain text link in the header, goes to portal.heydrew.com. |
| **Count** | Primary: header + hero + 4 in-body + final band + mobile sticky. Secondary: at most 3. No other CTAs (no newsletter, no social links in the body). |
| **Sticky, mobile** | A bottom bar (72px, safe-area aware) appears **after the hero estimator scrolls out of view**. It shows "Start free assessment" + "3 min · free", and hides while the final band or footer is visible and while the keyboard is open. If the visitor already answered estimator Q1, the bar reads "Finish your estimate (1 question left)" (resume state). |
| **Sticky, desktop** | Sticky header keeps the green button. No floating widgets and no chat bubble competing with it. |
| **Exit intent (desktop only, test later)** | Light modal: "Not ready? See the 8 strategies (PDF)" in exchange for email. Only after primary tests have settled. |

---

## 7. Objections and answers (FAQ plus inline placement)

All answers are drawn from existing HeyDrew FAQ copy wherever possible. Where each one shows up is in brackets.

1. **"What does it cost?"** "One annual fee based on your entities and complexity, quoted live on your call. You'll know the full number before you commit, and it never auto-renews." [#pricing, FAQ, near the secondary CTA]
2. **"Is this legal? Will it raise my audit risk?"** "Every strategy is written into the tax code. The Augusta Rule is IRC §280A(g), look it up. We only recommend what you qualify for and help you build the documentation to back it up. Defensibility is the whole point." [strategy cards, FAQ]
3. **"Can you guarantee savings?"** "No, and be skeptical of anyone who does. We guarantee we'll check every strategy you legitimately qualify for and show you the math." [illustrative example section, FAQ]
4. **"I already have a CPA."** "Most CPAs file what already happened. We plan what happens next, and we can file too." **[PLACEHOLDER - confirm whether HeyDrew works alongside an existing CPA or replaces them]** [problem section, FAQ]
5. **"Is my business big enough?"** "Built for S-Corps, LLCs, partnerships and self-employed owners with real complexity." **[PLACEHOLDER - confirm minimum revenue or profit for fit]** [hero proof strip, FAQ]
6. **"What happens after the quiz, a pushy sales call?"** "You'll see which strategies may fit. If you want, you book a call with a Tax Valet to talk fit and pricing. No obligation." [How it works step 2, TaxLand results]
7. **"Is my data safe?"** "Encrypted in transit and at rest, limited to the people working your account, never sold or shared with advertisers." [security block, estimator microcopy]
8. **"How much of my time does this take?"** "Your Tax Valet sends an exact document checklist; you message them in the portal and hear back within a couple of hours." [How it works, FAQ]
9. **"AI with my taxes?"** "AI surfaces the opportunities; licensed professionals review, implement and file. Nobody unlicensed signs anything." [section 9]
10. **"What if I fall behind this year?"** "We don't cancel on you; we roll your engagement into next year." [#pricing]

---

## 8. Mobile specifics

- The fold per §4: estimator Q1 chips are the first tappable thing. Chips are at least 48×48 px in a 2-column grid, with no dropdowns and no text fields in the hero.
- **Allow zoom:** remove `user-scalable=0` and `maximum-scale=1`, and dedupe the viewport tag.
- The sticky bottom CTA follows §6 and must never cover the cookie banner or form fields.
- The header shows the logo, a compact green "Start" button and the hamburger. The CTA must never be only inside the menu.
- Page weight: **< 1.2 MB total, < 250 KB above the fold.** No GIFs anywhere; convert to AVIF stills or muted webm under 300 KB, lazy-loaded. The Vimeo embed becomes a static poster facade that loads the iframe on tap.
- Strategy cards become a horizontal snap carousel with a visible peek of the next card (the only carousel allowed). Testimonials show as a stacked list of 3 with "Show all 6".
- Disclaimers are readable at 13px and 4.5:1 contrast. Tap-to-expand is fine on mobile, but add a superscript next to each number.
- Tel/booking: the secondary CTA opens the booking page in the same tab on mobile.
- Test the handoff on iOS Safari with ITP: the cross-domain params must survive (put them in the query string, not only in cookies).

---

## 9. Analytics events to track (GA4 + product analytics, cross-domain with taxland.heydrew.com)

Every event carries: `page_variant`, `device`, `utm_*`, `ga_client_id`, `session_id`.

| Event | Trigger | Key params |
|---|---|---|
| `hero_view` | hero rendered (baseline) | `lcp_ms` |
| `estimator_q1_answer` | chip tapped | `entity` |
| `estimator_q2_answer` | chip tapped | `revenue_band` |
| `estimator_result_view` | result shown | `strategy_count`, `strategies[]` |
| `cta_click` | any CTA | `cta_id` (header, hero, hiw, strategies, example, final, sticky), `cta_type` (primary/secondary), `label` |
| `sticky_cta_shown` / `sticky_cta_click` | sticky bar | `scroll_depth` |
| `strategy_card_open` | card expanded | `strategy` |
| `example_counter_complete` | counter finished | — |
| `testimonial_expand` | "show all" | — |
| `faq_open` | accordion | `question_id` (tells you which objection is live) |
| `video_play` / `video_progress_25/50/75/100` | facade tapped | — |
| `scroll_depth` | 25/50/75/90 | — |
| `taxland_landing` | TaxLand load with `src` | `prefilled` (bool), `entity`, `revenue_band` |
| `taxland_step_n` | each question answered | `step`, `question_id` (drop-off map) |
| `taxland_lead_submit` | contact captured | `strategy_count` |
| `call_booked` | booking confirmation | `source` (home_secondary / taxland_results) |
| `cookie_banner_interaction` | accept/reject/close on TaxLand | tells you how much the banner costs |
| Offline, imported from the CRM | `call_held`, `closed_won`, `plan_value` | ties the homepage variant to revenue, not just clicks |

**North-star metric:** homepage sessions → `taxland_lead_submit` (qualified). **Guardrails:** `call_held` rate and close rate, so a gimmicky variant can't win on quiz starts while sending worse leads. Set baselines for 2 weeks before launch; don't set targets from vendor benchmarks.

---

## 10. A/B test hypotheses (run in this order, one at a time, to 95% significance or a pre-set sample size)

1. **H1: Inline estimator vs plain CTA hero.** *Because* the current fold asks for a blind commitment and TaxLand opens on a sensitive question, *adding a 2-chip estimator that prefills TaxLand* will raise homepage → TaxLand lead submits by ≥15%, with no drop in call-held rate. Primary metric: `taxland_lead_submit`/session.
2. **H2: Strategy count vs illustrative $ range in the estimator result.** *Because* skeptical owners discount big numbers but respond to specificity, showing "5 of 8 strategies may fit you" (control) vs "5 strategies · illustrative range $X–$Y*" (variant) will change handoff clicks. Watch lead quality and compliance comfort. Legal must approve the variant copy.
3. **H3: Mobile sticky CTA with estimator resume state.** *Because* the page is long and the mobile header hides the CTA, a sticky bar that says "Finish your estimate (1 question left)" to partial completers will raise mobile TaxLand starts by ≥8% (CRE minimum observed lift).
4. **H4: Honest proof vs hype stats.** *Because* "100% Success Rate" contradicts the FAQ's anti-guarantee stance, replacing the stat triad with the illustrative line-item example + the "No, and be skeptical of anyone who does" line will raise scroll-to-CTA clicks from the example section and lower bounce among >$250K revenue visitors.
5. **H5: Headline specificity.** *Because* the current H1 doesn't name the audience or mechanism, "Your CPA files your taxes. HeyDrew cuts them." (variant A) vs "Keep more of what your business earns. Legally, all year." (variant B) vs the current H1 will raise estimator Q1 interaction rate. Metric: `estimator_q1_answer`/`hero_view`.

Backlog: header green button label ("Start free assessment" vs "See what I can keep"), Drew present vs absent at the hero card (does the guide help or cheapen?), deadline bar on/off (Q4 only), testimonial order (money-outcome quotes first).

---

## 11. Pre-launch checklist (conversion blockers)

- [ ] Unify every primary CTA destination (no `/login` entry for prospects)
- [ ] TaxLand accepts prefill params and shows partial progress
- [ ] TaxLand cookie banner no longer covers Q1 on mobile
- [ ] "100% Success Rate" removed; every number has a superscript disclaimer next to it
- [ ] HSA/HRA copy fixed; no lorem ipsum anywhere a CTA links to
- [ ] Testimonials: consent + client status confirmed; image filenames/alt text match names
- [ ] Trustpilot/credential claims verified or removed
- [ ] Zoom allowed; CTA label contrast ≥ 3:1 at 18px bold (4.5:1 for smaller text); page < 1.2 MB; LCP < 2.0 s on mobile
- [ ] GA4 cross-domain linker + all §9 events firing in DebugView; CRM import for `call_held` / `closed_won`
