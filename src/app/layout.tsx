import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CalculationTarifProvider } from "./contexts/CalculationTarifContext";

export const metadata: Metadata = {
  title: {
    default: "Aram Energy Solution - Your Trusted Energy Partner",
    template: "%s | Aram Energy Solution",
  },
  description:
    "Discover transparent energy solutions with Aram Energy Solution. Calculate tariffs, compare providers, and switch to sustainable energy with our expert services.",
  keywords: [
    "energy solutions",
    "electricity tariffs",
    "gas providers",
    "renewable energy",
    "energy calculator",
    "Germany energy",
  ],
  authors: [{ name: "Aram Energy Solution" }],
  creator: "Aram Energy Solution",
  publisher: "Aram Energy Solution",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aram-energy-solution.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      de: "/de",
    },
  },
  openGraph: {
    title: "Aram Energy Solution - Your Trusted Energy Partner",
    description:
      "Discover transparent energy solutions with Aram Energy Solution. Calculate tariffs, compare providers, and switch to sustainable energy.",
    url: "https://aram-energy-solution.com",
    siteName: "Aram Energy Solution",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aram Energy Solution - Your Trusted Energy Partner",
    description:
      "Discover transparent energy solutions with Aram Energy Solution.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {""}
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`antialiased`}>
        <LanguageProvider>
          <CalculationTarifProvider>{children}</CalculationTarifProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
