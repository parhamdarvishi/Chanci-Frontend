"use client";
import { Box, Card, Divider, Progress } from "@mantine/core";
import React, { useEffect, useState } from "react";
import style from "./style/sidebar.module.scss";
import Title from "@public/image/widget/Frame.svg";
import Image from "next/image";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";

const Sidebar = () => {
  const [progress, setProgress] = useState(0);
  const [sidebarLoc, setSidebarLoc] = useState([1]);

  const { sidebarPostion, questionIndex, data } = useChanci();

  const checkSidebarPostion = () => {
    if (sidebarPostion === 2) {
      setSidebarLoc([1, 2]);
      setProgress(40);
    }
    if (sidebarPostion === 3) {
      setSidebarLoc([1, 2, 3]);
      setProgress(70);
    }
    if (sidebarPostion === 4) {
      setSidebarLoc([1, 2, 3, 4]);
      setProgress(85);
    }
    if (sidebarPostion === 5) {
      setSidebarLoc([1, 2, 3, 4, 5]);
      setProgress(95);
    }
    if (data?.length > 0 && data?.length === questionIndex - 1) {
      setProgress(100);
    }
  };

  useEffect(() => {
    setProgress(0);
    checkSidebarPostion();
  }, [sidebarPostion]);

  return (
    <Card shadow="sm" padding="lg" className={style.wrapper}>
      <Box>
        <Image src={Title} alt="ChanciAi" loading="lazy" width={115} />
      </Box>
      <Divider color="#D5D5D7" style={{ margin: "1.8rem 0" }} />
      <Box>
        <h4
          style={{ marginBottom: ".8rem", fontWeight: "400", color: "#9F9F9F" }}
        >
          Total Progress
        </h4>
        <Progress
          value={progress}
          color={progress < 100 ? "#0063F5" : "#08CD6A"}
          transitionDuration={200}
        />
        <Box>
          <ul className={style.progressAction}>
            <li style={{ color: "#74727B" }}>Not Started</li>
            <li style={{ color: "#0063F5" }}>In Progress</li>
            <li style={{ color: "#08CD6A" }}>Done</li>
          </ul>
        </Box>
        <Box className={style.progressPart}>
          <div
            className={
              sidebarLoc.includes(1) && sidebarLoc.includes(2)
                ? style.progressPartDone
                : sidebarLoc.includes(1)
                ? style.progressPartActive
                : style.progressPartBox
            }
          >
            <span>Psychology test (20 questions)</span>
          </div>
          <div
            className={
              sidebarLoc.includes(2) && sidebarLoc.includes(3)
                ? style.progressPartDone
                : sidebarLoc.includes(2)
                ? style.progressPartActive
                : style.progressPartBox
            }
          >
            <span>Career Preference (6 Questions) </span>
          </div>
          <div
            className={
              sidebarLoc.includes(3) && sidebarLoc.includes(4)
                ? style.progressPartDone
                : sidebarLoc.includes(3)
                ? style.progressPartActive
                : style.progressPartBox
            }
          >
            <span>Nationality & Visa (3 Questions)</span>
          </div>
          <div
            className={
              sidebarLoc.includes(4) && sidebarLoc.includes(5)
                ? style.progressPartDone
                : sidebarLoc.includes(4)
                ? style.progressPartActive
                : style.progressPartBox
            }
          >
            <span>CV Section ( 1 Question)</span>
          </div>
          <div
            className={
              sidebarLoc.includes(5)
                ? style.progressPartActive
                : style.progressPartBox
            }
          >
            <span>Skills & Certificate ( 2 Questions)</span>
          </div>
        </Box>
      </Box>
    </Card>
  );
};

export default Sidebar;
