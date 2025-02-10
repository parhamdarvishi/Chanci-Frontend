import React from "react";
import ClearPlan from "./Slice/ClearPlan/clearPlan";
import Event from "./Slice/Event/event";
import canBlogTop from "@public/image/blog/canBlogTop.png";
import canBlogTopCourse from "@public/image/blog/canBlogTopCourse.png";
import canBlogSmart from "@public/image/blog/canBlogSmart.png";
import Slider from "@/shared/ui/Slider/slider";
import { SlideData } from "./model";
import TopicSection from "../Employers/Slice/topicSection/topicSection";
import condidates from "@public/image/file/candidate.png";
import Section from "./Slice/Section/section";
import Link from "next/link";
import style from "../Candidates/Slice/Event/event.module.scss";

const CondidatesList = () => {
  const slides: SlideData[] = [
    {
      id: 1,
      title: "Top Growth Sectors to Watch in the UK Job Market for 2025",
      description:
        "Big changes are happening in the UK job market, shaped by tech advancements, climate goals, and shifting demographics...",
      image: canBlogTop,
    },
    {
      id: 2,
      title: "Top Courses Gen Z Should Check Out for a Bright Career in 2025",
      description:
        "Gen Z is stepping into a workplace full of change. To stay ahead, you need skills that match growing industries and new tech trends ...",
      image: canBlogTopCourse,
    },
    {
      id: 3,
      title: "7 Smart Questions to Ask Before You Hit ‘Apply",
      description:
        "The job market moves fast, and it’s easy to hit ‘apply’ on every role that catches your eye. But pausing to ask yourself the right questions can save time...",
      image: canBlogSmart,
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
      <div style={{ maxWidth: "80%", margin: "0 auto" }}>
        <Slider slides={slides} title={true} />
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
    </div>
  );
};

export default CondidatesList;
