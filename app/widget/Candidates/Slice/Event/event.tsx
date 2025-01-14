import Image from "next/image";
import React from "react";
import event from "@public/image/widget/event.png";
import person from "@public/image/widget/persons.png";
import ellipse from "@public/image/widget/Ellipse.png";
import universities from "@public/image/widget/universities.png";
import universitiesRes from "@public/image/responsive/universitiesRes.png";
import style from "./event.module.scss";
import Link from "next/link";
import { Box, Card } from "@mantine/core";

const Event = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.wrapperBox}>
        <div className={style.ellipse}>
          <Image src={ellipse} alt="ellipse" />
        </div>
        <div>
          <h1 style={{ marginBottom: "1rem" }}>Event by NGN</h1>
          <h2>Explore Events That Shape Your Future</h2>
          <p>
            Our events connect you with industry leaders, fresh ideas, and
            career-changing opportunities.
          </p>
          <Link href="/find-talent" className={style.button}>
            Upcoming Events
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
        <div>
          <Image src={event} alt="eventImg" width={550} height={400} />
        </div>
      </div>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={style.wrapperBox2}
        >
          <div>
            <Image src={person} alt="eventImg" width={560} height={400} />
          </div>
          <div>
            <h1 style={{ marginBottom: "1rem" }}>
              Become an Ambassador at Your University
            </h1>

            <p>
              Work closely with the NGN team as an ambassador at your
              university. Gain valuable work experience, enjoy exclusive perks,
              and attend unique events.
            </p>
            <Link href="/find-talent" className={style.button}>
              Apply to Become an Ambassador
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
        </Card>
      </Box>

      <div className={style.universities}>
        <Image
          src={universities}
          alt="universities"
          className={style.universitiesPart}
        />
        <Image
          src={universitiesRes}
          alt="universities"
          className={style.universitiesRes}
        />
      </div>
    </div>
  );
};

export default Event;
