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

   Ask me for a new block type any time a Figma frame needs one — that's a
   normal part of this working, not a workaround.

   TWO FIELDS THAT MATTER MORE THAN THEY LOOK

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
   ============================================================================ */

export const projects = [
  {
    // The slug is the URL: /work/example-project
    // Lowercase, hyphens instead of spaces, no punctuation.
    slug: "example-project",

    title: "Example Project",

    // "Campaign" or "System". Nothing displays this yet — it's here so that
    // grouping the two kinds of work later is a display change, not a rewrite.
    category: "Campaign",

    client: "Client Name",
    year: "2026",
    role: "Art Direction, Design",

    // One line. Shows on the /work index under the title.
    summary: "A one-line description of the work.",

    // The image representing this project on /work.
    cover: {
      src: "/work/example-project/cover.png",
      alt: "Placeholder cover image",
      aspect: "4/3",
    },

    // The case study itself, top to bottom.
    blocks: [
      {
        type: "text",
        body: "Opening context. What was the brief, what was the constraint, what were you actually solving.\n\nA blank line in this string becomes a paragraph break on the page.",
      },
      {
        type: "image",
        src: "/work/example-project/01.png",
        alt: "Placeholder full-width image",
        aspect: "16/9",
        width: "full", // edge to edge. Use "contained" to sit inside the column.
      },
      {
        type: "duo",
        items: [
          {
            src: "/work/example-project/02.png",
            alt: "Placeholder image, left",
            aspect: "1/1",
          },
          {
            src: "/work/example-project/03.png",
            alt: "Placeholder image, right",
            aspect: "1/1",
          },
        ],
      },
      {
        type: "quote",
        body: "A line worth pulling out — a client reaction, a result, or the idea the whole project rests on.",
        attribution: "Name, Role",
      },
    ],
  },
];
