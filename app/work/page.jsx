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
      justify-end matters only where the row is capped — which is to say, on a
      phone. There the row is shorter than the space available, and this decides
      where the leftover goes: above it, under the wordmark, rather than between
      the row and the bottom bar. So the gap under the tiles is always the bar's
      own margin and nothing else, at every size.

      Air under a wordmark reads as layout. The same air between the work and
      the line naming the work reads as a bug, because it separates the two
      things the page is trying to connect.

      On a window wide enough for the row to fill, there is no leftover and this
      does nothing.
    */
    <main className="flex flex-1 flex-col justify-end">
      <WorkRow projects={projects} />
    </main>
  );
}
