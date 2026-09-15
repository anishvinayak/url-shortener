import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SnapLink",
    template: "%s | SnapLink",
  },
  description:
    "A distributed URL shortener built with Next.js, Redis, BullMQ, PostgreSQL, Prisma, and Nginx.",

  keywords: [
    "URL Shortener",
    "Next.js",
    "Redis",
    "BullMQ",
    "Prisma",
    "PostgreSQL",
    "Nginx",
    "Distributed Systems",
    "Backend Project",
  ],

  authors: [{ name: "Anish Kamboj" }],
  creator: "Anish Kamboj",

  applicationName: "SnapLink",

  openGraph: {
    title: "SnapLink",
    description:
      "A distributed URL shortener with Redis caching, BullMQ workers, PostgreSQL, and Nginx.",
    type: "website",
    locale: "en_US",
    siteName: "SnapLink",
  },

  twitter: {
    card: "summary_large_image",
    title: "SnapLink",
    description:
      "Distributed URL shortening powered by Redis, BullMQ, and PostgreSQL.",
  },

  robots: {
    index: true,
    follow: true,
  },

  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}