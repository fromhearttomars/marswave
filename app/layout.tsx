import type { Metadata } from "next";
import { Roboto_Condensed } from 'next/font/google';
import { Layout } from '@/components/index'
import "./globals.css";

const montserrat = Roboto_Condensed({ subsets: ['latin'], weight: ['200', '300', '400', '700'], variable: "--font-roboto-condensed" });

export const metadata: Metadata = {
  title: "MarsWave: From the Heart to Mars",
  description: "MarsWave: Meme coin based on the controversial gesture of Elon Musk, flying straight to Mars with a heart-shaped twist.",
  keywords: "MarsWave, meme coin, Elon Musk, cryptocurrency, satire, space, zigs, Mars",

  openGraph: {
    title: "MarsWave: A Meme Coin Born to Zig (or Zag?)",
    description: "Join MarsWave, the meme coin that's riding the wave of a single gesture. Too controversial? Too iconic? Doesn't matter — we're aiming for Mars.",
    images: ["https://fromhearttomars.com/marswave-preview.jpg"],
    url: "https://fromhearttomars.com/",
    type: "website",
  },

  twitter: {
    title: "MarsWave: A Meme Coin Born to Zig (or Zag?)",
    description: "Not sure why we're doing this. But we are. Get on board the MarsWave rocket, powered by sarcasm and a weirdly affectionate gesture from Elon Musk.",
    images: ["https://fromhearttomars.com/marswave-preview.jpg"],
    card: "summary_large_image",
  },

  icons: {
    icon: "/favicon.ico",
  },

  robots: {
    index: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
