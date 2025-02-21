import { Card } from "@mantine/core";
import Image from "next/image";
import React from "react";
import Menu from "@public/menu.svg";
import style from "./style.module.scss";

const HeadRes = () => {
  return (
    <div className={style.wrapper}>
      <Card className={style.wrapperCard}>
        <Image src={Menu} alt="Menu" />
      </Card>
    </div>
  );
};

export default HeadRes;
