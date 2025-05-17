"use client";
import style from "../../../style.module.scss";
import { useParams } from "next/navigation";
import { getRequest } from "@/shared/api";
import toastAlert from "@/shared/helpers/toast";
import useIsMobile from "@/shared/hooks";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { Card, Divider, Drawer, Grid, GridCol } from "@mantine/core";
import DynamicSidebar from "@/shared/ui/ChanciAI/DynamicSidebar";
import DynamicResultView from "@/shared/ui/ChanciAI/DynamicResultView";
import ChanciHeader, {
  ModalComponent,
} from "@/shared/ui/ChanciAI/ChanciHeader";
import HeadRes from "@/features/headRes/HeadRes";
import Link from "next/link";
import Image from "next/image";
import Title from "@public/image/widget/Frame.svg";
import { resultInstruction } from "@/shared/constants/data";
import {
  CvAnalysisSectionFlags,
  IndustryScore,
  JobRecommendation,
  ResultApiResponse,
  ResultBigFive,
  ResultSection,
  Resume,
} from "@/shared/types/chanci/result";
import { modals } from "@mantine/modals";
import LoadingModal from "@/widget/chanciAI/slice/loadingModal/loadingModal";
import ChanciContainer from "@/shared/ui/ChanciAI/ChanciContainer";
/* const olComponent = ()=> {
  return(
    <TestSidebar>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: 'center' }}>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={style.cardDone}
        >
          <h3>Thank you for completing the test! 🎉</h3>
          <p style={{ maxWidth: "700px", fontSize: "17px" }}>
            Based on your responses, we&apos;ve prepared a detailed analysis of
            your personality traits, career preferences, and strengths.
          </p>
          <p style={{ maxWidth: "700px" }}>
            This report is designed to help you gain deeper insights into your
            unique qualities and guide you toward making informed decisions for
            your personal and professional growth.
          </p>
          <span style={{ fontSize: "17px", fontWeight: "600" }}>
            Here&apos;s what you can expect in your results:
          </span>
        </Card>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={style.cardDone}
          style={{
            backgroundColor: "#eef1ff",
            display: "flex",
            flexDirection: 'column',
            gap: '0.9rem',
            width: "700px"
          }}
        >
          <h3>Openness to Experience </h3>
          <strong style={{ fontSize: "18px", fontWeight: "500" }}>
            You scored high on openness.
          </strong>
          <li style={{ maxWidth: "700px", fontSize: "17px" }}>
            Youre naturally curious and eager to explore new ideas and
            experiences.
          </li>
          <li style={{ maxWidth: "700px", fontSize: "17px" }}>
            You enjoy creative problem-solving and are enthusiastic about learning
            new things.
          </li>
          <p style={{ maxWidth: "700px", fontSize: "17px" }}>
            Example from your answers: You showed excitement about learning a new
            instrument despite your busy schedule.
          </p>
        </Card>
        {loading && <div className={style.loadingBox}>
          <div className={style.loaderBox}>
            <div className={style.loadingText}>Loading ...</div>
            <div className={style.progressBar}>
            <div
            className={style.progressIndicator}
            style={{ width: `${progress}%` }}
          />
            </div>
          </div>
        </div>}
        {!loading && <div className={style.chanciPlusBox}>
          <button
            className={style.button}
            onClick={handleExploreClick}
            style={{ position: "relative", top: "10px" }}
            disabled={loading}
          >
            <>
              Explore Chanci AI Plus
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </>
          </button>
        </div>}
      </div>
    </TestSidebar >
  )
} */
const Page = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [jobRecommendation, setJobRecommendation] =
    useState<JobRecommendation>();
  const [industryScores, setIndustryScores] = useState<IndustryScore[]>([]);
  const [sections, setSections] = useState<CvAnalysisSectionFlags>();
  const [resultSections, setResultSections] = useState<ResultSection[]>();
  const [bigFive, setBigFive] = useState<ResultBigFive>();
  const [activeSection, setActiveSection] = useState<string>(
    "PersonalityAnalysis"
  );
  const [resume, setResume] = useState<Resume>();
  const isMobile = useIsMobile();
  const [opened, { open, close }] = useDisclosure(false);
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const [reportStatus, setReportStatus] = useState<number>();
  const loadingModal = () => {
    modals.open({
      radius: "30px",
      size: "lg",
      styles: {
        content: {
          position: "fixed",
          maxWidth: isMobile ? "328px" : "570px",
          top: "30%",
          width: "100%",
        },
        inner: {
          display: "flex",
          justifyContent: "center",
        },
      },
      children: (
        <LoadingModal
          width={isMobile ? 64 : 116}
          paragraphWidth="480px"
          desc={"Wait a few seconds to see your result!"}
        />
      ),
    });
    return <></>;
  };
  useEffect(() => {
    const pollReportStatus = async () => {
      try {
        const reqBody = {
          UserAnswerHeaderId: Number(params.id),
        };

        const res: ResultApiResponse = await getRequest(
          "/api/UserAnswers/ConvertAnswersToPromptCommand",
          reqBody,
          true
        );

        const code = res?.data?.reportStatus;
        setReportStatus(code);

        if (code === 3) {
          clearInterval(interval);
          setLoading(false);
          modals.closeAll();

          setTimeout(() => {
            ModalComponent({ isMobile, desc: resultInstruction });
          }, 2000);

          setSections(res?.data?.activeResult?.sections);
          setJobRecommendation(res?.data?.jobRecommendation);
          setIndustryScores(res?.data?.industryScores || []);
          setResultSections(res?.data?.sections);
          setBigFive(res?.data?.bigFiveAverage);
          setResume(res?.data?.resume);
        } else {
          console.log(`Polling reportStatus: ${code}`);
        }
      } catch (error) {
        console.error("Polling failed:", error);
      }
    };

    const interval = setInterval(pollReportStatus, 3000);
    pollReportStatus(); // Run immediately once

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <>
      {loading && loadingModal()}
      {loading ? (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.49)",
            width: "100%",
            height: "100vh",
          }}
        ></div>
      ) : (
        <Grid
          gutter={{ md: 15 }}
          style={{
            padding: "1rem",
            backgroundColor: "#F7F7F7",
            height: "100vh",
          }}
        >
          <Drawer.Root
            opened={opened}
            onClose={close}
            radius={8}
            size={"310px"}
          >
            <Drawer.Overlay />
            <Drawer.Content>
              {isMobile && (
                <Drawer.Header style={{ marginBottom: ".6rem" }}>
                  <Drawer.Title
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Link href="/Home">
                      <Image src={Title} alt="header" width={115} height={80} />
                    </Link>
                  </Drawer.Title>
                  <Drawer.CloseButton size={42} color="#585858" />
                </Drawer.Header>
              )}
              <Drawer.Body>
                <Divider />
                {sections && (
                  <DynamicSidebar
                    sections={sections}
                    activeSection={activeSection}
                    onSectionChange={handleSectionChange}
                    drawer={Boolean(isMobile)}
                  />
                )}
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Root>
          <GridCol span={{ base: 12, md: 3 }} className={style.sidebar}>
            {sections && (
              <DynamicSidebar
                sections={sections}
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                drawer={false}
              />
            )}
          </GridCol>
          <GridCol span={{ base: 12, md: 9 }}>
            <div>
              <HeadRes menuClick={open} />
            </div>

            <ChanciHeader />
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              className="chanciSection"
              style={{ overflowY: "auto" }}
            >
              {jobRecommendation && (
                <DynamicResultView
                  industryScores={industryScores}
                  result={jobRecommendation}
                  activeSection={activeSection}
                  sections={resultSections}
                  resume={resume}
                  bigFive={bigFive}
                />
              )}
            </Card>
          </GridCol>
        </Grid>
      )}
    </>
  );
};

export default Page;
