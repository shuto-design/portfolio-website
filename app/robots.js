/** Generates /robots.txt. Allows every search engine, points at the sitemap. */
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://shuto.design/sitemap.xml",
  };
}
