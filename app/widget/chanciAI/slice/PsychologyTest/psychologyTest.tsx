import DropDownQuestion from "@/features/dropDownQuestion/DropDownQuestion";
import OptionQuestion from "@/features/optionsQuestions/OptionQuestion";
import ProgressQuestion from "@/features/progressQuestion/ProgressQuestion";
import TextQuestion from "@/features/textQuestion/TextQuestion";
import UploadQuestion from "@/features/uploadQuestion/UploadQuestion";
import { postRequest } from "@/shared/api";
import { userAddresses } from "@/shared/constants/relative-url/user";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
import { Card } from "@mantine/core";
import React, { useEffect } from "react";
import style from "../style.module.scss";

// Define the type for the question prop
interface Question {
  inputType?: number;
  // Add other properties as needed
}

interface PsychologyTestProps {
  question: Question;
}

const PsychologyTest: React.FC<PsychologyTestProps> = ({ question }) => {
  const {
    questionIndex,
    updateQuestionIndex,
    answers,
    UpdateSidebarPostion,
    data,
  } = useChanci();

  const sendAnswers = async () => {
    debugger;
    const reqbody = {
      answers: answers,
    };
    await postRequest(userAddresses.userAnswers, reqbody, true);
  };

  useEffect(() => {
    if (data?.length > 0 && data?.length === questionIndex) {
      sendAnswers();
      UpdateSidebarPostion(6);
    }
    if (question?.inputType === 0) {
      updateQuestionIndex(questionIndex + 1);
    }
    // @ts-expect-error: Ignoring TypeScript error due to array spread
    if (question?.type === 2) {
      UpdateSidebarPostion(2);
    }
    // @ts-expect-error: Ignoring TypeScript error due to array spread
    if (question?.type === 3) {
      UpdateSidebarPostion(3);
    }
    // @ts-expect-error: Ignoring TypeScript error due to array spread
    if (question?.type === 4) {
      UpdateSidebarPostion(4);
    }
    // @ts-expect-error: Ignoring TypeScript error due to array spread
    if (question?.type === 5) {
      UpdateSidebarPostion(5);
    }
  }, [question]);

  return (
    <div style={{ height: "100%" }}>
      {question?.inputType === 1 && (
        <TextQuestion question={question} />
        // <div>Text Question Component</div>
      )}
      {question?.inputType === 2 && <ProgressQuestion question={question} />}
      {question?.inputType === 3 && <DropDownQuestion question={question} />}
      {question?.inputType === 4 && <UploadQuestion />}
      {question?.inputType === 5 && <OptionQuestion question={question} />}
      {data?.length === questionIndex && (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={style.cardDone}
          >
            <h3>Thank you for completing the test! 🎉</h3>
            <p style={{ maxWidth: "700px", fontSize: "17px" }}>
              Based on your responses, we’ve prepared a detailed analysis of
              your personality traits, career preferences, and strengths.
            </p>
            <p style={{ maxWidth: "700px" }}>
              This report is designed to help you gain deeper insights into your
              unique qualities and guide you toward making informed decisions
              for your personal and professional growth.
            </p>
            <span style={{ fontSize: "17px", fontWeight: "600" }}>
              Here’s what you can expect in your results:
            </span>
          </Card>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={style.cardDone}
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
              You enjoy creative problem-solving and are enthusiastic about
              learning new things.
            </li>
            <p style={{ maxWidth: "700px", fontSize: "17px" }}>
              Example from your answers: You showed excitement about learning a
              new instrument despite your busy schedule.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PsychologyTest;
