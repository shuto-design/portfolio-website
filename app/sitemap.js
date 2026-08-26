import { projects } from "./work/projects";

const BASE = "https://shuto.design";

/**
 * Generates /sitemap.xml — the list of pages search engines should know about.
 * Project pages are derived from projects.js, so adding a project adds it here
 * automatically. Nothing to maintain.
 */
export default function sitemap() {
  const lastModified = new Date();

  const pages = ["", "/work", "/about", "/contact"].map((path) => ({
    url: `${BASE}${path}`,
    lastModified,
  }));

  const projectPages = projects.map((project) => ({
    url: `${BASE}/work/${project.slug}`,
    lastModified,
  }));

  return [...pages, ...projectPages];
}
