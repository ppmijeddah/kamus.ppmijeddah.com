import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/global.css";
import QueryProvider from "@/lib/react-query";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kamus Amiyah Saudi | PPMI Jeddah",
  description: "Kamus Bahasa Arab Lokal Saudi Arabia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/init-theme.js" />
      </head>
      <body
        className={`${inter.variable} antialiased min-h-svh bg-white dark:bg-pacamara-dark font-pacamara-inter prose dark:prose-invert max-w-full prose-headings:p-0 prose-headings:m-0`}
      >
        <Suspense>
          <QueryProvider>{children}</QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
