"use client";
import React, { useRef, useState } from "react";
import styles from "./style.module.scss";
import { Avatar, Box, Card } from "@mantine/core";
import Image from "next/image";
import chanciIc from "@public/image/chanciAI/icon/chanciCh.svg";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";

interface ProgressQuestionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  question: any;
}

const ProgressQuestion = ({ question }: ProgressQuestionProps) => {
  const [currentStep, setCurrentStep] = useState(2);

  const { updateQuestionIndex, updateAnswers, questionIndex } = useChanci();

  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const canMove = useRef(true);
  const startX = useRef<number>(0);

  const steps = [0, 25, 50, 75, 100];
  const labels = ["Strongly Disagree", "Neutral", "Strongly Agree"];

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    canMove.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !canMove.current) return;

    const diff = e.clientX - startX.current;
    const threshold = 5; // Small threshold for sensitive movement

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        canMove.current = false; // Prevent further movement until mouse up

        const answer = {
          questionId: question?.answers[currentStep + 1]?.questionId,
          answerId: question?.answers[currentStep + 1]?.id,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updateAnswers(answer as any);
        updateQuestionIndex(questionIndex + 1);
      } else if (diff < 0 && currentStep > 0) {
        setCurrentStep((prev) => prev - 1);
        canMove.current = false;
        const answer = {
          questionId: question?.answers[currentStep + 1]?.questionId,
          answerId: question?.answers[currentStep + 1]?.id,
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updateAnswers(answer as any);
        setCurrentStep(2);
        updateQuestionIndex(questionIndex + 1);
      }
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    canMove.current = true;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
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
    const answer = {
      questionId: question?.answers[newStep]?.questionId,
      answerId: question?.answers[newStep]?.id,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateAnswers(answer as any);
    updateQuestionIndex(questionIndex + 1);
  };

  const getHeightMultiplier = (index: number) => {
    if (index > currentStep) return 1;
    return 1 + (index / 4) * 0.5;
  };

  return (
    <div className={styles.wrapper}>
      <Box className={styles.userBox}>
        <Avatar radius="xl" size={"lg"} />
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
                      fontSize: "14px",
                      transform:
                        index === 1
                          ? "translateX(-50%)"
                          : index === 2
                          ? "translateX(-100%)"
                          : "none",
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div
                ref={trackRef}
                className={styles.track}
                onClick={handleClick}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div
                  className={styles.progress}
                  style={{
                    width: `${steps[currentStep]}%`,
                    height: `${8 * getHeightMultiplier(currentStep)}px`,
                    background: `linear-gradient(to right, 
              rgba(96, 165, 250, 0.4),
              rgba(96, 165, 250, ${0.4 + currentStep * 0.15})
            )`,
                  }}
                />
                {steps.map((step, index) => (
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
                        index <= currentStep
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
                    backgroundColor: `rgba(96, 165, 250, ${
                      0.4 + currentStep * 0.15
                    })`,
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
      </Box>
    </div>
  );
};

export default ProgressQuestion;
