"use client";
import {Avatar, Box, Card, Select, Table} from "@mantine/core";
import React, {useEffect, useState} from "react";
import style from "./../../../(chanci)/style.module.scss";
import {
    Course,
    IndustryScore,
    JobRecommendation,
    ResultBigFive,
    ResultSection,
    Resume,
} from "@/shared/types/chanci/result";
import Image from "next/image";
import chanciIc from "@public/image/chanciAI/icon/chanciCh.svg";
import PdfPreview from "../FilePreview/PdfPreview";
import DocxIframePreview from "../FilePreview/DocxPreview";
import {
    Industry,
    IndustryRecommendation,
    IndustryResponse,
} from "@/shared/types/chanci/industry";
import {getRequest} from "@/shared/api";
import {industryAddress} from "@/shared/constants/relative-url/industry";
import toastAlert from "@/shared/helpers/toast";
import {useParams} from "next/navigation";
import {jobAddress} from "@shared/constants/relative-url/job";
import {Job, JobResponse} from "@shared/types/chanci/job";
import Link from "next/link";

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
    const [industries, setIndustries] = useState<IndustryScore[] | undefined[]>();
    const [allIndustries, setAllIndustries] = useState<Industry[] | undefined[]>();
    const [jobs, setJobs] = useState<Job[] | undefined[]>();
    const [industryName, setIndustryName] = useState<string>();
    const [industryRecommendations, setIndustryRecommendations] = useState<
        IndustryRecommendation[] | undefined[]
    >();
    const [courses, setCourses] = useState<
        Course[] | undefined[]
    >();
    const selectedIndustry = industryRecommendations?.find(
        (industry) => industry?.industryName === industryName
    );
    const selectedCourses = courses?.filter(
        (course) => course?.industryTitle?.trim().toLowerCase() === industryName?.trim().toLowerCase()
    );
    console.log("Filtered selectedCourses:", selectedCourses);
    const params = useParams();
    useEffect(() => {
        console.log("Updated industryName:", industryName);
    }, [industryName]);
    useEffect(() => {
        const fetchIndustriess = async () => {
            try {
                const res: IndustryResponse = await getRequest(
                    industryAddress.GetAll,
                    {UserAnswerHeaderId: params.id},
                    true
                );

                const items = res?.data;
                setIndustries(items?.industryScores);
                setIndustryRecommendations(
                    items?.jobRecommendation.industryRecommendations
                );
                debugger;
                setCourses(items?.courses);
                setAllIndustries(items?.industries);
            } catch (error) {
                console.error("Error fetching industries:", error);
                toastAlert("Failed to load industries", "error");
            }
        };

        fetchIndustriess();
    }, []);
    const handleIndustryChange = async (value: string | null) => {
        const selectedIndustry = value ?? "";
        setIndustryName(selectedIndustry);
        debugger;
        if (selectedIndustry) {
            let foundedIndustry: Industry | undefined = allIndustries?.find(
                (x) =>
                    x?.title?.toLowerCase().includes(selectedIndustry?.toLowerCase() ?? "") ?? false
            );
            if (foundedIndustry) {
                const res: JobResponse = await getRequest(
                    jobAddress.GetAll,
                    {
                        Skip: 0,
                        Take: 10
                    },
                    true
                );
                debugger;
                setJobs(res.data?.items);
            }
        }
    };
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
                        <p style={{maxWidth: "700px", fontSize: "17px"}}>
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
                                                    style={{display: "flex", flexDirection: "column"}}
                                                >
                                                    <span>{scores[1]}/5</span>
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
                                    <span style={{fontWeight: 700}}>{scores[0]}</span>:{" "}
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
                                    <PdfPreview filePath={resume.path}/>
                                ) : resume?.extension === ".doc" ||
                                resume?.extension === ".docx" ? (
                                    <DocxIframePreview filePath={resume.path}/>
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
                                <p style={{maxWidth: "700px", fontSize: "17px"}}>
                                    {result.cvFormat?.assess}
                                </p>
                                <h4>Improve: </h4>
                                <p style={{maxWidth: "700px", fontSize: "17px"}}>
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
                                <p style={{maxWidth: "700px", fontSize: "17px"}}>
                                    {result.keyInsight?.assess}
                                </p>
                                <h4>Improve: </h4>
                                <p style={{maxWidth: "700px", fontSize: "17px"}}>
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
                                <p style={{maxWidth: "700px", fontSize: "17px"}}>
                                    {result.cvEducationAndEmploymentHistory?.assess}
                                </p>
                                <h4>Improve: </h4>
                                <p style={{maxWidth: "700px", fontSize: "17px"}}>
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
                                <p style={{maxWidth: "700px", fontSize: "17px"}}>
                                    {result.cvAdditionalSection?.assess}
                                </p>
                                <h4>Improve: </h4>
                                <p style={{maxWidth: "700px", fontSize: "17px"}}>
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
                                        <ul style={{padding: "15px"}}>
                                            {result?.cvStrengths?.length > 0 &&
                                                result?.cvStrengths?.map(
                                                    (strenght: string, index: number) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                style={{maxWidth: "700px", fontSize: "17px"}}
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
                                        <ul style={{padding: "15px"}}>
                                            {result?.cvAreasForImprovment?.length > 0 &&
                                                result?.cvAreasForImprovment?.map(
                                                    (strenght: string, index: number) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                style={{maxWidth: "700px", fontSize: "17px"}}
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
                                        <ul style={{padding: "15px"}}>
                                            {result?.cvActionablePlan?.length > 0 &&
                                                result?.cvActionablePlan?.map(
                                                    (strenght: string, index: number) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                style={{maxWidth: "700px", fontSize: "17px"}}
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
                                        <ul style={{padding: "15px"}}>
                                            {result?.softSkillPotentialGaps?.length > 0 &&
                                                result?.softSkillPotentialGaps?.map(
                                                    (strenght: string, index: number) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                style={{maxWidth: "700px", fontSize: "17px"}}
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
                                        <ul style={{padding: "15px"}}>
                                            {result?.hardSkillPotentialGaps?.length > 0 &&
                                                result?.hardSkillPotentialGaps?.map(
                                                    (strenght: string, index: number) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                style={{maxWidth: "700px", fontSize: "17px"}}
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
                                        <ul style={{padding: "15px"}}>
                                            {result?.strengths?.length > 0 &&
                                                result?.strengths?.map(
                                                    (strenght: string, index: number) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                style={{maxWidth: "700px", fontSize: "17px"}}
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
                                <p style={{maxWidth: "700px", fontSize: "17px"}}>
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
                                <p style={{maxWidth: "700px", fontSize: "17px"}}>
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
                                                        <Table.Th style={{textAlign: "left"}}>
                                                            Rank
                                                        </Table.Th>
                                                        <Table.Th>Industry</Table.Th>
                                                        <Table.Th style={{textAlign: "right"}}>
                                                            Final Score
                                                        </Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>
                                                    {group.map((item, index) => (
                                                        <Table.Tr key={index}>
                                                            <Table.Td
                                                                style={{textAlign: "left", width: "33%"}}
                                                            >
                                                                {start + index + 1}
                                                            </Table.Td>
                                                            <Table.Td
                                                                style={{textAlign: "left", width: "33%"}}
                                                            >
                                                                {item.name}
                                                            </Table.Td>
                                                            <Table.Td
                                                                style={{textAlign: "right", width: "33%"}}
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
                                    classNames={{
                                        dropdown: style.dropdownOpen,
                                    }}
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
                                            value: String(industry?.name ?? ""),
                                            label: industry?.name ?? "Unknown Industry",
                                        })) ?? []
                                    }
                                    onChange={(value) => setIndustryName(value ?? "")}
                                    // defaultValue={val !== "" ? val : ""}
                                    // value={val}
                                    comboboxProps={{
                                        middlewares: {flip: false, shift: false},
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
                        {selectedIndustry && (
                            <div className={style.resultBox}>
                                <Card radius="md" className={style.cardDone} shadow="none">
                                    <h4 style={{padding: "10px"}}>
                                        {selectedIndustry.industryName}
                                    </h4>
                                    <h4
                                        style={{
                                            fontWeight: "600",
                                            fontSize: "14px",
                                            padding: "10px",
                                        }}
                                    >
                                        Sub-Industries, Job Titles, and Salary Ranges:
                                    </h4>
                                    {selectedIndustry.jobTitles.map((job, index) => (
                                        <p
                                            key={job.title}
                                            style={{
                                                padding: "10px",
                                                paddingLeft: "20px",
                                                fontSize: "14px",
                                            }}
                                        >
                      <span style={{fontWeight: "500"}}>
                        {index + 1 + ". " + job.title + ": "}
                      </span>
                                            £{job.minimumSalaryPerYear.toLocaleString()}–£
                                            {job.maximumSalaryPerYear.toLocaleString()} per year​.
                                        </p>
                                    ))}
                                </Card>
                            </div>
                        )}
                    </div>
                );
            case "ActionableGuidence":
                return (
                    <div className={style.resultBox}>
                        <Card radius="md" className={style.cardDone} shadow="none">
                            Embarking on your career journey is an exciting adventure, and
                            I&apos;m here to help you navigate it with some tailored advice.
                        </Card>
                        <Card radius="md" className={style.cardDone} shadow="none">
                            Please select the industry you want to get your customised
                            progress plan:
                        </Card>
                        <Box className={style.questionBox}>
                            <Card shadow="none" radius="md" className={style.questionCard}>
                                <Select
                                    classNames={{
                                        dropdown: style.dropdownOpen,
                                    }}
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
                                            value: String(industry?.name ?? ""),
                                            label: industry?.name ?? "Unknown Industry",
                                        })) ?? []
                                    }
                                    onChange={handleIndustryChange}
                                    // defaultValue={val !== "" ? val : ""}
                                    // value={val}
                                    comboboxProps={{
                                        middlewares: {flip: false, shift: false},
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
                        {selectedCourses && selectedCourses.length > 0 && (
                            <div className={style.resultBox}>
                                <Card radius="md" className={style.cardDone} shadow="none">
                                    <h3 style={{padding: "10px"}}>
                                        {selectedCourses[0]?.industryTitle ?? "Unknown Industry"}
                                    </h3>
                                    <h4 style={{padding: "10px"}}>
                                        Courses to take:
                                    </h4>
                                    {selectedCourses.map((course, index) => (
                                        <div key={index}>
                                            <p
                                                style={{
                                                    padding: "10px",
                                                    paddingLeft: "20px",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                <div style={{
                                                    marginBottom: "5px",
                                                }}>
                                                      <span style={{
                                                          fontWeight: "bold",
                                                      }}> Title: </span>
                                                    <span> {course?.name ?? "Unknown Industry"} ({course?.level ?? "Unknown Industry"})</span>
                                                </div>
                                                <div style={{
                                                    marginBottom: "5px",
                                                }}>
                                                      <span style={{
                                                          fontWeight: "bold",
                                                      }}> Platform: </span>
                                                    <span> {course?.platform ?? "Unknown Platform"}</span>
                                                </div>
                                                <div style={{
                                                    marginBottom: "5px",
                                                }}>
                                                  <span style={{
                                                      fontWeight: "bold",
                                                  }}> Duration: </span>
                                                    <span> {course?.duration ?? "Unknown Platform"}</span>
                                                </div>
                                            </p>
                                        </div>
                                    ))}
                                </Card>
                            </div>
                        )}
                        {jobs && jobs.length > 0 && (
                            <div className={style.resultBox}>
                                <Card radius="md" className={style.cardDone} shadow="none">
                                    <h4 style={{padding: "10px"}}>
                                        Job Opportunities:
                                    </h4>
                                    {jobs.map((job, index) => (
                                        <div key={index}>
                                            <p
                                                style={{
                                                    padding: "10px",
                                                    paddingLeft: "20px",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                <div style={{
                                                    marginBottom: "5px",
                                                }}>
                                                      <span style={{
                                                          fontWeight: "bold",
                                                      }}> Title: </span>
                                                    <span> {job?.title ?? "Unknown Job"}</span>
                                                </div>
                                                <div>
                                                    <Link href={job?.link ?? "##"} target="_blank">show detail</Link>
                                                </div>
                                            </p>
                                        </div>
                                    ))}
                                </Card>
                            </div>
                        )}
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
