import { Box } from "@mantine/core";
import Image from "next/image";
import React from "react";
import Loading from "@public/clock-icon.svg";
import style from "../style.module.scss";

type props = {
  desc: string;
  paragraphWidth?: string;
  width: number;
};

const LoadingModal = ({ desc, paragraphWidth, width }: props) => {
  return (
    <div
      className={style.container}
    >
      <Box
        className={style.chanciImgBox}
      >
        <Image src={Loading} alt="ChanciAi" loading="lazy" width={width} />
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
      </Box>
    </div>
  );
};

export default LoadingModal;
