import { notFound } from "next/navigation";
import { Block } from "../blocks";
import { projects } from "../projects";

/**
 * Tells Next which project pages exist so it can build them all ahead of time
 * as static HTML. That's why case studies load instantly — nothing is computed
 * when a visitor arrives.
 */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  // Just the name — the root layout's template turns this into
  // "Example Project — shuto.design".
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }) {
  // `params` is a Promise in Next 16, so it has to be awaited. Most tutorials
  // still show the older synchronous version, which errors here.
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <main className="py-24">
      <header className="mx-auto max-w-2xl px-6">
        <h1 className="text-4xl">{project.title}</h1>
        <p className="mt-4 opacity-60">{project.summary}</p>

        <dl className="mt-10 grid grid-cols-2 gap-y-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="opacity-60">Client</dt>
            <dd className="mt-1">{project.client}</dd>
          </div>
          <div>
            <dt className="opacity-60">Year</dt>
            <dd className="mt-1">{project.year}</dd>
          </div>
          <div>
            <dt className="opacity-60">Role</dt>
            <dd className="mt-1">{project.role}</dd>
          </div>
        </dl>
      </header>

      {/* Your blocks, in the order they appear in projects.js */}
      <div className="mt-20 space-y-20">
        {project.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </main>
  );
}
