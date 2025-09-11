import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CalculationTarifProvider } from "./contexts/CalculationTarifContext";

export const metadata: Metadata = {
  title: "Aram Energy Solution",
  description: "Your trusted partner for energy solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <LanguageProvider>
          <CalculationTarifProvider>{children}</CalculationTarifProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
