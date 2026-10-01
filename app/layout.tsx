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
  title: "Building Offline-First React Native Apps | Muhammad Tayyab",
  description:
    "Lessons from building a production offline-first React Native application using SQLite, WatermelonDB, PowerSync and Supabase.",
  openGraph: {
    title: "Building Offline-First React Native Apps | Muhammad Tayyab",
    description:
      "Lessons from building a production offline-first React Native application using SQLite, WatermelonDB, PowerSync and Supabase.",
    type: "article",
    authors: ["Muhammad Tayyab"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building Offline-First React Native Apps | Muhammad Tayyab",
    description:
      "Lessons from building a production offline-first React Native application using SQLite, WatermelonDB, PowerSync and Supabase.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
