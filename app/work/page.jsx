import Image from "next/image";
import Link from "next/link";
import { projects } from "./projects";

export const metadata = {
  title: "Work",
  description: "Selected campaign work and design systems.",
};

export default function WorkPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-heading font-bold">Work</h1>

      <ul className="mt-16 space-y-20">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/work/${project.slug}`} className="block">
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: project.cover.aspect }}
              >
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  quality={90}
                  className="object-cover"
                />
              </div>
              <h2 className="text-subhead mt-5">{project.title}</h2>
              <p className="mt-1">{project.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
