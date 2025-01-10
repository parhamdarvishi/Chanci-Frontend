import React from "react";
import ClearPlan from "./Slice/ClearPlan/clearPlan";
import Event from "./Slice/Event/event";
import talk from "@public/image/slides/talk.png";
import visa from "@public/image/slides/visa.png";
import write from "@public/image/slides/write.png";
import Slider from "@/shared/ui/Slider/slider";
import { SlideData } from "./model";
import TopicSection from "../Employers/Slice/topicSection/topicSection";
import condidates from "@public/image/file/condidates.png";
import Section from "./Slice/Section/section";

const CondidatesList = () => {
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
    <div>
      <TopicSection
        image={condidates}
        btnTxt={"Take the Free Assessment Now"}
        title={"Level Up Your Career Game!"}
        desc={"The Start of Something Amazing"}
        condidates={true}
      />
      <ClearPlan />
      <Section />
      <Event />
      <Slider slides={slides} />
    </div>
  );
};

export default CondidatesList;
