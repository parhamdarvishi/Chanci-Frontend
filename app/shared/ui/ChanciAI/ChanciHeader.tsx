import React from "react";
import style from "./style/chanciHeader.module.scss";
import { Avatar, Box, Card } from "@mantine/core";
import QuestionSquare from "@public/image/chanciAI/icon/QuestionSquare.svg";
import arrow from "@public/image/chanciAI/icon/arrowLeft.svg";
import notification from "@public/image/chanciAI/icon/notification.svg";
import Image from "next/image";
import { modals } from "@mantine/modals";
import StepModal from "@/widget/chanciAI/slice/stepModal/stepModal";
import useIsMobile from "@/shared/hooks";

const ChanciHeader = () => {
  const isMobile = useIsMobile();
  const howItWorksModal = () => {
    const desc =
      "This test connects your psychology assessment results to real-time job market data, offering opportunities across more than 20 industries. It includes a variety of test formats and takes approximately 10 minutes to complete. The results are presented in five key categories: psychology assessment outcomes, the Job Matrix, and your employability score, all tailored to live market trends.";
    modals.open({
      radius: "30px",
      size: "xl",
      styles: {
        content: {
          bottom: isMobile ? 0 : "auto",
          top: isMobile ? "auto" : "50%",
          left: 0,
          right: 0,
          width: "100%",
          maxWidth: "500px",
          margin: "auto",
          borderTopLeftRadius: isMobile ? "16px" : "0px",
          borderTopRightRadius: isMobile ? "16px" : "0px",
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
        },
        inner: {
          display: "flex",
          alignItems: "end",
          justifyContent: "center",
        },
      },
      children: <StepModal desc={desc} ctaText="Ok" />,
    });
  }
  return (
    <Box className={style.wrapper}>
      <Box className={style.assessmentHeader}>
        {/* <Box className={style.assessment}>
          <Image src={add} alt="add" />
          <h4>New Assessment</h4>
        </Box> */}
        <Card shadow="sm" padding="lg" className={style.HowItWorks}>
          <div className={style.HowItWorkL} style={{cursor: 'pointer'}} onClick={howItWorksModal}>
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
