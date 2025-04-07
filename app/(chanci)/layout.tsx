"use client";
import {
  Card,
  Divider,
  Drawer,
  Grid,
  GridCol,
  MantineProvider,
} from "@mantine/core";
import "@mantine/core/styles.css";
import "../globals.css";
import Title from "@public/image/widget/Frame.svg";
import HomeIcon from "@public/image/chanciAI/icon/home.svg";
import { Poppins } from "next/font/google";
import ChanciHeader from "@/shared/ui/ChanciAI/ChanciHeader";
import Sidebar from "@/shared/ui/ChanciAI/Sidebar";
import { getRequest } from "@/shared/api";
import { chanciAddresses } from "@/shared/constants/relative-url/chanci";
import { useEffect } from "react";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
import HeadRes from "@/features/headRes/HeadRes";
import Image from "next/image";
import Link from "next/link";
import style from "./style.module.scss";
import { useDisclosure } from "@mantine/hooks";

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
  const [opened, { open, close }] = useDisclosure(false);
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
      <Grid
        gutter={{ md: 15 }}
        style={{
          padding: "1rem",
          backgroundColor: "#F7F7F7",
          height: "100vh",
        }}
      >
        <Drawer.Root
          opened={opened}
          onClose={close}
          radius={8}
          size={"310px"}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header style={{ marginBottom: ".6rem" }}>
              <Drawer.Title style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Link href="/Home">
                  <Image src={HomeIcon} alt="home" width={24} height={24} style={{ cursor: "pointer" }} />
                </Link>
                <Image src={Title} alt="header" width={115} height={80} />
              </Drawer.Title>
              <Drawer.CloseButton size={42} color="#585858" />
            </Drawer.Header>
            <Drawer.Body>
              <Divider />
              <Sidebar drawer={true} />
              {/* {links.map((item, index) => (
                  <Box
                    style={{ position: "relative" }}
                    key={index}
                    onClick={() => handleActiveNav(index)}
                  >
                    {loc === index && <div className={style.liActive}></div>}

                    <Link
                      href={index === 4 ? "/ComingSoon" : `/${item}`}
                      className={
                        loc === index ? style.liSidebarActive : style.liSidebar
                      }
                    >
                      <p>{item}</p>
                    </Link>
                    <Divider />
                  </Box>
                ))} */}
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
        <GridCol span={{ base: 12, md: 3 }} className={style.sidebar}>
          <Sidebar drawer={false} />
        </GridCol>
        <GridCol span={{ base: 12, md: 9 }}>
          <div onClick={open}>
            <HeadRes />
          </div>

          <ChanciHeader />
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            className="chanciSection"
            style={{ overflowY: "auto" }}
          >
            {children}
          </Card>
        </GridCol>
      </Grid>
    </MantineProvider>
  );
}
