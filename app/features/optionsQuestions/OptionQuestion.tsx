"use client";
import { Avatar, Box, Card } from "@mantine/core";
import React from "react";
import chanciIc from "@public/image/chanciAI/icon/chanciCh.svg";
import style from "./style.module.scss";
import Image from "next/image";

interface OptionQuestionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  question: any;
}

const OptionQuestion = ({ question }: OptionQuestionProps) => {
  return (
    <div className={style.wrapper}>
      <Box className={style.userBox}>
        <Avatar radius="xl" size={"lg"} />
        <Box className={style.questionTitle}>
          <p>{question?.text}</p>
        </Box>
      </Box>
      <Box className={style.questionPart}>
        <Box className={style.questionBox}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={style.questionCard}
          >
            <div className={style.questionNum}>1</div>
            <p>Office-based</p>
          </Card>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={style.questionCard}
          >
            <div className={style.questionNum}>1</div>
            <p>Office-based</p>
          </Card>
        </Box>
        <Image src={chanciIc} alt="chanciIcon" className={style.questionImg} />
      </Box>
    </div>
  );
};

export default OptionQuestion;
