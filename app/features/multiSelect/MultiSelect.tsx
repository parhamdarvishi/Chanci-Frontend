import { Avatar, Box, Button, Card, MultiSelect } from "@mantine/core";
import chanciIc from "@public/image/chanciAI/icon/chanciCh.svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconArrowRight } from "@tabler/icons-react";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
import ChanciNavigation from "@/shared/ui/ChanciNavigation/ChanciNavigation";

interface DropDownQuestionProps {
   
  question: any;
}

const MultiSelectBox = ({ question }: DropDownQuestionProps) => {
  const [dropD, setDropD] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  const {
    answers,
    updateQuestionIndex,
    updateAnswers,
    questionIndex,
    multiAnswer,
    updateMultiAnswers,
  } = useChanci();
  const [value, setValue] = useState<string[]>(multiAnswer);
  const handleQustionIndex = () => {
    updateQuestionIndex(questionIndex - 1);
  };
  const handleQustionNext = () => {
    updateQuestionIndex(questionIndex + 3);
  };
  const fun = () => {
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
  const handleDropDown = (
    value: string[] | ((prevState: string[]) => string[])
  ) => {
    setValue(value);
    if (value?.length === 3) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }

    // if (answers[questionIndex]) {
    //   const answerIndex = answers.findIndex(
    //     (item) => item?.answerId === answers[questionIndex]?.answerId
    //   );

    //   const filterAnswer = answers; // Create a copy of the array
    //   if (answerIndex !== -1) {
    //     // Remove the item at answerIndex and insert the new answer
    //     filterAnswer.splice(answerIndex, 1, {
    //       questionId: question?.id,
    //       answerId: Number(value),
    //       step: Number(value),
    //     });
    //   }

    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   // updateAnswers(filterAnswer as any);
    //   // updateQuestionIndex(questionIndex + 1);
    //   return;
    // }
    // const answer = {
    //   questionId: question?.id,
    //   answerId: Number(value),
    //   step: Number(value),
    // };
    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  };

  const handleMulti = () => {
    if (answers[questionIndex]?.step) {
      const filteredAnswers = answers.filter(
        (item) => item.questionId !== question?.id
      );
      // Create new answers array with the selected values
      const newAnswers = value.map((element) => ({
        questionId: question?.id,
        answerId: Number(element),
        step: Number(element),
      }));

      // Combine filtered old answers with new answers
      const allAnswer = [...filteredAnswers, ...newAnswers];
      updateAnswers(allAnswer);
      updateMultiAnswers(value);
      setValue([]);
      updateAnswers(allAnswer);
      updateQuestionIndex(questionIndex + 3);
      return;
    }
    const allAnswer = answers;
    const val: string[] = [];
    value.forEach((element) => {
      val.push(element);
      const t = {
        questionId: question?.id,
        answerId: Number(element),
        step: Number(element),
      };
      allAnswer.push(t);
    });
    updateMultiAnswers(val);
    setValue([]);
    updateAnswers(allAnswer);
    updateQuestionIndex(questionIndex + 3);
  };

  const checkSubBtn = () => {
    if (value?.length !== multiAnswer?.length) {
      setHasChanges(true);
      return;
    }

    const hasDifferentValues =
      value?.some((item) => !multiAnswer?.includes(item)) ||
      multiAnswer?.some((item) => !value?.includes(item));

    setHasChanges(hasDifferentValues);
  };

  useEffect(() => {
    fun();
    checkSubBtn();
    // setVal("");
  }, [question]);
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
            <MultiSelect
              searchable
              placeholder={value.length > 0 ? "" : "Select here too choose..."}
              nothingFoundMessage="Nothing found..."
              checkIconPosition="right"
              style={{ width: "100%" }}
              classNames={{
                input: style.inpMultiSelect,
                label: style.labelMultiSelect,
              }}
              label="Select up to 3 Industries"
              data={dropD}
              value={value}
              onChange={(value) => handleDropDown(value ? value : [])}
              maxValues={3}
              hidePickedOptions
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
            className={`${style.btnChanci} ${hasChanges ? '' : style.disabled}`} 
            onClick={hasChanges ? handleMulti : undefined}
          >
            Next <IconArrowRight /> 
          </div>
        </Box>
      </Box>
      <ChanciNavigation previousVisibleCondition={(questionIndex > 0)} forwardVisibleCondition={Boolean( answers[questionIndex]?.step)} handleNextQuestion={handleQustionNext} handlePreviousQuestion={handleQustionIndex} />
    </div>
  );
};

export default MultiSelectBox;
