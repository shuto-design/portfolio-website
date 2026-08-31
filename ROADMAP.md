# Roadmap — live Thursday, October 1

The site is a finished machine with almost nothing in it. Routing, the layout,
the case-study template, the block system, the tokens, the image checker — all
built. What's missing is the work itself.

**So this is a writing and image deadline, not a coding one.** Roughly 70% of
what's left is content. Plan your evenings accordingly.

|             |                                                                                          |
| ----------- | ---------------------------------------------------------------------------------------- |
| **Live**    | Thursday, October 1, 2026                                                                |
| **For**     | Landing an in-house design job                                                           |
| **Read by** | Recruiters (skim, on a phone) and hiring design leads (read closely, want your thinking) |
| **Scope**   | Three Travelpro case studies. Optional fourth: 818 Asian Fusion                          |
| **Cut**     | FAU student work — see _Why the student work is out_ below                               |
| **Time**    | ~2h a night after 6pm                                                                    |

---

## What "done" means

Three tests a stranger has to pass. Check these in the last week, on a phone you
haven't been building on.

- [ ] **10 seconds.** They land on shuto.design and know who you are and what you do.
- [ ] **2 minutes.** They see three pieces, understand _what you specifically did_
      on each, and believe you'd do it again. In-house work is team work — a
      hiring lead cannot guess your part, so say it.
- [ ] **The exit.** The moment they want you, contacting you is one obvious click,
      and your resume is findable.

And a floor, all non-negotiable:

- [ ] No placeholder text anywhere — no "Copy Here", no "Example Project"
- [ ] Works on a phone
- [ ] Loads fast
- [ ] Has a favicon and a link-preview image
- [ ] Every image has real alt text
- [ ] Someone using only a keyboard can get through the whole site

**Done is not** every project you've ever made, a blog, or perfect. October 1 is
a checkpoint, not a final exam. Treating it as a final exam is the main thing
that would make you miss it.

---

## Three rules

**1. Scope freeze is Monday, September 21.** No new ideas after that date. Park
them in `LATER.md` instead — writing an idea down is what stops it eating a
Tuesday. This rule is the reason October 1 is achievable at all.

**2. Decide nights and build nights are different nights.** A decide night has
no code in it: you choose, Claude asks questions. A build night implements
something already decided. Mixing the two is what makes an evening feel like
nothing happened.

**3. Cut the fourth project before you cut a week.** If you're behind, 818 goes
first, then depth on the third case study. Never the polish week.

---

## Why the student work is out

**A portfolio is averaged, not summed.** Every piece drags the mean toward
itself. Three strong pieces read as _"strong designer."_ Three strong pieces
plus three student pieces read as _"designer who can't tell the difference"_ —
and to a hiring design lead that's a worse signal than a short portfolio.

818 Asian Fusion is a different case. Framed as _commercial photography for a
small business_ it shows range, and range counts for in-house roles. It's the
optional fourth, not a requirement.

---

## Phase 0 — Decide and unblock

**Week 1 · Mon Aug 31 – Sun Sep 6 · ~8h**

Barely any code. This week exists so that everything after it is cheaper.

| Night    | Task                                                                                                                                                                               |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mon 8/31 | **Pick the three.** List everything you _could_ show, then cut. Don't pre-filter the list — it's easier to cut than to remember something you left off.                            |
| Tue 9/1  | **Send the performance-data ask.** Longest lead time of anything on this roadmap, because it depends on other people replying. Send it, then chase it in the background all month. |
| Wed 9/2  | **Read [IMAGES.md](IMAGES.md) end to end.** It already answers "how do I resize and export assets." Then do one test export and run `npm run images`.                              |
| Thu 9/3  | **Design-token session.** Close every open value. Claude writes `DESIGN.md`.                                                                                                       |
| Fri/wknd | **Write the site's 40 words.** Homepage line, meta description, the bottom-bar copy for each page. Small, but it _is_ the 10-second test.                                          |

- [ ] Three projects chosen
- [ ] Performance-data request sent
- [ ] IMAGES.md read, one test export run through `npm run images`
- [ ] `DESIGN.md` written
- [ ] The site's 40 words written

### Claude does in parallel — costs you no evenings

- [x] A real 404 page. Every miss — typo, dead link, renamed case study — now
      lands on one page reading `Shuto/404.`
- [x] A guardrail on the homepage's featured project, so an empty or broken
      `projects.js` fails with a sentence naming the file instead of a cryptic error
- [ ] Commit the image pipeline (`IMAGES.md`, `scripts/`, `npm run images`) —
      still untracked, so a fresh copy of the repo doesn't have it
- [ ] Settle `--container-measure` — currently ~84 characters a line against a
      60–75 target, and it sets the width of every paragraph on the site

### `DESIGN.md` — the master token document

One canonical place for the design system. Right now that knowledge is scattered
across ~170 lines of comments in `globals.css`, the README's tokens section,
IMAGES.md, and commit messages — nobody can hold it in their head, including you.

1. **Philosophy** — the principles, in your words
2. **Colour** — two values, why, and dark mode closed 2026-08-29
3. **Type** — Geist, the 1.333 scale, the nine roles, two weights, the tracking rule
4. **Space** — the 8px baseline, the 32px gutter, the class→pixel table, the 12-column grid
5. **The rule** — the one deliberately fluid value on the site, and why it's allowed to be
6. **Radius** — zero, permanently, favicon included
7. **Motion** — the finished state is the default; motion is the deviation
8. **Images** — the middle-quarter crop rule, and _the work is the only colour_
9. **Decision log** — what's open, what closed and when

