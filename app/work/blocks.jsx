import Image from "next/image";

/* ============================================================================
   BLOCK COMPONENTS

   This file decides how each block TYPE looks. projects.js decides which blocks
   a project uses and in what order. That split is deliberate: you can rearrange
   a case study without touching design, and I can restyle every case study at
   once without touching your content.

   Everything here is structural placeholder styling — correct sizing, correct
   aspect ratios, no layout shift — and deliberately plain. The real design
   arrives from your Figma frames.
   ============================================================================ */

// Placeholder widths. These become real numbers once there's a Figma frame.
const PROSE = "mx-auto max-w-2xl px-6";
const WIDE = "mx-auto max-w-4xl px-6";

function TextBlock({ body }) {
  // whitespace-pre-line means line breaks you type in projects.js show up as
  // line breaks on the page. Write naturally; no markup needed.
  return (
    <div className={PROSE}>
      <p className="whitespace-pre-line leading-relaxed">{body}</p>
    </div>
  );
}

function ImageBlock({ src, alt, aspect = "16/9", width = "contained" }) {
  const isFull = width === "full";
  return (
    <figure className={isFull ? "" : WIDE}>
      <div
        className="relative w-full overflow-hidden"
        // aspectRatio is an inline style rather than a Tailwind class because
        // the value comes from your data at runtime, and Tailwind can only
        // generate classes it can see in the source at build time.
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={isFull ? "100vw" : "(max-width: 896px) 100vw, 896px"}
          quality={90}
          className="object-cover"
        />
      </div>
    </figure>
  );
}

function DuoBlock({ items = [] }) {
  return (
    <div className={`${WIDE} grid gap-4 sm:grid-cols-2`}>
      {items.map((item, i) => (
        <div
          key={i}
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: item.aspect ?? "1/1" }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 640px) 100vw, 448px"
            quality={90}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

function QuoteBlock({ body, attribution }) {
  return (
    <figure className={PROSE}>
      <blockquote className="text-2xl leading-snug text-balance">
        {body}
      </blockquote>
      {attribution && (
        <figcaption className="mt-3 text-sm opacity-60">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}

const BLOCK_TYPES = {
  text: TextBlock,
  image: ImageBlock,
  duo: DuoBlock,
  quote: QuoteBlock,
};

/**
 * Renders one block. If you typo a block type, this tells you so in plain
 * language while you're developing instead of showing a blank space or
 * crashing the page. Visitors never see the message.
 */
export function Block({ block }) {
  const Component = BLOCK_TYPES[block.type];

  if (!Component) {
    if (process.env.NODE_ENV !== "production") {
      return (
        <div className={`${PROSE} border border-accent p-4 text-sm`}>
          Unknown block type: <code>&quot;{block.type}&quot;</code>. Available
          types are: {Object.keys(BLOCK_TYPES).join(", ")}.
        </div>
      );
    }
    return null;
  }

  return <Component {...block} />;
}
