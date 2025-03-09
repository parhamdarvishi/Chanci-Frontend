import { Avatar, Box, Card, MultiSelect } from "@mantine/core";
import chanciIc from "@public/image/chanciAI/icon/chanciCh.svg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";

interface DropDownQuestionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  question: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  answers: any;
}

const MultiSelectBox = ({ question }: DropDownQuestionProps) => {
  const [dropD, setDropD] = useState([]);
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
  useEffect(() => {
    fun();
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
              label="Your favorite libraries"
              placeholder="Select up to 3 libraries"
              data={dropD}
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
      </Box>
    </div>
  );
};

export default MultiSelectBox;
