import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnHub - Learn something new",
  description:
    "LearnHub is modern platform for learning NextJS and other modern technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="layout">
        <Header />

        <main className="layout-main">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
