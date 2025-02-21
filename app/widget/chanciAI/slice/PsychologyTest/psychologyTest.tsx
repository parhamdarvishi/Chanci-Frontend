import DropDownQuestion from "@/features/dropDownQuestion/DropDownQuestion";
import OptionQuestion from "@/features/optionsQuestions/OptionQuestion";
import ProgressQuestion from "@/features/progressQuestion/ProgressQuestion";
import TextQuestion from "@/features/textQuestion/TextQuestion";
import UploadQuestion from "@/features/uploadQuestion/UploadQuestion";
import { postRequest } from "@/shared/api";
import { userAddresses } from "@/shared/constants/relative-url/user";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
import React, { useEffect } from "react";

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

  console.log({ questionIndex });
  console.log(data?.length);

  const sendAnswers = async () => {
    debugger;
    const reqbody = {
      answers: answers,
    };
    const res = await postRequest(userAddresses.userAnswers, reqbody, true);
    console.log({ res });
  };

  useEffect(() => {
    if (data?.length > 0 && data?.length === questionIndex - 1) {
      sendAnswers();
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
      {data?.length === questionIndex - 1 && <p>Done</p>}
    </div>
  );
};

export default PsychologyTest;
