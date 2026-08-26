import Link from "next/link";
import "./intro.css";

/**
 * Runs as an inline script during HTML parsing, so it finishes before the
 * browser's first paint. It measures where each animated element actually
 * rests and writes the exact travel distances into CSS variables.
 *
 * Why measure rather than hardcode the distances: each rule's resting position
 * comes out of the flex layout, so as a fraction of viewport height it shifts
 * when the window gets shorter. Fixed constants would leave the two rules
 * landing at slightly different heights during the load phase — and they have
 * to sit exactly on top of each other to read as a single line.
 *
 * intro.css carries fallback values that are correct at 1920x1080, so nothing
 * looks broken if this never runs.
 */
const MEASURE = `
(function () {
  var root = document.documentElement;
  if (root.dataset.intro !== "run") return;

  var H = window.innerHeight;
  var cs = getComputedStyle(root);
  var lineY = parseFloat(cs.getPropertyValue("--intro-line-y")) * H;
  var markY = parseFloat(cs.getPropertyValue("--intro-wordmark-y")) * H;

  // offsetTop and offsetHeight are layout values, and CSS transforms do not
  // affect them. That is what lets this read an element's true resting
  // position even though the intro has already transformed it elsewhere.
  // Everything measured is written to <html>, never to the elements themselves.
  // That is deliberate: setting an inline style on an element React rendered
  // gives it an attribute React did not, and React reports that as a hydration
  // mismatch — then recovers by rebuilding those elements, which throws these
  // measurements away. <html> is already excluded from that check (see
  // suppressHydrationWarning in layout.jsx), so writing here is safe.
  // intro.css maps each variable onto the element that needs it.
  var rules = document.querySelectorAll("[data-intro-rule]");
  for (var i = 0; i < rules.length; i++) {
    var r = rules[i];
    var dy = lineY - (r.offsetTop + r.offsetHeight / 2);
    root.style.setProperty("--intro-dy-" + r.dataset.introRule, dy + "px");
  }

  var mark = document.querySelector("[data-intro-wordmark]");
  if (mark) {
    // transform-origin is "left top", so scaling never moves the top edge.
    // That is why this is a plain subtraction and not trigonometry.
    root.style.setProperty("--intro-dy-wordmark", (markY - mark.offsetTop) + "px");

    // Measure the hero-to-wordmark ratio rather than assuming it. Both sizes
    // are clamped, so the ratio is ~3.95 through the fluid range but only
    // ~1.9 on a small phone where both sizes hit their floors.
    //
    // The probe is created and removed inside this same synchronous block, so
    // it leaves no trace in the DOM for React to disagree about later.
    var probe = document.createElement("span");
    probe.style.cssText = "position:absolute;visibility:hidden;font-size:var(--text-hero)";
    document.body.appendChild(probe);
    var big = parseFloat(getComputedStyle(probe).fontSize);
    var small = parseFloat(getComputedStyle(mark).fontSize);
    probe.remove();
    if (big && small) root.style.setProperty("--intro-scale-measured", big / small);
  }

  // Let anyone cut it short. Recruiters do not wait for animations.
  function finish() {
    root.dataset.intro = "done";
    window.removeEventListener("pointerdown", finish);
    window.removeEventListener("keydown", finish);
  }
  setTimeout(finish, 1700);
  window.addEventListener("pointerdown", finish);
  window.addEventListener("keydown", finish);
})();
`;

export default function Page() {
  return (
    // overflow-x-clip rather than overflow-x-hidden: `clip` does not create a
    // scroll container, so vertical scrolling is untouched. It stops the label —
    // which starts a full content-width off to the left — widening the page.
    <div className="relative flex min-h-dvh flex-col overflow-x-clip px-gutter pt-[1.75vw] pb-[1.85vw]">
      <header>
        <div className="flex items-baseline justify-between">
          <h1
            data-intro-wordmark
            className="text-wordmark leading-none font-bold"
          >
            Shuto.
          </h1>

          <nav
            data-intro-in
            className="text-nav flex gap-[2.35vw] leading-none font-medium"
          >
            <Link href="/work">Work</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/resume">Resume</Link>
          </nav>
        </div>

        {/*
          The rules are their own elements rather than borders, because they have
          to move independently and a border cannot be translated on its own.
          They are aria-hidden: the <header> and <main> landmarks already tell a
          screen reader where the page divides, so announcing these would only
          add noise — and an <hr> would be announced as a thematic break.
        */}
        <div
          data-intro-rule="top"
          aria-hidden="true"
          className="bg-foreground mt-[0.5vw] h-[clamp(2px,0.21vw,4px)]"
        />
      </header>

      <main className="flex flex-1 flex-col">
        {/*
          PLACEHOLDER — waiting on the Travelpro case study images.
          flex-1 makes it absorb whatever height is left over, which is what
          reproduces frame 5 at any window size rather than only at one.
        */}
        <div data-intro-in className="bg-accent mt-[3.25vw] flex-1" />

        <h2
          data-intro-in
          className="text-featured mt-[2.1vw] leading-none font-medium"
        >
          Featured | The Many Case Studies of Travelpro
        </h2>

        <div
          data-intro-rule="bottom"
          aria-hidden="true"
          className="bg-foreground mt-[0.85vw] h-[clamp(2px,0.21vw,4px)]"
        />

        <p
          data-intro-in
          className="text-caption mt-[1.1vw] leading-none font-medium"
        >
          Check out the journey of my work at Travelpro.
        </p>
      </main>

      {/*
        Intro-only. Absolutely positioned and opacity-0 at rest, so once the
        animation is over it takes up no space and shows nothing.
      */}
      <div data-intro-label aria-hidden="true">
        <p className="text-label text-right leading-none font-medium">
          Graphic Designer
        </p>
      </div>

      {/*
        The type switch is from Next's flash-prevention guide: React warns in
        development when rendering <script> tags, and this sidesteps it while
        still emitting a real executable script in the served HTML.
      */}
      <script
        type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: MEASURE }}
      />
    </div>
  );
}
