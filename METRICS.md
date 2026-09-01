# Metrics — pulling performance data, and using it honestly

You have Triple Whale and Motion access. This document is how you turn that access into
three or four defensible lines in a case study, without publishing anything that belongs
to Travelpro.

Read it once end to end. After that it's a reference: [section 6](#6-the-triple-whale-pull-click-by-click)
is the click-by-click, [section 2](#2-the-metrics-sorted-by-how-much-of-each-one-is-yours)
is the glossary you'll come back to.

---

## The one decision everything else follows from

You've decided to publish **relative lifts only** — "+38% CTR," never "$78,456 revenue."
That's the right call while you still work there, and it's more portable anyway: a lift
means the same thing at any company, and a dollar figure doesn't.

But it has a consequence, and it's the whole reason this document exists:

> **Every number becomes a comparison, so every export is a pair.**
>
> You cannot pull "my ad's CTR." There is no such publishable thing. You pull **your ad
> and the ad it beat** — same campaign, same audience, same date range — and you publish
> the difference between them.

If you export only your own ads, you will have spent an evening and have nothing you can
put on the site. So the control is not an optional extra. It's half the data.

**Picking the control honestly.** The control is the ad that was running _before yours,
in the same campaign, to the same audience._ It is not the worst ad in the account, and
it is not the account average. Choosing a weak control is the single easiest way to
produce an impressive number that a hiring lead can dismantle in one question.

---

## 1. Which tool for what

You guessed Triple Whale was the better source. It's the better source _for money_. But
for your purposes Motion is the more important tool, which is counterintuitive enough to
say plainly:

|           | Triple Whale                   | Motion                                                      |
| --------- | ------------------------------ | ----------------------------------------------------------- |
| Built for | Finance and growth teams       | Creative teams                                              |
| Owns      | Spend, revenue, ROAS, CPA, AOV | Hook rate, hold rate, retention curves, creative tagging    |
| Answers   | "Did it make money?"           | "Did the creative work, and _which decision_ made it work?" |
| Your use  | One line of business proof     | Most of your actual evidence                                |

**Motion for the metrics that prove you did it. Triple Whale for the one metric that
proves it mattered.**

Motion also fits relative-lifts-only better, because hook rate and hold rate aren't
commercially sensitive the way revenue is. Nobody's legal team objects to "41% → 58%."

**Never mix the two in one comparison.** They use different attribution windows and
different models, and they will report different numbers for the same ad on the same day.
Pick one tool per metric and stay inside it for the whole comparison.

---

## 2. The metrics, sorted by how much of each one is yours

Here's the frame that makes all of this make sense. **An ad is a funnel, and you own
specific steps of it.** The media buyer owns the budget and the targeting. The product
page owns the checkout. You own the frames.

So when you're choosing which numbers to put in a case study, the question isn't "which
number is biggest." It's "which number is _mine_."

### Tier 1 — almost entirely yours

These measure the creative and essentially nothing else. Lead with them.

**Hook rate** — also called 3-second play rate or thumbstop rate.
`3-second views ÷ impressions.` Of everyone who was shown the ad, what share stopped
scrolling long enough to watch three seconds. This is the purest measurement of an art
director's opening frame that exists in advertising. If you only get one metric, get this one.

**Hold rate** — also called thruplay rate.
`thruplays ÷ impressions.` Did the middle survive. Measures pacing, edit rhythm, and
whether the payoff arrived before people left.

**Retention curve** — plays to 25% / 50% / 75% / 100%.
Not a single number but a shape: _where_ people dropped. This is your best diagnostic
tool, and the one that lets you show iteration rather than just outcome. "The first cut
lost 40% of viewers at second four, so I moved the product reveal to second two" is a
better portfolio sentence than any ROAS.

**CTR** — click-through rate. `link clicks ÷ impressions.`
Did it earn the tap. Shared a little with the copywriter, but mostly yours.

> **Your campaign work is statics, so three of the four above don't exist for it.**
> Hook rate, hold rate and the retention curve are all measurements of a video, and a
> static has none of them. That leaves CTR as your only Tier 1 metric — confirmed
> 2026-08-31, and it changes what to reach for rather than how much you have.
>
> What it costs you is the diagnostic richness: "the first cut lost 40% at second four,
> so I moved the reveal to second two" is not a sentence a static can produce.
>
> What it doesn't touch is the two strongest proofs in [section 3](#3-six-ways-to-prove-the-contribution-was-yours),
> because neither was ever about video. **Spend share** works identically. **The pattern
> across many assets** works _better_, because you made far more statics than you would
> have videos, and that argument is the one that needs volume. So lead with those two
> and treat CTR as the supporting number rather than the headline.

### Tier 2 — yours, but shared

**CPC** — cost per click. `spend ÷ clicks.`
Falls out of CTR mechanically: at the same CPM, a higher CTR _is_ a lower CPC. So it's
the same fact as your CTR win, restated in the language finance speaks. Worth including
for exactly that reason.

**CPM** — cost per 1,000 impressions.
Mostly set by the auction and the audience, not by you. But platforms deliver engaging
creative more cheaply, so a CPM that fell while targeting stayed identical is a real
creative win — and an unusually sophisticated one to point out.

**CVR** — conversion rate. `purchases ÷ clicks.`
The creative sets the expectation; the product page closes the sale. Shared. The useful
case is the _bad_ one: **high CTR with low CVR means the creative overpromised.** People
clicked, then found something other than what they were sold. Noticing that in your own
work and fixing it is one of the strongest things you can put in a case study, because it
shows you read data as a designer rather than collecting it as a trophy.

**AOV** — average order value. `revenue ÷ orders.`
Yours only if you deliberately designed toward it — featuring a bundle, leading with a
higher-priced SKU, showing the set instead of the single.

**Frequency** — average number of times one person saw the ad.
Rising frequency alongside falling CTR is the signature of **creative fatigue**. How long
your work lasted before that happened is a genuine creative property, and almost nobody
puts it in a portfolio.

### Tier 3 — not yours, but you have to understand them

You will be asked about these in an interview. Not knowing them reads worse than not
having them.

**Spend** and **impressions** — the media buyer's decisions, not yours. Never claim them.
(But see [section 3](#3-six-ways-to-prove-the-contribution-was-yours), point 2 — how the
_budget moved_ is a different story and it is partly yours.)

**ROAS** — return on ad spend. `revenue ÷ spend.` A ROAS of 4 means four dollars back for
every dollar in. The headline business number, and the one everyone quotes.

The thing to understand about ROAS is that **there is no single value of it.** In the
screenshot of your own account, one ad reads:

|                                |          |
| ------------------------------ | -------- |
| Meta's column (∞ icon)         | **8.44** |
| Triple Whale's column (Y icon) | **1.54** |

Same ad. Same week. A 5× disagreement. That's not a bug — the two columns are answering
different questions. Meta counts a sale if someone merely _saw_ the ad (a view-through)
within a generous window, and Meta is grading its own homework. Triple Whale matches
against actual Shopify orders on a stricter window.

**Always say which one you're quoting. Prefer Triple Whale's.** Quoting the 8.44 when the
honest number is 1.54 is the kind of thing that ends an interview badly.

**CPA / CAC** — cost per acquisition. `spend ÷ purchases.` ROAS turned inside out. Often
the number a business actually manages to day to day, because it's a budget you can hold
in your head.

---

## 3. Six ways to prove the contribution was yours

This was your real question — not "what do the metrics mean" but **"how do I show that
this was me?"** In-house work is team work, and the roadmap's two-minute test is
explicitly that a stranger understands _what you specifically did_.

Ranked, strongest first.

### 1. Head-to-head against the control

Your creative against the incumbent, same audience, same window. The cleanest claim
available in advertising. If a formal A/B test exists in the account, that's a gift —
use it and say it was a test. If not, find a window where both ran and say that instead.

### 2. Spend share moving onto your work

> "It started at 4% of the campaign budget and ended at 41%."

A media buyer moving the company's money onto your creative is a **third party voting
with cash.** You didn't make that decision, which is exactly what makes it credible — and
it's nearly impossible to fake. This data is in every ad account and almost nobody uses
it. If you take one idea from this document, take this one.

### 3. The pattern across many assets

If you made thirty ads, don't show the best one. Group them by the **design decision** —
product-on-color vs. lifestyle, face-first vs. product-first, text on frame one vs. not —
and show which attribute won across all of them.

This proves _judgment_ rather than one lucky asset, and it's the most senior-looking
evidence a designer can bring: it says you have a repeatable point of view, not a hit.
This is precisely what Motion's creative tagging exists to produce.

### 4. The iteration

V1 → what the data said → V2 → what changed. Retention curves make this visible.
Hiring design leads care more about the loop than the number, because the loop is the
thing you'd repeat at their company.

### 5. Longevity

> "Ran eleven weeks before fatigue set in, against a three-week account average."

Durability is a creative property. Cheap to pull, rarely claimed.

### 6. Rates, never totals

Total revenue is contaminated by budget, seasonality, promotions, and everyone else's
work. Quoting it makes you look like you're claiming the whole company's quarter. A rate
— CTR, hook rate, CPC — is the honest unit, and it reads as more precise, not less
impressive.

### And the rule underneath all six: name the team

> "Art direction and design by me. Media buying by ___. Photography by ___."

For an in-house role this reads as maturity, not modesty. Overclaiming is what fails a
reference check, and hiring leads have all met the designer who took credit for a media
buyer's scaling decision.

---

## 4. When to believe a number

A metric computed on a tiny sample isn't a small result — it's **not a result**. Rough
floors, and they're generous:

| Below this      | Don't publish                              |
| --------------- | ------------------------------------------ |
| ~1,000 clicks   | CTR is directional at best, not conclusive |
| ~50 conversions | ROAS and CPA are meaningless. Noise.       |
| ~$1,000 spend   | That was a test, not a result              |

**Now apply that to the screenshot you sent me**, because it's a useful exercise and the
answer is not what you'd hope:

- The row with **13 impressions and $0.00 spend** — nothing. That ad barely ran.
- The row with **612 impressions and $5.77 spend** — nothing.
- The **static image ad**: $244 spend, 12,625 impressions, 215 clicks, and 4 purchases by
  Triple Whale's count. The CTR is _borderline_ usable. The 5.41 ROAS is **not** — four
  purchases is noise, and one refund would swing it by a quarter.
- The **DPA row**: $9,293 spend, 630,334 impressions, 52 Triple purchases. This is the
  only row with the volume to support a revenue claim. But DPA means **dynamic product
  ads** — Meta generates them automatically from the product catalog. They're usually
  _not_ a designer's asset.

So the honest read of that screen is: **your Last-365-Days view contains no
designer-owned creative with enough spend behind it to support a revenue claim.**

That's not bad news, it's a finding. It means one of three things, and you can check
which tonight:

1. **The date range is wrong.** Last 365 Days averages your work together with everything
   before and after it. Your campaign probably ran for six weeks.
2. **The ad naming convention is hiding your work.** Everything on that screen is named
   `paid-social_[objective]_[format]_...` — the names describe the media buy, not the
   creative. Your ads are in there under names that don't say so.
3. **It's in campaigns you haven't opened.** That view may be filtered to one account,
   objective, or date preset.

Which is why the first step isn't an export.

---

## 5. Step one — the inventory

**Do this before you touch an export button.** One page, per case study:

- [ ] Campaign name(s)
- [ ] **Which ads are yours** — the exact ad names
- [ ] **The control** — the ad running before yours, same campaign and audience
- [ ] The date you shipped
- [ ] The date range the campaign ran, and the control's date range
- [ ] Who else touched it, and what they did (for the credit line)

**No tool can produce this.** Triple Whale doesn't know which ads you made. This is the
one piece that genuinely requires you, and possibly one conversation with whoever runs
the account — which is also the natural moment to ask whether publishing relative lifts
is fine with them. Ask for that in writing.

---

## 6. The Triple Whale pull, click by click

**Creative Analysis → Single Creative → table view** (the third icon at the top right of
the card row) **→ Group by: Ad.**

Then, in order:

1. **Change the date range.** It defaults to Last 365 Days. Set it to your campaign
   window. This matters more than anything else on this list — 365 days averages your
   work together with the ten months around it, which is exactly what destroys a
   before/after claim.
2. **Add Filter** → isolate the campaign, so you're not reading the whole account.
3. **Set the columns** (the ▥ icon): Ad name, Spend, Impressions, Clicks, CTR, CPC, CPM,
   Purchases, CV, ROAS, CPA, AOV. Take **both** attribution columns for each — the Meta
   one and the Triple Whale one — so you can see the spread rather than trusting one.
4. **Export CSV** — the ⋮ menu next to the Save button.
5. **Do it twice.** Once for your window, once for the control's window. Name the files
   `[project]-mine.csv` and `[project]-control.csv` so you don't mix them up in three weeks.

Also worth grabbing while you're in there: **spend by ad over time**, which is what gives
you the spend-share story from [section 3](#2-spend-share-moving-onto-your-work).

---

## 7. The Motion pull

Same campaign windows, same control pairing.

- Hook rate, hold rate, thumbstop rate
- Plays to 25% / 50% / 75% / 100% — the retention curve
- CTR, CPC, spend
- **The creative tags.** Group by design attribute and export that comparison — this is
  the [pattern-across-many-assets](#3-the-pattern-across-many-assets) evidence, and Motion
  is the only tool here that produces it.
- **The side-by-side creative report.** Screenshot it. It's already most of a portfolio slide.

---

## 8. What no tool can give you

Budget an hour for this, separately. It's the half of a case study that data can't reach:

- The **brief**, and more importantly the **constraint** — the budget, the timeline, the
  brand rule you worked inside, the stakeholder who wanted something else.
- **The Slack message or email where someone reacted.** That's your `quote` block. Go
  find it now, while you still have access to the account it's in.
- The **before** artifact — what the ad looked like before you touched it. A visual
  control is worth as much as a numerical one, and it needs no disclosure permission at all.

---

## 9. One proof mechanism per case study

The five projects were chosen so that each makes a different point, and the proof
should follow suit. Most of this is already settled by what each project _is_:

|     | Project           | The proof it rests on                                      |
| --- | ----------------- | ---------------------------------------------------------- |
| 1   | Asset Resizenator | Time recovered, and someone saying so. No ad data exists    |
| 2   | Campaign Work     | Head-to-head against the control, plus spend share          |
| 3   | ReBranding        | Adoption — what it shipped across, what the team works from |
| 4   | Remain Simple     | Whatever clears the floor; a sellout or restock if nothing does |
| 5   | 818 Asian Fusion  | The pictures. This one earns its place on range, not lift   |

Note that only one of the five needs an export. That is a feature: it means a bad
week in Triple Whale costs you one case study's Outcome beat rather than the site.

### If you split the campaign work into separate case studies

The temptation is real — the visuals are strong and each campaign makes its own
point, which is muddied by stacking them together. The test is one question:

> **Does each split have a proof mechanism none of the others has?**

If campaign A is a head-to-head against its control and campaign B is the pattern
across thirty assets grouped by design decision, those are genuinely two case
studies and splitting makes both stronger. If both would open with "here is a lift
against a control," you have made one case study twice, and the second copy drags
the average down while costing you two nights you don't have.

**The pattern piece is not the leftover bin.** Grouping many assets by the design
decision that won across them is the most senior-looking evidence in this document
— see [section 3](#3-the-pattern-across-many-assets). Given its own case study it
reads as a designer with a repeatable point of view, which is exactly the thing a
hiring lead is trying to find out.

## 10. Worked example — export to published line

You pulled two CSVs. Your ad: 12,400 clicks on 890,000 impressions. The control: 6,100
clicks on 720,000 impressions.

**Compute the rates, then the lift.**

```
yours:    12,400 ÷ 890,000 = 1.39% CTR
control:   6,100 ÷ 720,000 = 0.85% CTR
lift:     (1.39 − 0.85) ÷ 0.85 = +64%
```

Note that you did _not_ say "twice the clicks." Your ad had more impressions behind it,
so raw clicks flatter you for a reason that has nothing to do with the work.

**Then check it clears the floor** in [section 4](#4-when-to-believe-a-number). 12,400 and
6,100 clicks, both well over 1,000. Publishable.

**Then write it with its comparison attached:**

> ✅ **CTR +64% against the previous creative**, same audience, same six-week window.
> Art direction and design by me; media buying by ___.

And not:

> ❌ "Drove a 64% increase in click-through rate."
> — Against what? Over what period? Who else was involved? Every one of those is a
> question you've invited and not answered.
>
> ❌ "Generated $78K in revenue."
> — Contaminated by budget and season, not yours to claim, and confidential.
>
> ❌ "8.44 ROAS."
> — That's Meta's self-graded number. Triple Whale says 1.54 for the same ad.

**Then put it in the case study** as a `metrics` block, which exists for exactly this —
see the block reference at the top of `app/work/projects.js`:

```js
{
  type: "metrics",
  note: "vs. the previous creative, same audience, Mar–Jun 2026",
  items: [
    { label: "Click-through rate", change: "+64%" },
    { label: "Cost per click",     change: "−31%" },
    { label: "Hook rate",          change: "41% → 58%" },
  ],
}
```

The `note` is not decoration. It's the sentence that makes a relative number honest, and
the block won't render without it.

---

## The short version

1. Inventory first — which ads are yours, and what each one beat.
2. Set the date range to the campaign, never Last 365 Days.
3. Export in pairs: yours and the control.
4. Motion for hook rate and hold rate — but your campaign work is statics, so in
   practice that means spend share and the pattern across assets instead. Triple
   Whale for one line of business proof.
5. Rates, never totals. Relative, never absolute.
6. Check it clears the volume floor before you believe it.
7. Say what it's compared against, and name the team.
