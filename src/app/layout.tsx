import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { locale } from "@/lib/locale";

const title = locale === "es"
  ? "Isaí Rodríguez Ortega | Productor audiovisual sénior y operaciones de televisión"
  : "Isaí Rodríguez Ortega | Senior Video Producer & Broadcast Operations";
const description = locale === "es"
  ? "Productor audiovisual sénior con experiencia en operaciones de televisión, producción en vivo, flujos REMI, narrativa audiovisual y posproducción."
  : "Senior Video Producer with experience in broadcast operations, live production, REMI workflows, audiovisual storytelling and post-production.";

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
  title,
  description,
  keywords: ["Senior Video Producer", "Broadcast Operations", "Live Production", "REMI", "Video Editor", "Technical Producer", "Guadalajara"],
  authors: [{ name: "Isaí Rodríguez Ortega" }],
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: locale === "es" ? "Portafolio de Isaí Rodríguez Ortega" : "Isaí Rodríguez Ortega Portfolio",
    images: ["/og.png"],
    locale: locale === "es" ? "es_MX" : "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
