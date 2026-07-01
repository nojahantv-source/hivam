import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";

import "./globals.css";

import { BRAND } from "@/lib/config/brand";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${BRAND.domain}`),

  title: {
    default: BRAND.name,
    template: `%s | ${BRAND.name}`,
  },

  description: BRAND.shortDescription,

  applicationName: BRAND.englishName,

  keywords: [
    "به وام",
    "BehVam",
    "وام خودرو",
    "خرید اقساطی خودرو",
    "تامین مالی خودرو",
    "لیزینگ خودرو",
  ],

  authors: [
    {
      name: BRAND.company,
    },
  ],

  creator: BRAND.company,

  publisher: BRAND.company,

  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: `https://${BRAND.domain}`,
    siteName: BRAND.name,
    title: BRAND.name,
    description: BRAND.shortDescription,
  },

  twitter: {
    card: "summary_large_image",
    title: BRAND.name,
    description: BRAND.shortDescription,
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        {children}
      </body>
    </html>
  );
}