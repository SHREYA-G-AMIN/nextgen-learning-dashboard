import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/layout/Sidebar";
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
  title: "AetherLearn - Next-Gen Student Dashboard",
  description: "A hardware-accelerated educational space powered by Server Components.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#050508] text-zinc-100 flex flex-col relative overflow-x-hidden">
        {/* Animated ambient mesh gradients */}
        <div className="mesh-background" />
        <div className="grid-overlay" />

        <div className="flex flex-col md:flex-row w-full min-h-screen">
          {/* Collapsible/responsive sidebar */}
          <Sidebar />

          {/* Main content grid section: responsive paddings to fit sidebar columns */}
          <main className="flex-1 w-full px-4 py-6 md:p-8 md:pl-28 lg:pl-72 pb-24 md:pb-8 transition-all duration-300">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
