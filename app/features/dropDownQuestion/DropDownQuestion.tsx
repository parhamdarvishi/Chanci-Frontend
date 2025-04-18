"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Avatar, Box, Button, Card, Select } from "@mantine/core";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
import chanciIc from "@public/image/chanciAI/icon/chanciCh.svg";
import Image from "next/image";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconArrowRight } from "@tabler/icons-react";
import ChanciNavigation from "@/shared/ui/ChanciNavigation/ChanciNavigation";

interface DropDownQuestionProps {
   
  question: any;
   
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
       
      const drop: any = [];
       
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

       
      updateAnswers(filterAnswer as any);
      updateQuestionIndex(questionIndex + 1);
      return;
    }
    const answer = {
      questionId: question?.id,
      answerId: Number(val),
      step: Number(val),
    };
     
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
       
      data[questionIndex]?.answers.forEach((element: any) => {
        if (element?.id === answers[questionIndex]?.step) {
          const answer = JSON.stringify(element?.id);
          setVal(answer);
        }
      });
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
            className={style.chanciImg}
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
      <ChanciNavigation previousVisibleCondition={(questionIndex > 0)} forwardVisibleCondition={Boolean( answers[questionIndex]?.step)} handleNextQuestion={handleQustionNext} handlePreviousQuestion={handleQustionIndex} />
    </div>
  );
};

export default DropDownQuestion;
