import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://bionic-pdf.vercel.app";
const title = "Bionic PDF — Read PDFs faster with bionic formatting";
const description =
  "Convert any PDF into bionic reading format in seconds. Bold letters guide your eyes through text for faster reading. Runs entirely in your browser — nothing is uploaded.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Bionic PDF",
  keywords: [
    "bionic reading",
    "pdf",
    "speed reading",
    "accessibility",
    "bionic text",
    "pdf converter",
  ],
  authors: [{ name: "Bionic PDF" }],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Bionic PDF",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
