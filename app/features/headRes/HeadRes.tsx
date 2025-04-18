import { Box, Card } from "@mantine/core";
import Image from "next/image";
import React, { CSSProperties } from "react";
import Menu from "@public/menu.svg";
import style from "./style.module.scss";
import QuestionSquare from "@public/image/chanciAI/icon/QuestionSquare.svg";
import { modals } from "@mantine/modals";
import StepModal from "@/widget/chanciAI/slice/stepModal/stepModal";
import useIsMobile from "@/shared/hooks";
import { howItWorksModal } from "@/shared/ui/ChanciAI/ChanciHeader";
const HeadRes = ({ menuClick }: { menuClick: () => void }) => {
  const isMobile = useIsMobile();
  return (
    <div className={style.wrapper}>
      <Card onClick={menuClick} className={style.wrapperCard}>
        <Image src={Menu} alt="Menu" />
      </Card>
      <Box className={style.assessmentHeader}>
        {/* <Box className={style.assessment}>
          <Image src={add} alt="add" />
          <h4>New Assessment</h4>
        </Box> */}
        <Card
          shadow="sm"
          padding="lg"
          onClick={()=> howItWorksModal({isMobile})}
          style={{ cursor: "pointer" }}
          className={style.wrapperCard}
        >
          <div className={style.HowItWorkL}>
            <Image src={QuestionSquare} alt="QuestionSquare" />
          </div>
        </Card>
      </Box>
    </div>
  );
};

export default HeadRes;
