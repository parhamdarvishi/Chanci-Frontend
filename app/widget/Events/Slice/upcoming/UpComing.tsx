"use client";
import React from "react";
import style from "./UpComing.module.scss";
import { Box, Grid } from "@mantine/core";
import event1 from "@public/image/events/event1.png";
import event2 from "@public/image/events/event2.png";
import event3 from "@public/image/events/event3.png";
import Link from "next/link";
import Image from "next/image";

const UpComing = ({content}: {content:string}) => {
  // const slides: SlideData[] = [
  //   {
  //     id: 1,
  //     title: "Increasing brand awareness | Study Permit",
  //     description:
  //       "Increasing brand awareness and growing female engagement. Study permit services guide you through the application process.",
  //     image: event1,
  //   },
  //   {
  //     id: 2,
  //     title: "Discovering hard to reach talent | Work Permit",
  //     description:
  //       "Discovering hard to reach talent - from awareness to successful hire, ensuring your documents are ready and deadlines met.",
  //     image: event2,
  //   },
  //   {
  //     id: 3,
  //     title: "Permanent Residency to reach talent | PR Card",
  //     description:
  //       "Study permit services guide you through the application process, ensuring your documents are ready and deadlines met.",
  //     image: event3,
  //   },
  //   {
  //     id: 4,
  //     title: "Permanent Residency to reach talent | PR Card",
  //     description:
  //       "Study permit services guide you through the application process, ensuring your documents are ready and deadlines met.",
  //     image: event1,
  //   },
  // ];
  return (
    <div className={style.wrapper}>
      <Box className={style.detailDesc}>
      <div dangerouslySetInnerHTML={{ __html: content || "" }} />
      </Box>
      <div className={style.sliderBox}>
        {/* <Slider title={false} slides={slides} /> */}
        <Grid style={{ margin: "1.8rem 0" }} gutter={28}>
          <Grid.Col span={{ lg: 4, sm: 12 }}>
            <Image src={event1} alt="eventImage" />
          </Grid.Col>
          <Grid.Col span={{ lg: 4, sm: 12 }}>
            <Image src={event2} alt="eventImage" />
          </Grid.Col>
          <Grid.Col span={{ lg: 4, sm: 12 }}>
            <Image src={event3} alt="eventImage" />
          </Grid.Col>
        </Grid>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "0rem",
          paddingBottom: "2rem",
        }}
      >
        <Link
          href="/Events/Gallery"
          className={style.button}
          style={{
            borderRadius: "16px",
            height: "60px",
            fontSize: "18px",
            fontWeight: "400",
          }}
        >
          Pervious Events Gallery
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default UpComing;
