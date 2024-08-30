// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../styles/globals.css'
const inter = Inter({ subsets: ["latin"] });

// Export metadata for Server Component
export const metadata: Metadata = {
  title: "App Layout",
  description: "App Layout",
};

// This is a Server Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
