import React from "react";
import style from "./style/chanciHeader.module.scss";
import { Avatar, Box, Card } from "@mantine/core";
import QuestionSquare from "@public/image/chanciAI/icon/QuestionSquare.svg";
import arrow from "@public/image/chanciAI/icon/arrowLeft.svg";
import notification from "@public/image/chanciAI/icon/notification.svg";
import Image from "next/image";

const ChanciHeader = () => {
  return (
    <Box className={style.wrapper}>
      <Box className={style.assessmentHeader}>
        {/* <Box className={style.assessment}>
          <Image src={add} alt="add" />
          <h4>New Assessment</h4>
        </Box> */}
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
          <Image
            src={notification}
            alt="QuestionSquare"
            className={style.assessmentNotifImg}
          />
        </Box>
        <Avatar
          src="image/chanciAI/chanci.svg"
          alt="it's me"
          size={55}
          classNames={{
            image: style.avatarImg,
          }}
        />
        {/* <div style={{ width: "110px", height: "140px", borderRadius: "40%" }}>
          <Image
            style={{ borderRadius: "50%", width: "100%", objectFit: "cover" }}
            src={chacniImg}
            alt="chanci"
          />
        </div> */}
      </Box>
    </Box>
  );
};

export default ChanciHeader;
