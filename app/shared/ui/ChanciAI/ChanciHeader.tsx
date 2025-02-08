import React from "react";
import style from "./style/chanciHeader.module.scss";
import { Avatar, Box, Card } from "@mantine/core";
import QuestionSquare from "@public/image/chanciAI/icon/QuestionSquare.svg";
import arrow from "@public/image/chanciAI/icon/arrowLeft.svg";
import notification from "@public/image/chanciAI/icon/notification.svg";
import add from "@public/image/chanciAI/icon/add.svg";
import Image from "next/image";

const ChanciHeader = () => {
  return (
    <Box className={style.wrapper}>
      <Box className={style.assessmentHeader}>
        <Box className={style.assessment}>
          <Image src={add} alt="add" />
          <h4>New Assessment</h4>
        </Box>
        <Card shadow="sm" padding="lg" className={style.HowItWorks}>
          <div className={style.HowItWorkL}>
            <Image src={QuestionSquare} alt="QuestionSquare" />
            <span>How it works?</span>
          </div>
          <Image src={arrow} alt="arrow" />
        </Card>
      </Box>
      <Box className={style.assessmentNotif}>
        <Box className={style.assessmentNotifBox}>
          <Image src={notification} alt="QuestionSquare" />
        </Box>
        <Avatar alt="it's me" />
      </Box>
    </Box>
  );
};

export default ChanciHeader;
