/* ============================================================================
   YOUR CONTENT — this is the file you edit.

   Everything on /work and every case study page comes from this list. Adding a
   project, rewriting copy, swapping an image, or reordering sections all happen
   here. Nothing in this file is design; it's what the site says and in what
   order it says it.

   TO ADD A PROJECT
   1. Put your Figma exports in  public/work/your-project-slug/
   2. Copy the block below, change the values, done.
   3. Run  npm run images  — it checks every file and, for images you haven't
      wired up yet, prints the lines to paste in here.

   IMAGES.md has the full spec: what size to export, what to call the files,
   which formats to use, and how a cover gets cropped on a phone.

   TO REORDER A CASE STUDY
   Move entries around inside `blocks`. They render top to bottom.

   BLOCK TYPES AVAILABLE
     { type: "text",  body: "..." }
     { type: "image", src, alt, aspect, width: "full" | "contained" }
     { type: "duo",   items: [ {src, alt, aspect}, {src, alt, aspect} ] }
     { type: "quote", body: "...", attribution: "..." }
     { type: "metrics", note: "...", items: [ {label, change}, ... ] }

   Ask me for a new block type any time a Figma frame needs one — that's a
   normal part of this working, not a workaround.

   THREE FIELDS THAT MATTER MORE THAN THEY LOOK

   `aspect`  The image's proportions. The browser uses it to reserve the right
             space BEFORE the image loads; get it wrong and the page visibly
             jumps while loading, and the image is cropped to the ratio you
             claimed instead of shown at its own.

             DON'T DO THE MATH — write the export's pixel dimensions. A
             2400x3000 file is aspect: "2400/3000". CSS takes any two numbers,
             so that's never wrong, and npm run images checks it either way.

   `alt`     What the image shows, in a few words. Screen readers speak it,
             search engines read it, and it displays if an image ever fails to
             load. Write it for a person who can't see the image.

   `note`    On a metrics block, what the figures are being compared against —
             "vs. the previous creative, same audience, Mar-Jun 2026". A
             percentage with nothing to measure it against isn't a modest
             claim, it's one nobody can check, so the block refuses to render
             without it.

             METRICS.md is the companion to this: what each metric means, which
             of them are actually a designer's to claim, and how to pull them
             out of Triple Whale and Motion.
   ============================================================================ */

