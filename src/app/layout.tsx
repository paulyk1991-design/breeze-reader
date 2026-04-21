import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://breeze-reader.vercel.app";
const title = "Breeze Reader — Read PDFs faster, effortlessly";
const description =
  "Breeze Reader makes reading effortless by bolding the first few letters of each word — a simple visual assist that helps your eyes move through text faster. Runs entirely in your browser, nothing is uploaded.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Breeze Reader",
  keywords: [
    "breeze reader",
    "pdf reader",
    "speed reading",
    "focus reading",
    "accessibility",
    "pdf converter",
    "focus-bolded text",
  ],
  authors: [{ name: "Breeze Reader" }],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Breeze Reader",
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
