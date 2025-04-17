"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Avatar, Box, Button, Card, Textarea } from "@mantine/core";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
import chanciIc from "@public/image/chanciAI/icon/chanciCh.svg";
import Image from "next/image";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconArrowRight } from "@tabler/icons-react";
interface TextQuestionProps {
   
  question: any;
}

const TextQuestion: React.FC<TextQuestionProps> = ({ question }) => {
  const [value, setValue] = useState("");

  const { updateQuestionIndex, updateAnswers, questionIndex, answers } =
    useChanci();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      if (answers[questionIndex]) {
        const answerIndex = answers.findIndex(
          (item) => item?.questionId === answers[questionIndex]?.questionId
        );

        const filterAnswer = answers; // Create a copy of the array
        if (answerIndex !== -1) {
          // Remove the item at answerIndex and insert the new answer

          filterAnswer.splice(answerIndex, 1, {
            questionId: question?.id,
            answerId: Number(value),
            step: Number(value),
            text: value,
          });
        }

         
        updateAnswers(filterAnswer as any);
        updateQuestionIndex(questionIndex + 1);
        return;
      }
      const answer = {
        questionId: question?.id,
        answerId: 0,
        step: 0,
        text: value,
      };

       
      const allAnswer = answers; // Create a copy of the array
      allAnswer.push(answer);
      updateAnswers(allAnswer);
      updateQuestionIndex(questionIndex + 1);
      // You can add additional logic here
      event.preventDefault();
    }
  };
  const handleQustionIndex = () => {
    updateQuestionIndex(questionIndex - 1);
  };
  const handleQustionNext = () => {
    updateQuestionIndex(questionIndex + 1);
  };
  const handleAnswer = (event: React.SyntheticEvent) => {
    if (answers[questionIndex]) {
      const answerIndex = answers.findIndex(
        (item) => item?.questionId === answers[questionIndex]?.questionId
      );

      const filterAnswer = answers; // Create a copy of the array
      if (answerIndex !== -1) {
        // Remove the item at answerIndex and insert the new answer

        filterAnswer.splice(answerIndex, 1, {
          questionId: question?.id,
          answerId: Number(value),
          step: Number(value),
          text: value,
        });
      }

       
      updateAnswers(filterAnswer as any);
      updateQuestionIndex(questionIndex + 1);
      return;
    }
    const answer = {
      questionId: question?.id,
      answerId: 0,
      step: 0,
      text: value,
    };

    const allAnswer = answers;
    allAnswer.push(answer);
    updateAnswers(allAnswer);
    updateQuestionIndex(questionIndex + 1);
    event.preventDefault();
  };
  useEffect(() => {
    if (answers[questionIndex - 1]?.text) {
      // @ts-expect-error: Ignoring TypeScript error due to array spread
      setValue(answers[questionIndex - 1]?.text);
      return;
    }
    setValue("");
  }, [questionIndex]);
  return (
    <div className={style.wrapper}>
      <Box className={style.userBox}>
        <Avatar
          src="image/chanciAI/chanci.svg"
          alt="it's me"
          size={55}
          className={style.questionImgChanci}
        />
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
            className={style.questionImgChanci}
          />
        </Box>
        <Box style={{ display: "flex", justifyContent: "end" }}>
          <div
            className={`${style.btnChanci} ${answers[questionIndex - 1]?.text !== value ? '' : style.disabled}`}
            onClick={answers[questionIndex - 1]?.text !== value ? handleAnswer : undefined} >
            {question.id === 35 ? (`Submit`) : (<>Next <IconArrowRight /></>)}
          </div>
        </Box>
      </Box>
      <Box style={{ display: "flex", width: "100%" }}>
        <Box
          style={{
            padding: "0 3rem",
            opacity: questionIndex > 0 ? 1 : 0,
            transform:
              questionIndex > 0 ? "translateX(0)" : "translateX(-20px)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            visibility: questionIndex > 0 ? "visible" : "hidden",
          }}
        >
          <Button
            variant="light"
            style={{
              padding: "0.7rem",
              transition: "transform 0.2s ease",
              transform: "scale(1)",
              ":hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={handleQustionIndex}
          >
            <IconArrowNarrowLeft size={30} />
          </Button>
        </Box>

        <Box
          style={{
            opacity: answers[questionIndex]?.text ? 1 : 0,
            transform: answers[questionIndex]?.text
              ? "translateX(0)"
              : "translateX(20px)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            visibility: answers[questionIndex]?.text ? "visible" : "hidden",
          }}
        >
          <Button
            variant="light"
            style={{
              padding: "0.7rem",
              transition: "transform 0.2s ease",
              transform: "scale(1)",
              ":hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={handleQustionNext}
          >
            <IconArrowNarrowRight size={30} />
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default TextQuestion;
