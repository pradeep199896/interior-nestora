import type { Metadata } from "next";
import { company, seo } from "@/lib/config";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
export const metadata: Metadata = {
  robots: process.env.NEXT_PUBLIC_SITE_URL
    ? { index: true, follow: true }
    : { index: false, follow: false },
  metadataBase: new URL(company.siteUrl),
  title: { default: seo.home.title, template: "%s | Nestora Interiors" },
  description: seo.home.description,
  icons: {
    icon: '/images/logo.jpeg',
    apple: '/images/logo.jpeg',
    shortcut: '/images/logo.jpeg',
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
