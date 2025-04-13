"use client";
import { Card, Center, Loader } from '@mantine/core';
import React from 'react';
import style from "./../../../(chanci)/style.module.scss";
interface DynamicResultViewProps {
    result: any;
    activeSection: string;
}

const DynamicResultView: React.FC<DynamicResultViewProps> = ({
    result,
    activeSection,
}) => {
    const LoadingSpinet = () => {
        return (
            <Center style={{ height: "100vh" }}>
                <Loader color="blue" size="lg" />
            </Center>
        );
    };
    const renderContent = () => {

        switch (activeSection) {
            case 'personality':
                return (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        {result?.TraitReview?.map((trait: any, index: number) => {
                            return (
                                <Card
                                    key={index}
                                    shadow="sm"
                                    padding="lg"
                                    radius="md"
                                    withBorder
                                    className={style.cardDone}
                                >
                                    {trait?.Analysis && (<><h4>Analysis: </h4>
                                        <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                            {trait.Analysis}
                                        </p></>)}
                                    {result?.WhatResearchSays && <><h4>What Research Says: </h4>
                                        <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                            {result.WhatResearchSays}
                                        </p></>}
                                    {trait?.WhereYouFitBest && <><h4>Where You Fit Best: </h4>
                                        <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                            {trait.WhereYouFitBest}
                                        </p></>}
                                    {trait?.PotentialChallenges && <><h4>Potential Challenges: </h4>
                                        <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                            {trait.PotentialChallenges}
                                        </p></>}
                                    {trait?.WhyThisMatters && <><h4>Why This Matters: </h4>
                                        <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                            {trait.WhyThisMatters}
                                        </p></>}
                                    {trait?.MiniStorySnippet && <><h4>Mini Story Snippet: </h4>
                                        <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                            {trait.MiniStorySnippet}
                                        </p></>}
                                </Card>
                            )
                        })}
                        <Card
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                            className={style.cardDone}
                        >
                            <h3>Personlaity: </h3>
                            <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                {result.Personality}
                            </p>

                        </Card>
                    </div>
                );
            case "cvEval":
                return (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        {result?.CvFormat &&
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                className={style.cardDone}
                            ><h3>📄 Overall Format and Contact Information: </h3>
                                <h4>Assess: </h4>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.CvFormat.Assess}
                                </p>
                                <h4>Improve: </h4>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.CvFormat.Improve}
                                </p>
                            </Card>}
                        {result?.KeyInsight &&
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                className={style.cardDone}
                            ><h3>🧠 Professional Profile and Key Skills: </h3>
                                <h4>Assess: </h4>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.KeyInsight.Assess}
                                </p>
                                <h4>Improve: </h4>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.KeyInsight.Improve}
                                </p>
                            </Card>}
                        {result?.CvEducationAndEmploymentHistory &&
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                className={style.cardDone}
                            ><h3>💼 Employment History and Education: </h3>
                                <h4>Assess: </h4>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.CvEducationAndEmploymentHistory.Assess}
                                </p>
                                <h4>Improve: </h4>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.CvEducationAndEmploymentHistory.Improve}
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
                                    {result.cvAdditionalSection.Assess}
                                </p>
                                <h4>Improve: </h4>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.cvAdditionalSection.Improve}
                                </p>
                            </Card>}
                        {(result?.CvStrengths || result?.CvAreasForImprovment || result?.CvActionablePlan ) &&
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                className={style.cardDone}
                            ><h3>✅ Summary</h3>
                                {result?.CvStrengths && <><h4>💪 Strengths:  </h4>
                                    <ul style={{ padding: "15px" }}>
                                        {result?.CvStrengths?.length > 0 && result?.CvStrengths?.map((strenght: string, index: number) => {
                                            return (
                                                <li key={index} style={{ maxWidth: "700px", fontSize: "17px" }}>
                                                    {strenght}
                                                </li>
                                            )
                                        })
                                        }
                                    </ul></>}
                                {result?.CvAreasForImprovment && <><h4>🛠️ Areas for Improvement: </h4>
                                    <ul style={{ padding: "15px" }}>
                                        {result?.CvAreasForImprovment?.length > 0 && result?.CvAreasForImprovment?.map((strenght: string, index: number) => {
                                            return (
                                                <li key={index} style={{ maxWidth: "700px", fontSize: "17px" }}>
                                                    {strenght}
                                                </li>
                                            )
                                        })
                                        }
                                    </ul></>}
                                {result?.CvActionablePlan && <><h4>📌 Action Plan: </h4>
                                    <ul style={{ padding: "15px" }}>
                                        {result?.CvActionablePlan?.length > 0 && result?.CvActionablePlan?.map((strenght: string, index: number) => {
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
            case "skillAssessment":
                return (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        {result?.Strengths &&
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                className={style.cardDone}
                            ><h3>Your Strenghts: </h3>
                            {result?.SoftSkillPotentialGaps && <><h4>✅ Soft Skills:</h4>
                                <ul style={{ padding: "15px" }}>
                                    {result?.SoftSkillPotentialGaps?.length > 0 && result?.SoftSkillPotentialGaps?.map((strenght: string, index: number) => {
                                        return (
                                            <li key={index} style={{ maxWidth: "700px", fontSize: "17px" }}>
                                                {strenght}
                                            </li>
                                        )
                                    })
                                    }
                                </ul></>}
                                {result?.HardSkillPotentialGaps && <><h4>✅ Technical Skills:</h4>
                                <ul style={{ padding: "15px" }}>
                                    {result?.HardSkillPotentialGaps?.length > 0 && result?.HardSkillPotentialGaps?.map((strenght: string, index: number) => {
                                        return (
                                            <li key={index} style={{ maxWidth: "700px", fontSize: "17px" }}>
                                                {strenght}
                                            </li>
                                        )
                                    })
                                    }
                                </ul></>}
                                {result?.Strengths && <><h4>✅ Certifications & Projects:</h4>
                                <ul style={{ padding: "15px" }}>
                                    {result?.Strengths?.length > 0 && result?.Strengths?.map((strenght: string, index: number) => {
                                        return (
                                            <li key={index} style={{ maxWidth: "700px", fontSize: "17px" }}>
                                                {strenght}
                                            </li>
                                        )
                                    })
                                    }
                                </ul></>}
                            </Card>}
                        {result?.IndustryAlignment &&
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                className={style.cardDone}
                            ><h3>Industry Alignment: </h3>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.IndustryAlignment}
                                </p>
                            </Card>}
                        {result?.WhereToGo &&
                            <Card
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                withBorder
                                className={style.cardDone}
                            ><h3>Where to Grow: </h3>
                                <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                    {result.WhereToGo}
                                </p>
                            </Card>}
                    </div>
                )
            default:
                return (
                    <LoadingSpinet />
                );
        }
    };

    return (
        <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
            {result ?
                renderContent() : <LoadingSpinet />}
        </div>
    );
};

export default DynamicResultView;