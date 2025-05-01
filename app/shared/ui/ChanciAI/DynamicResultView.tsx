"use client";
import { Avatar, Box, Card, Table } from '@mantine/core';
import React from 'react';
import style from "./../../../(chanci)/style.module.scss";
import { IndustryScore, JobRecommendation, ResultSection, Resume, TraitReview } from '@/shared/types/chanci/result';
import PdfPreview from '../FilePreview/PdfPreview';
import DocxIframePreview from '../FilePreview/DocxPreview';
interface DynamicResultViewProps {
    industryScores: IndustryScore[]
    result: JobRecommendation | undefined;
    activeSection: string;
    sections?: ResultSection[];
    resume?: Resume;
}

const DynamicResultView: React.FC<DynamicResultViewProps> = ({
    industryScores,
    result,
    activeSection,
    sections,
    resume
}) => {
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
            )
        }

        switch (activeSection) {
            case 'PersonalityAnalysis':
                return (
                    <div className={style.resultBox}>
                        {sections &&
                            sections.sort((a, b) => a.order - b.order)?.map((section: ResultSection, index) => {
                                console.log(index)
                                console.log(sections.length)
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
                                            <div dangerouslySetInnerHTML={{ __html: section.innerHtml }} />
                                        </Card>
                                        {index === 0 ? (
                                            <Card
                                                shadow="sm"
                                                padding="lg"
                                                radius="md"
                                                withBorder
                                                className={style.cardDone}
                                            >
                                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                                    {result?.personality}
                                                </p>

                                            </Card>
                                        ) : sections.length - 1 == index ?
                                            renderLastPromptForPersonality()
                                            : (<></>)}
                                    </>
                                )
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
                        {resume &&
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                className={style.cardDone}
                            >
                                <h3>Your CV:</h3>
                                {resume?.extension === '.pdf' ?
                                    (<PdfPreview filePath={resume.path} />
                                    ) : (resume?.extension === '.doc' || resume?.extension === '.docx') ? (
                                        <DocxIframePreview filePath={resume.path} />
                                    ) : (<span>No Valid file to show.</span>)
                                }
                            </Card>
                        }
                        {result?.cvFormat &&
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                className={style.cardDone}
                            ><h3>📄 Overall Format and Contact Information: </h3>
                                <h4>Assess: </h4>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.cvFormat?.assess}
                                </p>
                                <h4>Improve: </h4>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.cvFormat?.improve}
                                </p>
                            </Card>}
                        {result?.keyInsight &&
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                className={style.cardDone}
                            ><h3>🧠 Professional Profile and Key Skills: </h3>
                                <h4>Assess: </h4>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.keyInsight?.assess}
                                </p>
                                <h4>Improve: </h4>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.keyInsight?.improve}
                                </p>
                            </Card>}
                        {result?.cvEducationAndEmploymentHistory &&
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                className={style.cardDone}
                            ><h3>💼 Employment History and Education: </h3>
                                <h4>Assess: </h4>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.cvEducationAndEmploymentHistory?.assess}
                                </p>
                                <h4>Improve: </h4>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.cvEducationAndEmploymentHistory?.improve}
                                </p>
                            </Card>}
                        {result?.cvAdditionalSection &&
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                className={style.cardDone}
                            ><h3>🎓 Additional Sections and Final Checks</h3>
                                <h4>Assess: </h4>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.cvAdditionalSection?.assess}
                                </p>
                                <h4>Improve: </h4>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.cvAdditionalSection?.improve}
                                </p>
                            </Card>}
                        {(result?.cvStrengths || result?.cvAreasForImprovment || result?.cvActionablePlan) &&
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                className={style.cardDone}
                            ><h3>✅ Summary</h3>
                                {result?.cvStrengths && <><h4>💪 Strengths:  </h4>
                                    <ul style={{ padding: "15px" }}>
                                        {result?.cvStrengths?.length > 0 && result?.cvStrengths?.map((strenght: string, index: number) => {
                                            return (
                                                <li key={index} style={{ maxWidth: "700px", fontSize: "17px" }}>
                                                    {strenght}
                                                </li>
                                            )
                                        })
                                        }
                                    </ul></>}
                                {result?.cvAreasForImprovment && <><h4>🛠️ Areas for Improvement: </h4>
                                    <ul style={{ padding: "15px" }}>
                                        {result?.cvAreasForImprovment?.length > 0 && result?.cvAreasForImprovment?.map((strenght: string, index: number) => {
                                            return (
                                                <li key={index} style={{ maxWidth: "700px", fontSize: "17px" }}>
                                                    {strenght}
                                                </li>
                                            )
                                        })
                                        }
                                    </ul></>}
                                {result?.cvActionablePlan && <><h4>📌 Action Plan: </h4>
                                    <ul style={{ padding: "15px" }}>
                                        {result?.cvActionablePlan?.length > 0 && result?.cvActionablePlan?.map((strenght: string, index: number) => {
                                            return (
                                                <li key={index} style={{ maxWidth: "700px", fontSize: "17px" }}>
                                                    {strenght}
                                                </li>
                                            )
                                        })
                                        }
                                    </ul></>}

                            </Card>}
                    </div>
                )
            case "SkillAssessment":
                return (
                    <div className={style.resultBox}>
                        {result?.strengths &&
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                className={style.cardDone}
                            ><h3>Your Strenghts: </h3>
                                {result?.softSkillPotentialGaps && <><h4>✅ Soft Skills:</h4>
                                    <ul style={{ padding: "15px" }}>
                                        {result?.softSkillPotentialGaps?.length > 0 && result?.softSkillPotentialGaps?.map((strenght: string, index: number) => {
                                            return (
                                                <li key={index} style={{ maxWidth: "700px", fontSize: "17px" }}>
                                                    {strenght}
                                                </li>
                                            )
                                        })
                                        }
                                    </ul></>}
                                {result?.hardSkillPotentialGaps && <><h4>✅ Technical Skills:</h4>
                                    <ul style={{ padding: "15px" }}>
                                        {result?.hardSkillPotentialGaps?.length > 0 && result?.hardSkillPotentialGaps?.map((strenght: string, index: number) => {
                                            return (
                                                <li key={index} style={{ maxWidth: "700px", fontSize: "17px" }}>
                                                    {strenght}
                                                </li>
                                            )
                                        })
                                        }
                                    </ul></>}
                                {result?.strengths && <><h4>✅ Certifications & Projects:</h4>
                                    <ul style={{ padding: "15px" }}>
                                        {result?.strengths?.length > 0 && result?.strengths?.map((strenght: string, index: number) => {
                                            return (
                                                <li key={index} style={{ maxWidth: "700px", fontSize: "17px" }}>
                                                    {strenght}
                                                </li>
                                            )
                                        })
                                        }
                                    </ul></>}
                            </Card>}
                        {result?.industryAlignment &&
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                className={style.cardDone}
                            ><h3>Industry Alignment: </h3>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.industryAlignment}
                                </p>
                            </Card>}
                        {result?.whereToGo &&
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                className={style.cardDone}
                            ><h3>Where to Grow: </h3>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.whereToGo}
                                </p>
                            </Card>}
                    </div>
                )
            case "JobIndustryMatrix":
                return (
                    <div className={style.resultBox}>
                        {industryScores && industryScores.length > 0 && <Card
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                            className={style.cardDone}
                        >
                            <h4>Industry Scores:</h4>
                            <Table striped highlightOnHover withColumnBorders>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Index</Table.Th>
                                        <Table.Th>Industry</Table.Th>
                                        <Table.Th>Score</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {industryScores?.map((item, index) => (
                                        <Table.Tr key={index}>
                                            <Table.Td>{index + 1}</Table.Td>
                                            <Table.Td>{item.name}</Table.Td>
                                            <Table.Td>{item.score}</Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </Card>}
                    </div>
                )
            default:
                return null;
        }
    };

    return (
        <div style={{ display: "flex", gap: "1rem", flexDirection: "row", justifyContent: 'center' }}>
            <Box className={style.chanciImgResult}>
                <Avatar
                    src="/image/chanciAI/chanci.svg"
                    alt="it's me"
                    size={55}
                    className={style.questionImgChanci}
                /></Box>
            {renderContent()}
        </div>
    );
};

export default DynamicResultView;