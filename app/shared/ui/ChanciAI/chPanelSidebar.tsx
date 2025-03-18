import { Box, Card, Divider } from "@mantine/core";
import React, { useState } from "react";
import style from "./style/chPanelSidebar.module.scss";
import Title from "@public/image/widget/Frame.svg";
import Image from "next/image";
import {
  IconChecklist,
  IconReportAnalytics,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ChPanelSidebar = () => {
  const [active, setActive] = useState<number>(0);
  const { push } = useRouter();

  const handleProfile = () => {
    if (active === 0) {
      return;
    } else {
      setActive(0);
      push("/panel");
    }
  };

  return (
    <Card shadow="sm" padding="lg" className={style.wrapper}>
      <Box>
        <Image src={Title} alt="ChanciAi" loading="lazy" width={115} />
      </Box>
      <Divider color="#D5D5D7" style={{ margin: "1.6rem 0" }} />
      <Box className={style.progressPart}>
        <div
          className={
            active === 0 ? style.progressPartBoxActive : style.progressPartBox
          }
          onClick={handleProfile}
        >
          <IconUser />
          <span style={{ transform: "translateY(3px)", fontSize: "19px" }}>
            Profile
          </span>
        </div>
        <Link href={"/ChanciAI"} className={style.progressPartBox}>
          <IconReportAnalytics />
          <span style={{ transform: "translateY(3px)", fontSize: "19px" }}>
            Chanci AI
          </span>
        </Link>
        <Link href={"#"} className={style.progressPartBox}>
          <IconChecklist />
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
