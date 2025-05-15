"use client";
import { Box, Card, Divider, Progress } from "@mantine/core";
import React, { useEffect, useState } from "react";
import style from "./style/sidebar.module.scss";
import Title from "@public/image/widget/Frame.svg";
import done from "@public/image/chanciAI/icon/Done.svg";
import Image from "next/image";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
import StepModal from "@/widget/chanciAI/slice/stepModal/stepModal";
import { modals } from "@mantine/modals";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import useIsMobile from "@/shared/hooks";

const PsychologyTestSidebar: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [sidebarLoc, setSidebarLoc] = useState([1]);
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();
  const isMobile = useIsMobile();
  const isResult = pathname.includes("result");

  const { sidebarPostion, questionIndex, data, answers } = useChanci();
  const openCareerModal = () => {
    const desc =
      "Well done with the last part, now we collect your career preferences here";
    modals.open({
      radius: "30px",
      size: "lg",
      children: <StepModal desc={desc} />,
    });
  };

  const openNationalityModal = () => {
    const desc =
      "Well done with the last section, now let's talk about your visa status ";
    modals.open({
      radius: "30px",
      size: "lg",
      children: <StepModal desc={desc} />,
    });
  };

  const checkSidebarPostion = () => {
    if (sidebarPostion === 2) {
      setSidebarLoc([1, 2]);
      if (!answers[questionIndex]?.step) {
        openCareerModal();
      }
    }
    if (sidebarPostion === 3) {
      setSidebarLoc([1, 2, 3]);
      if (!answers[questionIndex]?.step) {
        openNationalityModal();
      }
    }
    if (sidebarPostion === 4) {
      setSidebarLoc([1, 2, 3, 4]);
    }
    if (sidebarPostion === 5) {
      setSidebarLoc([1, 2, 3, 4, 5]);
    }

    if (sidebarPostion === 6) {
      setSidebarLoc([1, 2, 3, 4, 5, 6]);
      setProgress(100);
    }
  };

  const handleResultShow = (type: string) => {
    if (isResult) {
      router.push(`/ChanciAI/result/${id}/${type}`);
    }
  };

  const checkSidebarPostionByQuestion = () => {
    if (sidebarPostion === 6) {
      setSidebarLoc([1, 2, 3, 4, 5, 6]);
      setProgress(100);
      return;
    }
    setProgress((10 * questionIndex) / 5);
  };

  useEffect(() => {
    checkSidebarPostion();
  }, [sidebarPostion]);
  useEffect(() => {
    checkSidebarPostionByQuestion();
  }, [questionIndex]);
  useEffect(() => {
    if (isResult) {
      setSidebarLoc([1, 2, 3, 4, 5, 6]);
      setProgress(100);
    }
  }, [isResult]);

  return (
    <Card shadow="sm" padding="lg" className={style.wrapper}>
      {!isMobile && (
        <>
          <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link href="/Home">
              <Image src={Title} alt="ChanciAi" loading="lazy" width={115} />
            </Link>
          </Box>
          <Divider color="#D5D5D7" style={{ margin: "1.8rem 0" }} />
        </>
      )}

      {sidebarPostion === 6 && data?.length === questionIndex && (
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          style={{
            display: "flex",
            flexDirection: "row",
            gap: ".5rem",
          }}
        >
          <Image src={done} alt="done" />
          <div
            style={{ display: "flex", flexDirection: "column", gap: ".1rem" }}
          >
            <p style={{ fontSize: "19px" }}>Congratulations!</p>
            <span>Your result is ready</span>
          </div>
        </Card>
      )}
      <Box>
        <h4
          style={{
            marginBottom: ".8rem",
            fontWeight: "400",
            color: "#9F9F9F",
            margin: ".6rem 0",
          }}
        >
          Total Progress
        </h4>
        <Progress
          value={progress}
          color={progress < 100 ? "#0063F5" : "#08CD6A"}
          transitionDuration={200}
        />
        {sidebarPostion === 6 && data?.length === questionIndex ? (
          <div style={{ color: "#08CD6A" }}>
            Click on each section to expand the results
          </div>
        ) : (
          <>
            <Box>
              <ul className={style.progressAction}>
                <li style={{ color: "#74727B" }}>Not Started</li>
                <li style={{ color: "#0063F5" }}>In Progress</li>
                <li style={{ color: "#08CD6A" }}>Done</li>
              </ul>
            </Box>
          </>
        )}

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
            <span onClick={() => handleResultShow("Psychology")}>
              Psychology test (20 questions)
            </span>
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
              sidebarLoc.includes(5) && sidebarLoc.includes(6)
                ? style.progressPartDone
                : sidebarLoc.includes(5)
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

export default PsychologyTestSidebar;
