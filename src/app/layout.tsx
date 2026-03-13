import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IIT Career Fair Placement - CS Undergrad Portal",
  description: "Interactive guide for CS undergraduates at the IIT Career Fair",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://unpkg.com/lucide@latest"></script>
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
