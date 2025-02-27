"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Avatar, Box, Card, Select } from "@mantine/core";
import chanciIc from "@public/image/chanciAI/icon/chanciCh.svg";
import Image from "next/image";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";

interface DropDownQuestionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  question: any;
}

const DropDownQuestion = ({ question }: DropDownQuestionProps) => {
  const { updateQuestionIndex, updateAnswers, questionIndex } = useChanci();
  const [dropD, setDropD] = useState([]);
  const [val, setVal] = useState<string>("");

  const fun = () => {
    if (question?.answers?.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const drop: any = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      question?.answers?.forEach((element: any) => {
        const dropItem = {
          label: element?.text,
          value: String(element?.id),
        };
        drop.push(dropItem);
      });
      setDropD(drop);
    }
  };

  const handleDropDown = (value: string) => {
    const answer = {
      questionId: question?.id,
      answerId: Number(value),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateAnswers(answer as any);
    updateQuestionIndex(questionIndex + 1);
  };

  useEffect(() => {
    fun();
    setVal("");
  }, [question]);

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
            <Select
              searchable
              nothingFoundMessage="Nothing found..."
              checkIconPosition="right"
              style={{ marginTop: ".4rem", transform: "translateY(-6px)" }}
              data={dropD}
              onChange={(value) => handleDropDown(value ? value : "")}
              defaultValue={""}
              value={val}
            />
          </Card>
          <Image
            src={chanciIc}
            alt="chanciIcon"
            className={style.questionImg}
          />
        </Box>
      </Box>
    </div>
  );
};

export default DropDownQuestion;
