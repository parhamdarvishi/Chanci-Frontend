import DropDownQuestion from "@/features/dropDownQuestion/DropDownQuestion";
// import OptionQuestion from "@/features/optionsQuestions/OptionQuestion";
import ProgressQuestion from "@/features/progressQuestion/ProgressQuestion";
import TextQuestion from "@/features/textQuestion/TextQuestion";
import UploadQuestion from "@/features/uploadQuestion/UploadQuestion";
import { postRequest } from "@/shared/api";
import { userAddresses } from "@/shared/constants/relative-url/user";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
import React, { useEffect, useState } from "react";
import MultiSelectBox from "@/features/multiSelect/MultiSelect";
import { useRouter } from "next/navigation";
import { Avatar, Box } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import style from "@/features/shared/styles.module.scss";

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
  const [showWelcome, setShowWelcome] = useState(true);

  const sendAnswers = async () => {
    const reqbody = {

      answers: answers.map(({ step, ...rest }) => rest),
    };
    const { data } = await postRequest(
      userAddresses.userAnswers,
      reqbody,
      true
    );
    router.push(`/ChanciAI/result/${(data as { id: string }).id}`);
  };

  const handleStart = () => {
    setShowWelcome(false);
    updateQuestionIndex(0);
  };

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
  }, [question, showWelcome]);

  return (
    <div style={{ height: "100%" }}>
      {showWelcome ? (
        <div className={style.startWrapper}>
          <Box className={style.startBox}>

            <Box className={style.userBox}>
              <Avatar
                src="image/chanciAI/chanci.svg"
                alt="it's me"
                size={55}
                className={style.questionImgChanci}
              />
              <Box className={style.questionTitle}>
                <h3 style={{ marginTop: "0", marginBottom: "10px" }}>Hi, I am Chanci AI</h3>
                <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                  Let me know how do you feel about each statement.
                </p>
              </Box>
            </Box>
            <Box className={style.questionPart}>

              <Box className={style.startBtnBox}>
                <div
                  onClick={handleStart}
                  className={style.btnChanci}
                >
                  Start
                </div>
              </Box>
            </Box>
          </Box>
        </div>
      ) : (
        <>
          {question?.inputType === 1 && <TextQuestion question={question} />}
          {question?.inputType === 2 && <ProgressQuestion question={question} />}
          {question?.inputType === 3 && (
            <DropDownQuestion question={question} answers={answers} />
          )}
          {question?.inputType === 4 && <UploadQuestion />}
          {question?.inputType === 5 && <MultiSelectBox question={question} />}
        </>
      )
      }
    </div >
  );
};

export default PsychologyTest;
