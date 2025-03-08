import { Box } from "@mantine/core";
import Image from "next/image";
import React from "react";
import Title from "@public/image/widget/Frame.svg";
import style from "../style.module.scss";
import { modals } from "@mantine/modals";

type props = {
  desc: string;
};

const StepModal = ({ desc }: props) => {
  const handleCloseModal = () => {
    modals.closeAll();
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src={Title} alt="ChanciAi" loading="lazy" width={115} />
      </Box>
      <p style={{ textAlign: "center", maxWidth: "400px", fontSize: "17px" }}>
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
          <p style={{ cursor: "pointer" }}>let&apos;s go</p>
        </div>
      </Box>
    </div>
  );
};

export default StepModal;
