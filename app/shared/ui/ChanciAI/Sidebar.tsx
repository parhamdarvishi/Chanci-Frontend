"use client";
import { Box, Card, Divider, Progress } from "@mantine/core";
import React, { useEffect, useState } from "react";
import style from "./style/sidebar.module.scss";
import Title from "@public/image/widget/Frame.svg";
import Image from "next/image";

const Sidebar = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(0);
  }, []);

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
          <div className={style.progressPartBox}>
            <span>Psychology test (20 questions)</span>
          </div>
          <div className={style.progressPartBox}>
            <span>Career Preference (6 Questions) </span>
          </div>
          <div className={style.progressPartBox}>
            <span>Nationality & Visa (3 Questions)</span>
          </div>
          <div className={style.progressPartBox}>
            <span>CV Section ( 1 Question)</span>
          </div>
          <div className={style.progressPartBox}>
            <span>Skills & Certificate ( 2 Questions)</span>
          </div>
        </Box>
      </Box>
    </Card>
  );
};

export default Sidebar;
