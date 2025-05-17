import { Box, Card } from "@mantine/core";
import Image from "next/image";
import React from "react";
import Menu from "@public/menu.svg";
import style from "./style.module.scss";
import QuestionSquare from "@public/image/chanciAI/icon/QuestionSquare.svg";
import useIsMobile from "@/shared/hooks";
import { ModalComponent } from "@/shared/ui/ChanciAI/ChanciHeader";
import { howItWorksText } from "@/shared/constants/data";
import notification from "@public/image/chanciAI/icon/notification.svg";
import PanelCard from "@/shared/ui/ChanciAI/PanelCard";
const HeadRes = ({ menuClick }: { menuClick: () => void }) => {
  const isMobile = useIsMobile();
  return (
    <div className={style.wrapper}>
      <Card onClick={menuClick} className={style.wrapperCard}>
        <Image src={Menu} alt="Menu" />
      </Card>
      <Box className={style.assessmentHeader}>
        <div className={style.panelContainer}>
          <PanelCard />
          <Box className={style.assessmentNotif}>
            <Box onClick={() => ModalComponent({ isMobile, desc: howItWorksText })}
            style={{ cursor: "pointer" }} className={style.assessmentNotifBox}>
              <Image src={QuestionSquare} alt="QuestionSquare" />
            </Box></Box>
          <Box className={style.assessmentNotif}>
            <Box className={style.assessmentNotifBox}>
              <Image
                src={notification}
                alt="QuestionSquare"
                className={style.assessmentNotifImg}
              />
            </Box></Box>
        </div>
      </Box>
    </div>
  );
};

export default HeadRes;
