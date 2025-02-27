"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { Avatar, Box, Card, Textarea } from "@mantine/core";
import Image from "next/image";
import chanciIc from "@public/image/chanciAI/icon/chanciCh.svg";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";

interface TextQuestionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  question: any;
}

const TextQuestion: React.FC<TextQuestionProps> = ({ question }) => {
  const [value, setValue] = useState("");

  const { updateQuestionIndex, updateAnswers, questionIndex } = useChanci();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      const answer = {
        questionId: question?.id,
        answerId: 0,
        text: value,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updateAnswers(answer as any);
      updateQuestionIndex(questionIndex + 1);
      // You can add additional logic here
      event.preventDefault();
    }
  };
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
            <Textarea
              classNames={{ input: style.input }}
              placeholder="Write a messge here ..."
              size="sm"
              radius="md"
              minRows={4}
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
              onKeyDown={handleKeyDown}
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

export default TextQuestion;
