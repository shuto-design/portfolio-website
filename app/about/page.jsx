export const metadata = {
  title: "About",
};

// Structural placeholder. Waiting on a Figma frame.
export default function AboutPage() {
  return (
    <main className="max-w-measure mt-6 flex-1">
      <h1 className="text-heading font-bold">About</h1>

      {/* Moved here from /contact when Contact left the nav — otherwise the
          only way to reach you would be a URL nothing links to. */}
      <p className="mt-3">
        <a href="mailto:shutocody@gmail.com">shutocody@gmail.com</a>
      </p>
    </main>
  );
}
