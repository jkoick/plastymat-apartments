import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lakeside Residences - Premium Waterfront Living",
  description:
    "Experience modern luxury in our thoughtfully designed apartments featuring panoramic lake views, premium finishes, and contemporary amenities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        />
        <script src="https://unpkg.com/aos@2.3.1/dist/aos.js" async></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
