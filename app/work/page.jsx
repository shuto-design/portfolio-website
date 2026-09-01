import { WorkRow } from "./row";
import { projects } from "./projects";

export const metadata = {
  title: "Work",
  description: "Selected campaign work and design systems.",
};

/**
 * Stays a Server Component so it can export metadata — the row itself has to
 * be a Client Component to handle hover, so it lives in its own file.
 */
export default function WorkPage() {
  return (
    /*
      THE CAP LIVES HERE, ON <main>, AND THAT IS WHAT PUTS THE LEFTOVER BELOW
      THE BAR.

      The row is capped on a phone — see row.jsx for where the number comes
      from. Whichever box carries that cap is the box that stops growing, and
      the free space then collects wherever that box's parent puts it.

      Cap the row and the free space is trapped inside <main>, above the bar,
      which is the band of white this replaced. Cap <main> instead and the free
      space belongs to the shell in layout.jsx — a column packed from the top —
      so it collects after the LAST item, which is the bar. Header, work, bar,
      then air.

      That ordering is also what makes the bar's copy able to grow. Longer
      wrapped copy eats into the air underneath it rather than pushing up into
      the work, so the row keeps its size and its distance from the bar no
      matter how many lines the caption runs to.

      mt-6 sits out here rather than on the row inside, so it isn't counted
      against the cap — the cap is the height of the work, not of the work plus
      the space above it.

      On a window wide enough for the row to fill, the cap never binds, <main>
      takes the height it always did, and there is no free space to place.
    */
    <main className="mt-6 flex max-h-[calc(150vw-6.75rem)] flex-1 flex-col">
      <WorkRow projects={projects} />
    </main>
  );
}
