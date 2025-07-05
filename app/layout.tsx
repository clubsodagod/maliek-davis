import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/layout/Providers";
import GradientUnderlay from "@/components/underlay/GradientUnderlay";
import { Asap } from 'next/font/google';

export const asap = Asap({
  variable: '--font-asap',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});



export const metadata: Metadata = {
  title: "Maliek Davis ",
  description: "Software Engineer| Real Estate Investor | Entrepreneur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Your verification meta tag */}
        <meta name="fo-verify" content="9566283a-6eb0-4d52-aa2f-b9a20e09e5d6" />
      </head>
      <body
        className={`${asap.variable} antialiased h-[100dvh] overflow-x-clip `}
      >
        <GradientUnderlay />
        <Providers>
          {children}
        </Providers>
        
      </body>
    </html>
  );
}
