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
                                    {trait?.Analysis && (<><h3>Analysis: </h3>
                                        <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                            {trait.Analysis}
                                        </p></>)}
                                    {result?.WhatResearchSays && <><h3>What Research Says: </h3>
                                        <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                            {result.WhatResearchSays}
                                        </p></>}
                                    {trait?.WhereYouFitBest && <><h3>Where You Fit Best: </h3>
                                        <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                            {trait.WhereYouFitBest}
                                        </p></>}
                                    {trait?.PotentialChallenges && <><h3>Potential Challenges: </h3>
                                        <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                            {trait.PotentialChallenges}
                                        </p></>}
                                    {trait?.WhyThisMatters && <><h3>Why This Matters: </h3>
                                        <p style={{ maxWidth: "700px", fontSize: "17px" }}>
                                            {trait.WhyThisMatters}
                                        </p></>}
                                    {trait?.MiniStorySnippet && <><h3>Mini Story Snippet: </h3>
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