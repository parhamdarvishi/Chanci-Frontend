"use client";

import React from "react";
import empBlogGenZ from "@public/image/blog/empBlogGenZ.png";
import empBlogDei from "@public/image/blog/empBlogDei.png";
import empBlogSolve from "@public/image/blog/empBlogSolve.png";
import Slider from "@/shared/ui/Slider/slider";
import { SlideData } from "@/widget/Candidates/model";
import style from "../../../Candidates/Slice/Event/event.module.scss";
import Link from "next/link";

const ArticlesCards = () => {
  const slides: SlideData[] = [
    {
      id: 4,
      title: "Gen Z at Work: 8 Changes Your Company Can’t Ignore",
      description:
        "Generation Z, born between the mid-1990s and early 2010s, now represents nearly a third of the global workforce...",
      image: empBlogGenZ,
    },
    {
      id: 5,
      title:
        "The Role of Automation in Solving the UK’s 1.3 Million Job Market Gap",
      description:
        "The UK job market is facing a major challenge, with over 1.3 million job ... ",
      image: empBlogSolve,
    },
    {
      id: 6,
      title: "The Current State of DEI in the UK",
      description:
        "Recent surveys show a noticeable shift in how UK businesses view DEI. A 2023 report found that 57% of companies ...",
      image: empBlogDei,
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
          <Slider slides={slides} title={true} />
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
        {slides.length > 3 && (
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
        )}
      </div>
    </div>
  );
};

export default ArticlesCards;
