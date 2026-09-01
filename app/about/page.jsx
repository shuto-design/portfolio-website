export const metadata = {
  title: "About",
};

// Structural placeholder. Waiting on a Figma frame.
export default function AboutPage() {
  return (
    <main className="max-w-measure mt-6 flex-1">
      {/* No <h1>: the wordmark above already reads "Shuto/About." — see
          site-header.jsx. Printing the same word again underneath it was the
          duplication this page had before the heading moved up there. */}

      {/* Moved here from /contact when Contact left the nav — otherwise the
          only way to reach you would be a URL nothing links to. */}
      <p>
        <a href="mailto:shutocody@gmail.com">shutocody@gmail.com</a>
      </p>
    </main>
  );
}
