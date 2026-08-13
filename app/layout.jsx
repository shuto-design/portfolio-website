import "./globals.css";

export const metadata = {
  title: "shuto.design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-paper font-display text-ink">{children}</body>
    </html>
  );
}
