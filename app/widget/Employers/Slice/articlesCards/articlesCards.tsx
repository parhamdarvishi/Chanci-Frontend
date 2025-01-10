"use client";

import React from "react";
import { Button } from "@mantine/core";
import talk from "@public/image/slides/talk.png";
import visa from "@public/image/slides/visa.png";
import write from "@public/image/slides/write.png";
import Slider from "@/shared/ui/Slider/slider";
import { SlideData } from "@/widget/Condidates/model";

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
          padding: "1rem 0",
        }}
      >
        <Button variant="outline" size="md">
          See More
        </Button>
      </div>
    </div>
  );
};

export default ArticlesCards;
