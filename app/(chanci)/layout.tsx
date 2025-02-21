"use client";
import { Card, Grid, GridCol, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "../globals.css";
import { Poppins } from "next/font/google";
import ChanciHeader from "@/shared/ui/ChanciAI/ChanciHeader";
import Sidebar from "@/shared/ui/ChanciAI/Sidebar";
import { ToastContainer } from "react-toastify";
import { getRequest } from "@/shared/api";
import { chanciAddresses } from "@/shared/constants/relative-url/chanci";
import { useEffect } from "react";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
import HeadRes from "@/features/headRes/HeadRes";

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
  const { updateData } = useChanci();
  interface ChanciResponse {
    isSuccess?: boolean;
    data?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items?: any[]; // Adjust the type as necessary
    };
  }
  const getChanciData = async () => {
    const reqBody = {
      Skip: 0,
      Take: 1000,
    };
    const res: ChanciResponse = await getRequest(
      chanciAddresses.GetAll,
      reqBody,
      true
    );
    if (res?.isSuccess) {
      updateData(res?.data?.items);
    }
  };

  useEffect(() => {
    getChanciData();
  }, []);

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
              <HeadRes />
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
