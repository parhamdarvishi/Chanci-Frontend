"use client";
import { Card, Divider, Drawer, Grid, GridCol } from "@mantine/core";
import Menu from "@public/menu.svg";
import PanelSidebar from "@/shared/ui/panel/PanelSidebar";
import "@mantine/core/styles.css";
import "../globals.css";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import Title from "@public/image/widget/Frame.svg";
import style from "./style.module.scss";

export default function ChanciRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  // const getChan
  return (
    <Grid
      gutter={{ md: 15 }}
      style={{
        padding: "1rem",
        backgroundColor: "#F7F7F7",
        height: "100vh",
      }}
    >
      <div>
        <Drawer.Root opened={opened} onClose={close} radius={8} size={"310px"}>
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Header style={{ marginBottom: ".6rem" }}>
              <Drawer.Title>
                {" "}
                <Image src={Title} alt="header" width={115} height={80} />
              </Drawer.Title>
              <Drawer.CloseButton size={42} color="#585858" />
            </Drawer.Header>
            <Drawer.Body>
              <Divider />
              <PanelSidebar drawer={true} close={close} />
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
      </div>
      <GridCol span={{ base: 12, md: 3 }} className={style.sidebarBox}>
        <PanelSidebar drawer={false} close={close} />
      </GridCol>
      <GridCol span={{ base: 12, md: 9 }}>
        <div onClick={open} className={style.sidebarResponsive}>
          <Card
            style={{
              width: "45px",
              height: "40px",
              padding: "0 !important",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image src={Menu} alt="Menu" />
          </Card>
        </div>

        <Card shadow="sm" padding="lg" radius="md" className="panelSection">
          {children}
        </Card>
      </GridCol>
    </Grid>
  );
}
