"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Avatar, Box, Button, Card, Select } from "@mantine/core";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
import chanciIc from "@public/image/chanciAI/icon/chanciCh.svg";
import Image from "next/image";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";

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
  const [val, setVal] = useState<string>("");
  const handleQustionIndex = () => {
    if (
      answers[questionIndex]?.questionId ===
      answers[questionIndex - 1]?.questionId
    ) {
      updateQuestionIndex(questionIndex - 3);
      return;
    }
    updateQuestionIndex(questionIndex - 1);
  };
  const handleQustionNext = () => {
    updateQuestionIndex(questionIndex + 1);
  };
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
    if (answers[questionIndex]) {
      const answerIndex = answers.findIndex(
        (item) => item?.answerId === answers[questionIndex]?.answerId
      );

      const filterAnswer = answers; // Create a copy of the array
      if (answerIndex !== -1) {
        // Remove the item at answerIndex and insert the new answer
        filterAnswer.splice(answerIndex, 1, {
          questionId: question?.id,
          answerId: Number(value),
          step: Number(value),
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updateAnswers(filterAnswer as any);
      updateQuestionIndex(questionIndex + 1);
      return;
    }
    const answer = {
      questionId: question?.id,
      answerId: Number(value),
      step: Number(value),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allAnswer = answers; // Create a copy of the array
    allAnswer.push(answer);
    updateAnswers(allAnswer);
    updateQuestionIndex(questionIndex + 1);
  };

  useEffect(() => {
    fun();
    // setVal("");
  }, [question]);

  useEffect(() => {
    if (answers[questionIndex]?.step) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data[questionIndex]?.answers.forEach((element: any) => {
        if (element?.id === answers[questionIndex]?.step) {
          setVal(element?.text);
        }
      });
      return;
    }
    setVal("");
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
              nothingFoundMessage="Nothing found..."
              checkIconPosition="right"
              style={{ marginTop: ".4rem", transform: "translateY(-6px)" }}
              data={dropD}
              onChange={(value) => handleDropDown(value ? value : "")}
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
        {val !== "" && (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginLeft: "400px",
            }}
          >
            <div style={{ color: "#0063F5" }}>your Answer : </div>
            <div> {val !== "" ? val : ""}</div>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default DropDownQuestion;
