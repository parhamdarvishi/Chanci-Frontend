import { Avatar, Box, Button, Card, MultiSelect } from "@mantine/core";
import chanciIc from "@public/image/chanciAI/icon/chanciCh.svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconArrowRight } from "@tabler/icons-react";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";

interface DropDownQuestionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            className={style.questionImg}
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
      <Box style={{ display: "flex", width: "100%" }}>
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
        {answers[questionIndex]?.step && MultiSelect?.length === 3 && (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginLeft: "400px",
            }}
          >
            <div style={{ color: "#0063F5" }}>your Answer : </div>
            {multiAnswer?.map((item: string, index: number) => (
              <div key={index}>{item}</div>
            ))}
          </Box>
        )}
      </Box>
    </div>
  );
};

export default MultiSelectBox;