---

## Phase 1 — Content

**Weeks 2–3 · Mon Sep 7 – Sun Sep 20 · ~20h**

The long pole. This is where the project is won or lost.

### The ritual — three nights per project

Same three nights every time, so you never open a blank page.

**Night 1 — Assemble.** Pull every asset. Crop the cover to the middle 40% of
the width and middle 60% of the height (the rule in IMAGES.md — the cover gets
cropped three different ways, and that rectangle is the part that survives all
three). Export at spec: cover and full-width 2560px, contained 1800, duo 1200.
Run `npm run images` until it's clean.

**Night 2 — Write the spine.** Four beats, in this order:

| Beat         | What goes in it                                                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Context**  | The brief, and more importantly the **constraint** — the budget, the timeline, the brand rule you had to work inside, the stakeholder who wanted something else |
| **Decision** | What you chose, and why. **This is the beat that gets you hired,** and it's the one most portfolios skip                                                        |
| **Work**     | The artifacts, large                                                                                                                                            |
| **Outcome**  | What happened. Where the performance data goes                                                                                                                  |

**Night 3 — Edit.** Cut it in half. Read it out loud. Then check it answers
_"what did **you** do"_ — not what the team did.

> **Labor Day, Monday September 7, is a free full day.** Do all three Assemble
> nights at once and buy yourself the slack you'll want in week four.

### Project tracker

| Project              | Assets | Written | Edited | Data |
| -------------------- | ------ | ------- | ------ | ---- |
| 1.                   | ☐      | ☐       | ☐      | ☐    |
| 2.                   | ☐      | ☐       | ☐      | ☐    |
| 3.                   | ☐      | ☐       | ☐      | ☐    |
| 4. _(818, optional)_ | ☐      | ☐       | ☐      | —    |

---

## Phase 2 — Design, build, and the hiring layer

**Week 4 · Mon Sep 21 – Sun Sep 27 · ~10h**

> **Scope freeze starts Monday.**

Content exists now, so you design against real work instead of placeholder grey.

**You design in Figma** at 1440, 768 and 390, and hand over screenshots (the
Figma read quota is 20 files a month, so screenshots are the normal channel):

- [ ] Homepage that actually says something
- [ ] `/about`, including the philosophy statement
- [ ] Real type sizes and column widths for the case-study page, replacing the
      placeholder widths in `app/work/blocks.jsx`

**The hiring layer.** All of this is specific to job hunting and none of it is optional:

- [ ] **Resume.** PDF into `public/`, linked from the nav. `/resume` is an empty
      stub right now. For this audience it's table stakes.
- [ ] **Contact.** One obvious path. Your email is currently hardcoded in two
      separate files — make it one.
- [ ] **Link preview image** (`app/opengraph-image.png`, 1200×630). When you paste
      shuto.design into a Slack DM to a recruiter, this is what they see. There
      isn't one yet.
- [ ] **Favicon** (`app/icon.svg`, still the generated placeholder) and `app/apple-icon.png`
- [ ] **Real meta description** — currently a `TODO` in `app/layout.jsx`
- [ ] **Kill or fill `/contact`** — Google is told about it but nothing links to it

---

## Phase 3 — Ship

**Week 5 · Mon Sep 28 – Thu Oct 1 · ~8h**

| Day          | Task                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------ |
| Mon 9/28     | Real devices — your phone, a borrowed Android, a big monitor. Then tab through the whole site with no mouse. |
| Tue 9/29     | Lighthouse. Alt-text audit. Confirm nothing is shipping oversized images.                                    |
| Wed 9/30     | Read every word on the site out loud. Fix the ones that make you wince.                                      |
| **Thu 10/1** | **Ship.** Check the domain, paste the link into Slack to confirm the preview, post it.                       |

Final checks:

- [ ] `grep -rn "Copy Here\|TODO(shuto)\|Example Project" app/` returns nothing
- [ ] Lighthouse on mobile: Performance and Accessibility both 95+
- [ ] Hand your phone to someone who doesn't know your work. After two minutes,
      can they say what you do and name one project? If not, the writing isn't done.

---

## Out of scope for October 1

Deferred on purpose, to protect the date. None of these are failures.

- **The homepage intro animation.** It was built and then removed during the
  token rewrite. It's recoverable in full — `git show 604e27f:app/intro.css`.
  Rebuild it in October, after launch.
- FAU student work, and any archive page to house it
- 818 Asian Fusion, unless it comes together easily as the fourth
- A writing or blog section
- Tests, linting, CI

---

## What could go wrong

In order of likelihood.

1. **The performance data doesn't arrive.** It depends on other people. That's
   why it's the first thing you do. Have a version of each Outcome section that
   works without numbers.
2. **Case studies take four nights instead of three.** The most likely failure.
   Labor Day covers one project's slippage; 818 is already the first thing to cut.
3. **Scope creep in week four**, when the site starts looking good and the ideas
   start arriving. That's what the freeze and `LATER.md` are for.

**The single highest-leverage hour of the whole month is Monday night**, choosing
which three projects. Everything downstream gets cheaper or more expensive based
on that one call.
