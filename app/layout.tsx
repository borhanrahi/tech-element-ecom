import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../components/providers/ReduxProvider";
import LayoutProvider from "../components/providers/LayoutProvider";
import { Toaster } from "../components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tech Element - Modern E-commerce Store",
  description:
    "Discover quality products with our modern, mobile-first shopping experience. Fast, secure, and user-friendly online store.",
  keywords: "ecommerce, online store, shopping, products, tech element",
  authors: [{ name: "Tech Element" }],
  openGraph: {
    title: "Tech Element - Modern E-commerce Store",
    description:
      "Discover quality products with our modern, mobile-first shopping experience.",
    type: "website",
    siteName: "Tech Element",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Element - Modern E-commerce Store",
    description:
      "Discover quality products with our modern, mobile-first shopping experience.",
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
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Tech Element",
              url: "https://techelement.com",
              logo: "https://techelement.com/logo.png",
              description:
                "Modern e-commerce store offering quality products with exceptional user experience.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-800-TECH-HELP",
                contactType: "customer service",
                availableLanguage: "English",
              },
              sameAs: [
                "https://twitter.com/techelement",
                "https://facebook.com/techelement",
                "https://instagram.com/techelement",
              ],
            }),
          }}
        />

        <ReduxProvider>
          <LayoutProvider>{children}</LayoutProvider>
          <Toaster richColors position="top-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}
