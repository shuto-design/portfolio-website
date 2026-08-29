export const metadata = {
  title: "Resume",
};

/**
 * Stub. Nothing links here any more — the nav slot this used to fill now goes
 * to About — but the route still resolves, so an old link or a bookmark won't
 * 404. It's deliberately left out of sitemap.js, so search engines ignore it.
 *
 * When you have the PDF, there are two ways to go: drop it in public/ and link
 * straight at the file, in which case this route can be deleted — or keep this
 * page and embed the PDF here with a download link, which keeps visitors on the
 * site and lets you add context around it. Either way it needs a nav slot back,
 * or a link from somewhere else, before anyone will find it.
 */
export default function ResumePage() {
  return (
    <main className="mt-6 flex-1">
      <h1 className="text-heading font-bold">Resume</h1>
    </main>
  );
}
