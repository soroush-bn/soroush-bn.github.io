import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const excalifont = localFont({
  src: "../public/Excalifont-Regular.woff2",
  variable: "--font-excalifont",
});

export const metadata: Metadata = {
  title: "Soroush Baghernezhad",
  description: "ML Researcher @ UCML Lab | Software Engineer | Mobile Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${excalifont.variable} h-full antialiased`}>
      <body className={`min-h-full flex flex-col font-sans`}>{children}</body>
    </html>
  );
}
