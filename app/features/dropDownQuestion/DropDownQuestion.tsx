"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Avatar, Box, Button, Card, Select } from "@mantine/core";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
import chanciIc from "@public/image/chanciAI/icon/chanciCh.svg";
import Image from "next/image";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconArrowRight } from "@tabler/icons-react";

interface DropDownQuestionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  question: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answers: any;
}

const DropDownQuestion = ({ question }: DropDownQuestionProps) => {
  const { answers, updateQuestionIndex, updateAnswers, questionIndex, data } =
    useChanci();

  const [dropD, setDropD] = useState([]);
  const [val, setVal] = useState<string | null>("");

  const handleQustionIndex = (): void => {
    // Check if we can potentially go back 3 questions
    if (questionIndex < 3) {
      // Not enough previous questions to check, go back 1
      updateQuestionIndex(questionIndex - 1);
      return;
    }

    // Get references to the three previous answers
    const previousAnswers = [
      answers[questionIndex - 1],
      answers[questionIndex - 2],
      answers[questionIndex - 3],
    ];

    // Ensure all three previous answers exist
    if (previousAnswers.some((answer) => !answer)) {
      updateQuestionIndex(questionIndex - 1);
      return;
    }

    // Check if all three previous answers have the same questionId
    const allSameQuestionId = previousAnswers.every(
      (answer) => answer.questionId === previousAnswers[0].questionId
    );

    // Navigate based on the pattern detected
    if (allSameQuestionId) {
      updateQuestionIndex(questionIndex - 3);
    } else {
      updateQuestionIndex(questionIndex - 1);
    }
  };

  const handleQustionNext = () => {
    updateQuestionIndex(questionIndex + 1);
  };

  const dropDownData = () => {
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

  const handleUserValue = (value: string) => {
    setVal(value);
  };

  const handleDropDown = () => {
    if (answers[questionIndex]) {
      const answerIndex = answers.findIndex(
        (item) => item?.answerId === answers[questionIndex]?.answerId
      );

      const filterAnswer = answers; // Create a copy of the array
      if (answerIndex !== -1) {
        // Remove the item at answerIndex and insert the new answer
        filterAnswer.splice(answerIndex, 1, {
          questionId: question?.id,
          answerId: Number(val),
          step: Number(val),
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updateAnswers(filterAnswer as any);
      updateQuestionIndex(questionIndex + 1);
      return;
    }
    const answer = {
      questionId: question?.id,
      answerId: Number(val),
      step: Number(val),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allAnswer = answers; // Create a copy of the array
    allAnswer.push(answer);
    updateAnswers(allAnswer);
    updateQuestionIndex(questionIndex + 1);
  };

  useEffect(() => {
    dropDownData();
  }, [question]);

  useEffect(() => {
    // if()
    if (answers[questionIndex]?.step) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data[questionIndex]?.answers.forEach((element: any) => {
        if (element?.id === answers[questionIndex]?.step) {
          const answer = JSON.stringify(element?.id);
          setVal(answer);
        }
      });
      return;
    }
    setVal(null);
  }, [questionIndex]);

  return (
    <div className={style.wrapper}>
      <Box className={style.userBox}>
        <Avatar
          src="image/chanciAI/chanci.svg"
          alt="it's me"
          size={55}
          className={style.questionImg}
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
            <Select
              searchable
              placeholder="Choose an option"
              nothingFoundMessage="Nothing found..."
              checkIconPosition="right"
              style={{ marginTop: ".4rem", transform: "translateY(-6px)" }}
              data={dropD}
              onChange={(value) => handleUserValue(value ? value : "")}
              defaultValue={val !== "" ? val : ""}
              value={val}
              comboboxProps={{
                middlewares: { flip: false, shift: false },
              }}
            />
          </Card>
          <Image
            src={chanciIc}
            alt="chanciIcon"
            className={style.questionImg}
          />
        </Box>
        <Box style={{ display: "flex", justifyContent: "end" }}>
          <div 
            className={`${style.btnChanci} ${val !== "" && val !== null && answers[questionIndex]?.step !== Number(val)  ? '' : style.disabled}`} 
            onClick={(val !== "" && val !== null && answers[questionIndex]?.step !== Number(val) ) ? handleDropDown : undefined}
          >
            Next <IconArrowRight /> 
          </div>
        </Box>
      </Box>
      <Box style={{ display: "flex", width: "100%" }}>
        <Box></Box>
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
            opacity: answers[questionIndex]?.step ? 1 : 0,
            transform: answers[questionIndex]?.step
              ? "translateX(0)"
              : "translateX(20px)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            visibility: answers[questionIndex]?.step ? "visible" : "hidden",
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

export default DropDownQuestion;
