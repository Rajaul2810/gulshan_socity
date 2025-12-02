import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/Components/Layout/ConditionalLayout";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Gulshan Society",
  description: "Gulshan Society",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} antialiased`}
      >
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
