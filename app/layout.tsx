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
  title: "Maliek Davis | Software Engineer, Real Estate Investor, Entrepreneur",
  description:
    "Maliek Davis is a real estate investor, entrepreneur, and systems innovator using science and technology to build smarter solutions. Explore how he turns bold ideas into strategic action.",
  metadataBase: new URL("https://maliek-davis.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Maliek Davis | Technologist & Real Estate Strategist",
    description:
      "Explore the mind and mission of Maliek Davis — where software, real estate, and personal growth converge to build something greater.",
    url: "https://maliek-davis.com",
    siteName: "Maliek Davis",
    images: "/og-image.png",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maliek Davis | Builder. Strategist. Creator.",
    description:
      "Follow Maliek Davis for insights on tech, real estate, and systems thinking — built to empower.",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="fo-verify" content="9566283a-6eb0-4d52-aa2f-b9a20e09e5d6" />
        <meta name='impact-site-verification' content='fe757e82-3b15-4e97-862b-5cbe40ea8e28' />
        <meta name='impact-site-verification' content='498a267f-4445-4b62-a557-6fa00bdb6847'/>
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
