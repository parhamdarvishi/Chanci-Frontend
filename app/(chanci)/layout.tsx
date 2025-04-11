"use client";
import {
  MantineProvider,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "../globals.css";
import { Poppins } from "next/font/google";
import { getRequest } from "@/shared/api";
import { chanciAddresses } from "@/shared/constants/relative-url/chanci";
import { useEffect } from "react";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
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
      items?: any[]; // Adjust the type as necessary
    };
  }
  const getChanciData = async () => {
    const reqBody = {
      Skip: 0,
      Take: 100,
    };
    const res: ChanciResponse = await getRequest(
      chanciAddresses.GetAll,
      reqBody,
      false
    );

    if (res?.isSuccess) {
      updateData(res?.data?.items);
    }
  };

  useEffect(() => {
    getChanciData();
  }, []);

  return (
    <MantineProvider>
      {children}
    </MantineProvider>
  );
}
