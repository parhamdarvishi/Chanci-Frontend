import type { Metadata } from "next";
// import { Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./globals.css";
import Header from "./shared/ui/Header/header";
import Footer from "./shared/ui/Footer/footer";

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
      <body className={poppins.className}>
        <MantineProvider>
          <Header />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
