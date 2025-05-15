"use client";
import { Avatar, Box, Card, Select, Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import style from "./../../../(chanci)/style.module.scss";
import {
  IndustryScore,
  JobRecommendation,
  ResultBigFive,
  ResultSection,
  Resume
} from "@/shared/types/chanci/result";
import Image from "next/image";
import chanciIc from "@public/image/chanciAI/icon/chanciCh.svg";
import PdfPreview from "../FilePreview/PdfPreview";
import DocxIframePreview from "../FilePreview/DocxPreview";
import { Industry, IndustryResponse } from "@/shared/types/chanci/industry";
import { getRequest } from "@/shared/api";
import { industryAddress } from "@/shared/constants/relative-url/industry";
import toastAlert from "@/shared/helpers/toast";
interface DynamicResultViewProps {
  industryScores: IndustryScore[];
  result: JobRecommendation | undefined;
  activeSection: string;
  sections?: ResultSection[];
  resume?: Resume;
  bigFive?: ResultBigFive;
}

const DynamicResultView: React.FC<DynamicResultViewProps> = ({
  industryScores,
  result,
  activeSection,
  sections,
  resume,
  bigFive,
}) => {
  const [industries, setIndustries] = useState<Industry[] | undefined[]>();
  useEffect(() => {
    const fetchIndustriess = async () => {
      try {
        const res: IndustryResponse = await getRequest(
          industryAddress.GetAll,
          { skip: 0, take: 1000 },
          true
        );

        const items = res?.data?.items;
        setIndustries(items);
      } catch (error) {
        console.error("Error fetching industries:", error);
        toastAlert("Failed to load industries", "error");
      }
    };

    fetchIndustriess();
  }, []);
  const renderContent = () => {
    const renderLastPromptForPersonality = () => {
      return (
        <>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={style.cardDone}
          >
            <p style={{ maxWidth: "700px", fontSize: "17px" }}>
              {result?.traitReview}
            </p>
          </Card>
        </>
      );
    };
    const renderBigFive = () => {
      const scoreHighorLow = (score: number): string => {
        if (score < 2.5) return "Low";
        else return "High";
      };
      if (!bigFive) return <></>;
      return (
        <>
          <div className={style.desktopShow}>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  {Object.entries(bigFive).map((colNames, index) => {
                    return <Table.Th key={index}>{colNames[0]}</Table.Th>;
                  })}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr key={`bigFiveRow`}>
                  {Object.entries(bigFive).map((scores, index) => {
                    return (
                      <Table.Td key={`value-${index}`}>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span>{scores[1]}</span>
                          <span>({scoreHighorLow(scores[1])})</span>
                        </div>
                      </Table.Td>
                    );
                  })}
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </div>
          <div className={style.mobileShow}>
            {Object.entries(bigFive).map((scores, index) => {
              return (
                <p key={`average-${index}`}>
                  <span style={{ fontWeight: 700 }}>{scores[0]}</span>:{" "}
                  {scores[1]} <span>({scoreHighorLow(scores[1])})</span>{" "}
                </p>
              );
            })}
          </div>
        </>
      );
    };
    switch (activeSection) {
      case "PersonalityAnalysis":
        return (
          <div className={style.resultBox}>
            {sections &&
              sections
                .sort((a, b) => a.order - b.order)
                ?.map((section: ResultSection, index) => {
                  console.log(index);
                  console.log(sections.length);
                  return (
                    <>
                      <Card
                        key={index}
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                        className={style.cardDone}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: section.innerHtml,
                          }}
                        />
                      </Card>
                      {index === 0 ? (
                        <Card
                          shadow="sm"
                          padding="lg"
                          radius="md"
                          withBorder
                          className={style.cardDone}
                        >
                          {bigFive && renderBigFive()}
                        </Card>
                      ) : sections.length - 1 == index ? (
                        renderLastPromptForPersonality()
                      ) : (
                        <></>
                      )}
                    </>
                  );
                })}
            {/* <Card
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                            className={style.cardDone}
                        >
                            <h3>Personlaity: </h3>
                            <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                {result?.personality}
                            </p>

                        </Card>
                        {result?.traitReview?.map((trait: TraitReview, index: number) => {
                            return (
                                <Card
                                    key={index}
                                    shadow="sm"
                                    padding="lg"
                                    radius="md"
                                    withBorder
                                    className={style.cardDone}
                                >
                                    {trait?.analysis && (<><h4>Analysis: </h4>
                                        <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                            {trait.analysis}
                                        </p></>)}
                                    {trait?.whatResearchSays && <><h4>What Research Says: </h4>
                                        <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                            {trait.whatResearchSays}
                                        </p></>}
                                    {trait?.whereYouFitBest && <><h4>Where You Fit Best: </h4>
                                        <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                            {trait.whereYouFitBest}
                                        </p></>}
                                    {trait?.potentialChallenges && <><h4>Potential Challenges: </h4>
                                        <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                            {trait.potentialChallenges}
                                        </p></>}
                                    {trait?.whyThisMatters && <><h4>Why This Matters: </h4>
                                        <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                            {trait.whyThisMatters}
                                        </p></>}
                                    {trait?.miniStorySnippet && <><h4>Mini Story Snippet: </h4>
                                        <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                            {trait.miniStorySnippet}
                                        </p></>}
                                </Card>
                            )
                        })} */}
          </div>
        );
      case "CvEvaluation":
        return (
          <div className={style.resultBox}>
            {resume && (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className={style.cardDone}
              >
                <h3>Your CV:</h3>
                {resume?.extension === ".pdf" ? (
                  <PdfPreview filePath={resume.path} />
                ) : resume?.extension === ".doc" ||
                  resume?.extension === ".docx" ? (
                  <DocxIframePreview filePath={resume.path} />
                ) : (
                  <span>No Valid file to show.</span>
                )}
              </Card>
            )}
            {result?.cvFormat && (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className={style.cardDone}
              >
                <h3>📄 Overall Format and Contact Information: </h3>
                <h4>Assess: </h4>
                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                  {result.cvFormat?.assess}
                </p>
                <h4>Improve: </h4>
                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                  {result.cvFormat?.improve}
                </p>
              </Card>
            )}
            {result?.keyInsight && (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className={style.cardDone}
              >
                <h3>🧠 Professional Profile and Key Skills: </h3>
                <h4>Assess: </h4>
                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                  {result.keyInsight?.assess}
                </p>
                <h4>Improve: </h4>
                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                  {result.keyInsight?.improve}
                </p>
              </Card>
            )}
            {result?.cvEducationAndEmploymentHistory && (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className={style.cardDone}
              >
                <h3>💼 Employment History and Education: </h3>
                <h4>Assess: </h4>
                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                  {result.cvEducationAndEmploymentHistory?.assess}
                </p>
                <h4>Improve: </h4>
                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                  {result.cvEducationAndEmploymentHistory?.improve}
                </p>
              </Card>
            )}
            {result?.cvAdditionalSection && (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className={style.cardDone}
              >
                <h3>🎓 Additional Sections and Final Checks</h3>
                <h4>Assess: </h4>
                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                  {result.cvAdditionalSection?.assess}
                </p>
                <h4>Improve: </h4>
                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                  {result.cvAdditionalSection?.improve}
                </p>
              </Card>
            )}
            {(result?.cvStrengths ||
              result?.cvAreasForImprovment ||
              result?.cvActionablePlan) && (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className={style.cardDone}
              >
                <h3>✅ Summary</h3>
                {result?.cvStrengths && (
                  <>
                    <h4>💪 Strengths: </h4>
                    <ul style={{ padding: "15px" }}>
                      {result?.cvStrengths?.length > 0 &&
                        result?.cvStrengths?.map(
                          (strenght: string, index: number) => {
                            return (
                              <li
                                key={index}
                                style={{ maxWidth: "700px", fontSize: "17px" }}
                              >
                                {strenght}
                              </li>
                            );
                          }
                        )}
                    </ul>
                  </>
                )}
                {result?.cvAreasForImprovment && (
                  <>
                    <h4>🛠️ Areas for Improvement: </h4>
                    <ul style={{ padding: "15px" }}>
                      {result?.cvAreasForImprovment?.length > 0 &&
                        result?.cvAreasForImprovment?.map(
                          (strenght: string, index: number) => {
                            return (
                              <li
                                key={index}
                                style={{ maxWidth: "700px", fontSize: "17px" }}
                              >
                                {strenght}
                              </li>
                            );
                          }
                        )}
                    </ul>
                  </>
                )}
                {result?.cvActionablePlan && (
                  <>
                    <h4>📌 Action Plan: </h4>
                    <ul style={{ padding: "15px" }}>
                      {result?.cvActionablePlan?.length > 0 &&
                        result?.cvActionablePlan?.map(
                          (strenght: string, index: number) => {
                            return (
                              <li
                                key={index}
                                style={{ maxWidth: "700px", fontSize: "17px" }}
                              >
                                {strenght}
                              </li>
                            );
                          }
                        )}
                    </ul>
                  </>
                )}
              </Card>
            )}
          </div>
        );
      case "SkillAssessment":
        return (
          <div className={style.resultBox}>
            {result?.strengths && (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className={style.cardDone}
              >
                <h3>Your Strenghts: </h3>
                {result?.softSkillPotentialGaps && (
                  <>
                    <h4>✅ Soft Skills:</h4>
                    <ul style={{ padding: "15px" }}>
                      {result?.softSkillPotentialGaps?.length > 0 &&
                        result?.softSkillPotentialGaps?.map(
                          (strenght: string, index: number) => {
                            return (
                              <li
                                key={index}
                                style={{ maxWidth: "700px", fontSize: "17px" }}
                              >
                                {strenght}
                              </li>
                            );
                          }
                        )}
                    </ul>
                  </>
                )}
                {result?.hardSkillPotentialGaps && (
                  <>
                    <h4>✅ Technical Skills:</h4>
                    <ul style={{ padding: "15px" }}>
                      {result?.hardSkillPotentialGaps?.length > 0 &&
                        result?.hardSkillPotentialGaps?.map(
                          (strenght: string, index: number) => {
                            return (
                              <li
                                key={index}
                                style={{ maxWidth: "700px", fontSize: "17px" }}
                              >
                                {strenght}
                              </li>
                            );
                          }
                        )}
                    </ul>
                  </>
                )}
                {result?.strengths && (
                  <>
                    <h4>✅ Certifications & Projects:</h4>
                    <ul style={{ padding: "15px" }}>
                      {result?.strengths?.length > 0 &&
                        result?.strengths?.map(
                          (strenght: string, index: number) => {
                            return (
                              <li
                                key={index}
                                style={{ maxWidth: "700px", fontSize: "17px" }}
                              >
                                {strenght}
                              </li>
                            );
                          }
                        )}
                    </ul>
                  </>
                )}
              </Card>
            )}
            {result?.industryAlignment && (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className={style.cardDone}
              >
                <h3>Industry Alignment: </h3>
                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                  {result.industryAlignment}
                </p>
              </Card>
            )}
            {result?.whereToGo && (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className={style.cardDone}
              >
                <h3>Where to Grow: </h3>
                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                  {result.whereToGo}
                </p>
              </Card>
            )}
          </div>
        );
      case "JobIndustryMatrix":
        return (
          <div className={style.resultBox}>
            {industryScores && industryScores.length > 0 && (
              <>
                {Array.from({
                  length: Math.ceil(industryScores.length / 5),
                }).map((_, groupIndex) => {
                  const start = groupIndex * 5;
                  const group = industryScores.slice(start, start + 5);

                  return (
                    <Card
                      key={groupIndex}
                      radius="md"
                      className={style.cardDone}
                      shadow="none"
                    >
                      {groupIndex === 0 && (
                        <h4>🏆 Job Matrix – Final Industry Rankings (UK)</h4>
                      )}
                      <Table withRowBorders={false} horizontalSpacing={"xs"}>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th style={{ textAlign: "left" }}>
                              Rank
                            </Table.Th>
                            <Table.Th>Industry</Table.Th>
                            <Table.Th style={{ textAlign: "right" }}>
                              Final Score
                            </Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {group.map((item, index) => (
                            <Table.Tr key={index}>
                              <Table.Td
                                style={{ textAlign: "left", width: "33%" }}
                              >
                                {start + index + 1}
                              </Table.Td>
                              <Table.Td
                                style={{ textAlign: "left", width: "33%" }}
                              >
                                {item.name}
                              </Table.Td>
                              <Table.Td
                                style={{ textAlign: "right", width: "33%" }}
                              >
                                {item.score}%
                              </Table.Td>
                            </Table.Tr>
                          ))}
                        </Table.Tbody>
                      </Table>
                    </Card>
                  );
                })}
              </>
            )}
            <Box className={style.questionBox}>
              <Card shadow="none" radius="md" className={style.questionCard}>
                <Select
                  searchable
                  placeholder="Select your industries"
                  nothingFoundMessage="Nothing found..."
                  checkIconPosition="right"
                  style={{
                    marginTop: ".4rem",
                    transform: "translateY(-6px)",
                    width: "90%",
                  }}
                  data={
                    industries?.map((industry) => ({
                      value: String(industry?.id ?? ""),
                      label: industry?.title ?? "Unknown Industry",
                    })) ?? []
                  }
                  // onChange={(value) => handleUserValue(value ? value : "")}
                  // defaultValue={val !== "" ? val : ""}
                  // value={val}
                  comboboxProps={{
                    middlewares: { flip: false, shift: false },
                    withinPortal: false,
                    shadow: "sm",
                  }}
                />
              </Card>
              <Image
                src={chanciIc}
                alt="chanciIcon"
                className={style.chanciImg}
              />
            </Box>
          </div>
        );
      case "ActionableGuidence":
        return (
          <div className={style.resultBox}>
            <Card radius="md" className={style.cardDone} shadow="none">
              Hello Stuti,
              <br />
              Embarking on your career journey is an exciting adventure, and I&apos;m
              here to help you navigate it with some tailored advice.
            </Card>
            <Card radius="md" className={style.cardDone} shadow="none">
              Please select the industry you want to get your customised
              progress plan:
            </Card>
            <Box className={style.questionBox}>
              <Card shadow="none" radius="md" className={style.questionCard}>
                <Select
                  searchable
                  placeholder="Select your industries"
                  nothingFoundMessage="Nothing found..."
                  checkIconPosition="right"
                  style={{
                    marginTop: ".4rem",
                    transform: "translateY(-6px)",
                    width: "90%",
                  }}
                  data={
                    industries?.map((industry) => ({
                      value: String(industry?.id ?? ""),
                      label: industry?.title ?? "Unknown Industry",
                    })) ?? []
                  }
                  // onChange={(value) => handleUserValue(value ? value : "")}
                  // defaultValue={val !== "" ? val : ""}
                  // value={val}
                  comboboxProps={{
                    middlewares: { flip: false, shift: false },
                    withinPortal: false,
                    shadow: "sm",
                  }}
                />
              </Card>
              <Image
                src={chanciIc}
                alt="chanciIcon"
                className={style.chanciImg}
              />
            </Box>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Box className={style.chanciImgResult}>
        <Avatar
          src="/image/chanciAI/chanci.svg"
          alt="it's me"
          size={55}
          className={style.questionImgChanci}
        />
      </Box>
      {renderContent()}
    </div>
  );
};

export default DynamicResultView;
