import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

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
        <header className="site-header">
          <div className="container site-header-inner">
            <nav className="site-nav">
              <Link href="/" className="site-nav-link">
                Home
              </Link>
              <Link href="/courses" className="site-nav-link">
                Courses
              </Link>
              <Link href="/instructors" className="site-nav-link">
                Instructors
              </Link>
            </nav>
          </div>
        </header>

        <main className="layout-main">{children}</main>

        <footer className="site-footer">
          <div className="container">
            <p className="site-footer-copy">Copyright &copy 2026</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
