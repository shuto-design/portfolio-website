import Image from "next/image";
import Link from "next/link";
import { featured } from "./site-chrome";

export default function Page() {
  return (
    // flex-1 claims whatever height the shell's column has left after the
    // header and the bottom bar. The hero is the only thing on this page, so
    // it takes all of it.
    <main className="mt-6 flex flex-1 flex-col">
      {/*
        The bar underneath says "Featured Case Study", so the image has to go
        somewhere — a full-window picture that isn't clickable is a dead end.
        The accessible name carries both halves, since the words that label
        this link live outside it, down in the footer.
      */}
      <Link
        href={`/work/${featured.slug}`}
        aria-label={`Featured case study: ${featured.title}`}
        className="bg-foreground/10 relative flex-1 overflow-hidden"
      >
        <Image
          src={featured.cover.src}
          alt=""
          fill
          sizes="100vw"
          quality={90}
          priority
          className="object-cover"
        />
      </Link>
    </main>
  );
}
