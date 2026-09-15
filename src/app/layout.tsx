import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-isai-orpin.vercel.app"),
  title: "Isaí Rodríguez Ortega | Senior Video Producer & Broadcast Operations",
  description: "Senior Video Producer with experience in broadcast operations, live production, REMI workflows, audiovisual storytelling and post-production.",
  keywords: ["Senior Video Producer", "Broadcast Operations", "Live Production", "REMI", "Video Editor", "Technical Producer", "Guadalajara"],
  authors: [{ name: "Isaí Rodríguez Ortega" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Isaí Rodríguez Ortega | Senior Video Producer & Broadcast Operations",
    description: "Senior Video Producer with experience in broadcast operations, live production, REMI workflows, audiovisual storytelling and post-production.",
    url: "/",
    siteName: "Isaí Rodríguez Ortega Portfolio",
    images: ["/og.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Isaí Rodríguez Ortega | Senior Video Producer & Broadcast Operations",
    description: "Broadcast operations, live production, REMI workflows, audiovisual storytelling and post-production.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
