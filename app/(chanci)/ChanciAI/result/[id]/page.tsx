"use client";
import { Card } from "@mantine/core";
import React from "react";
import style from "../../../style.module.scss";
import TestSidebar from "@/shared/ui/ChanciAI/TestSidebar";

const Page = () => {
  return (
    <TestSidebar>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={style.cardDone}
        >
          <h3>Thank you for completing the test! 🎉</h3>
          <p style={{ maxWidth: "700px", fontSize: "17px" }}>
            Based on your responses, we&apos;ve prepared a detailed analysis of
            your personality traits, career preferences, and strengths.
          </p>
          <p style={{ maxWidth: "700px" }}>
            This report is designed to help you gain deeper insights into your
            unique qualities and guide you toward making informed decisions for
            your personal and professional growth.
          </p>
          <span style={{ fontSize: "17px", fontWeight: "600" }}>
            Here&apos;s what you can expect in your results:
          </span>
        </Card>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          /* className={style.cardDone} */
          style={{
            backgroundColor: "#eef1ff",
            display: "flex",
            flexDirection: 'column',
            gap: '0.9rem',
            width: "700px"
          }}
        >
          <h3>Openness to Experience </h3>
          <strong style={{ fontSize: "18px", fontWeight: "500" }}>
            You scored high on openness.
          </strong>
          <li style={{ maxWidth: "700px", fontSize: "17px" }}>
            Youre naturally curious and eager to explore new ideas and
            experiences.
          </li>
          <li style={{ maxWidth: "700px", fontSize: "17px" }}>
            You enjoy creative problem-solving and are enthusiastic about learning
            new things.
          </li>
          <p style={{ maxWidth: "700px", fontSize: "17px" }}>
            Example from your answers: You showed excitement about learning a new
            instrument despite your busy schedule.
          </p>
        </Card>
      </div>
    </TestSidebar>
  );
};

export default Page;
