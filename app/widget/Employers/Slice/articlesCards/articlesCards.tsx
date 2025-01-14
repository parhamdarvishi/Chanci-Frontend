"use client";

import React from "react";
import talk from "@public/image/slides/talk.png";
import visa from "@public/image/slides/visa.png";
import write from "@public/image/slides/write.png";
import Slider from "@/shared/ui/Slider/slider";
import { SlideData } from "@/widget/Candidates/model";
import style from "../../../Candidates/Slice/Event/event.module.scss";
import Link from "next/link";

const ArticlesCards = () => {
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
    <div style={{ maxWidth: "80%", margin: "0 auto", paddingTop: "4rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "28px",
          paddingBottom: "1rem",
        }}
      ></div>
      <div>
        <div>
          <Slider slides={slides} />
        </div>
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
            fontSize: "20px",
            fontWeight: "400",
          }}
        >
          See more
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

export default ArticlesCards;
