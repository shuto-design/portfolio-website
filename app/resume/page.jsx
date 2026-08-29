export const metadata = {
  title: "Resume",
};

/**
 * Stub. The header nav links here, so this exists purely so nothing 404s.
 *
 * When you have the PDF, there are two ways to go: drop it in public/ and point
 * the nav link straight at the file, in which case this route can be deleted —
 * or keep this page and embed the PDF here with a download link, which keeps
 * visitors on the site and lets you add context around it.
 */
export default function ResumePage() {
  return (
    <main className="px-gutter min-h-dvh py-24">
      <h1 className="text-heading font-bold">Resume</h1>
    </main>
  );
}
