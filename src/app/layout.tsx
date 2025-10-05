import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Navber from "@/Components/Layout/Navber";
import Footer from "@/Components/Layout/Footer";

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
        <Navber />
        {children}
        <Footer />
      </body>
    </html>
  );
}
