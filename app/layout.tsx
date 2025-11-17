/**
 * Tanglewood Art Gallery - Root Layout
 * Museum in the Dark theme with Playfair Display and Inter fonts
 */

import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CursorTrail } from "@/components/ui/cursor-trail";
import ClientProvider from "@/components/providers/client-provider";
import { CartDrawer } from "@/components/cart/cart-drawer";

// Font configurations
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

// Site metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: "Tanglewood Art Gallery | Original Oil Paintings & Fine Art Prints",
    template: "%s | Tanglewood Art Gallery",
  },
  description:
    "Discover original oil paintings and fine art prints by Dennis Wood. Explore landscapes, portraits, and abstract works in our online gallery.",
  keywords: [
    "oil painting",
    "original artwork",
    "fine art prints",
    "art gallery",
    "contemporary art",
    "Dennis Wood",
    "landscape paintings",
    "portrait paintings",
  ],
  authors: [{ name: "Dennis Wood" }],
  creator: "Dennis Wood",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://tanglewoodart.com",
    siteName: "Tanglewood Art Gallery",
    title: "Tanglewood Art Gallery | Original Oil Paintings & Fine Art Prints",
    description:
      "Discover original oil paintings and fine art prints by Dennis Wood. Explore landscapes, portraits, and abstract works in our online gallery.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tanglewood Art Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanglewood Art Gallery | Original Oil Paintings & Fine Art Prints",
    description:
      "Discover original oil paintings and fine art prints by Dennis Wood.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // TODO: Add your verification codes here
    // google: "your-google-verification-code",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* TODO: Add analytics script here */}
        {/* Example for Google Analytics 4:
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
        */}
      </head>
      <body className="font-sans antialiased scrollbar-museum">
        <ClientProvider>
          {/* Museum cursor trail effect */}
          <CursorTrail />

          {/* Site header with navigation */}
          <Header />

          {/* Main content area */}
          <main className="min-h-screen pt-20">{children}</main>

          {/* Site footer */}
          <Footer />

          {/* Shopping cart drawer */}
          <CartDrawer />
        </ClientProvider>
      </body>
    </html>
  );
}
