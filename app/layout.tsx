import type { Metadata } from "next";
import { Geist, Vazirmatn } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hivam.ir"),

  title: {
    default: "های وام | مقایسه هوشمند خرید اقساطی خودرو",
    template: "%s | های وام",
  },

  description:
    "های وام سامانه هوشمند مقایسه شرایط خرید اقساطی خودرو و شرکت‌های واسپاری است. نرخ سود، مبلغ اقساط، پیش‌پرداخت و شرایط شرکت‌های مختلف را در چند ثانیه مقایسه کنید.",

  keywords: [
    "های وام",
    "وام خودرو",
    "خرید اقساطی خودرو",
    "لیزینگ خودرو",
    "واسپاری",
    "شرکت واسپاری",
    "مقایسه وام خودرو",
    "اقساط خودرو",
    "وام خرید خودرو",
  ],

  authors: [
    {
      name: "HiVam",
      url: "https://hivam.ir",
    },
  ],

  creator: "HiVam",
  publisher: "HiVam",

  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://hivam.ir",
    siteName: "های وام",
    title: "های وام | مقایسه هوشمند خرید اقساطی خودرو",
    description:
      "شرایط شرکت‌های واسپاری را مقایسه کنید و بهترین گزینه خرید اقساطی خودرو را انتخاب کنید.",
  },

  twitter: {
    card: "summary_large_image",
    title: "های وام",
    description:
      "مقایسه هوشمند شرایط خرید اقساطی خودرو",
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://hivam.ir",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={cn(
        "scroll-smooth",
        geist.variable,
        vazirmatn.variable
      )}
    >
      <body
        className={cn(
          vazirmatn.className,
          "min-h-screen bg-white text-slate-900 antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
}