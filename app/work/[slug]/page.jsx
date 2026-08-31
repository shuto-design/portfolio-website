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

/*
  Every case study that exists is in projects.js, so a slug outside that list
  is a typo or a dead link — never a page waiting to be built. `false` makes
  those URLs stop matching this route at all, so they fall through to the same
  prebuilt 404 as any other miss.

  Without it, Next matches the route, starts rendering, then throws notFound()
  mid-stream: the visitor gets a blank document with the 404 arriving only once
  JavaScript loads, and no `noindex` on it.
*/
export const dynamicParams = false;

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

  // dynamicParams = false already turns an unknown slug away before it reaches
  // here. Kept as the backstop for anything that slips past it.
  if (!project) notFound();

  return (
    <main className="mt-6 flex-1">
      <header className="max-w-measure">
        <h1 className="text-heading font-bold">{project.title}</h1>
        <p className="mt-2">{project.summary}</p>

        <dl className="text-small mt-5 grid grid-cols-2 gap-y-2 sm:grid-cols-3">
          <div>
            <dt>Client</dt>
            <dd className="mt-1 font-bold">{project.client}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd className="mt-1 font-bold">{project.year}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd className="mt-1 font-bold">{project.role}</dd>
          </div>
        </dl>
      </header>

      {/* Your blocks, in the order they appear in projects.js */}
      <div className="mt-10 space-y-10">
        {project.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </main>
  );
}
