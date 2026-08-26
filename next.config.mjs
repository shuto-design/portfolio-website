/**
 * Next.js configuration.
 *
 * Only images are configured here, and both settings exist for a specific reason
 * (Next 16 changed the defaults in ways that quietly hurt image-heavy sites):
 *
 *   formats   — Next only produces WebP by default. AVIF is roughly 20% smaller at
 *               the same visual quality, and browsers that don't support it fall
 *               back to WebP automatically. No downside.
 *
 *   qualities — Next 16 made this an allowlist, defaulting to [75] only. Any other
 *               `quality` value on an <Image> is silently snapped to the nearest
 *               allowed number. Listing 90 here is what lets a hero image actually
 *               render at 90 instead of pretending to.
 */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
};

export default nextConfig;
