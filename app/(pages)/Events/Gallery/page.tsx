"use client";
import { Container, Grid } from "@mantine/core";
import Image from "next/image";
import React from "react";
import event1 from "@public/image/events/event1.png";
import event2 from "@public/image/events/event2.png";
import event3 from "@public/image/events/event3.png";
import style from "./gallery.module.scss";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";

const page = () => {
  return (
    <>
      <NavbarMain />
      <Container style={{ marginTop: "2rem", marginBottom: "3rem" }}>
        <div className={style.header}>
          <h2>
            <span
              style={{
                borderBottom: "4px solid #5E62FC",
                borderRadius: "4px",
                fontWeight: "400",
              }}
            >
              O
            </span>
            ur Events {""}
            <span>Gallery</span>
          </h2>
        </div>
        <Container style={{ maxWidth: "1240px !important" }}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }} h={{ md: 270, sm: 240 }}>
              <Image src={event1} alt="eventImage" className={style.img} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} h={{ md: 270, sm: 240 }}>
              <Image src={event2} alt="eventImage" className={style.img} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} h={{ md: 270, sm: 240 }}>
              <Image src={event3} alt="eventImage" className={style.img} />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={{ base: 12, md: 3 }} h={{ md: 270, sm: 240 }}>
              <Image src={event1} alt="eventImage" className={style.img} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} h={{ md: 270, sm: 240 }}>
              <Image src={event2} alt="eventImage" className={style.img} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }} h={{ md: 270, sm: 240 }}>
              <Image src={event3} alt="eventImage" className={style.img} />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }} h={{ md: 270, sm: 240 }}>
              <Image src={event1} alt="eventImage" className={style.img} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} h={{ md: 270, sm: 240 }}>
              <Image src={event2} alt="eventImage" className={style.img} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} h={{ md: 270, sm: 240 }}>
              <Image src={event3} alt="eventImage" className={style.img} />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={{ base: 12, md: 3 }} h={{ md: 270, sm: 240 }}>
              <Image src={event1} alt="eventImage" className={style.img} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} h={{ md: 270, sm: 240 }}>
              <Image src={event2} alt="eventImage" className={style.img} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }} h={{ md: 270, sm: 240 }}>
              <Image src={event3} alt="eventImage" className={style.img} />
            </Grid.Col>
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default page;
