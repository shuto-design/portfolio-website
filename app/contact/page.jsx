export const metadata = {
  title: "Contact",
};

/**
 * Stub. Nothing links here any more — the nav is Work and About now, and the
 * email moved onto /about — but the route still resolves, so an old link or a
 * bookmark won't 404.
 *
 * If a real contact page arrives from Figma later, it needs a nav slot back in
 * SECTIONS (app/site-chrome.js) or a link from somewhere else before anyone
 * will find it.
 */
export default function ContactPage() {
  return (
    <main className="max-w-measure mt-6 flex-1">
      <h1 className="text-heading font-bold">Contact</h1>
      <p className="mt-3">
        <a href="mailto:shutocody@gmail.com">shutocody@gmail.com</a>
      </p>
    </main>
  );
}
