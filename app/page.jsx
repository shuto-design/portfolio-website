import Link from "next/link";

export default function Page() {
  return (
    <div className="px-gutter flex min-h-dvh flex-col pt-[1.75vw] pb-[1.85vw]">
      <header>
        <div className="flex items-baseline justify-between">
          <h1 className="text-wordmark leading-none font-bold">Shuto.</h1>

          <nav className="text-nav flex gap-[2.35vw] leading-none font-medium">
            <Link href="/work">Work</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/resume">Resume</Link>
          </nav>
        </div>

        {/*
          The two rules are aria-hidden: the <header> and <main> landmarks
          already tell a screen reader where the page divides, so announcing
          these would only add noise — and an <hr> would be announced as a
          thematic break.
        */}
        <div
          aria-hidden="true"
          className="bg-foreground mt-[0.5vw] h-[clamp(2px,0.21vw,4px)]"
        />
      </header>

      <main className="flex flex-1 flex-col">
        {/*
          PLACEHOLDER — waiting on the Travelpro case study images.
          flex-1 makes it absorb whatever height is left over, which is what
          holds the layout at any window size rather than only at one.
        */}
        <div className="bg-foreground/10 mt-[3.25vw] flex-1" />

        <h2 className="text-featured mt-[2.1vw] leading-none font-medium">
          Featured | The Many Case Studies of Travelpro
        </h2>

        <div
          aria-hidden="true"
          className="bg-foreground mt-[0.85vw] h-[clamp(2px,0.21vw,4px)]"
        />

        <p className="text-caption mt-[1.1vw] leading-none font-medium">
          Check out the journey of my work at Travelpro.
        </p>
      </main>
    </div>
  );
}
