"use client";
import { Card, Grid, GridCol, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "../globals.css";
import { Poppins } from "next/font/google";
import ChanciHeader from "@/shared/ui/ChanciAI/ChanciHeader";
import Sidebar from "@/shared/ui/ChanciAI/Sidebar";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function ChanciRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const getChan
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ToastContainer />
        <MantineProvider>
          <Grid
            gutter={{ md: 15 }}
            style={{
              padding: "1rem",
              backgroundColor: "#F7F7F7",
              height: "100vh",
            }}
          >
            <GridCol span={{ base: 12, md: 3 }}>
              <Sidebar />
            </GridCol>
            <GridCol span={{ base: 12, md: 9 }}>
              <ChanciHeader />
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                className="chanciSection"
              >
                {children}
              </Card>
            </GridCol>
          </Grid>
        </MantineProvider>
      </body>
    </html>
  );
}
