"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Avatar, Box, Button, Card } from "@mantine/core";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconArrowRight,
} from "@tabler/icons-react";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
import Image from "next/image";
import chanciIc from "@public/image/chanciAI/icon/chanciCh.svg";

interface ProgressQuestionProps {
   
  question: any;
}

const ProgressQuestion = ({ question }: ProgressQuestionProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answerLabelStep, setAnswerLabelStep] = useState(0);
  const [clickedOn, setClickedOn] = useState(false);
  const { updateQuestionIndex, updateAnswers, questionIndex, answers, data } =
    useChanci();

  const trackRef = useRef<HTMLDivElement>(null);
  // const isDragging = useRef(false);
  // const canMove = useRef(true);
  // const startX = useRef<number>(0);

  const steps = [0, 25, 50, 75, 100];
  const labels = ["Strongly Disagree", "Neutral", "Strongly Agree"];
  const handleQustionIndex = () => {
    updateQuestionIndex(questionIndex - 1);
  };
  const handleQustionNext = () => {
    updateQuestionIndex(questionIndex + 1);
  };

  useEffect(() => {
    if (
      data[questionIndex]?.answers.some(
        (answer: { id: number }) =>
          answer.id === answers[questionIndex]?.answerId
      )
    ) {
      data[questionIndex]?.answers.forEach(
        (element: { id: number }, index: number) => {
          if (element?.id === answers[questionIndex]?.answerId) {
            setAnswerLabelStep(steps[index]);
            setCurrentStep(index);
          }
          return;
        }
      );
    }
  }, [questionIndex]);

  // const handleMouseDown = (e: React.MouseEvent) => {
  //   isDragging.current = true;
  //   startX.current = e.clientX;
  //   canMove.current = true;
  // };

  // const handleMouseMove = (e: React.MouseEvent) => {
  //   if (!isDragging.current || !canMove.current) return;

  //   const diff = e.clientX - startX.current;
  //   const threshold = 5; // Small threshold for sensitive movement

  //   if (Math.abs(diff) > threshold) {
  //     if (diff > 0 && currentStep < steps.length - 1) {
  //       setCurrentStep((prev) => prev + 1);
  //       canMove.current = false; // Prevent further movement until mouse up

  //       const answer = {
  //         questionId: question?.answers[currentStep + 1]?.questionId,
  //         answerId: question?.answers[currentStep + 1]?.id,
  //       };
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       updateAnswers(answer as any);
  //       updateQuestionIndex(questionIndex + 1);
  //     } else if (diff < 0 && currentStep > 0) {
  //       setCurrentStep((prev) => prev - 1);
  //       canMove.current = false;
  //       const answer = {
  //         questionId: question?.answers[currentStep + 1]?.questionId,
  //         answerId: question?.answers[currentStep + 1]?.id,
  //       };

  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       updateAnswers(answer as any);
  //       setCurrentStep(2);
  //       updateQuestionIndex(questionIndex + 1);
  //     }
  //   }
  // };

  // const handleMouseUp = () => {
  //   isDragging.current = false;
  //   canMove.current = true;
  // };

  const handleClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setClickedOn(true);
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const closest = steps.reduce((prev, curr) => {
      return Math.abs(curr - percentage) < Math.abs(prev - percentage)
        ? curr
        : prev;
    });

    const newStep = steps.indexOf(closest);
    setCurrentStep(newStep);
    setAnswerLabelStep(closest);
  };

  const getHeightMultiplier = (index: number) => {
    if (index > currentStep) return 1;
    return 1 + (index / 4) * 0.5;
  };

  const handleAnswer = () => {
    if (answers[questionIndex]) {
      const answerIndex = answers.findIndex(
        (item) => item?.answerId === answers[questionIndex]?.answerId
      );

      const filterAnswer = answers; // Create a copy of the array
      if (answerIndex !== -1) {
        // Remove the item at answerIndex and insert the new answer
        filterAnswer.splice(answerIndex, 1, {
          questionId: question?.answers[currentStep]?.questionId,
          answerId: question?.answers[currentStep]?.id,
          step: answerLabelStep,
        });
      }
      setCurrentStep(0);
       
      updateAnswers(filterAnswer as any);
      updateQuestionIndex(questionIndex + 1);
      
      return;
    }
    const answer = {
      questionId: question?.answers[currentStep]?.questionId,
      answerId: question?.answers[currentStep]?.id,
      step: answerLabelStep,
    };
    const allAnswer = answers; // Create a copy of the array
    allAnswer.push(answer);
    setCurrentStep(0);
    updateAnswers(allAnswer);
    updateQuestionIndex(questionIndex + 1);
    setClickedOn(false);
  };

  return (
    <div className={styles.wrapper}>
      <Box className={styles.userBox}>
        <Avatar
          src="image/chanciAI/chanci.svg"
          alt="it's me"
          size={55}
          className={styles.questionImgChanci}
        />
        <Box className={styles.questionTitle}>
          <p>{question?.text}</p>
        </Box>
      </Box>
      <Box className={styles.questionPart}>
        <Box className={styles.questionBox}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={styles.questionCard}
          >
            <div className={styles.progressBar}>
              <div className={styles.labels}>
                {labels.map((label, index) => (
                  <span
                    key={index}
                    className={styles.label}
                    style={{
                      left: index === 0 ? "0%" : index === 1 ? "50%" : "100%",
                      fontWeight: "600",

                      transform:
                        index === 1
                          ? "translateX(-50%)"
                          : index === 2
                          ? "translateX(-100%)"
                          : "none",
                    }}
                  >
                    {/* {index == answerLabelIndex ? (
                      <div>true</div>
                    ) : (
                      <div>{label}</div>
                    )} */}
                    {label}
                  </span>
                ))}
              </div>
              <div
                ref={trackRef}
                className={styles.track}
                onClick={handleClick}
                // onMouseDown={handleMouseDown}
                // onMouseMove={handleMouseMove}
                // onMouseUp={handleMouseUp}
                // onMouseLeave={handleMouseUp}
              >
                <div
                  className={styles.progress}
                  style={{
                    width: `${steps[currentStep]}%`,
                    height: `${8 * getHeightMultiplier(currentStep)}px`,
                    background:
                      steps[currentStep] === answers[questionIndex]?.step
                        ? `linear-gradient(to right, 
              rgba(13, 180, 146, 0.4),
              rgba(13, 180, 146, ${0.4 + currentStep * 0.15})
            )`
                        : `linear-gradient(to right, 
              rgba(96, 165, 250, 0.4),
              rgba(96, 165, 250, ${0.4 + currentStep * 0.15})
            )`,
                  }}
                />
                {steps?.map((step, index) => (
                  <div
                    key={index}
                    className={`${styles.dot} ${
                      index <= currentStep ? styles.active : ""
                    }`}
                    style={{
                      left: `${step}%`,
                      width: `${12 * getHeightMultiplier(index)}px`,
                      height: `${12 * getHeightMultiplier(index)}px`,
                      opacity: index <= currentStep ? 1 : 0.5,

                      backgroundColor:
                        steps[currentStep] === answers[questionIndex]?.step
                          ? `rgba(13, 180, 146, ${0.4 + index * 0.15})`
                          : index <= currentStep
                          ? `rgba(96, 165, 250, ${0.4 + index * 0.15})`
                          : "#e5e7eb",
                    }}
                  />
                ))}
                <div
                  className={styles.indicator}
                  style={{
                    left: `${steps[currentStep]}%`,
                    width: `${20 * getHeightMultiplier(currentStep)}px`,
                    height: `${20 * getHeightMultiplier(currentStep)}px`,
                    backgroundColor:
                      steps[currentStep] === answers[questionIndex]?.step
                        ? `rgba(13, 180, 146, ${0.4 + currentStep * 0.15})`
                        : `rgba(96, 165, 250, ${0.4 + currentStep * 0.15})`,
                  }}
                />
              </div>
            </div>
          </Card>
          <Image
            src={chanciIc}
            alt="chanciIcon"
            className={styles.questionImg}
          />
        </Box>
        {steps[currentStep] !== answers[questionIndex]?.step && (
          <Box style={{ display: "flex", justifyContent: "end", userSelect: 'none' }}>
            <div className={`${styles.btnChanci} ${clickedOn? '': styles.disabled}`} onClick={handleAnswer}>
              Next <IconArrowRight />
            </div>
          </Box>
        )}
      </Box>
      <Box style={{ display: "flex", width: "100%" }}>
        <Box
          className={styles.btnBox}
          style={{
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
            opacity:
              steps[currentStep] === answers[questionIndex]?.step ? 1 : 0,
            transform:
              steps[currentStep] === answers[questionIndex]?.step
                ? "translateX(0)"
                : "translateX(20px)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            visibility:
              steps[currentStep] === answers[questionIndex]?.step
                ? "visible"
                : "hidden",
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

export default ProgressQuestion;
