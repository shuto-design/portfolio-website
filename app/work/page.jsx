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
    <main className="flex flex-1 flex-col">
      <WorkRow projects={projects} />
    </main>
  );
}
