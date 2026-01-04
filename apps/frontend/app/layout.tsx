import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TickpassNavbar from "./_components/navbar";
import TickPassFooter from "./_components/footer";
import ToastProvider from "./_components/toastify";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TickPass",
  description: "Secure seats, stress-free.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > <TickpassNavbar />
        <ToastProvider />
        <section className="mt-20">
          {children}
        </section>
        <TickPassFooter/>
      </body>
    </html>
  );
}
