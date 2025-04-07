import { Box } from "@mantine/core";
import Image from "next/image";
import React from "react";
import Title from "@public/image/widget/Frame.svg";
import style from "../style.module.scss";
import { modals } from "@mantine/modals";

type props = {
  desc: string;
  paragraphWidth?: string;
  ctaText?: string;
};

const StepModal = ({ desc, paragraphWidth, ctaText }: props) => {
  const handleCloseModal = () => {
    modals.closeAll();
  };
  return (
    <div
      className={style.container}
    >
      <Box
        className={style.chanciImgBox}
      >
        <Image src={Title} alt="ChanciAi" loading="lazy" width={115} />
      </Box>
      <p className={style.desc} {...(paragraphWidth && { style: { maxWidth: paragraphWidth } })} >
        {desc}
      </p>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <div className={style.button} onClick={handleCloseModal}>
          <span style={{ cursor: "pointer" }}>{ctaText ? ctaText : `Let's go`}</span>
        </div>
      </Box>
    </div>
  );
};

export default StepModal;
