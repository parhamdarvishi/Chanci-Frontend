import DropDownQuestion from "@/features/dropDownQuestion/DropDownQuestion";
// import OptionQuestion from "@/features/optionsQuestions/OptionQuestion";
import ProgressQuestion from "@/features/progressQuestion/ProgressQuestion";
import TextQuestion from "@/features/textQuestion/TextQuestion";
import UploadQuestion from "@/features/uploadQuestion/UploadQuestion";
import { postRequest } from "@/shared/api";
import { userAddresses } from "@/shared/constants/relative-url/user";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
import React, { useEffect } from "react";
import { modals } from "@mantine/modals";
import StepModal from "../stepModal/stepModal";
import MultiSelectBox from "@/features/multiSelect/MultiSelect";
import { useRouter } from "next/navigation";

interface Question {
  inputType?: number;
  type?: number;
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
  const router = useRouter();
  const sendAnswers = async () => {
    const reqbody = {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      answers: answers.map(({ step, ...rest }) => rest),
    };
    const { data } = await postRequest(
      userAddresses.userAnswers,
      reqbody,
      true
    );
    router.push(`/ChanciAI/result/${(data as { id: string }).id}`);
  };
  const openModal = () => {
    const desc =
      "Please read the statement and express if you agree or disagree";
    modals.open({
      radius: "30px",
      size: "lg",
      children: <StepModal desc={desc} />,
    });
  };

  useEffect(() => {
    openModal();
  }, []);

  useEffect(() => {
    if (data?.length > 0 && data?.length === questionIndex) {
      sendAnswers();
      UpdateSidebarPostion(6);
    }
    if (question?.inputType === 0) {
      updateQuestionIndex(questionIndex + 1);
    }

    if (question?.type === 2) {
      UpdateSidebarPostion(2);
    }
    if (question?.type === 3) {
      UpdateSidebarPostion(3);
    }
    if (question?.type === 4) {
      UpdateSidebarPostion(4);
    }
    if (question?.type === 5) {
      UpdateSidebarPostion(5);
    }
  }, [question]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ height: "100%" }}>
      {question?.inputType === 1 && <TextQuestion question={question} />}
      {question?.inputType === 2 && <ProgressQuestion question={question} />}
      {question?.inputType === 3 && (
        <DropDownQuestion question={question} answers={answers} />
      )}
      {question?.inputType === 4 && <UploadQuestion />}
      {question?.inputType === 5 && <MultiSelectBox question={question} />}
      {/* {sidebarPostion === 6 && data?.length === questionIndex && (
  
      )} */}
    </div>
  );
};

export default PsychologyTest;
