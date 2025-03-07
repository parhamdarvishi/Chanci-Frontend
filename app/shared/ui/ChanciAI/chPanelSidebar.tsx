import { Box, Card, Divider } from "@mantine/core";
import React from "react";
import style from "./style/chPanelSidebar.module.scss";
import Title from "@public/image/widget/Frame.svg";
import Image from "next/image";
import { IconReportAnalytics, IconUser } from "@tabler/icons-react";
import Link from "next/link";

const ChPanelSidebar = () => {
  return (
    <Card shadow="sm" padding="lg" className={style.wrapper}>
      <Box>
        <Image src={Title} alt="ChanciAi" loading="lazy" width={115} />
      </Box>
      <Divider color="#D5D5D7" style={{ margin: "1.6rem 0" }} />

      <Box className={style.progressPart}>
        <Link href={"/panel/users"} className={style.progressPartBox}>
          <IconUser />
          <span style={{ transform: "translateY(3px)", fontSize: "19px" }}>
            Profile
          </span>
        </Link>
        <Link href={"/panel/users"} className={style.progressPartBox}>
          <IconReportAnalytics />
          <span style={{ transform: "translateY(3px)", fontSize: "19px" }}>
            Result
          </span>
        </Link>
        {/* <div className={style.progressPartBox}>
          <span style={{ transform: "translateY(3px)" }}>
            Career Preference (6 Questions){" "}
          </span>
        </div>
        <div className={style.progressPartBox}>
          <span>Nationality & Visa (3 Questions)</span>
        </div>
        <div className={style.progressPartBox}>
          <span>CV Section ( 1 Question)</span>
        </div>
        <div className={style.progressPartBox}>
          <span>Skills & Certificate ( 2 Questions)</span>
        </div> */}
      </Box>
    </Card>
  );
};

export default ChPanelSidebar;
