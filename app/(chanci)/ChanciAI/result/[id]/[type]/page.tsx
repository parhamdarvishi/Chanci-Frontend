"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, Divider, Drawer, Grid, GridCol } from "@mantine/core";
import DynamicSidebar from "@/shared/ui/ChanciAI/DynamicSidebar";
import DynamicResultView from "@/shared/ui/ChanciAI/DynamicResultView";
import useIsMobile, { useGeneratedPrompts } from "@/shared/hooks";
import ChanciHeader from "@/shared/ui/ChanciAI/ChanciHeader";
import HeadRes from "@/features/headRes/HeadRes";
import Link from "next/link";
import style from "./../../../../style.module.scss";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Title from "@public/image/widget/Frame.svg";
const Page = () => {
  const { id } = useParams();
  const { generatedPrompt, fetchGeneratedPrompts } = useGeneratedPrompts(Number(id));
  const [activeSection, setActiveSection] = useState<string>("personality");
  const isMobile = useIsMobile();
  const [opened, { open, close }] = useDisclosure(false);
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };
  useEffect(() => {
    if (id) {
      fetchGeneratedPrompts();
    }
  }, [id]);
  return (

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

          {isMobile && <Drawer.Header style={{ marginBottom: ".6rem" }}>
            <Drawer.Title style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link href="/Home">
                <Image src={Title} alt="header" width={115} height={80} />
              </Link>
            </Drawer.Title>
            <Drawer.CloseButton size={42} color="#585858" />
          </Drawer.Header>}
          <Drawer.Body>
            <Divider />
            <DynamicSidebar
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              drawer={Boolean(isMobile)}
            />

          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      <GridCol span={{ base: 12, md: 3 }} className={style.sidebar}>
        <DynamicSidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          drawer={false}
        />
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
          <DynamicResultView
            result={generatedPrompt?.result ? JSON.parse(generatedPrompt.result) : undefined}
            activeSection={activeSection}
          />
        </Card>
      </GridCol>
    </Grid>

  );
};

export default Page;