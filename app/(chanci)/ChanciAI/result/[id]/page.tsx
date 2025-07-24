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
    modals?.open({
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
    let timeout: NodeJS.Timeout;
  
    const pollReportStatus = async () => {
      try {
        debugger;
        const reqBody = {
          UserAnswerHeaderId: Number(params.id),
        };
        const res: ResultApiResponse = await getRequest(
          "/api/UserAnswers/ConvertAnswersToPromptCommand",
          reqBody,
          true
        );
        debugger;
        const code = res?.data?.reportStatus;
        setReportStatus(code);
        if (code === 3) {
          // DONE
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
        } else if (code === 1) {
          // PROCCESSING – poll again in 30 seconds
          timeout = setTimeout(pollReportStatus, 30000);
          console.log("Still processing... will poll again in 30 seconds.");
        } else {
          console.log(`Report status: ${code}`);
        }
      } catch (error) {
        console.error("Polling failed:", error);
      }
    };
  
    pollReportStatus(); // Call immediately once
  
    return () => {
      if (timeout) clearTimeout(timeout); // Cleanup on unmount
    };
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
