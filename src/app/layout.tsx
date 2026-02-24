import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const APP_URL = "https://cloudly-weather-app.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Cloudly Weather App",
    template: "%s | Cloudly Weather App",
  },
  description:
    "Check real-time weather conditions and 5-day forecast for any city around the world. Fast, modern and mobile-friendly.",
  applicationName: "Cloudly Weather App",
  authors: [{ name: "LSzpilowski", url: APP_URL }],
  keywords: ["cloudly", "weather", "forecast", "temperature", "wind", "humidity", "5-day forecast"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: APP_URL,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "android-chrome", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "android-chrome", url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
  openGraph: {
    type: "website",
    url: APP_URL,
    siteName: "Weather App",
    title: "Weather App – Real-time weather & 5-day forecast",
    description:
      "Check real-time weather conditions and 5-day forecast for any city around the world.",
    images: [
      {
        url: `${APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Weather App – Real-time weather & 5-day forecast",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather App – Real-time weather & 5-day forecast",
    description:
      "Check real-time weather conditions and 5-day forecast for any city around the world.",
    images: [`${APP_URL}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
