import React from "react";
import style from "./UpComing.module.scss";
import { Box } from "@mantine/core";
import Slider from "@/shared/ui/Slider/slider";
import talk from "@public/image/slides/talk.png";
import visa from "@public/image/slides/visa.png";
import write from "@public/image/slides/write.png";
import { SlideData } from "@/widget/Candidates/model";
import Link from "next/link";

const UpComing = () => {
  const slides: SlideData[] = [
    {
      id: 1,
      title: "Increasing brand awareness | Study Permit",
      description:
        "Increasing brand awareness and growing female engagement. Study permit services guide you through the application process.",
      image: visa,
    },
    {
      id: 2,
      title: "Discovering hard to reach talent | Work Permit",
      description:
        "Discovering hard to reach talent - from awareness to successful hire, ensuring your documents are ready and deadlines met.",
      image: write,
    },
    {
      id: 3,
      title: "Permanent Residency to reach talent | PR Card",
      description:
        "Study permit services guide you through the application process, ensuring your documents are ready and deadlines met.",
      image: talk,
    },
    {
      id: 4,
      title: "Permanent Residency to reach talent | PR Card",
      description:
        "Study permit services guide you through the application process, ensuring your documents are ready and deadlines met.",
      image: write,
    },
  ];
  return (
    <div className={style.wrapper}>
      <Box className={style.detailDesc}>
        <strong>NGN</strong>
        hosts a variety of engaging events, including professional business
        networking sessions, startup-focused gatherings, founder matchmaking,
        graduate and university-focused events, job fairs, and more. Each event
        is designed to bring together top talent and industry leaders, featuring
        a diverse range of expert speakers who share valuable insights. Sign up
        here to be among the first to receive invitations. We&apos;ll take care
        of the planning so you can focus on building valuable connections!
      </Box>
      <div className={style.sliderBox}>
        <Slider title={false} slides={slides} />
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
          href="/find-talent"
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
