"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getRequest } from "@/shared/api/chanci";
import { userAddresses } from "@/shared/constants/relative-url/user";
import { Divider } from "@mantine/core";

// Define interfaces for the data structure
interface IndustryRecommendation {
  industryName: string;
  industryDescription: string;
  why: string;
  percentage: number;
  jobTitles: string[];
}

interface AnswerData {
  cvScore: number;
  personality: string;
  highestScoringPersonality: string;
  certificateSuggestions: string[];
  courseSuggestions: string[];
  hardSkillPotentialGaps: string[];
  industryRecommendations: IndustryRecommendation[];
  networkingOpportunitiesSuggestions: string[];
  softSkillPotentialGaps: string[];
  strengths: string[];
}

const Page = () => {
  const { id } = useParams();
  const [answerData, setAnswerData] = useState<AnswerData | null>(null);

  // const getData = async () => {
  //   const query = {
  //     UserAnswerHeaderId: id,
  //   };
  //   const { data } = await getRequest(
  //     userAddresses.ConvertAnswersToPromptCommand,
  //     query
  //   );
  //   setAnswerData(data as AnswerData);
  // };

  const getAllAnswers = async () => {
    const query = {
      UserAnswerHeaderId: id,
    };
    const { data } = await getRequest(
      userAddresses.ConvertAnswersToPromptCommand,
      query
    );
    setAnswerData(data as AnswerData);
  };

  useEffect(() => {
    getAllAnswers();
  }, []);

  if (!answerData) return null;

  return (
    <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
      <div>
        <h4>cvScore</h4>
        <div>{answerData.cvScore}</div>
      </div>

      <div style={{ maxWidth: "800px" }}>
        <h4>personality</h4>
        <div>{answerData.personality}</div>
      </div>

      <div>
        <h4>highestScoringPersonality</h4>
        <div>{answerData.highestScoringPersonality}</div>
      </div>

      <div>
        <h4>certificateSuggestions</h4>
        {answerData.certificateSuggestions?.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>

      <div>
        <h4>courseSuggestions</h4>
        {answerData.courseSuggestions?.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>

      <div>
        <h4>hardSkillPotentialGaps</h4>
        {answerData.hardSkillPotentialGaps?.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>

      <div>
        <h4>industryRecommendations</h4>
        {answerData.industryRecommendations?.map((item, index) => (
          <div key={index} style={{ padding: ".5rem" }}>
            <div>
              <span style={{ color: "#08CD6A" }}>Name:</span>{" "}
              {item.industryName}
            </div>
            <div style={{ maxWidth: "800px" }}>
              <span style={{ color: "#08CD6A" }}>Description:</span>{" "}
              {item.industryDescription}
            </div>
            <div style={{ maxWidth: "800px" }}>
              <span style={{ color: "#08CD6A" }}>Why:</span> {item.why}
            </div>
            <div>
              <span style={{ color: "#08CD6A" }}>Percentage:</span>{" "}
              {item.percentage}
            </div>
            <div>
              <span style={{ color: "#08CD6A" }}>JobTitles:</span>
              <div>
                {item.jobTitles?.map((jobTitle, idx) => (
                  <div key={idx}>{jobTitle}</div>
                ))}
              </div>
            </div>
            <Divider style={{ marginTop: ".5rem" }} />
          </div>
        ))}
      </div>

      <div style={{ padding: ".5rem 0" }}>
        <h4>networkingOpportunitiesSuggestions:</h4>
        <div>
          {answerData.networkingOpportunitiesSuggestions?.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>

      <div style={{ padding: ".5rem 0" }}>
        <h4>softSkillPotentialGaps:</h4>
        <div>
          {answerData.softSkillPotentialGaps?.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>

      <div style={{ padding: ".5rem 0" }}>
        <h4>strengths:</h4>
        <div>
          {answerData.strengths?.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
