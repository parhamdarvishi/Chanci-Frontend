"use client";
import { Card, Grid, GridCol } from "@mantine/core";
import "@mantine/core/styles.css";
import "../globals.css";
import PanelSidebar from "@/shared/ui/panel/PanelSidebar";


export default function ChanciRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <GridCol span={{ base: 12, md: 3 }}>
        <PanelSidebar />
      </GridCol>
      <GridCol span={{ base: 12, md: 9 }}>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          className="panelSection"
        >
          {children}
        </Card>
      </GridCol>
    </Grid>

  );
}
