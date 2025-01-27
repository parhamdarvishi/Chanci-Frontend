import type { Metadata } from "next";
// import { Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./globals.css";
import Header from "./shared/ui/Header/header";
import Footer from "./shared/ui/Footer/footer";
import { ModalsProvider } from "@mantine/modals";

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NGN",
  description: "Welcome to NGN",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="104*104"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={poppins.className}>
        <MantineProvider>
          <ModalsProvider>
            <Header />
            {children}
            <Footer />
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