export const projects = [
  /* --------------------------------------------------------------------------
     THREE CHOSEN, TWO SLOTS HELD. Decided Monday 2026-08-31.

     The thesis is define → scale → prove, which is why all three are Travelpro
     and why that's a strength rather than a limitation: the rebrand sets the
     visual language, the Resizenator makes it produceable at volume, and the
     campaigns show it wins in market. Three altitudes of one job, not three
     samples from one employer.

     THE FIRST ENTRY IS THE HOMEPAGE. site-chrome.js takes projects[0] as
     `featured`, so reordering this list reorders the homepage with it.

     The last two entries are empty slots, held open to see how five tiles feel
     in the row rather than because two more projects have been picked. They are
     the roadmap's own warning made concrete: a portfolio is averaged, not
     summed, so five reads stronger than three only if what fills them is as
     good as the first three. If it isn't, delete the slots — that costs nothing
     and the site gets better.

     Every blank below is marked TODO(shuto). The final check in ROADMAP.md
     greps for exactly that string, so none of this can ship by accident —
     write over them, don't work around them.
     -------------------------------------------------------------------------- */
  {
    slug: "asset-resizenator",
    title: "Asset Resizenator",
    category: "System",
    client: "Travelpro",
    year: "TODO(shuto)",
    role: "TODO(shuto)",
    summary:
      "An internal system for producing campaign assets at every size the channels needed.",
    cover: {
      src: "/work/asset-resizenator/cover.png",
      alt: "TODO(shuto)",
      aspect: "2560/3840",
    },
    blocks: [
      {
        type: "text",
        body: "TODO(shuto) — CONTEXT. What was breaking before this existed: who resized assets, how long one campaign's worth took, and what that cost the team.",
      },
      {
        type: "text",
        body: "TODO(shuto) — DECISION. The art direction problem underneath the tool — what stays fixed and what moves when an asset changes shape. Where the logo sits at 1:1 versus 9:16, what gets cropped, what's protected. This is the beat that makes this a design case study rather than an ops one, so give it the most room.",
      },
      {
        type: "text",
        body: "TODO(shuto) — WORK. One master asset beside the wall of every size it generated. That single image explains this project faster than any paragraph can.",
      },
      {
        type: "text",
        body: "TODO(shuto) — OUTCOME. The time back, and what the team did with it. There is no ad data here, so the quote block is carrying the weight an export normally would — find the message where someone said it changed their week, while you still have access to the account it's in.",
      },
    ],
  },

  {
    slug: "campaign-work",
    title: "Campaign Work",
    category: "Campaign",
    client: "Travelpro",
    year: "TODO(shuto)",
    role: "TODO(shuto)",
    summary:
      "Paid social and marketplace creative for Travelpro's DTC and Amazon channels.",
    cover: {
      src: "/work/campaign-work/cover.png",
      alt: "TODO(shuto)",
      aspect: "2560/3840",
    },
    blocks: [
      {
        type: "text",
        body: "TODO(shuto) — CONTEXT. The brief, and more importantly the constraint: the budget, the timeline, the brand rule you had to work inside, or the stakeholder who wanted something else.",
      },
      {
        type: "text",
        body: "TODO(shuto) — DECISION. What you chose, and why. Most portfolios skip this beat and it is the one that gets you hired.",
      },
      {
        type: "text",
        body: "TODO(shuto) — WORK. One campaign in full depth, then the others underneath grouped by design decision rather than by campaign. \"Product-on-colour beat lifestyle across eleven assets\" is a claim about your judgement; \"here are three campaigns\" is a claim about your employment.",
      },
      {
        type: "text",
        body: "TODO(shuto) — OUTCOME. Your creative against the ad it replaced, same audience, same window. Add a metrics block here once the pull is done — METRICS.md section 10 has the worked example, and section 4 has the volume floors to check first.",
      },
    ],
  },

  {
    /* PROVISIONAL — this slot is the rebrand only if it survives the six
       questions from 2026-08-31: is it public, whose direction was it, what
       specifically was yours, is there a before, did anything move, and is the
       board deck part of it. If the answer to the first two kills it, the
       fallback is FC5 Packaging pulled forward from the v2 list. Renaming a
       project is this entry plus its folder in public/work/ — nothing else. */
    slug: "rebranding",
    title: "ReBranding",
    category: "System",
    client: "Travelpro",
    year: "TODO(shuto)",
    role: "TODO(shuto)",
    summary: "TODO(shuto) — one line, once the shape of this one is settled.",
    cover: {
      src: "/work/rebranding/cover.png",
      alt: "TODO(shuto)",
      aspect: "2560/3840",
    },
    blocks: [
      {
        type: "text",
        body: "TODO(shuto) — CONTEXT. What the identity was before, and what was wrong with it that made a rebrand worth doing.",
      },
      {
        type: "text",
        body: "TODO(shuto) — DECISION. The direction you set, and what you rejected to get there. This is the origination evidence the other two case studies can't provide, so it is the reason this project is on the site.",
      },
      {
        type: "text",
        body: "TODO(shuto) — WORK. Before and after. The old identity is already public, so this visual control costs you no permission from anyone.",
      },
      {
        type: "text",
        body: "TODO(shuto) — OUTCOME. Adoption rather than ad metrics: what it shipped across, and that the guidelines are what the team works from now. That is a legitimate outcome and it needs no export.",
      },
    ],
  },

  {
    /* HELD SLOT. Nothing is decided about this one. Renaming it is this entry
       plus its folder in public/work/ — the slug is the URL, so change both
       together. Deleting it is this entry plus that folder, and nothing else
       on the site needs to know. */
    slug: "fourth-project",
    title: "TODO(shuto) \u2014 fourth project",
    // "Campaign" or "System". Nothing displays it yet; set it when you know.
    category: "Campaign",
    client: "TODO(shuto)",
    year: "TODO(shuto)",
    role: "TODO(shuto)",
    summary: "TODO(shuto) \u2014 one line, once you know what this one is.",
    cover: {
      src: "/work/fourth-project/cover.png",
      alt: "TODO(shuto)",
      aspect: "2560/3840",
    },
    blocks: [
      {
        type: "text",
        body: "TODO(shuto) \u2014 CONTEXT. The brief, and more importantly the constraint you had to work inside.",
      },
      {
        type: "text",
        body: "TODO(shuto) \u2014 DECISION. What you chose, and why. The beat that gets you hired.",
      },
      {
        type: "text",
        body: "TODO(shuto) \u2014 WORK. The artifacts, large.",
      },
      {
        type: "text",
        body: "TODO(shuto) \u2014 OUTCOME. What happened, and how you know.",
      },
    ],
  },

  {
    /* HELD SLOT. Nothing is decided about this one. Renaming it is this entry
       plus its folder in public/work/ — the slug is the URL, so change both
       together. Deleting it is this entry plus that folder, and nothing else
       on the site needs to know. */
    slug: "fifth-project",
    title: "TODO(shuto) \u2014 fifth project",
    // "Campaign" or "System". Nothing displays it yet; set it when you know.
    category: "Campaign",
    client: "TODO(shuto)",
    year: "TODO(shuto)",
    role: "TODO(shuto)",
    summary: "TODO(shuto) \u2014 one line, once you know what this one is.",
    cover: {
      src: "/work/fifth-project/cover.png",
      alt: "TODO(shuto)",
      aspect: "2560/3840",
    },
    blocks: [
      {
        type: "text",
        body: "TODO(shuto) \u2014 CONTEXT. The brief, and more importantly the constraint you had to work inside.",
      },
      {
        type: "text",
        body: "TODO(shuto) \u2014 DECISION. What you chose, and why. The beat that gets you hired.",
      },
      {
        type: "text",
        body: "TODO(shuto) \u2014 WORK. The artifacts, large.",
      },
      {
        type: "text",
        body: "TODO(shuto) \u2014 OUTCOME. What happened, and how you know.",
      },
    ],
  },
];
