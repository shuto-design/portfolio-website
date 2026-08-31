import Link from "next/link";

/*
  Next renders this inside the root layout for any URL that doesn't match a
  route, so the header and the bottom bar are already on the page — this file
  only owns what goes between them. Next also injects `noindex` for anything
  returning a 404, so this can't end up in search results.

  No metadata export here: only `global-not-found.js` supports one, and this
  page inherits the layout's title template instead.

  TODO(shuto): your words. This is functional text, not designed copy.
*/
export default function NotFound() {
  return (
    <main className="max-w-measure mt-6 flex-1">
      <h1 className="text-heading font-bold">404</h1>

      <p className="mt-3">
        That page doesn&rsquo;t exist. The <Link href="/work">work</Link> is
        probably what you came for.
      </p>
    </main>
  );
}
