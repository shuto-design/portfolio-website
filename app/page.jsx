export default function Page() {
  return (
    // Mobile centers the block vertically. From `lg` up, 15dvh of top padding
    // shifts it down so its midpoint sits at 57.5% of the viewport height —
    // the low placement in the desktop frame.
    <main className="flex min-h-dvh flex-col justify-center px-[clamp(1.5rem,4.25vw,5rem)] lg:pt-[12.8dvh]">
      {/*
        The rule is a border on the <h1>, not an <hr>. A block-level heading is
        already full width, so this draws the exact line in the design without
        extra markup — and avoids <hr>, which screen readers announce as a
        thematic break, which this isn't.

        leading-none matters: Geist's default line height would add invisible
        space under the text and push the rule away from where it's drawn.
      */}
      <h1 className="border-b-[clamp(2px,0.21vw,4px)] pb-[2.12vw] text-hero leading-none font-bold tracking-[-0.03em]">
        Shuto.
      </h1>

      <p className="mt-[1.89vw] text-right text-label leading-none font-medium">
        Performance Designer
      </p>
    </main>
  );
}
